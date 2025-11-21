"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let flowField = [];
    let rows, cols;
    const scale = 20; // Grid cell size
    let zOff = 0; // Time dimension for noise
    let mouse = { x: -1000, y: -1000, radius: 300 }; // Mouse off-screen initially

    // Brand colors: Purple, Amber, Green
    const colors = [
      { r: 167, g: 139, b: 250 }, // Purple
      { r: 251, g: 191, b: 36 },  // Amber
      { r: 74, g: 222, b: 128 },  // Green
    ];

    // Simple pseudo-random noise function (Simplex-ish)
    // Using a permutation table for speed
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    // Shuffle
    for (let i = 255; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [p[i], p[r]] = [p[r], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(t, a, b) { return a + t * (b - a); }
    function grad(hash, x, y, z) {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    function noise(x, y, z) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      const u = fade(x);
      const v = fade(y);
      const w = fade(z);
      const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
      const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;

      return lerp(w, lerp(v, lerp(u, grad(perm[AA], x, y, z),
        grad(perm[BA], x - 1, y, z)),
        lerp(u, grad(perm[AB], x, y - 1, z),
          grad(perm[BB], x - 1, y - 1, z))),
        lerp(v, lerp(u, grad(perm[AA + 1], x, y, z - 1),
          grad(perm[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(perm[AB + 1], x, y - 1, z - 1),
            grad(perm[BB + 1], x - 1, y - 1, z - 1))));
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / scale) + 1;
      rows = Math.floor(canvas.height / scale) + 1;
      flowField = new Array(cols * rows);
      
      // Re-init particles if needed, or just let them adjust
      if (particles.length === 0) {
        const particleCount = Math.min(1500, (canvas.width * canvas.height) / 500);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      }
    };

    class Particle {
      constructor() {
        this.reset();
        // Start at random positions
        this.pos.x = Math.random() * canvas.width;
        this.pos.y = Math.random() * canvas.height;
      }

      reset() {
        this.pos = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
        this.vel = { x: 0, y: 0 };
        this.acc = { x: 0, y: 0 };
        
        // Slower speed, especially on mobile
        const isMobile = window.innerWidth < 768;
        const baseSpeed = isMobile ? 0.5 : 1;
        this.maxSpeed = baseSpeed + Math.random() * (isMobile ? 0.5 : 1);
        
        this.prevPos = { x: this.pos.x, y: this.pos.y };
        
        // Assign a random brand color
        const c = colors[Math.floor(Math.random() * colors.length)];
        this.color = `rgba(${c.r}, ${c.g}, ${c.b}, ${0.3 + Math.random() * 0.5})`;
        
        // Larger particles on mobile for better visibility
        const baseWidth = Math.random() * 2 + 1; // Increased from 1.5 + 0.5
        this.width = isMobile ? baseWidth * 1.5 : baseWidth;
      }

      update() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;

        // Find grid position
        const x = Math.floor(this.pos.x / scale);
        const y = Math.floor(this.pos.y / scale);
        const index = x + y * cols;

        if (flowField[index]) {
          // Apply flow force
          this.acc.x += Math.cos(flowField[index]) * 0.5;
          this.acc.y += Math.sin(flowField[index]) * 0.5;
        }

        // Mouse interaction (Repel)
        const dx = this.pos.x - mouse.x;
        const dy = this.pos.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.acc.x += Math.cos(angle) * force * 2;
          this.acc.y += Math.sin(angle) * force * 2;
        }

        // Physics
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        
        // Limit speed
        const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
        if (speed > this.maxSpeed) {
          this.vel.x = (this.vel.x / speed) * this.maxSpeed;
          this.vel.y = (this.vel.y / speed) * this.maxSpeed;
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.acc.x = 0;
        this.acc.y = 0;

        // Wrap around edges
        if (this.pos.x > canvas.width) { this.pos.x = 0; this.prevPos.x = 0; }
        if (this.pos.x < 0) { this.pos.x = canvas.width; this.prevPos.x = canvas.width; }
        if (this.pos.y > canvas.height) { this.pos.y = 0; this.prevPos.y = 0; }
        if (this.pos.y < 0) { this.pos.y = canvas.height; this.prevPos.y = canvas.height; }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.prevPos.x, this.prevPos.y);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    const animate = () => {
      // Create trails by not fully clearing the screen
      ctx.fillStyle = "rgba(11, 16, 32, 0.15)"; // Matches bg-primary with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate flow field
      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          const index = x + y * cols;
          // 3D noise (x, y, time)
          const angle = noise(xoff, yoff, zOff) * Math.PI * 4;
          flowField[index] = angle;
          xoff += 0.1;
        }
        yoff += 0.1;
      }
      zOff += 0.001; // Slow evolution of the field (was 0.003)

      for (let particle of particles) {
        particle.update();
        particle.draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    window.addEventListener("resize", resizeCanvas);
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    // Init
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Overlay to reduce distraction */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(11, 16, 32, 0.6) 100%)",
        }}
      />
    </>
  );
}
