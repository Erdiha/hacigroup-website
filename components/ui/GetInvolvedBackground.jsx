"use client";
import { useEffect, useRef } from "react";

/**
 * "Liquid Light Morphing" - Premium organic blob animation
 * Polished, professional-grade visual effects with smooth morphing and color transitions
 */
export default function GetInvolvedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let animationId;
    const blobs = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Premium organic blob with smooth morphing
    class Blob {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.baseRadius = 60 + Math.random() * 80;
        this.morphSpeed = 0.015 + Math.random() * 0.02;
        this.morphPhase = Math.random() * Math.PI * 2;
        this.colorPhase = Math.random() * Math.PI * 2;
        this.colorSpeed = 0.008 + Math.random() * 0.004;
        
        // Control points for organic shape
        this.points = [];
        const pointCount = 8;
        for (let i = 0; i < pointCount; i++) {
          this.points.push({
            angle: (i / pointCount) * Math.PI * 2,
            radiusOffset: 0.8 + Math.random() * 0.4,
            morphOffset: Math.random() * Math.PI * 2,
            morphSpeed: 0.8 + Math.random() * 0.4,
          });
        }
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Smooth edge wrapping
        if (this.x < -this.baseRadius) this.x = canvas.width + this.baseRadius;
        if (this.x > canvas.width + this.baseRadius) this.x = -this.baseRadius;
        if (this.y < -this.baseRadius) this.y = canvas.height + this.baseRadius;
        if (this.y > canvas.height + this.baseRadius) this.y = -this.baseRadius;
        
        this.morphPhase += this.morphSpeed;
        this.colorPhase += this.colorSpeed;
      }
      
      getColor() {
        // Smooth color transitions through brand colors
        const t = (Math.sin(this.colorPhase) + 1) / 2; // 0 to 1
        
        let r, g, b;
        if (t < 0.33) {
          // Purple to Amber
          const mix = t / 0.33;
          r = Math.floor(167 + (251 - 167) * mix);
          g = Math.floor(139 + (191 - 139) * mix);
          b = Math.floor(250 + (36 - 250) * mix);
        } else if (t < 0.66) {
          // Amber to White
          const mix = (t - 0.33) / 0.33;
          r = Math.floor(251 + (255 - 251) * mix);
          g = Math.floor(191 + (255 - 191) * mix);
          b = Math.floor(36 + (255 - 36) * mix);
        } else {
          // White to Purple
          const mix = (t - 0.66) / 0.34;
          r = Math.floor(255 + (167 - 255) * mix);
          g = Math.floor(255 + (139 - 255) * mix);
          b = Math.floor(255 + (250 - 255) * mix);
        }
        
        return { r, g, b };
      }
      
      draw(ctx) {
        const { r, g, b } = this.getColor();
        
        // Create organic shape path
        ctx.beginPath();
        
        const getPoint = (index) => {
          const point = this.points[index];
          const morph = Math.sin(this.morphPhase * point.morphSpeed + point.morphOffset) * 0.25 + 1;
          const radius = this.baseRadius * point.radiusOffset * morph;
          return {
            x: this.x + Math.cos(point.angle) * radius,
            y: this.y + Math.sin(point.angle) * radius,
          };
        };
        
        // Draw smooth organic shape with bezier curves
        const firstPoint = getPoint(0);
        ctx.moveTo(firstPoint.x, firstPoint.y);
        
        for (let i = 0; i < this.points.length; i++) {
          const current = getPoint(i);
          const next = getPoint((i + 1) % this.points.length);
          
          // Smooth bezier curve
          const cpx = current.x + (next.x - current.x) * 0.5;
          const cpy = current.y + (next.y - current.y) * 0.5;
          ctx.quadraticCurveTo(current.x, current.y, cpx, cpy);
        }
        
        ctx.closePath();
        
        // Multi-layer glow effect for premium look (reduced opacity for subtlety)
        // Outer glow
        const outerGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.baseRadius * 2
        );
        outerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.06)`);
        outerGradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.03)`);
        outerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = outerGradient;
        ctx.fill();
        
        // Inner glow
        ctx.beginPath();
        for (let i = 0; i < this.points.length; i++) {
          const current = getPoint(i);
          const next = getPoint((i + 1) % this.points.length);
          if (i === 0) ctx.moveTo(current.x, current.y);
          const cpx = current.x + (next.x - current.x) * 0.5;
          const cpy = current.y + (next.y - current.y) * 0.5;
          ctx.quadraticCurveTo(current.x, current.y, cpx, cpy);
        }
        ctx.closePath();
        
        const innerGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.baseRadius * 1.2
        );
        innerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.12)`);
        innerGradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.06)`);
        innerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = innerGradient;
        ctx.fill();
      }
    }

    // Initialize blobs
    const blobCount = Math.min(Math.floor(canvas.width / 250), 6);
    for (let i = 0; i < blobCount; i++) {
      blobs.push(new Blob());
    }

    const animate = () => {
      // Smooth fade for elegant trails
      ctx.fillStyle = 'rgba(11, 16, 32, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Apply stronger blur for subtle, dreamy effect
      ctx.filter = 'blur(2px)';
      
      // Update and draw blobs
      blobs.forEach(blob => {
        blob.update();
        blob.draw(ctx);
      });
      
      ctx.filter = 'none';
      
      // Premium metaball merging effect (very subtle)
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < blobs.length; i++) {
        for (let j = i + 1; j < blobs.length; j++) {
          const dist = Math.hypot(blobs[j].x - blobs[i].x, blobs[j].y - blobs[i].y);
          const maxDist = blobs[i].baseRadius + blobs[j].baseRadius + 120;
          
          if (dist < maxDist) {
            const strength = Math.pow(1 - (dist / maxDist), 2);
            const midX = (blobs[i].x + blobs[j].x) / 2;
            const midY = (blobs[i].y + blobs[j].y) / 2;
            
            const color1 = blobs[i].getColor();
            const color2 = blobs[j].getColor();
            const avgR = (color1.r + color2.r) / 2;
            const avgG = (color1.g + color2.g) / 2;
            const avgB = (color1.b + color2.b) / 2;
            
            const bridgeGradient = ctx.createRadialGradient(
              midX, midY, 0,
              midX, midY, dist * 0.6
            );
            bridgeGradient.addColorStop(0, `rgba(${avgR}, ${avgG}, ${avgB}, ${strength * 0.08})`);
            bridgeGradient.addColorStop(0.5, `rgba(${avgR}, ${avgG}, ${avgB}, ${strength * 0.04})`);
            bridgeGradient.addColorStop(1, `rgba(${avgR}, ${avgG}, ${avgB}, 0)`);
            
            ctx.fillStyle = bridgeGradient;
            ctx.beginPath();
            ctx.arc(midX, midY, dist * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: 'blur(0.5px)' }}
      aria-hidden="true"
    />
  );
}
