import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const Hero = () => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  useEffect(() => {
    // Simulate high-tech preloader loading calibration
    const interval = setInterval(() => {
      setLoadPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // fade out loader
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      {/* Cinematic High-Tech Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#070a12] flex flex-col items-center justify-center font-mono text-cyan-glow"
          >
            <div className="max-w-md w-full px-6 flex flex-col gap-4 text-center">
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400"
              >
                [ CALIBRATING BIM GRID SYSTEM ]
              </motion.div>
              <div className="text-3xl md:text-5xl font-bold tracking-widest text-white font-sans uppercase">
                ARCOVA
              </div>
              <div className="h-[2px] w-full bg-navy-800 roundedoverflow-hidden relative border border-cyan-glow/10">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadPercent}%` }}
                  className="h-full bg-cyan-glow shadow-[0_0_15px_#00f2ff]"
                />
              </div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-glow">
                SYSTEM ASSETS LOADED: {Math.min(100, loadPercent)}%
              </div>
              <div className="text-[10px] text-gray-500 font-mono tracking-widest">
                SHADERS INITIALIZED // WEBGL TWIN CALIBRATING
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent" 
        id="hero"
      >
        {/* Soft overlay gradient to blend with the canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070a12]/90 z-10 pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          className="relative z-20 text-center px-6 flex flex-col items-center max-w-4xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-display font-black text-5xl md:text-8xl text-white tracking-widest uppercase drop-shadow-[0_0_35px_rgba(0,242,255,0.4)]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {t('heroTitle')}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 font-sans text-xs md:text-sm text-gray-400 tracking-[0.2em] uppercase font-light max-w-2xl leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>
          
          {/* Singular Conversion Focus Call to Action */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-12 relative p-[2px] rounded-md bg-gradient-to-r from-cyan-glow to-amber-glow shadow-[0_0_35px_rgba(0,242,255,0.2),0_0_35px_rgba(255,170,0,0.2)] hover:shadow-[0_0_55px_rgba(0,242,255,0.5),0_0_55px_rgba(255,170,0,0.5)] transition-all duration-300 cursor-none"
          >
            <a 
              href="#contact" 
              className="block px-12 py-4 rounded-md bg-navy-900/95 hover:bg-navy-900/70 backdrop-blur-md text-white font-sans font-bold tracking-widest text-xs uppercase cursor-none transition-colors duration-300 select-none"
            >
              {t('heroCTA1')}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
