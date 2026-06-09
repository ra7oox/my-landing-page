import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import Button from './Button';

const Projects = () => {
  const { t, lang } = useLanguage();
  const [activeProject, setActiveProject] = useState('zenith');
  const [activePlanIndex, setActivePlanIndex] = useState(0);

  const projectsData = {
    apex: {
      badge: "Web Application",
      titleKey: "projectsApex",
      loc: "SaaS App",
      accent: "from-amber-glow",
      plans: [
        { 
          nameKey: "planApexSimple", 
          descKey: "planApexSimpleDesc", 
          price: "$150",
          languages: ["React", "TailwindCSS", "Chart.js"],
          stats: {
            perf: "Fast Load Time",
            scale: "Single Dashboard",
            tech: "React & Chart.js UI"
          }
        },
        { 
          nameKey: "planApexInter", 
          descKey: "planApexInterDesc", 
          price: "$350",
          languages: ["React", "Node.js", "Express", "PostgreSQL", "TailwindCSS"],
          stats: {
            perf: "Fast TTI (<1.2s)",
            scale: "Secure DB Integration",
            tech: "Full-stack Node/Postgres"
          }
        },
        { 
          nameKey: "planApex3D", 
          descKey: "planApex3DDesc", 
          price: "$600",
          languages: ["Next.js", "Node.js", "Stripe", "PostgreSQL", "TailwindCSS", "TypeScript"],
          stats: {
            perf: "Ultra Secure Auth",
            scale: "Multi-tenant / Teams",
            tech: "Next.js, API, Stripe pay"
          }
        }
      ]
    },
    zenith: {
      badge: "Showcase Portfolio",
      titleKey: "projectsZenith",
      loc: "3D Showcase",
      accent: "from-cyan-glow",
      plans: [
        { 
          nameKey: "planZenithSimple", 
          descKey: "planZenithSimpleDesc", 
          price: "$50",
          languages: ["HTML", "TailwindCSS", "React"],
          stats: {
            perf: "Fast TTI (<1.0s)",
            scale: "1-3 Pages Layout",
            tech: "React static build"
          }
        },
        { 
          nameKey: "planZenithInter", 
          descKey: "planZenithInterDesc", 
          price: "$90",
          languages: ["React", "Framer Motion", "TailwindCSS"],
          stats: {
            perf: "60 FPS Animations",
            scale: "Dynamic Routing",
            tech: "React & Framer Motion"
          }
        },
        { 
          nameKey: "planZenith3D", 
          descKey: "planZenith3DDesc", 
          price: "$130",
          languages: ["Next.js", "Three.js", "GSAP", "TailwindCSS", "React"],
          stats: {
            perf: "100/100 Lighthouse",
            scale: "Dynamic SEO HUD",
            tech: "Next.js, Three.js & GSAP"
          }
        }
      ]
    },
    lumina: {
      badge: "Mobile Application",
      titleKey: "projectsLumina",
      loc: "iOS & Android",
      accent: "from-violet-glow",
      plans: [
        { 
          nameKey: "planLuminaSimple", 
          descKey: "planLuminaSimpleDesc", 
          price: "$200",
          languages: ["React Native", "Expo", "TailwindCSS"],
          stats: {
            perf: "Responsive Layout",
            scale: "Single Platform App",
            tech: "React Native & Expo"
          }
        },
        { 
          nameKey: "planLuminaInter", 
          descKey: "planLuminaInterDesc", 
          price: "$450",
          languages: ["React Native", "Expo", "Firebase", "iOS", "Android"],
          stats: {
            perf: "60 FPS Animations",
            scale: "Cross-Platform Build",
            tech: "React Native & Firebase DB"
          }
        },
        { 
          nameKey: "planLumina3D", 
          descKey: "planLumina3DDesc", 
          price: "$800",
          languages: ["React Native", "Expo", "Firebase", "Google Maps API", "Node.js"],
          stats: {
            perf: "Native Performance",
            scale: "Real-time Tracking",
            tech: "Maps, Live Sync & APIs"
          }
        }
      ]
    },
    python: {
      badge: "Python Scripts",
      titleKey: "projectsPython",
      loc: "Automation Hub",
      accent: "from-emerald-400",
      plans: [
        { 
          nameKey: "planPythonSimple", 
          descKey: "planPythonSimpleDesc", 
          price: "$40",
          languages: ["Python", "BeautifulSoup"],
          stats: {
            perf: "Fast Script Exec",
            scale: "Single Source Scraper",
            tech: "BeautifulSoup parser"
          }
        },
        { 
          nameKey: "planPythonInter", 
          descKey: "planPythonInterDesc", 
          price: "$100",
          languages: ["Python", "Selenium", "FastAPI"],
          stats: {
            perf: "10x Faster Tasks",
            scale: "Custom API Integration",
            tech: "Selenium & FastAPI"
          }
        },
        { 
          nameKey: "planPython3D", 
          descKey: "planPython3DDesc", 
          price: "$220",
          languages: ["Python", "Selenium", "Pandas", "PostgreSQL", "Docker"],
          stats: {
            perf: "Fully Automated Flow",
            scale: "Multi-source Pipelines",
            tech: "Pandas & Postgres DB"
          }
        }
      ]
    }
  };

  const handleProjectSelect = (id) => {
    setActiveProject(id);
    setActivePlanIndex(0);
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
  const activePlan = pData.plans[activePlanIndex];

  const getWhatsAppLink = () => {
    const serviceName = t(pData.titleKey);
    const planName = t(activePlan.nameKey);
    const planPrice = activePlan.price;
    
    let text = "";
    if (lang === 'ar') {
      text = `مرحباً، أود حجز الخدمة: *${serviceName}* مع الخطة: *${planName}* (${planPrice}).`;
    } else {
      text = `Hello, I would like to book the service: *${serviceName}* with the plan: *${planName}* (${planPrice}).`;
    }
    
    return `https://wa.me/212632326544?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="projects" className="relative py-24 md:py-36 lg:py-44 bg-transparent min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-navy-900 via-transparent to-navy-900" />
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#00f2ff_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="container px-6 mx-auto relative z-20 max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="story-step mb-3 justify-center">
            04 / 06
          </span>
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
          
          <div className="lg:col-span-5 flex flex-row overflow-x-auto pb-4 lg:pb-0 lg:flex-col gap-4 lg:gap-5 justify-start lg:justify-center snap-x no-scrollbar">
            {Object.keys(projectsData).map((key, index) => {
              const proj = projectsData[key];
              const isActive = activeProject === key;
              const numStr = `0${index + 1}`;

              return (
                <motion.button
                  key={key}
                  onClick={() => handleProjectSelect(key)}
                  whileHover={window.innerWidth > 768 ? { scale: 1.02, x: lang === 'ar' ? -4 : 4 } : { scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ padding: '16px 20px' }}
                  className={`relative flex-shrink-0 w-[260px] lg:w-full text-left ${lang === 'ar' ? 'text-right' : 'text-left'} rounded-xl border backdrop-blur-xl transition-all duration-400 cursor-none overflow-hidden snap-center ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-glow/[0.06] to-transparent border-cyan-glow/30 shadow-[0_0_30px_rgba(0,242,255,0.06)]' 
                      : 'bg-navy-800/30 border-navy-700/30 dark:border-white/5 hover:border-cyan-glow/15 hover:bg-navy-800/50'
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
                      <span className={`text-[9px] uppercase tracking-[0.22em] font-mono font-semibold ${isActive ? 'text-cyan-glow' : 'text-slate-500 dark:text-gray-400'}`}>
                        {numStr} // {proj.badge}
                      </span>
                      <span className="text-lg font-bold font-sans text-slate-900 dark:text-white tracking-wider uppercase mt-0.5">
                        {t(proj.titleKey)}
                      </span>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow' 
                        : 'border-navy-700/30 dark:border-white/10 text-slate-500 dark:text-gray-500 bg-navy-800/20 dark:bg-white/[0.01]'
                    }`}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                className="w-full bg-gradient-to-br from-navy-800/90 to-navy-900/95 backdrop-blur-xl border border-navy-700/50 dark:border-white/10 rounded-xl shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.65),inset_0_0_20px_rgba(0,242,255,0.03)] relative overflow-hidden flex flex-col !gap-5 !p-4 sm:!p-8"
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-glow/30 rounded-tl pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-glow/30 rounded-tr pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-glow/30 rounded-bl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-glow/30 rounded-br pointer-events-none" />

                <div className="flex justify-between items-center w-full select-none">
                  <span 
                    className={`border ${pData.accent}/30 text-${pData.accent.replace('from-', '')} text-[9px] rounded font-mono uppercase bg-${pData.accent}/5 !py-1 !px-2.5`}
                  >
                    {pData.badge}
                  </span>
                  <span className="text-slate-500 dark:text-gray-400 text-xs flex items-center gap-1.5 font-mono">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-glow">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {pData.loc}
                  </span>
                </div>

                {/* Plan Selection Tabs at the top of the card details */}
                <div className="flex border-b border-navy-700/30 dark:border-white/10 pb-4 justify-between select-none gap-2">
                  {pData.plans.map((plan, idx) => {
                    const isPlanActive = activePlanIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActivePlanIndex(idx)}
                        className={`flex-1 flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${
                          isPlanActive
                            ? 'border-cyan-glow/45 bg-cyan-glow/10 text-cyan-glow shadow-[0_0_15px_rgba(0,242,255,0.08)]'
                            : 'border-navy-700/20 dark:border-white/5 bg-navy-800/20 dark:bg-white/[0.01] text-slate-500 dark:text-gray-400 hover:border-cyan-glow/20'
                        } cursor-none !py-1.5 !px-1`}
                      >
                        <span className="text-[9px] font-bold tracking-wide uppercase text-center leading-tight">{t(plan.nameKey)}</span>
                        <span className="text-xs font-mono font-extrabold mt-1">{plan.price}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {t(pData.titleKey)}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed font-sans font-light">
                    {t(activePlan.descKey)}
                  </p>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-cyan-glow/20 via-navy-700/30 dark:via-white/10 to-transparent select-none" />

                <div className="flex flex-col font-sans text-xs select-none !gap-4 sm:!gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 !gap-4 sm:!gap-5">
                    <div className="bg-navy-800/60 border border-navy-700/50 dark:border-white/10 rounded-lg flex flex-col gap-1.5 relative overflow-hidden !p-4 sm:!p-5">
                      <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">PERFORMANCE:</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white tracking-wide">{activePlan.stats.perf}</span>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-glow/50 to-transparent" />
                    </div>
                    <div className="bg-navy-800/60 border border-navy-750/50 dark:border-white/10 rounded-lg flex flex-col gap-1.5 relative overflow-hidden !p-4 sm:!p-5">
                      <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">SCALE:</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white tracking-wide">{activePlan.stats.scale}</span>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-glow/50 to-transparent" />
                    </div>
                  </div>

                  <div className="bg-navy-800/60 border border-navy-700/50 dark:border-white/10 rounded-lg flex flex-col gap-2 relative overflow-hidden !p-4 sm:!p-5">
                    <div className="flex items-center justify-between border-b border-navy-700/30 dark:border-white/10 pb-1.5">
                      <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">TECH STACK:</span>
                      <span 
                        className="text-[8px] font-mono text-cyan-glow/90 rounded bg-cyan-glow/15 border border-cyan-glow/30 !py-0.5 !px-2"
                      >
                        VERIFIED
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-normal tracking-wide">
                      {activePlan.stats.tech}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-glow/30" />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 select-none">
                  <span className="text-[9px] font-mono text-cyan-glow/70 tracking-wider font-semibold">LANGUAGES & TECHNOLOGIES:</span>
                  <div className="flex flex-wrap gap-2">
                    {activePlan.languages.map((langName, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono font-bold rounded bg-cyan-glow/10 border border-cyan-glow/30 text-slate-900 dark:text-white shadow-[0_0_15px_rgba(0,242,255,0.05)] !py-1.5 !px-3"
                      >
                        {langName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <Button
                    as="a"
                    href="https://ra7oox.github.io/my-portfolio/#portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="flex-1 !min-w-0"
                  >
                    {t('projectsBtn')}
                  </Button>
                  <Button
                    as="a"
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className="flex-1 !min-w-0"
                  >
                    {t('projectsBook')}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;