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
        animateValue('projects', 70);
        animateValue('years', 3);
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

  const handleStatHover = (isHovered) => {
    if (window.highlightBuilding) {
      window.highlightBuilding(isHovered ? 1 : -1);
    }
  };

  const stats = [
    {
      value: counts.projects + '+',
      label: t('aboutStatProjects'),
      color: 'text-cyan-glow',
      borderColor: 'border-cyan-glow/20 hover:border-cyan-glow/60',
      glowColor: 'var(--color-cyan-dim)',
    },
    {
      value: counts.years + '+',
      label: t('aboutStatYears'),
      color: 'text-amber-glow',
      borderColor: 'border-amber-glow/20 hover:border-amber-glow/60',
      glowColor: 'var(--color-amber-dim)',
    },
    {
      value: counts.satisfaction + '%',
      label: t('aboutStatSatisfaction'),
      color: 'text-violet-glow',
      borderColor: 'border-violet-glow/20 hover:border-violet-glow/60',
      glowColor: 'var(--color-violet-dim)',
    },
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 md:py-36 lg:py-44 flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-navy-900 via-transparent to-navy-900" />
      <div className={`absolute inset-0 z-10 pointer-events-none ${lang === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-navy-900/95 via-navy-900/50 to-transparent`} />
      
      <div className="container relative z-20 px-6 mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <span className="story-step mb-4">
              02 / 05
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-glow/20 via-transparent to-amber-glow/20 rounded-2xl blur-xl opacity-50" />
            <div 
              className="relative bg-navy-800/80 backdrop-blur-md border border-cyan-glow/20 rounded-2xl shadow-[0_0_60px_rgba(0,242,255,0.08),inset_0_0_30px_rgba(0,242,255,0.02)] max-w-xl !p-6 sm:!p-10"
            >
              <span className="text-cyan-glow text-[10px] uppercase tracking-[0.3em] font-mono font-bold block mb-4">
                {t('aboutTitle')}
              </span>
              <h2 
                className="font-bold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-wide uppercase leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="bg-gradient-to-r from-cyan-glow to-violet-glow bg-clip-text text-transparent">
                  {t('aboutTagline')}
                </span>
              </h2>
              <p className="text-slate-600 dark:text-gray-400 font-sans text-sm md:text-base leading-relaxed mt-6 font-light">
                {t('aboutDesc')}
              </p>
              <div className="mt-8 flex gap-4 items-center">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-navy-900 bg-gradient-to-br from-cyan-glow/30 to-violet-500/30" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500 tracking-wider uppercase">
                  {lang === 'ar' ? 'فريق موزع عالمياً' : 'Global distributed team'}
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col gap-5 w-full" 
            ref={statsRef}
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, x: lang === 'ar' ? -30 : 30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                onMouseEnter={() => handleStatHover(true)}
                onMouseLeave={() => handleStatHover(false)}
                className={`press-effect group bg-navy-800/70 backdrop-blur-md border ${stat.borderColor} rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-between transition-all duration-300 cursor-none hover:shadow-[0_0_40px_rgba(0,242,255,0.08)] !p-4 sm:!p-6`}
              >
                <div className="flex flex-col">
                  <div className={`${stat.color} text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_${stat.glowColor}] font-display`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-400 mt-1 font-mono">
                    {stat.label}
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 ${stat.borderColor}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={stat.color}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;