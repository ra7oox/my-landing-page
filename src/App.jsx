import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Dev3DBackground from './components/Dev3DBackground';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
      <Dev3DBackground />
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
