import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId;

    const trailPositions = [];
    const TRAIL_LENGTH = 8;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        // Ensure cursor becomes visible immediately on first move
        if (dotRef.current.style.opacity !== '1') {
          dotRef.current.style.opacity = '1';
          if (ringRef.current) ringRef.current.style.opacity = '1';
          trailsRef.current.forEach(t => { if (t) t.style.opacity = '1'; });
        }
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
      trailPositions.push({ x: mouseX, y: mouseY });
      if (trailPositions.length > TRAIL_LENGTH) {
        trailPositions.shift();
      }
    };

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      trailsRef.current.forEach((trail, i) => {
        if (trail) {
          const pos = trailPositions[i];
          if (pos) {
            trail.style.left = `${pos.x}px`;
            trail.style.top = `${pos.y}px`;
          }
        }
      });

      animationFrameId = requestAnimationFrame(renderCursor);
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');
      if (isInteractive) {
        ringRef.current?.classList.add('hovered');
      } else {
        ringRef.current?.classList.remove('hovered');
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      trailsRef.current.forEach(t => { if (t) t.style.opacity = '0'; });
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
      trailsRef.current.forEach(t => { if (t) t.style.opacity = '1'; });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    renderCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} style={{ opacity: 0 }} />
      <div className="cursor-ring" ref={ringRef} style={{ opacity: 0 }} />
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={el => trailsRef.current[i] = el}
          className="fixed pointer-events-none z-[9996] rounded-full"
          style={{
            width: 4 - i * 0.3,
            height: 4 - i * 0.3,
            background: `rgba(0, 242, 255, ${0.08 - i * 0.008})`,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.25s ease-out',
            opacity: 0,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;