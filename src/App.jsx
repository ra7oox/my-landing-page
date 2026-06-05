import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Cursor } from './components/Cursor';

function ScrollBar() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setP(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{
      position:'fixed', top:0, left:0,
      height:2, width: p + '%',
      background:'linear-gradient(90deg,#00d4ff,#ff8c00)',
      zIndex:9999, transition:'width 0.1s',
      boxShadow:'0 0 8px rgba(0,212,255,0.6)'
    }}/>
  );
}

function App() {
  useEffect(() => {
    if (window.THREE) {
      import('./three-background').then(m => m.initBackground());
    } else {
      // THREE not loaded yet, wait
      const check = setInterval(() => {
        if (window.THREE) {
          import('./three-background').then(m => m.initBackground());
          clearInterval(check);
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <ScrollBar />
      <Cursor />
      
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      
      <footer style={{ background: 'rgba(3,8,18,1)', padding: '40px 5%', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px', borderTop: '1px solid rgba(0,212,255,0.05)', position: 'relative', zIndex: 1 }}>
        <p>&copy; {new Date().getFullYear()} ARCOVA. All rights reserved. Building the Future.</p>
      </footer>
    </>
  );
}

export default App;
