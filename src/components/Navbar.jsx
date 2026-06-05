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
      <a href="#" className="nav-logo"><span>▲</span> ARCOVA</a>
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
