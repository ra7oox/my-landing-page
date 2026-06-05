import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const About = () => {
  const { t, lang } = useLanguage();
  const statsRef = useRef(null);
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

  // Hover handlers to interact with Three.js central building
  const handleStatHover = (isHovered) => {
    if (window.highlightBuilding) {
      window.highlightBuilding(isHovered ? 1 : -1); // Highlight Zenith Spire
    }
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Dark overlay to ensure text readability */}
      <div className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]`} />
      <div className={`absolute inset-0 z-10 pointer-events-none ${lang === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#070a12]/95 via-[#070a12]/50 to-transparent`} />
      
      <div className="container relative z-20 px-6 mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          
          {/* Glassmorphic Panel on the Left (Futuristic B2B style) */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-navy-800/75 backdrop-blur-md border border-cyan-glow/30 p-8 md:p-12 rounded-xl shadow-[0_0_50px_rgba(0,242,255,0.1),inset_0_0_20px_rgba(0,242,255,0.03)] max-w-xl"
          >
            <h2 
              className="font-sans font-bold text-4xl md:text-5xl text-cyan-glow drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] tracking-widest uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t('aboutTitle')}
            </h2>
            <div className={`h-[2px] w-20 bg-cyan-glow mt-4 mb-6 shadow-[0_0_10px_rgba(0,242,255,0.8)] ${lang === 'ar' ? 'mr-0 ml-auto' : 'ml-0'}`} />
            
            <p className="text-white font-sans text-lg md:text-xl leading-relaxed font-semibold tracking-wide">
              {t('aboutTagline')}
            </p>
            <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mt-4">
              {t('aboutDesc')}
            </p>
          </motion.div>
          
          {/* Stats Badges, rendered as sleek glowing tech indicators */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className={`flex flex-col sm:flex-row lg:flex-col gap-6 justify-center ${lang === 'ar' ? 'lg:items-start' : 'lg:items-end'} w-full`} 
            ref={statsRef}
          >
            {/* Stat Item 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              onMouseEnter={() => handleStatHover(true)}
              onMouseLeave={() => handleStatHover(false)}
              className="stat-item bg-navy-800/75 backdrop-blur-md border border-cyan-glow/20 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[200px] hover:border-cyan-glow/60 transition-all duration-300 cursor-none"
            >
              <div className="stat-number text-cyan-glow text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] font-display">
                {counts.projects}+
              </div>
              <div className="stat-label text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-mono">
                {t('aboutStatProjects')}
              </div>
            </motion.div>
            
            {/* Stat Item 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              onMouseEnter={() => handleStatHover(true)}
              onMouseLeave={() => handleStatHover(false)}
              className="stat-item bg-navy-800/75 backdrop-blur-md border border-amber-glow/20 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[200px] hover:border-amber-glow/60 transition-all duration-300 cursor-none"
            >
              <div className="stat-number text-amber-glow text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(255,170,0,0.5)] font-display">
                {counts.years}+
              </div>
              <div className="stat-label text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-mono">
                {t('aboutStatYears')}
              </div>
            </motion.div>
            
            {/* Stat Item 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              onMouseEnter={() => handleStatHover(true)}
              onMouseLeave={() => handleStatHover(false)}
              className="stat-item bg-navy-800/75 backdrop-blur-md border border-cyan-glow/20 p-6 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center min-w-[200px] hover:border-cyan-glow/60 transition-all duration-300 cursor-none"
            >
              <div className="stat-number text-cyan-glow text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] font-display">
                {counts.satisfaction}%
              </div>
              <div className="stat-label text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-mono">
                {t('aboutStatSatisfaction')}
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
