import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const Services = () => {
  const { t, lang } = useLanguage();

  const services = [
    { 
      idx: 1, // Zenith building
      projectKey: 'zenith',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2Z"/>
          <path d="M20 6v12a2 2 0 0 1-2 2"/> 
          <rect x="8" y="10" width="4" height="4" rx="1"/>
        </svg>
      ), 
      titleKey: 'servicesEng', 
      descKey: 'servicesEngDesc',
      accent: 'from-cyan-glow/20 to-transparent',
      gridClass: 'lg:col-span-6 md:col-span-6 col-span-12',
      languages: 'Next.js • Three.js • GSAP • React',
    },
    { 
      idx: 1, // Zenith building
      projectKey: 'zenith',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      ), 
      titleKey: 'servicesConst', 
      descKey: 'servicesConstDesc',
      accent: 'from-amber-glow/20 to-transparent',
      gridClass: 'lg:col-span-6 md:col-span-6 col-span-12',
      languages: 'HTML • Tailwind • SEO • JavaScript',
    },
    { 
      idx: 0, // Apex Hub building
      projectKey: 'apex',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ), 
      titleKey: 'servicesMgmt', 
      descKey: 'servicesMgmtDesc',
      accent: 'from-violet-500/20 to-transparent',
      gridClass: 'lg:col-span-4 md:col-span-6 col-span-12',
      languages: 'React • Node.js • Express • PostgreSQL',
    },
    { 
      idx: 2, // Lumina Dome building
      projectKey: 'lumina',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/>
        </svg>
      ), 
      titleKey: 'servicesInnov', 
      descKey: 'servicesInnovDesc',
      accent: 'from-cyan-glow/20 via-violet-500/10 to-transparent',
      gridClass: 'lg:col-span-4 md:col-span-6 col-span-12',
      languages: 'React Native • Expo • iOS • Android',
    },
    { 
      idx: 3, // Python / Data Flow
      projectKey: 'python',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ), 
      titleKey: 'servicesPython', 
      descKey: 'servicesPythonDesc',
      accent: 'from-emerald-500/20 to-transparent',
      gridClass: 'lg:col-span-4 md:col-span-12 col-span-12',
      languages: 'Python • BeautifulSoup • Selenium • APIs',
    },
  ];

  const handleCardHover = (buildingIndex) => {
    if (window.highlightBuilding) {
      window.highlightBuilding(buildingIndex);
    }
  };

  const handleCardClick = (projectKey) => {
    if (window.selectProject) {
      window.selectProject(projectKey);
    }
  };

  return (
    <section 
      id="services" 
      className="relative py-24 md:py-36 lg:py-44 bg-transparent min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-navy-900 via-transparent to-navy-900" />
      <div className={`absolute inset-0 z-10 pointer-events-none ${lang === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-navy-900/95 via-navy-900/30 to-transparent`} />
      
      <div className="container mx-auto px-6 relative z-20 max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`mb-16 max-w-4xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <span className="story-step mb-3">
            03 / 05
          </span>
          <span className="text-cyan-glow text-[10px] uppercase tracking-[0.3em] font-mono font-bold block mb-3">
            {t('servicesTitle')}
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-wide uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {lang === 'ar' ? 'الخدمات التي أقدمها' : 'What I Build'}
          </h2>
          <div className={`h-[2px] w-16 bg-cyan-glow mt-4 mb-6 ${lang === 'ar' ? 'mr-0 ml-auto' : 'ml-0'}`} />
          <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-sans font-light">
            {t('servicesSubtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 w-full !gap-5">
          {services.map((svc, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.01 }}
              onMouseEnter={() => handleCardHover(svc.idx)}
              onMouseLeave={() => handleCardHover(-1)}
              onClick={() => handleCardClick(svc.projectKey)}
              className={`group relative bg-navy-800/70 backdrop-blur-md border border-navy-700/30 dark:border-white/5 flex items-start rounded-xl hover:bg-${svc.accent} duration-400 shadow-[0_0_30px_rgba(0,0,0,0.05),0_0_30px_rgba(0,0,0,0.45)_dark] hover:border-cyan-glow/25 hover:shadow-[0_0_40px_rgba(0,242,255,0.1)] cursor-pointer !p-5 sm:!p-7 !gap-5 ${svc.gridClass}`}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${svc.accent})` }} />
              
              <div className="relative z-10 w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl border border-cyan-glow/20 bg-navy-700/80 text-cyan-glow group-hover:scale-110 group-hover:border-cyan-glow/40 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,255,0.05)]">
                {svc.icon}
              </div>
              
              <div className="relative z-10 flex flex-col gap-2 w-full">
                <h4 className="font-sans font-bold text-slate-900 dark:text-white text-base tracking-wide group-hover:text-cyan-glow transition-colors duration-300 uppercase">
                  {t(svc.titleKey)}
                </h4>
                <p className="font-sans text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                  {t(svc.descKey)}
                </p>
                <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span 
                    className="text-[8px] font-mono text-cyan-glow/60 tracking-widest uppercase border border-cyan-glow/10 rounded !py-0.5 !px-2"
                  >
                    {svc.languages}
                  </span>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-cyan-glow">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Services;