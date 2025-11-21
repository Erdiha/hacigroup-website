"use client";

import { useEffect, useRef } from "react";

export default function DonateBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let arcs = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Arc {
      constructor() {
        this.init();
      }

      init() {
        // Start point
        this.x1 = Math.random() * canvas.width;
        this.y1 = Math.random() * canvas.height;
        
        // End point (somewhere nearby but not too close)
        const dist = Math.random() * 300 + 100;
        const angle = Math.random() * Math.PI * 2;
        this.x2 = this.x1 + Math.cos(angle) * dist;
        this.y2 = this.y1 + Math.sin(angle) * dist;

        // Control point for curve (perpendicular offset)
        const midX = (this.x1 + this.x2) / 2;
        const midY = (this.y1 + this.y2) / 2;
        const offset = (Math.random() - 0.5) * 200; // Curve amount
        this.cx = midX + Math.cos(angle + Math.PI/2) * offset;
        this.cy = midY + Math.sin(angle + Math.PI/2) * offset;

        this.progress = 0; // 0 to 1
        this.speed = Math.random() * 0.01 + 0.005;
        this.lifePhase = 0; // 0: grow, 1: shrink
        this.width = Math.random() * 2 + 1;
        
        // "Sunie" colors
        const colors = [
          "251, 191, 36",  // Amber
          "167, 139, 250", // Purple
          "255, 255, 255", // White
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (this.lifePhase === 0) { // Grow
          this.progress += this.speed;
          if (this.progress >= 1) {
            this.progress = 1;
            this.lifePhase = 1;
          }
        } else { // Shrink (tail follows head)
          // We'll handle shrinking by drawing a segment based on progress
          // Actually, let's make it "travel"
          this.progress += this.speed;
          if (this.progress >= 2) {
            this.init();
          }
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${this.color}, 0.15)`; // Much lower opacity
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";

        // Calculate current position on curve
        // Quadratic Bezier: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        
        const getPoint = (t) => {
          const invT = 1 - t;
          const x = invT * invT * this.x1 + 2 * invT * t * this.cx + t * t * this.x2;
          const y = invT * invT * this.y1 + 2 * invT * t * this.cy + t * t * this.y2;
          return { x, y };
        };

        // Draw the full curve? No, draw a segment.
        // Phase 0: Draw from 0 to progress
        // Phase 1: Draw from (progress - 1) to 1
        
        let tStart = 0;
        let tEnd = 0;

        if (this.lifePhase === 0) {
            tStart = 0;
            tEnd = this.progress;
        } else {
            tStart = this.progress - 1;
            tEnd = 1;
        }
        
        // Draw the curve segment
        // We need to approximate the bezier segment with small lines
        const steps = 20;
        let first = true;
        
        for (let i = 0; i <= steps; i++) {
            const t = tStart + (tEnd - tStart) * (i / steps);
            const p = getPoint(t);
            if (first) {
                ctx.moveTo(p.x, p.y);
                first = false;
            } else {
                ctx.lineTo(p.x, p.y);
            }
        }
        ctx.stroke();

        // Draw Dots at ends
        const pStart = getPoint(tStart);
        const pEnd = getPoint(tEnd);

        // Start Dot (fades out in phase 1)
        if (this.lifePhase === 0) {
             ctx.beginPath();
             ctx.fillStyle = `rgba(${this.color}, 0.3)`; // Subtle dot
             ctx.arc(this.x1, this.y1, 3, 0, Math.PI * 2);
             ctx.fill();
        }

        // Head Dot (always visible until very end)
        if (tEnd > 0 && tEnd < 1) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, 0.5)`; // Subtle head
            ctx.arc(pEnd.x, pEnd.y, 3, 0, Math.PI * 2); 
            ctx.fill();
            
            // Glow
            ctx.beginPath();
            ctx.fillStyle = `rgba(${this.color}, 0.1)`; // Very subtle glow
            ctx.arc(pEnd.x, pEnd.y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // End Dot (appears when head reaches it)
        if (tEnd >= 0.95) {
             ctx.beginPath();
             ctx.fillStyle = `rgba(${this.color}, 0.3)`; // Subtle end dot
             ctx.arc(this.x2, this.y2, 3, 0, Math.PI * 2);
             ctx.fill();
        }
      }
    }

    const init = () => {
      arcs = [];
      const count = Math.min(window.innerWidth * 0.02, 20);
      for (let i = 0; i < count; i++) {
        arcs.push(new Arc());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = "lighter"; // Shiny
      
      arcs.forEach(a => {
        a.update();
        a.draw(ctx);
      });
      
      ctx.globalCompositeOperation = "source-over";

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", () => {
      resizeCanvas();
      init();
    });
    
    resizeCanvas();
    init();
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
          background: "radial-gradient(circle at center, rgba(11, 16, 32, 0.5) 0%, #0B1020 100%)"
        }}
      />
    </>
  );
}
