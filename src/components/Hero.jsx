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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900" 
      id="hero"
    >
      {/* High Fidelity 3D Render Background - Cinematic Zoom */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(./hero-bg.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-800/40 to-transparent z-10" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 flex flex-col items-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="font-display font-bold text-5xl md:text-8xl text-white tracking-tight uppercase drop-shadow-[0_0_35px_rgba(0,212,255,0.45)]"
        >
          BUILDING THE FUTURE
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
