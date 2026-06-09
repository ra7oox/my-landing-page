import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '../hooks/useLanguage';
import Button from './Button';
import { speakRobotWelcome } from '../utils/audio';

const Hero = () => {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const loaderCanvasRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const increment = prev < 50 ? Math.floor(Math.random() * 12) + 8 : Math.floor(Math.random() * 6) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effect on hero gradient overlay
  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trigger robot welcome speech on load completion
  useEffect(() => {
    if (!loading) {
      speakRobotWelcome(lang);
    }
  }, [loading, lang]);

  // WebGL 3D loader canvas animation
  useEffect(() => {
    if (!loading) return;
    const canvas = loaderCanvasRef.current;
    if (!canvas) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Central Holographic Dodecahedron
    const coreGeom = new THREE.IcosahedronGeometry(7, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    scene.add(coreMesh);

    // 2. Central Holographic Points/Vertex glow
    const pointsGeom = new THREE.IcosahedronGeometry(7.05, 2);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00f2ff,
      size: 0.35,
      transparent: true,
      opacity: 0.75
    });
    const pointsMesh = new THREE.Points(pointsGeom, pointsMat);
    scene.add(pointsMesh);

    // 3. Orbiting Torus Rings (Cyber loops)
    const ringGeom1 = new THREE.TorusGeometry(12, 0.15, 8, 36);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 3.5;
    scene.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(15, 0.1, 6, 30);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4.5;
    scene.add(ring2);

    // 4. Matrix style space starfield
    const starCount = 80;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = [];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      starSpeeds.push(0.04 + Math.random() * 0.1);
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x00f2ff,
      size: 0.25,
      transparent: true,
      opacity: 0.5
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Fetch current progress directly from the DOM to avoid dependency loop rebuilds
      const indicator = document.getElementById('load-value-indicator');
      const currentPercent = indicator ? parseInt(indicator.innerText, 10) : 0;
      const progressFactor = currentPercent / 100;

      const speedFactor = 1 + progressFactor * 5.5;

      // Rotate central objects
      coreMesh.rotation.x += 0.006 * speedFactor;
      coreMesh.rotation.y += 0.009 * speedFactor;
      pointsMesh.rotation.x -= 0.004 * speedFactor;
      pointsMesh.rotation.y -= 0.006 * speedFactor;

      // Spin HUD loops
      ring1.rotation.z += 0.012 * speedFactor;
      ring2.rotation.z -= 0.008 * speedFactor;

      // Animate flight particles forward
      const positions = starGeom.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        positions[i * 3 + 2] += starSpeeds[i] * speedFactor;
        // Reset if it passes camera
        if (positions[i * 3 + 2] > 20) {
          positions[i * 3] = (Math.random() - 0.5) * 60;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
          positions[i * 3 + 2] = -40;
        }
      }
      starGeom.attributes.position.needsUpdate = true;

      // Scale meshes based on progress
      const currentScale = 1 + progressFactor * 0.4;
      coreMesh.scale.set(currentScale, currentScale, currentScale);
      pointsMesh.scale.set(currentScale, currentScale, currentScale);

      // Micro position glitch effect when loading finishes
      if (currentPercent >= 96) {
        coreMesh.position.x = (Math.random() - 0.5) * 0.5;
        coreMesh.position.y = (Math.random() - 0.5) * 0.5;
      } else {
        coreMesh.position.set(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      coreGeom.dispose();
      coreMat.dispose();
      pointsGeom.dispose();
      pointsMat.dispose();
      ringGeom1.dispose();
      ringMat1.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      starGeom.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, [loading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#070a12] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* 3D WebGL Cyber Loader Background */}
            <canvas 
              ref={loaderCanvasRef} 
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
            />

            {/* Content overlay */}
            <div className="max-w-md w-full px-6 flex flex-col gap-5 text-center relative z-10 select-none">
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 font-mono"
              >
                [ CALIBRATING COMPILER ENGINE ]
              </motion.div>
              <div 
                className="text-5xl md:text-7xl font-bold tracking-[0.15em] text-white font-display uppercase drop-shadow-[0_0_25px_rgba(0,242,255,0.4)]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                R7x Dev
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-[2px] w-full bg-navy-800 rounded overflow-hidden relative">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadPercent}%` }}
                    className="h-full bg-gradient-to-r from-cyan-glow via-violet-500 to-amber-glow shadow-[0_0_20px_rgba(0,242,255,0.5)]"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>INITIALIZING</span>
                  <span className="text-cyan-glow font-semibold">
                    <span id="load-value-indicator">{Math.min(100, loadPercent)}</span>%
                  </span>
                </div>
              </div>
              <div className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">
                VIRTUAL ENVIRONMENT LOADED // WEBGL PORT CALIBRATING
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        className="relative min-h-screen py-24 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden bg-transparent" 
        id="hero"
      >
        <div 
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/90 z-10 pointer-events-none parallax" 
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          className="relative z-20 text-center px-6 flex flex-col items-center max-w-4xl"
        >
          <div className="story-step mb-6">
            01 / 05
          </div>
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-glow/20 bg-cyan-glow/5 text-cyan-glow text-[10px] font-mono tracking-[0.2em] uppercase !py-1.5 !px-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {lang === 'ar' ? 'جاهز للعمل' : 'AVAILABLE FOR PROJECTS'}
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="hero-title font-display font-black text-5xl md:text-7xl lg:text-8xl text-slate-900 dark:text-white tracking-widest uppercase leading-tight"
          >
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white dark:to-gray-300 bg-clip-text text-transparent">
              {t('heroTitle')}
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="hero-subtitle mt-6 font-sans text-sm md:text-base text-slate-600 dark:text-gray-400 tracking-[0.15em] uppercase font-light max-w-2xl leading-relaxed"
          >
            {t('heroSubtitle')}
          </motion.p>
          
          <Button
            as="a"
            href="#contact"
            variant="hero"
            className="mt-12"
          >
            {t('heroCTA1')}
          </Button>
        </motion.div>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-mono text-gray-500 tracking-[0.2em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-8 bg-gradient-to-b from-cyan-glow to-transparent"
            />
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Hero;