import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { toggleAudio } from '../utils/audio';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleAudioToggle = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    toggleAudio(nextState);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 h-16 bg-navy-900/80 backdrop-blur-md border-b border-cyan-glow/10 flex justify-between items-center px-[5%] z-[100] transition-all duration-300"
    >
      {/* Brand logo */}
      <a href="#" className="nav-logo flex items-center gap-3 font-sans font-bold text-xl tracking-widest text-white uppercase select-none cursor-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-glow drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]">
          <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 8L6 20H18L12 8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        </svg>
        ARCOVA
      </a>

      {/* Nav Links */}
      <div className={`nav-links flex items-center gap-8 ${lang === 'ar' ? 'font-sans text-right' : 'font-sans'}`}>
        <a className="cursor-none" href="#">{t('navHome')}</a>
        <a className="cursor-none" href="#about">{t('navAbout')}</a>
        <a className="cursor-none" href="#services">{t('navServices')}</a>
        <a className="cursor-none" href="#projects">{t('navProjects')}</a>
        <a className="cursor-none" href="#contact">{t('navContact')}</a>
      </div>

      {/* Toggles (Audio, Language) and Call to Action */}
      <div className="flex items-center gap-5">
        
        {/* Web Audio Mute/Unmute Toggler */}
        <button 
          onClick={handleAudioToggle}
          className="relative p-2 rounded-full border border-cyan-glow/20 bg-navy-800/60 hover:bg-cyan-glow/10 text-cyan-glow cursor-none transition-all duration-300 hover:border-cyan-glow shadow-[0_0_15px_rgba(0,242,255,0.05)]"
          title={audioEnabled ? "Mute Ambient Hum" : "Unmute Ambient Hum"}
        >
          {audioEnabled ? (
            // Speaker Icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          ) : (
            // Muted Speaker Icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </button>

        {/* Language Toggler (EN/AR) */}
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="px-3 py-1.5 rounded-md border border-cyan-glow/20 bg-navy-800/60 text-xs font-bold font-sans text-cyan-glow cursor-none hover:bg-cyan-glow/10 transition-all duration-300 hover:border-cyan-glow shadow-[0_0_15px_rgba(0,242,255,0.05)]"
        >
          {lang === 'en' ? 'العربية (AR)' : 'ENGLISH (EN)'}
        </button>

        {/* CTA Button */}
        <motion.a 
          href="#contact" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="nav-btn cursor-none font-sans font-bold tracking-wider text-xs uppercase px-4 py-2 border border-amber-glow text-amber-glow rounded hover:bg-amber-glow hover:text-black duration-300 select-none shadow-[0_0_15px_rgba(255,170,0,0.15)]"
        >
          {t('navBtn')}
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
