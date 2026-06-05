import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Hero = () => {
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
      {/* High Fidelity 3D Render Background - Interactive 3D Parallax */}
      <motion.div 
        style={{ 
          x: springX, 
          y: springY,
          backgroundImage: 'url(./hero-bg.png)',
          scale: 1.15
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070a12] z-10" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 flex flex-col items-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="font-display font-black text-5xl md:text-8xl text-white tracking-widest uppercase drop-shadow-[0_0_35px_rgba(0,242,255,0.45)]"
        >
          BUILDING THE FUTURE
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="mt-6 font-sans text-sm md:text-base text-gray-400 tracking-[0.3em] uppercase font-light"
        >
          Engineering · Construction · Innovation
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 relative p-[2px] rounded-full bg-gradient-to-r from-cyan-glow to-amber-glow shadow-[0_0_30px_rgba(0,242,255,0.3),0_0_30px_rgba(255,170,0,0.3)] hover:shadow-[0_0_50px_rgba(0,242,255,0.65),0_0_50px_rgba(255,170,0,0.65)] transition-all duration-300 cursor-none"
        >
          <button className="px-10 py-4 rounded-full bg-navy-900/90 hover:bg-navy-900/70 backdrop-blur-md text-white font-sans font-bold tracking-widest text-xs uppercase cursor-none transition-colors duration-300">
            START YOUR PROJECT
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
