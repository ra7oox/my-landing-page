import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const Projects = () => {
  const { t, lang } = useLanguage();
  const [activeProject, setActiveProject] = useState('zenith'); // default central building

  const projectsData = {
    apex: {
      badge: "Foundation",
      titleKey: "projectsApex",
      descKey: "projectsApexDesc",
      loc: "New York",
      stats: {
        height: "120m",
        floors: "28 Levels",
        system: "Pre-fabricated Steel modular boxes"
      }
    },
    zenith: {
      badge: "Supertall",
      titleKey: "projectsZenith",
      descKey: "projectsZenithDesc",
      loc: "Dubai",
      stats: {
        height: "450m",
        floors: "98 Levels",
        system: "Concrete diagrid perimeter frame"
      }
    },
    lumina: {
      badge: "Pavilion",
      titleKey: "projectsLumina",
      descKey: "projectsLuminaDesc",
      loc: "Tokyo",
      stats: {
        height: "35m",
        floors: "Spherical Grid",
        system: "Interlocking geodesic space truss"
      }
    }
  };

  const handleProjectSelect = (id) => {
    setActiveProject(id);
    if (window.zoomToBuilding) {
      window.zoomToBuilding(id);
    }
  };

  // Trigger default zoom focus state on mount/viewport scroll
  useEffect(() => {
    if (window.zoomToBuilding) {
      window.zoomToBuilding(activeProject);
    }
  }, []);

  const pData = projectsData[activeProject];

  return (
    <section id="projects" className="relative py-32 bg-transparent min-h-screen flex items-center justify-center overflow-hidden">
      {/* Top/bottom dark fades */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]" />

      <div className="container px-6 mx-auto relative z-20">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 
            className="font-sans font-bold text-4xl md:text-5xl text-white tracking-wide uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {t('projectsTitle')}
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-glow to-transparent mx-auto mt-4 mb-6 shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
        </motion.div>

        {/* Dashboard Grid Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch`}>
          
          {/* Project Selection Tabs (HUD Control Panel) - Left 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            {Object.keys(projectsData).map((key) => {
              const proj = projectsData[key];
              const isActive = activeProject === key;

              return (
                <motion.button
                  key={key}
                  onClick={() => handleProjectSelect(key)}
                  whileHover={{ scale: 1.02, x: lang === 'ar' ? -5 : 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left ${lang === 'ar' ? 'text-right' : 'text-left'} p-5 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-none flex justify-between items-center ${
                    isActive 
                      ? 'bg-cyan-glow/10 border-cyan-glow shadow-[0_0_25px_rgba(0,242,255,0.15),inset_0_0_10px_rgba(0,242,255,0.05)]' 
                      : 'bg-navy-800/40 border-cyan-glow/10 hover:border-cyan-glow/40 hover:bg-navy-800/60'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className={`text-[10px] uppercase tracking-widest font-mono ${isActive ? 'text-cyan-glow' : 'text-gray-500'}`}>
                      {proj.badge}
                    </span>
                    <span className="text-xl font-bold font-sans text-white tracking-wide uppercase">
                      {t(proj.titleKey)}
                    </span>
                  </div>
                  
                  {/* Selector Arrow Icon */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'border-cyan-glow text-cyan-glow' : 'border-cyan-glow/20 text-gray-500'
                  }`}>
                    {lang === 'ar' ? '←' : '→'}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Spacer - Middle 2 cols (allows the 3D model in background to be fully seen/focused) */}
          <div className="hidden lg:block lg:col-span-3 pointer-events-none" />

          {/* Project Detailed Specifications Display Card - Right 4 cols */}
          <div className="lg:col-span-4 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-navy-800/80 backdrop-blur-md border border-cyan-glow/30 p-8 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  {/* Card Title & Location */}
                  <div className="flex justify-between items-start">
                    <span className="project-badge inline-block border border-amber-glow text-amber-glow text-[10px] px-3 py-1 rounded-full uppercase tracking-wider bg-amber-glow/10 font-mono">
                      {pData.badge}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1 font-mono">
                      📍 {pData.loc}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white tracking-tight uppercase mt-4 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {t(pData.titleKey)}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                    {t(pData.descKey)}
                  </p>

                  <div className="h-[1px] w-full bg-cyan-glow/10 mb-6" />

                  {/* Structural specifications list */}
                  <div className="flex flex-col gap-4 font-sans text-xs mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-mono">HEIGHT:</span>
                      <span className="text-white font-bold">{pData.stats.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-mono">LEVELS:</span>
                      <span className="text-white font-bold">{pData.stats.floors}</span>
                    </div>
                    <div className="flex justify-between flex-col gap-1">
                      <span className="text-gray-500 font-mono">STRUCTURAL SYSTEM:</span>
                      <span className="text-cyan-glow font-bold leading-tight">{pData.stats.system}</span>
                    </div>
                  </div>
                </div>

                {/* View Project button CTA */}
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-md bg-cyan-glow text-black font-sans font-bold text-xs uppercase tracking-widest text-center cursor-none shadow-[0_0_20px_rgba(0,242,255,0.25)] hover:shadow-[0_0_40px_rgba(0,242,255,0.55)] transition-all duration-300 block select-none"
                >
                  {t('projectsBtn')}
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;
