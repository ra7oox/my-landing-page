import { useEffect, useRef } from 'react';

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x:0, y:0, rx:0, ry:0 });

  useEffect(() => {
    let raf;
    const move = e => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    document.addEventListener('mousemove', move, { passive:true });

    const loop = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.1;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.1;
      if (dot.current) {
        dot.current.style.left = pos.current.x + 'px';
        dot.current.style.top  = pos.current.y + 'px';
      }
      if (ring.current) {
        ring.current.style.left = pos.current.rx + 'px';
        ring.current.style.top  = pos.current.ry + 'px';
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:'fixed', width:7, height:7,
        background:'#00d4ff', borderRadius:'50%',
        transform:'translate(-50%,-50%)',
        zIndex:9999, pointerEvents:'none',
        boxShadow:'0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.4)'
      }}/>
      <div ref={ring} style={{
        position:'fixed', width:34, height:34,
        border:'1px solid rgba(0,212,255,0.45)',
        borderRadius:'50%', transform:'translate(-50%,-50%)',
        zIndex:9998, pointerEvents:'none',
        transition:'width 0.3s, height 0.3s, border-color 0.3s'
      }}/>
    </>
  );
}
