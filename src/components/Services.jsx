import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { useTilt } from '../hooks/useTilt';

const services = [
  { icon: '⬡', title: 'Engineering', desc: 'Innovative structural solutions with precision.' },
  { icon: '⬢', title: 'Construction', desc: 'Delivering projects with quality and speed.' },
  { icon: '⬡', title: 'Project Management', desc: 'Coordinating every detail for flawless execution.' },
  { icon: '⬢', title: 'Innovation', desc: 'Integrating cutting-edge technology into every build.' },
];

const ServiceCard = ({ svc, i }) => {
  const tilt = useTilt(8);
  return (
    <div 
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ position:'relative', transformStyle:'preserve-3d' }}
      className={`reveal-left group bg-navy-900/80 backdrop-blur-md border border-cyan-glow/80 p-6 flex items-center gap-6 hover:bg-cyan-glow/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.2),inset_0_0_10px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5),inset_0_0_20px_rgba(0,212,255,0.3)] cursor-none ${i === services.length - 1 ? 'rounded-b-2xl' : ''}`}
    >
      <div className="tilt-shine" style={{
        position:'absolute', inset:0, zIndex:1, pointerEvents:'none'
      }}/>
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-md border border-cyan-glow/50 text-cyan-glow text-2xl group-hover:scale-110 group-hover:border-cyan-glow transition-all duration-300">
        {svc.icon}
      </div>
      <div className="flex flex-col">
        <h4 className="font-sans font-semibold text-white text-lg tracking-wide group-hover:text-cyan-glow transition-colors duration-300">{svc.title}</h4>
        <p className="font-sans text-gray-300 text-sm mt-1 leading-tight">{svc.desc}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const revealRef = useReveal();
  
  return (
    <section 
      ref={revealRef}
      id="services" 
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(7,18,32,0.97)'
      }}
      className="relative py-32 min-h-screen flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-20">
        {/* Left Column: Vertical Modular Tech Stack */}
        <div className="flex flex-col gap-3 max-w-md">
          <div 
            className="reveal-left bg-navy-900/80 backdrop-blur-md border border-cyan-glow rounded-t-2xl p-5 shadow-[0_0_20px_rgba(0,212,255,0.3),inset_0_0_15px_rgba(0,212,255,0.1)]"
          >
            <h2 className="font-sans font-bold text-2xl text-white tracking-wide">
              Our Services
            </h2>
          </div>
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
