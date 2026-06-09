import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Dev3DBackground from './components/Dev3DBackground';
import CustomCursor from './components/CustomCursor';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}

function App() {
  return (
    <LanguageProvider>
      <Dev3DBackground />
      <CustomCursor />
      <ScrollProgress />
      
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <TechStack />
      <Testimonials />
      <Timeline />
      <Contact />
    </LanguageProvider>
  );
}

export default App;