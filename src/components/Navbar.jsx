import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 h-16 bg-navy-900/90 backdrop-blur-md border-b border-cyan-glow/10 flex justify-between items-center px-[5%] z-[100]"
    >
      <a href="#" className="nav-logo flex items-center gap-3 font-sans font-bold text-xl tracking-widest text-white uppercase select-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-glow drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]">
          <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 8L6 20H18L12 8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        </svg>
        ARCOVA
      </a>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
      <motion.a 
        href="#contact" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="nav-btn cursor-none"
      >
        Start Your Project
      </motion.a>
    </motion.nav>
  );
};

export default Navbar;
