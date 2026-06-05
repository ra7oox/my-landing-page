import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTilt } from '../hooks/useTilt';

const About = () => {
  const statsRef = useRef(null);
  const revealRef = useReveal();
  const tiltPanel = useTilt(5);
  const tiltStat1 = useTilt(8);
  const tiltStat2 = useTilt(8);
  const tiltStat3 = useTilt(8);

  const [counted, setCounted] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, years: 0, satisfaction: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !counted) {
        setCounted(true);
        animateValue('projects', 250);
        animateValue('years', 15);
        animateValue('satisfaction', 98);
      }
    }, { threshold: 0.1 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const animateValue = (key, target) => {
    let current = 0;
    const increment = target / 40;
    const updateCount = () => {
      current += increment;
      if (current < target) {
        setCounts(prev => ({ ...prev, [key]: Math.ceil(current) }));
        requestAnimationFrame(updateCount);
      } else {
        setCounts(prev => ({ ...prev, [key]: target }));
      }
    };
    updateCount();
  };

  return (
    <section 
      ref={revealRef}
      id="about" 
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(7,18,32,0.96))'
      }}
      className="min-h-screen py-32 flex items-center justify-center overflow-hidden"
    >
      <div className="container relative z-20 px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Glassmorphic Panel on the Left (Futuristic B2B style) */}
          <div 
            ref={tiltPanel.ref}
            onMouseMove={tiltPanel.onMouseMove}
            onMouseLeave={tiltPanel.onMouseLeave}
            style={{ position:'relative', transformStyle:'preserve-3d' }}
            className="reveal-left bg-navy-900/75 backdrop-blur-md border border-cyan-glow/30 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.15),inset_0_0_20px_rgba(0,212,255,0.05)] max-w-xl"
          >
            <div className="tilt-shine" style={{
              position:'absolute', inset:0, zIndex:1, pointerEvents:'none'
            }}/>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white tracking-wide uppercase">
              About Us
            </h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-glow to-transparent mt-4 mb-6" />
            <p className="text-gray-300 font-sans text-lg leading-relaxed">
              We are building the future with innovation, precision, and trust. Our engineering excellence combines advanced 3D fabrication, high-fidelity project simulation, and robotic construction techniques to deliver landmarks of tomorrow.
            </p>
          </div>
          
          {/* Stats on the Right, rendered as sleek glowing tech indicators */}
          <div 
            className="flex flex-col sm:flex-row lg:flex-col gap-6 justify-center lg:items-end w-full" 
            ref={statsRef}
          >
            <div 
              ref={tiltStat1.ref}
              onMouseMove={tiltStat1.onMouseMove}
              onMouseLeave={tiltStat1.onMouseLeave}
              style={{ position:'relative', transformStyle:'preserve-3d', background: 'rgba(4,10,20,0.98)' }}
              className="reveal-right stat-item backdrop-blur-md border border-cyan-glow/20 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[200px] hover:border-cyan-glow/50 transition-all duration-300"
            >
              <div className="tilt-shine" style={{
                position:'absolute', inset:0, zIndex:1, pointerEvents:'none'
              }}/>
              <div className="stat-number text-cyan-glow text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
                {counts.projects}+
              </div>
              <div className="stat-label text-xs uppercase tracking-widest text-gray-400 mt-2">Projects Completed</div>
            </div>
            
            <div 
              ref={tiltStat2.ref}
              onMouseMove={tiltStat2.onMouseMove}
              onMouseLeave={tiltStat2.onMouseLeave}
              style={{ position:'relative', transformStyle:'preserve-3d', background: 'rgba(4,10,20,0.98)' }}
              className="reveal-right stat-item backdrop-blur-md border border-amber-glow/20 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[200px] hover:border-amber-glow/50 transition-all duration-300"
            >
              <div className="tilt-shine" style={{
                position:'absolute', inset:0, zIndex:1, pointerEvents:'none'
              }}/>
              <div className="stat-number text-amber-glow text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(255,170,0,0.6)]">
                {counts.years}+
              </div>
              <div className="stat-label text-xs uppercase tracking-widest text-gray-400 mt-2">Years Experience</div>
            </div>
            
            <div 
              ref={tiltStat3.ref}
              onMouseMove={tiltStat3.onMouseMove}
              onMouseLeave={tiltStat3.onMouseLeave}
              style={{ position:'relative', transformStyle:'preserve-3d', background: 'rgba(4,10,20,0.98)' }}
              className="reveal-right stat-item backdrop-blur-md border border-cyan-glow/20 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[200px] hover:border-cyan-glow/50 transition-all duration-300"
            >
              <div className="tilt-shine" style={{
                position:'absolute', inset:0, zIndex:1, pointerEvents:'none'
              }}/>
              <div className="stat-number text-cyan-glow text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
                {counts.satisfaction}%
              </div>
              <div className="stat-label text-xs uppercase tracking-widest text-gray-400 mt-2">Client Satisfaction</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
