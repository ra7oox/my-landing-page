import { useRef } from 'react';

export function useTilt(maxTilt = 10) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `
      perspective(800px)
      rotateY(${x * maxTilt}deg)
      rotateX(${-y * maxTilt}deg)
      translateZ(6px)
    `;
    el.style.transition = 'transform 0.08s linear';
    // Shine effect
    const shine = el.querySelector('.tilt-shine');
    if (shine) {
      shine.style.background = `radial-gradient(
        circle at ${(x+0.5)*100}% ${(y+0.5)*100}%,
        rgba(0,212,255,0.08) 0%, transparent 60%
      )`;
    }
  };

  const onMouseLeave = (e) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  };

  return { ref, onMouseMove, onMouseLeave };
}
