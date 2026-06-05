import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], #hero');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id === 'hero' ? 'home' : e.target.id;
          setActiveSection(id);
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const links = ['Home', 'About', 'Services', 'Projects', 'Contact'];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 h-16 bg-navy-900/90 backdrop-blur-md border-b border-cyan-glow/10 flex justify-between items-center px-[5%] z-[100]"
    >
      <a href="#" className="nav-logo"><span>▲</span> ARCOVA</a>
      <div className="nav-links">
        {links.map((link) => {
          const lower = link.toLowerCase();
          const target = lower === 'home' ? '#' : `#${lower}`;
          const isActive = activeSection === lower;
          return (
            <a 
              key={link}
              href={target}
              style={{
                color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.55)',
                borderBottom: isActive ? '1px solid #00d4ff' : '1px solid transparent',
                transition: 'all 0.3s'
              }}
            >
              {link}
            </a>
          );
        })}
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
