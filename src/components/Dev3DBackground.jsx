import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const interpolate = (start, end, amt) => start + (end - start) * amt;

const Dev3DBackground = () => {
  const canvasRef = useRef(null);
  const mountRef = useRef({
    highlightedBuilding: -1,
    zoomTarget: 'default'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect prefers-reduced-motion OS preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a12, 0.0025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    // Initial camera position
    camera.position.set(0, 15, 220);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Global Group
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    // ----------------------------------------------------
    // LIGHTS SYSTEM
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x0d1626, 2.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f2ff, 3.5);
    dirLight1.position.set(200, 300, 150);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffaa00, 2);
    dirLight2.position.set(-200, 100, -150);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00f2ff, 4, 150);
    pointLight.position.set(0, 20, 30);
    scene.add(pointLight);

    // ----------------------------------------------------
    // MATERIALS
    // ----------------------------------------------------
    const materials = {
      cyanWire: new THREE.MeshBasicMaterial({ color: 0x00f2ff, wireframe: true, transparent: true, opacity: 0.25 }),
      cyanGlow: new THREE.MeshBasicMaterial({ color: 0x00f2ff, transparent: true, opacity: 0.1 }),
      amberWire: new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true, transparent: true, opacity: 0.25 }),
      amberNode: new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.8 }),
      steel: new THREE.MeshPhongMaterial({ color: 0x1d2c42, specular: 0x00f2ff, shininess: 30, flatShading: true }),
      glass: new THREE.MeshPhongMaterial({ color: 0x0b1e36, transparent: true, opacity: 0.35, shininess: 80 })
    };

    // ----------------------------------------------------
    // 1. ZENITH SPIRE (Center, x = 0, y = 0, z = 0)
    // ----------------------------------------------------
    const zenithGroup = new THREE.Group();
    zenithGroup.position.set(0, -35, 0);
    cityGroup.add(zenithGroup);

    const floorCount = 5;
    const floorHeight = 22;
    const floors = [];

    for (let i = 0; i < floorCount; i++) {
      const floorGroup = new THREE.Group();
      floorGroup.position.y = i * floorHeight;
      zenithGroup.add(floorGroup);

      // Floor slab (Interplay of concrete/steel plates)
      const slabW = 32 - i * 4;
      const slabGeo = new THREE.BoxGeometry(slabW, 2, slabW);
      const slabMesh = new THREE.Mesh(slabGeo, materials.glass);
      floorGroup.add(slabMesh);

      // Outer steel frame beam highlight
      const borderGeo = new THREE.BoxGeometry(slabW + 0.5, 0.8, slabW + 0.5);
      const borderMesh = new THREE.Mesh(borderGeo, materials.cyanWire);
      floorGroup.add(borderMesh);

      // Columns (Pillars connecting to floor above)
      if (i < floorCount - 1) {
        const pillarH = floorHeight;
        const colOffset = slabW / 2 - 2;
        const positions = [
          [-colOffset, -colOffset],
          [colOffset, -colOffset],
          [colOffset, colOffset],
          [-colOffset, colOffset]
        ];

        positions.forEach(([cx, cz]) => {
          const colGeo = new THREE.CylinderGeometry(0.8, 0.8, pillarH, 4);
          const colMesh = new THREE.Mesh(colGeo, materials.steel);
          colMesh.position.set(cx, pillarH / 2, cz);
          floorGroup.add(colMesh);

          // Diagonal support wireframes
          const braceGeo = new THREE.BoxGeometry(0.2, pillarH * 1.3, 0.2);
          const braceMesh = new THREE.Mesh(braceGeo, materials.cyanWire);
          braceMesh.position.set(cx, pillarH / 2, cz);
          braceMesh.rotation.z = Math.PI / 4;
          floorGroup.add(braceMesh);
        });
      }
      floors.push(floorGroup);
    }

    // Spire needle tip
    const needleGeo = new THREE.CylinderGeometry(0.1, 1.2, 35, 4);
    const needleMesh = new THREE.Mesh(needleGeo, materials.steel);
    needleMesh.position.y = (floorCount - 1) * floorHeight + 17.5;
    zenithGroup.add(needleMesh);

    // Scaffolding cage surrounding the building
    const scaffoldingGeo = new THREE.BoxGeometry(36, 120, 36);
    const scaffoldingMesh = new THREE.Mesh(scaffoldingGeo, materials.cyanWire);
    scaffoldingMesh.position.y = 50;
    zenithGroup.add(scaffoldingMesh);

    // ----------------------------------------------------
    // 2. APEX HUB (Left, x = -90, y = 0, z = 0)
    // ----------------------------------------------------
    const apexGroup = new THREE.Group();
    apexGroup.position.set(-90, -20, 0);
    cityGroup.add(apexGroup);

    // Modular blocks stacked/offset
    const block1 = new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), materials.glass);
    block1.position.y = -10;
    apexGroup.add(block1);

    const block1Wire = new THREE.Mesh(new THREE.BoxGeometry(24.5, 24.5, 24.5), materials.cyanWire);
    block1Wire.position.y = -10;
    apexGroup.add(block1Wire);

    const block2 = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), materials.glass);
    block2.position.set(6, 10, 6);
    block2.rotation.y = Math.PI / 6;
    apexGroup.add(block2);

    const block2Wire = new THREE.Mesh(new THREE.BoxGeometry(20.5, 20.5, 20.5), new THREE.MeshBasicMaterial({ color: 0x00f2ff, wireframe: true }));
    block2Wire.position.set(6, 10, 6);
    block2Wire.rotation.y = Math.PI / 6;
    apexGroup.add(block2Wire);

    // Steel truss columns
    const baseGeo = new THREE.CylinderGeometry(1.5, 1.5, 30, 4);
    const baseMesh = new THREE.Mesh(baseGeo, materials.steel);
    baseMesh.position.set(-8, -25, -8);
    apexGroup.add(baseMesh);

    // ----------------------------------------------------
    // 3. LUMINA GRID (Right, x = 90, y = 0, z = 0)
    // ----------------------------------------------------
    const luminaGroup = new THREE.Group();
    luminaGroup.position.set(90, -25, 0);
    cityGroup.add(luminaGroup);

    // Geodesic digital dome wireframe
    const domeGeo = new THREE.IcosahedronGeometry(25, 2);
    const domeMesh = new THREE.Mesh(domeGeo, materials.amberWire);
    luminaGroup.add(domeMesh);

    // Adding glowing amber node spheres at geodesic junctions
    const posAttr = domeGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      if (i % 6 === 0) { // filter density
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.8, 6, 6), materials.amberNode);
        node.position.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
        luminaGroup.add(node);
      }
    }

    // ----------------------------------------------------
    // 4. FLOATING DATA PARTICLES (BIM Streams)
    // ----------------------------------------------------
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 350; // X
      particlePositions[i + 1] = (Math.random() - 0.5) * 250; // Y
      particlePositions[i + 2] = (Math.random() - 0.5) * 200; // Z
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    // Custom Canvas Texture for perfectly round particles
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    pCtx.fillStyle = '#ffffff';
    pCtx.beginPath();
    pCtx.arc(8, 8, 6, 0, Math.PI * 2);
    pCtx.fill();
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 1.5,
      map: pTexture,
      transparent: true,
      color: 0x00f2ff,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ----------------------------------------------------
    // 5. ORBITING STAT BADGES (Interactive 3D Infographics)
    // ----------------------------------------------------
    const createTextSprite = (text, glowColor) => {
      const sCanvas = document.createElement('canvas');
      sCanvas.width = 256;
      sCanvas.height = 64;
      const sCtx = sCanvas.getContext('2d');

      // Safe rounded rectangle helper for canvas text sprites
      const drawRoundRect = (ctx, x, y, width, height, radius) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };

      // Glassmorphic background
      sCtx.fillStyle = 'rgba(11, 20, 36, 0.85)';
      drawRoundRect(sCtx, 4, 4, 248, 56, 12);
      sCtx.fill();

      // Glowing border
      sCtx.strokeStyle = glowColor;
      sCtx.lineWidth = 2.5;
      sCtx.stroke();

      // Bold text formatting
      sCtx.fillStyle = '#ffffff';
      sCtx.font = 'bold 19px Courier, monospace';
      sCtx.textAlign = 'center';
      sCtx.textBaseline = 'middle';
      sCtx.shadowColor = glowColor;
      sCtx.shadowBlur = 8;
      sCtx.fillText(text, 128, 32);

      const tex = new THREE.CanvasTexture(sCanvas);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(38, 9.5, 1);
      return sprite;
    };

    const orbitGroup = new THREE.Group();
    cityGroup.add(orbitGroup);

    // Define 3 stats badges
    const statsList = [
      { text: '+70 PROJECTS', color: '#00f2ff', radius: 68, speed: 0.006, height: 15 },
      { text: '+3 YEARS', color: '#ffaa00', radius: 82, speed: -0.005, height: 35 },
      { text: '98% CLIENTS', color: '#00f2ff', radius: 68, speed: 0.004, height: -10 }
    ];

    const statsSprites = statsList.map((stat, idx) => {
      const sprite = createTextSprite(stat.text, stat.color);
      orbitGroup.add(sprite);
      return {
        sprite,
        radius: stat.radius,
        speed: stat.speed,
        height: stat.height,
        angle: (idx * Math.PI * 2) / 3
      };
    });

    // ----------------------------------------------------
    // SCROLL & MOUSE INTERACTION TRACKERS
    // ----------------------------------------------------
    let scrollPercent = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleScrollLocal = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollPercent = window.scrollY / maxScroll;
    };
    window.addEventListener('scroll', handleScrollLocal);

    const handleMouseMoveLocal = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) / 100;
      targetMouseY = (e.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener('mousemove', handleMouseMoveLocal);

    // Resize handler
    const handleResizeLocal = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResizeLocal);

    // Expose global hooks to card overlays
    window.highlightBuilding = (index) => {
      mountRef.current.highlightedBuilding = index;
    };

    window.zoomToBuilding = (name) => {
      mountRef.current.zoomTarget = name;
    };

    // Camera base and lookAt positions
    const camBasePos = new THREE.Vector3(0, 15, 220);
    const camLookAt = new THREE.Vector3(0, 0, 0);

    let animationFrameId;

    // ----------------------------------------------------
    // ANIMATION TICKER LOOP
    // ----------------------------------------------------
    const tick = () => {
      const isMobile = window.innerWidth < 768;

      // Mouse spring interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      // Calculate camera targets based on active scroll section
      let targetX = 0;
      let targetY = 15;
      let targetZ = 220;
      let lookX = 0;
      let lookY = 0;
      let lookZ = 0;

      // Define camera configurations
      if (scrollPercent <= 0.15) {
        // Hero
        targetX = 0;
        targetY = 15;
        targetZ = isMobile ? 245 : 200;
        lookX = 0;
        lookY = -10;
        lookZ = 0;
      } else if (scrollPercent <= 0.40) {
        // About (metrics orbit visible)
        const t = (scrollPercent - 0.15) / 0.25;
        const ease = t * t * (3 - 2 * t);
        targetX = interpolate(0, isMobile ? 0 : 35, ease);
        targetY = interpolate(15, isMobile ? 25 : 25, ease);
        targetZ = interpolate(isMobile ? 245 : 200, isMobile ? 180 : 155, ease);
        lookX = interpolate(0, isMobile ? 0 : 10, ease);
        lookY = interpolate(-10, -5, ease);
      } else if (scrollPercent <= 0.65) {
        // Services (highlights active)
        const t = (scrollPercent - 0.40) / 0.25;
        const ease = t * t * (3 - 2 * t);
        targetX = interpolate(isMobile ? 0 : 35, isMobile ? 0 : -35, ease);
        targetY = interpolate(25, isMobile ? 25 : -10, ease);
        targetZ = interpolate(isMobile ? 180 : 155, isMobile ? 190 : 160, ease);
        lookX = interpolate(isMobile ? 0 : 10, isMobile ? 0 : -18, ease);
        lookY = interpolate(-5, 0, ease);
      } else if (scrollPercent <= 0.85) {
        // Projects (zoom-interactive triggers)
        const t = (scrollPercent - 0.65) / 0.20;
        const ease = t * t * (3 - 2 * t);

        // Zoom focus checks based on user selection clicks
        const selection = mountRef.current.zoomTarget;
        let pTarX = 0;
        let pTarY = 5;
        let pTarZ = isMobile ? 130 : 90;
        let pLoxX = 0;

        if (selection === 'apex') {
          pTarX = -90;
          pTarY = -5;
          pTarZ = isMobile ? 75 : 55;
          pLoxX = -90;
        } else if (selection === 'lumina') {
          pTarX = 90;
          pTarY = -5;
          pTarZ = isMobile ? 75 : 55;
          pLoxX = 90;
        } else if (selection === 'zenith') {
          pTarX = 0;
          pTarY = 10;
          pTarZ = isMobile ? 95 : 68;
          pLoxX = 0;
        } else if (selection === 'python') {
          pTarX = 0;
          pTarY = 55;
          pTarZ = isMobile ? 120 : 90;
          pLoxX = 0;
        }

        targetX = interpolate(isMobile ? 0 : -35, pTarX, ease);
        targetY = interpolate(isMobile ? 25 : -10, pTarY, ease);
        targetZ = interpolate(isMobile ? 190 : 160, pTarZ, ease);
        lookX = interpolate(isMobile ? 0 : -18, pLoxX, ease);
        lookY = interpolate(0, selection === 'apex' || selection === 'lumina' ? -5 : selection === 'python' ? 45 : 5, ease);
      } else {
        // Contact (camera shifted left, looking right at the spire and dome)
        const t = Math.min(1, (scrollPercent - 0.85) / 0.15);
        const ease = t * t * (3 - 2 * t);

        const selection = mountRef.current.zoomTarget;
        let prevTarX = isMobile ? 0 : -35;
        let prevTarY = isMobile ? 25 : -10;
        let prevTarZ = isMobile ? 190 : 160;
        let prevLookX = isMobile ? 0 : -18;
        let prevLookY = 0;

        if (selection === 'apex') {
          prevTarX = -90;
          prevTarY = -5;
          prevTarZ = isMobile ? 75 : 55;
          prevLookX = -90;
          prevLookY = -5;
        } else if (selection === 'lumina') {
          prevTarX = 90;
          prevTarY = -5;
          prevTarZ = isMobile ? 75 : 55;
          prevLookX = 90;
          prevLookY = -5;
        } else if (selection === 'zenith') {
          prevTarX = 0;
          prevTarY = 10;
          prevTarZ = isMobile ? 95 : 68;
          prevLookX = 0;
          prevLookY = 5;
        } else if (selection === 'python') {
          prevTarX = 0;
          prevTarY = 55;
          prevTarZ = isMobile ? 120 : 90;
          prevLookX = 0;
          prevLookY = 45;
        }

        // Shift camera left and look right to display models on the right side
        targetX = interpolate(prevTarX, isMobile ? 0 : -45, ease);
        targetY = interpolate(prevTarY, isMobile ? 25 : 35, ease);
        targetZ = interpolate(prevTarZ, isMobile ? 190 : 175, ease);
        lookX = interpolate(prevLookX, isMobile ? 0 : 25, ease);
        lookY = interpolate(prevLookY, isMobile ? -5 : -15, ease);
      }

      // Smoothly slide camera base position
      camBasePos.x += (targetX - camBasePos.x) * 0.05;
      camBasePos.y += (targetY - camBasePos.y) * 0.05;
      camBasePos.z += (targetZ - camBasePos.z) * 0.05;

      camLookAt.x += (lookX - camLookAt.x) * 0.05;
      camLookAt.y += (lookY - camLookAt.y) * 0.05;
      camLookAt.z += (lookZ - camLookAt.z) * 0.05;

      // Apply coordinates + mouse tilt parallax offsets
      camera.position.set(
        camBasePos.x + currentMouseX * (isMobile ? 12 : 24),
        camBasePos.y - currentMouseY * (isMobile ? 12 : 24),
        camBasePos.z
      );
      camera.lookAt(camLookAt.x, camLookAt.y, camLookAt.z);

      // ----------------------------------------------------
      // CONSTRUCT TIME LAPSE ANIMATIONS (floor-by-floor scaling)
      // ----------------------------------------------------
      // Floor time lapse scales up between scroll 15% and 70%
      const buildProgress = Math.min(1, Math.max(0, (scrollPercent - 0.15) / 0.50));

      floors.forEach((floor, idx) => {
        // Floor scaling interval
        const start = idx / floorCount;
        const end = (idx + 1) / floorCount;
        let floorT = (buildProgress - start) / (end - start);
        floorT = Math.min(1, Math.max(0, floorT));

        if (floorT <= 0) {
          floor.visible = false;
        } else {
          floor.visible = true;
          // Scale height and slide down into place
          floor.scale.y = floorT;
          floor.position.y = idx * floorHeight + (1 - floorT) * 18;
        }
      });

      // Slowly rotate city
      cityGroup.rotation.y = scrollPercent * Math.PI * 0.5;

      // Orbiting metrics loop
      statsSprites.forEach(item => {
        item.angle += item.speed;
        item.sprite.position.set(
          Math.cos(item.angle) * item.radius,
          item.height,
          Math.sin(item.angle) * item.radius
        );
      });

      // ----------------------------------------------------
      // HOVER HIGHLIGHT SYSTEM (Glow structures on hover)
      // ----------------------------------------------------
      const highlighted = mountRef.current.highlightedBuilding;
      
      // Mute materials base colors
      materials.cyanWire.color.setHex(highlighted === 1 ? 0x00f2ff : 0x0058aa);
      materials.cyanWire.opacity = highlighted === 1 ? 0.5 : 0.25;

      materials.cyanGlow.color.setHex(highlighted === 1 ? 0x00f2ff : 0x0033aa);
      materials.cyanGlow.opacity = highlighted === 1 ? 0.25 : 0.08;

      materials.amberWire.color.setHex(highlighted === 0 ? 0x00f2ff : highlighted === 3 ? 0x00f2ff : 0xffaa00);
      materials.amberWire.opacity = (highlighted === 0 || highlighted === 3) ? 0.52 : 0.25;

      // Let highlight pulses glow gently over time
      const pulse = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;
      if (highlighted !== -1) {
        pointLight.intensity = 6 + pulse * 4;
        if (highlighted === 0) pointLight.position.set(-90, 0, 10);
        else if (highlighted === 2) pointLight.position.set(90, 0, 10);
        else pointLight.position.set(0, 20, 10);
      } else {
        pointLight.intensity = 2.5;
      }

      // Rotate geodesic dome
      luminaGroup.rotation.y += 0.002;
      luminaGroup.rotation.x += 0.001;

      // Rotate Apex blocks
      block2.rotation.y += 0.004;
      block2Wire.rotation.y += 0.004;

      // Float background data particles
      const posArr = particleGeo.attributes.position.array;
      for (let i = 1; i < posArr.length; i += 3) {
        posArr[i] += 0.08; // Rise up
        if (posArr[i] > 180) {
          posArr[i] = -180; // Reset at bottom
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Render scene
      renderer.render(scene, camera);

      // Loop frame unless prefers-reduced-motion is active
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    // Render single frame for static reduced-motion users
    if (prefersReducedMotion) {
      // Setup building heights to full construction
      floors.forEach(floor => {
        floor.visible = true;
        floor.scale.y = 1;
      });
      renderer.render(scene, camera);
    } else {
      tick();
    }

    // Cleanup listeners and WebGL on unmount
    return () => {
      window.removeEventListener('scroll', handleScrollLocal);
      window.removeEventListener('mousemove', handleMouseMoveLocal);
      window.removeEventListener('resize', handleResizeLocal);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Traversal cleanup of all WebGL geometries and materials in the scene
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      // Dispose materials that may not be directly bound to a mesh in the scene
      Object.values(materials).forEach(mat => {
        if (mat) mat.dispose();
      });
      if (particleMat) particleMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#070a12]"
      style={{ touchAction: 'none' }}
    />
  );
};

export default Dev3DBackground;
