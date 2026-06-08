import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { toggleAudio, speakRobotWelcome } from '../utils/audio';
import Button from './Button';

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Initialize theme and audio on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    // Audio Preference Initialization (Default is true/enabled)
    const savedAudio = localStorage.getItem('audio_prefer');
    const isAudioOn = savedAudio !== 'disabled';
    setAudioEnabled(isAudioOn);

    if (isAudioOn) {
      toggleAudio(true);

      const handleFirstInteraction = () => {
        const currentAudioPrefer = localStorage.getItem('audio_prefer');
        if (currentAudioPrefer !== 'disabled') {
          toggleAudio(true);
          speakRobotWelcome(lang);
        }
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      };
      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
    }
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

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
    localStorage.setItem('audio_prefer', nextState ? 'enabled' : 'disabled');
    if (nextState) {
      speakRobotWelcome(lang, true);
    }
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
        scrolled && !mobileOpen
          ? 'bg-navy-900/95 backdrop-blur-xl border-b border-cyan-glow/15 shadow-sm dark:shadow-[0_0_30px_rgba(0,242,255,0.05)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <a 
        href="#" 
        className={`flex items-center gap-3 font-display font-extrabold text-xl tracking-widest text-slate-900 dark:text-white uppercase select-none cursor-none group transition-opacity duration-300 ${
          mobileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
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
        {/* Wrap all buttons (except the hamburger) to hide them when the menu is open */}
        <div className={`flex items-center gap-4 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          {/* Theme Toggle Button */}
          <button 
            onClick={handleThemeToggle}
            className="relative p-2 rounded-full border border-cyan-glow/20 bg-navy-800/60 hover:bg-cyan-glow/10 text-cyan-glow cursor-none transition-all duration-300 hover:border-cyan-glow shadow-[0_0_15px_rgba(0,242,255,0.05)]"
            title={theme === 'dark' ? t('themeLight') || 'Switch to Light Mode' : t('themeDark') || 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Audio Toggle Button */}
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
        </div>

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
          <>
            {/* Backdrop Overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobile}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98] md:hidden cursor-pointer"
            />

            {/* Sidebar menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] border-l border-cyan-glow/15 dark:border-white/10 z-[99] flex flex-col justify-between p-8 pt-32 shadow-2xl md:hidden ${
                lang === 'ar' ? 'text-right items-end' : 'text-left items-start'
              }`}
              style={{
                backgroundColor: 'var(--bg-mobile-menu)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)'
              }}
            >
              <div className={`flex flex-col gap-6 w-full ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    initial={{ x: lang === 'ar' ? -30 : 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: lang === 'ar' ? -30 : 30, opacity: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 150, damping: 20 }}
                    className="text-slate-600 dark:text-gray-400 hover:text-cyan-glow transition-colors duration-300 text-xl font-display font-semibold tracking-[0.1em] uppercase cursor-none w-full py-2 border-b border-navy-700/10 dark:border-white/5"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-col gap-4 w-full mt-auto">
                <Button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: navItems.length * 0.06 }}
                  onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); closeMobile(); }}
                  variant="secondary"
                  className="w-full text-xs font-mono font-bold"
                >
                  {lang === 'en' ? 'العربية' : 'English'}
                </Button>
                
                <Button
                  as="a"
                  href="#contact"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: (navItems.length + 1) * 0.06 }}
                  onClick={closeMobile}
                  variant="primary"
                  className="w-full text-xs font-mono font-bold"
                >
                  {t('navBtn')}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;