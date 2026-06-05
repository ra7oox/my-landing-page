import React, { useEffect, useRef } from 'react';

const ParticlesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 0.5 + 0.1);
        this.opacity = Math.random() * 0.2 + 0.1;
      }
      update() {
        this.y += this.speedY;
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      initCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    initCanvas();
    createParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef}></canvas>;
};

export default ParticlesCanvas;
