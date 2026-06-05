import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { toggleAudio } from '../utils/audio';
import Button from './Button';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    toggleAudio(nextState);
  };

  const closeMobile = () => setMobileOpen(false);

  const navItems = [
    { href: '#', label: t('navHome') },
    { href: '#about', label: t('navAbout') },
    { href: '#services', label: t('navServices') },
    { href: '#projects', label: t('navProjects') },
    { href: '#contact', label: t('navContact') },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 h-16 z-100 flex justify-between items-center px-[5%] transition-all duration-500 ${
        scrolled 
          ? 'bg-[#070a12]/95 backdrop-blur-xl border-b border-cyan-glow/15 shadow-[0_0_30px_rgba(0,242,255,0.05)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <a href="#" className="flex items-center gap-3 font-display font-extrabold text-xl tracking-widest text-white uppercase select-none cursor-none group">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-glow drop-shadow-[0_0_8px_rgba(0,242,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(0,242,255,0.9)] transition-all duration-300">
          <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 8L6 20H18L12 8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="tracking-[0.2em] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-violet-400">R7x Dev</span>
      </a>

      <div className={`nav-links items-center gap-8 font-mono text-[11px] tracking-[0.2em] uppercase ${lang === 'ar' ? 'text-right' : ''}`}>
        {navItems.map((item) => (
          <a key={item.href} className="cursor-none" href={item.href}>{item.label}</a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={handleAudioToggle}
          className="relative p-2 rounded-full border border-cyan-glow/20 bg-navy-800/60 hover:bg-cyan-glow/10 text-cyan-glow cursor-none transition-all duration-300 hover:border-cyan-glow shadow-[0_0_15px_rgba(0,242,255,0.05)]"
          title={audioEnabled ? "Mute Ambient Hum" : "Unmute Ambient Hum"}
        >
          {audioEnabled ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </button>

        <Button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          variant="lang"
        >
          {lang === 'en' ? 'AR' : 'EN'}
        </Button>

        <Button
          as="a"
          href="#contact" 
          variant="nav"
        >
          {t('navBtn')}
        </Button>

        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`hamburger ${mobileOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu open"
            style={{ display: 'flex' }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1 }}
                className="text-gray-400 hover:text-cyan-glow transition-colors duration-300 text-2xl font-display tracking-[0.15em] uppercase cursor-none"
              >
                {item.label}
              </motion.a>
            ))}
            <Button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5 }}
              onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); }}
              variant="secondary"
              className="mt-8 px-6 py-3 rounded-lg text-sm w-auto"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;