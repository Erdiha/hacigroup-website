"use client";

import { useEffect, useRef } from "react";

export default function AboutBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    // Brand colors: Purple, Amber, Green
    const colors = [
      "rgba(167, 139, 250, 0.15)", // Purple
      "rgba(251, 191, 36, 0.15)",  // Amber
      "rgba(74, 222, 128, 0.15)",  // Green
    ];

    // Simplex noise implementation (simplified for brevity)
    // In a real prod env, import 'simplex-noise' or similar
    // Here we'll use a simple superposition of sine waves to mimic terrain
    const noise = (x, y, t) => {
      return (
        Math.sin(x * 0.002 + t * 0.5) * Math.cos(y * 0.002 + t * 0.3) * 0.5 +
        Math.sin(x * 0.005 - t * 0.2) * Math.cos(y * 0.005 + t * 0.4) * 0.25 +
        Math.sin(x * 0.01 + t * 0.1) * Math.cos(y * 0.01 - t * 0.2) * 0.125
      );
    };

    const drawContour = (threshold, color) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;

      // Marching squares or simple grid sampling?
      // For "Living Topography", drawing lines where noise ~= threshold is effective
      // But for performance and style, let's draw horizontal lines deformed by noise
      
      // Let's switch to a "Flowing Terrain" style: horizontal lines that wave
      // This looks like a joy division plot or elevation map
    };

    // Let's do "Topographic Isolines"
    // We scan the grid and if noise crosses a threshold, we draw.
    // Optimization: Draw deformed concentric rings or horizontal waves.
    
    // Let's go with "Drifting Elevation Map":
    // Multiple layers of "terrain" moving slowly.
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Light packets traveling along lines
    let packets = [];
    class Packet {
      constructor(canvasWidth, startX = null) {
        this.lineIndex = Math.floor(Math.random() * (colors.length * 6)); // Random line
        this.colorIdx = Math.floor(this.lineIndex / 6);
        this.speed = Math.random() * 2 + 1;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.size = Math.random() * 2 + 1.5;
        
        // Start just off-screen OR at specified position
        if (startX !== null) {
            this.x = startX;
        } else {
            this.x = this.direction === 1 ? -50 : canvasWidth + 50;
        }
      }

      update() {
        this.x += this.speed * this.direction;
      }

      isDead(canvasWidth) {
        return (this.direction === 1 && this.x > canvasWidth + 50) || 
               (this.direction === -1 && this.x < -50);
      }

      draw(ctx, time) {
        // Calculate Y based on the same noise function as the line
        // We need to reconstruct the yBase for this packet's line
        const linesPerColor = 6;
        const colorGroup = Math.floor(this.lineIndex / linesPerColor);
        const lineInGroup = this.lineIndex % linesPerColor;
        
        const yBase = (canvas.height / 6) * lineInGroup + (colorGroup * 50);
        
        // Calculate exact Y at this X
        const n = noise(this.x, yBase, time * 0.002);
        const yOffset = n * 200;
        const y = yBase + yOffset;

        // Draw glow
        ctx.beginPath();
        // Use the specific color for this line group, but with higher opacity for the dot
        const dotColors = [
          "rgba(167, 139, 250, 0.6)", // Purple
          "rgba(251, 191, 36, 0.6)",  // Amber
          "rgba(74, 222, 128, 0.6)",  // Green
        ];
        ctx.fillStyle = dotColors[colorGroup];
        ctx.shadowBlur = 6; // Reduced blur for subtlety
        ctx.shadowColor = dotColors[colorGroup];
        ctx.arc(this.x, y, this.size * 0.8, 0, Math.PI * 2); // Slightly smaller
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Lines
      colors.forEach((color, colorIdx) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for(let i = 0; i < 6; i++) {
          const yBase = (canvas.height / 6) * i + (colorIdx * 50);
          ctx.moveTo(0, yBase);
          for (let x = 0; x <= canvas.width; x += 10) {
            const n = noise(x, yBase, time * 0.002);
            const yOffset = n * 200;
            ctx.lineTo(x, yBase + yOffset);
          }
        }
        ctx.stroke();
      });

      // Manage Packets
      if (Math.random() < 0.03) { // Spawn chance
        packets.push(new Packet(canvas.width));
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        let p = packets[i];
        p.update();
        p.draw(ctx, time);
        if (p.isDead(canvas.width)) {
          packets.splice(i, 1);
        }
      }

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Pre-populate packets so animation is active immediately
    for (let i = 0; i < 20; i++) {
        packets.push(new Packet(canvas.width, Math.random() * canvas.width));
    }
    
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "radial-gradient(circle at center, transparent 0%, #0B1020 90%)"
        }}
      />
    </>
  );
}
