import React, { useEffect, useRef } from 'react';

const Dev3DBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Scroll tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Mouse tracking for 3D tilt
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const widthHalf = window.innerWidth / 2;
      const heightHalf = window.innerHeight / 2;
      targetMouseX = (e.clientX - widthHalf) / 25; // max 25px offset
      targetMouseY = (e.clientY - heightHalf) / 25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Setup 3D points representing a cylindrical code matrix tunnel
    const numPoints = 140;
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
      points.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 250 + 120, // tunnel radius
        z: Math.random() * 2000 - 1000,    // depth range from -1000 to 1000
        color: Math.random() > 0.4 ? '#00f2ff' : '#ffaa00',
        char: Math.random() > 0.4 
          ? String.fromCharCode(48 + Math.floor(Math.random() * 2)) // '0' or '1'
          : String.fromCharCode(65 + Math.floor(Math.random() * 26)), // 'A'-'Z'
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animId;
    const fov = 350; // Perspective Field of View
    
    const animate = () => {
      ctx.fillStyle = '#070a12';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation (like a spring)
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      // Map scroll to camera depth and rotation
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollPercent = scrollY / maxScroll;

      // Scroll controls camera Z translation and Z rotation
      const cameraZ = scrollPercent * 2500;
      const cameraRotation = scrollPercent * Math.PI * 1.5;

      // Map 3D points to 2D projected space
      const projected = points.map(p => {
        let relativeZ = p.z - cameraZ;
        
        // Loop depth coordinate to make the tunnel infinite
        while (relativeZ < -500) relativeZ += 2000;
        while (relativeZ > 1500) relativeZ -= 2000;

        // Apply camera rotation around the Z axis
        const rotatedAngle = p.angle + cameraRotation;
        
        // Apply mouse offsets based on depth for 3D parallax layers
        const depthFactor = (1500 - relativeZ) / 2000; // further points move less
        const relativeX = Math.cos(rotatedAngle) * p.radius - currentMouseX * depthFactor * 1.5;
        const relativeY = Math.sin(rotatedAngle) * p.radius - currentMouseY * depthFactor * 1.5;

        // 3D Perspective Projection
        const scale = fov / (fov + relativeZ);
        const projX = (relativeX * scale) + width / 2;
        const projY = (relativeY * scale) + height / 2;
        
        return {
          x: projX,
          y: projY,
          scale,
          z: relativeZ,
          color: p.color,
          char: p.char
        };
      }).sort((a, b) => b.z - a.z); // Painters algorithm (draw furthest first)

      // Draw glowing wireframe network connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z > 800 || p1.scale < 0.1) continue;
        
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.scale < 0.1) continue;
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Connect if close in 2D projection and close in 3D depth Z
          if (dist < 140 && Math.abs(p1.z - p2.z) < 220) {
            const opacity = (1 - dist / 140) * p1.scale * 0.12;
            ctx.strokeStyle = p1.color === '#00f2ff' 
              ? `rgba(0, 242, 255, ${opacity})` 
              : `rgba(255, 170, 0, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw code characters and glowing nodes
      projected.forEach(p => {
        if (p.z < 0) return; // Behind camera
        
        const opacity = Math.min(1, p.scale * 0.85);
        
        // Character Text
        ctx.fillStyle = p.color === '#00f2ff' 
          ? `rgba(0, 242, 255, ${opacity})` 
          : `rgba(255, 170, 0, ${opacity})`;
        ctx.font = `bold ${Math.max(8, Math.floor(16 * p.scale))}px monospace`;
        ctx.fillText(p.char, p.x, p.y);

        // Core glowing node
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y - 4, Math.max(1.5, 3 * p.scale), 0, Math.PI * 2);
        ctx.fill();
        
        // Outer halo
        ctx.fillStyle = p.color === '#00f2ff' 
          ? `rgba(0, 242, 255, ${opacity * 0.3})` 
          : `rgba(255, 170, 0, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y - 4, Math.max(3, 7 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0" 
      style={{ background: '#070a12' }}
    />
  );
};

export default Dev3DBackground;
