import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Stagger children
        el.querySelectorAll(
          '.reveal, .reveal-left, .reveal-right'
        ).forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 120);
        });
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  
  return ref;
}
