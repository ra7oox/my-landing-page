import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        zIndex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent', // CRITICAL: transparent so 3D canvas shows through
      }}
    >
      {/* Subtle overlay gradient ON TOP of the canvas */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 60%,
            rgba(4,13,24,0.2) 0%,
            rgba(4,13,24,0.7) 60%,
            rgba(4,13,24,0.92) 100%)
        `,
        zIndex: 0, pointerEvents: 'none'
      }}/>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 1 }}
        className="text-center px-6 flex flex-col items-center"
      >
        {/* Glowing Badge above title */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px',
          border: '1px solid rgba(0,212,255,0.3)',
          background: 'rgba(0,212,255,0.06)',
          backdropFilter: 'blur(10px)',
          marginBottom: 24, animation: 'fade-up 0.7s 0.3s both'
        }}>
          <span style={{
            width:6, height:6, borderRadius:'50%',
            background:'#00d4ff',
            boxShadow:'0 0 10px #00d4ff',
            animation: 'pulse 2s infinite'
          }}/>
          <span style={{
            fontFamily:'Barlow Condensed', fontSize:11,
            letterSpacing:'0.35em', color:'rgba(255,255,255,0.6)'
          }}>ENGINEERING · CONSTRUCTION · INNOVATION</span>
        </div>

        {/* Title line with clip-wipe animation */}
        <motion.h1 
          variants={itemVariants}
          className="font-display font-bold text-5xl md:text-8xl text-white tracking-tight uppercase drop-shadow-[0_0_35px_rgba(0,212,255,0.45)]"
        >
          <div className="hero-title-line">BUILDING THE FUTURE</div>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="mt-6 font-sans text-lg md:text-xl text-gray-400 tracking-[0.2em] uppercase"
        >
          Engineering · Construction · Innovation
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 relative p-[2px] rounded-full bg-gradient-to-r from-cyan-glow to-amber-glow shadow-[0_0_30px_rgba(0,212,255,0.4),0_0_30px_rgba(255,170,0,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6),0_0_50px_rgba(255,170,0,0.6)] transition-all duration-300 hover:scale-105 cursor-none"
        >
          <button className="px-8 py-3 rounded-full bg-navy-900/90 backdrop-blur-md text-white font-sans font-semibold tracking-wider text-sm uppercase">
            START YOUR PROJECT
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
