import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import Button from './Button';

const Projects = () => {
  const { t, lang } = useLanguage();
  const [activeProject, setActiveProject] = useState('zenith');

  const projectsData = {
    apex: {
      badge: "Web Application",
      titleKey: "projectsApex",
      descKey: "projectsApexDesc",
      loc: "SaaS App",
      accent: "from-amber-glow",
      languages: ["React", "Node.js", "Express", "PostgreSQL", "JavaScript"],
      stats: {
        height: "Fast TTI (<1.2s)",
        floors: "Secure DB Integration",
        system: "React, Node.js, and Express stack"
      }
    },
    zenith: {
      badge: "Showcase Portfolio",
      titleKey: "projectsZenith",
      descKey: "projectsZenithDesc",
      loc: "3D Showcase",
      accent: "from-cyan-glow",
      languages: ["Next.js", "Three.js", "GSAP", "TailwindCSS", "React"],
      stats: {
        height: "100/100 Lighthouse",
        floors: "Dynamic SEO HUD",
        system: "Next.js, Three.js, and GSAP library"
      }
    },
    lumina: {
      badge: "Mobile Application",
      titleKey: "projectsLumina",
      descKey: "projectsLuminaDesc",
      loc: "iOS & Android",
      accent: "from-violet-400",
      languages: ["React Native", "Expo", "Firebase", "iOS", "Android"],
      stats: {
        height: "60 FPS Animations",
        floors: "Cross-Platform Build",
        system: "React Native, Expo, and Firebase backend"
      }
    },
    python: {
      badge: "Python Scripts",
      titleKey: "projectsPython",
      descKey: "projectsPythonDesc",
      loc: "Automation Hub",
      accent: "from-emerald-400",
      languages: ["Python", "Selenium", "Pandas", "BeautifulSoup", "FastAPI"],
      stats: {
        height: "10x Faster Tasks",
        floors: "Custom Integration",
        system: "BeautifulSoup, Selenium, Pandas, and Cron scheduling"
      }
    }
  };

  const handleProjectSelect = (id) => {
    setActiveProject(id);
    if (window.zoomToBuilding) {
      window.zoomToBuilding(id);
    }
  };

  useEffect(() => {
    if (window.zoomToBuilding) {
      window.zoomToBuilding(activeProject);
    }
  }, []);

  useEffect(() => {
    window.selectProject = (id) => {
      handleProjectSelect(id);
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    };
    return () => {
      window.selectProject = null;
    };
  }, []);

  const pData = projectsData[activeProject];

  return (
    <section id="projects" className="relative py-24 md:py-36 lg:py-44 bg-transparent min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]" />
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#00f2ff_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-20 max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-cyan-glow text-[10px] uppercase tracking-[0.3em] font-mono font-bold block mb-3">
            {t('projectsTitle')}
          </span>
          <h2 
            className="font-bold text-3xl md:text-4xl text-white tracking-wide uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-cyan-glow via-violet-400 to-amber-glow bg-clip-text text-transparent">
              {t('projectsTitle')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 flex flex-col gap-5 justify-center">
            {Object.keys(projectsData).map((key, index) => {
              const proj = projectsData[key];
              const isActive = activeProject === key;
              const numStr = `0${index + 1}`;

              return (
                <motion.button
                  key={key}
                  onClick={() => handleProjectSelect(key)}
                  whileHover={{ scale: 1.02, x: lang === 'ar' ? -4 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ padding: '20px' }}
                  className={`relative w-full text-left ${lang === 'ar' ? 'text-right' : 'text-left'} rounded-xl border backdrop-blur-xl transition-all duration-400 cursor-none overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-glow/[0.06] to-transparent border-cyan-glow/30 shadow-[0_0_30px_rgba(0,242,255,0.06)]' 
                      : 'bg-[#0b1220]/30 border-white/5 hover:border-cyan-glow/15 hover:bg-[#0b1220]/50'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute top-0 bottom-0 w-[3px] bg-gradient-to-b ${proj.accent} shadow-[0_0_10px_${proj.accent}] ${lang === 'ar' ? 'right-0' : 'left-0'}`}
                    />
                  )}

                  <div className="flex items-center justify-between w-full relative">
                    <div className="flex flex-col gap-1">
                      <span className={`text-[9px] uppercase tracking-[0.22em] font-mono font-semibold ${isActive ? 'text-cyan-glow' : 'text-gray-400'}`}>
                        {numStr} // {proj.badge}
                      </span>
                      <span className="text-lg font-bold font-sans text-white tracking-wider uppercase mt-0.5">
                        {t(proj.titleKey)}
                      </span>
                    </div>
                    
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow' 
                        : 'border-white/10 text-gray-500 bg-white/[0.01]'
                    }`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {lang === 'ar' ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
                      </svg>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="hidden lg:block lg:col-span-3 pointer-events-none" />

          <div className="lg:col-span-4 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-gradient-to-br from-[#0c1424]/90 to-[#070b14]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.65),inset_0_0_20px_rgba(0,242,255,0.03)] relative overflow-hidden flex flex-col gap-6"
                style={{ padding: '2rem' }}
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-glow/30 rounded-tl pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-glow/30 rounded-tr pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-glow/30 rounded-bl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-glow/30 rounded-br pointer-events-none" />

                <div className="flex justify-between items-center w-full select-none">
                  <span 
                    className={`border ${pData.accent}/30 text-${pData.accent.replace('from-', '')} text-[9px] rounded font-mono uppercase bg-${pData.accent}/5`}
                    style={{ padding: '4px 10px' }}
                  >
                    {pData.badge}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1.5 font-mono">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-glow">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {pData.loc}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {t(pData.titleKey)}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans font-light">
                    {t(pData.descKey)}
                  </p>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-cyan-glow/20 via-white/10 to-transparent select-none" />

                <div className="flex flex-col font-sans text-xs select-none" style={{ gap: '1.25rem' }}>
                  <div className="grid grid-cols-2" style={{ gap: '1.25rem' }}>
                    <div className="bg-[#070a12]/60 border border-white/10 rounded-lg flex flex-col gap-1.5 relative overflow-hidden" style={{ padding: '1.25rem' }}>
                      <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">PERFORMANCE:</span>
                      <span className="text-base font-bold text-white tracking-wide">{pData.stats.height}</span>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-glow/50 to-transparent" />
                    </div>
                    <div className="bg-[#070a12]/60 border border-white/10 rounded-lg flex flex-col gap-1.5 relative overflow-hidden" style={{ padding: '1.25rem' }}>
                      <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">SCALE:</span>
                      <span className="text-base font-bold text-white tracking-wide">{pData.stats.floors}</span>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-glow/50 to-transparent" />
                    </div>
                  </div>

                  <div className="bg-[#070a12]/60 border border-white/10 rounded-lg flex flex-col gap-2 relative overflow-hidden" style={{ padding: '1.25rem' }}>
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">TECH STACK:</span>
                      <span 
                        className="text-[8px] font-mono text-cyan-glow/90 rounded bg-cyan-glow/15 border border-cyan-glow/30"
                        style={{ padding: '3px 8px' }}
                      >
                        VERIFIED
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white leading-normal tracking-wide">
                      {pData.stats.system}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-glow/30" />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 select-none">
                  <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">LANGUAGES & TECHNOLOGIES:</span>
                  <div className="flex flex-wrap gap-2">
                    {pData.languages.map((langName, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono font-bold rounded bg-cyan-glow/10 border border-cyan-glow/30 text-white shadow-[0_0_15px_rgba(0,242,255,0.05)]"
                        style={{ padding: '6px 12px' }}
                      >
                        {langName}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  as="a"
                  href="https://ra7oox.github.io/my-portfolio/#portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  {t('projectsBtn')}
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;