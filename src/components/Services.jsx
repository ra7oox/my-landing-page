import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const services = [
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ), 
    title: 'Engineering', 
    desc: 'Innovative structural solutions with precision.' 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" fill="currentColor" fillOpacity="0.1" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ), 
    title: 'Construction', 
    desc: 'Delivering projects with quality and speed.' 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2C12 2 15 7 15 12C15 17 12 22 12 22" />
        <path d="M12 2C12 2 9 7 9 12C9 17 12 22 12 22" />
      </svg>
    ), 
    title: 'Project Management', 
    desc: 'Coordinating every detail for flawless execution.' 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12,2 22,12 12,22 2,12" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ), 
    title: 'Innovation', 
    desc: 'Integrating cutting-edge technology into every build.' 
  },
];

const Services = () => {
  // 3D Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const moveX = (e.clientX - width / 2) / 30; // max 30px offset
      const moveY = (e.clientY - height / 2) / 30;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      id="services" 
      className="relative py-32 bg-navy-900 min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with 3D Mouse Parallax */}
      <motion.div 
        style={{ 
          x: springX, 
          y: springY,
          backgroundImage: 'url(./services-bg.png)',
          scale: 1.15
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-800/60 to-transparent z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Vertical Modular Tech Stack with Framer Motion Stagger */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="flex flex-col gap-3 max-w-md w-full"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="bg-navy-800/80 backdrop-blur-md border border-cyan-glow/30 rounded-t-2xl p-6 shadow-[0_0_20px_rgba(0,242,255,0.15),inset_0_0_15px_rgba(0,242,255,0.05)]"
            >
              <h2 className="font-sans font-bold text-2xl text-white tracking-widest uppercase">
                Our Services
              </h2>
            </motion.div>
            {services.map((svc, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                whileHover={{ x: 12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`group relative bg-navy-800/65 backdrop-blur-md border border-cyan-glow/20 p-6 flex items-center gap-6 hover:bg-cyan-glow/10 duration-300 shadow-[0_0_20px_rgba(0,242,255,0.05),inset_0_0_15px_rgba(0,242,255,0.02)] hover:border-cyan-glow/65 hover:shadow-[0_0_30px_rgba(0,242,255,0.25),inset_0_0_20px_rgba(0,242,255,0.15)] cursor-none ${i === services.length - 1 ? 'rounded-b-2xl' : ''}`}
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full border border-cyan-glow/30 bg-navy-900/80 text-cyan-glow group-hover:scale-110 group-hover:border-cyan-glow transition-all duration-300">
                  {svc.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-sans font-bold text-white text-lg tracking-wide group-hover:text-cyan-glow transition-colors duration-300 uppercase">{svc.title}</h4>
                  <p className="font-sans text-gray-400 text-sm mt-1 leading-tight">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Right Column: Asymmetric space to frame the industrial background */}
          <div className="hidden lg:block" />
          
        </div>
      </div>
    </section>
  );
};

export default Services;
