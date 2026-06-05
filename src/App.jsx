import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticlesCanvas from './components/ParticlesCanvas';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
      <ParticlesCanvas />
      <CustomCursor />
      
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
