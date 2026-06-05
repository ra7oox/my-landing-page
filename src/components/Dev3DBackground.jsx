import React, { useEffect, useRef } from 'react';

const Dev3DBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Dimensions of the 3D Editor Window
    const W_editor = 520;
    const H_editor = 330;
    const D_editor = 12; // thickness

    // Dimensions of the Browser Preview Window
    const W_browser = 380;
    const H_browser = 290;
    const D_browser = 10;

    // Code files content
    const codeAppJsx = [
      "import React from 'react';",
      "import Navbar from './components/Navbar';",
      "import Hero from './components/Hero';",
      "import About from './components/About';",
      "",
      "function App() {",
      "  return (",
      "    <div className='app'>",
      "      <Navbar />",
      "      <Hero />",
      "      <About />",
      "    </div>",
      "  );",
      "}",
      "export default App;"
    ];

    const codeIndexCss = [
      "@import 'tailwindcss';",
      "",
      "@theme {",
      "  --color-cyan-glow: #00f2ff;",
      "  --color-amber-glow: #ffaa00;",
      "}",
      "",
      "body {",
      "  background: #070a12;",
      "  font-family: 'Inter';",
      "}"
    ];

    // Scroll tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Mouse tracking for 3D spring tilt
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const widthHalf = window.innerWidth / 2;
      const heightHalf = window.innerHeight / 2;
      targetMouseX = (e.clientX - widthHalf) / 45; // camera rotation offset
      targetMouseY = (e.clientY - heightHalf) / 45;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic animation metrics
    let time = 0;
    let charsTyped = 0;
    let compileTimer = 0;
    let laserBeams = [];

    // Initialize 25 floating background nodes in World Space
    const backgroundNodes = [];
    const numNodes = 25;
    const symbols = ['0', '1', '</>', '{', '}', 'App', 'npm', 'dev', 'CSS', 'JS'];
    for (let i = 0; i < numNodes; i++) {
      backgroundNodes.push({
        x: (Math.random() - 0.5) * 1100,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 500 - 300,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: Math.random() > 0.4 ? 'rgba(0, 242, 255, 0.25)' : 'rgba(255, 170, 0, 0.22)',
        speed: 0.15 + Math.random() * 0.35,
        rotSpeed: 0.002 + Math.random() * 0.01
      });
    }

    // Skyscraper 3D wireframe building points (inside Browser Preview)
    const buildingVertices = [];
    const buildingLines = [];
    const floors = 6;
    const baseW = 28;
    const floorH = 20;

    // Generate building vertices
    for (let f = 0; f <= floors; f++) {
      const y_val = H_browser / 2 - 40 - f * floorH; // base at bottom of window
      const f_scale = 1 - (f / floors) * 0.28; // Taper at the top
      const curW = baseW * f_scale;

      // 4 corners of floor
      buildingVertices.push({ x: -curW, y: y_val, z: -curW }); // 0
      buildingVertices.push({ x: curW, y: y_val, z: -curW });  // 1
      buildingVertices.push({ x: curW, y: y_val, z: curW });   // 2
      buildingVertices.push({ x: -curW, y: y_val, z: curW });  // 3
    }

    // Generate building lines
    for (let f = 0; f <= floors; f++) {
      const offset = f * 4;
      // Horizontal structural beams
      buildingLines.push([offset + 0, offset + 1]);
      buildingLines.push([offset + 1, offset + 2]);
      buildingLines.push([offset + 2, offset + 3]);
      buildingLines.push([offset + 3, offset + 0]);

      // Base crosses
      buildingLines.push([offset + 0, offset + 2]);

      // Vertical pillars and diagonal wall braces
      if (f < floors) {
        const nextOffset = (f + 1) * 4;
        buildingLines.push([offset + 0, nextOffset + 0]);
        buildingLines.push([offset + 1, nextOffset + 1]);
        buildingLines.push([offset + 2, nextOffset + 2]);
        buildingLines.push([offset + 3, nextOffset + 3]);

        // X brace details
        buildingLines.push([offset + 0, nextOffset + 1]);
        buildingLines.push([offset + 1, nextOffset + 2]);
        buildingLines.push([offset + 2, nextOffset + 3]);
        buildingLines.push([offset + 3, nextOffset + 0]);
      }
    }

    // Helper functions for 3D mathematics
    const rotateY = (pt, rad) => {
      const cosY = Math.cos(rad);
      const sinY = Math.sin(rad);
      return {
        x: pt.x * cosY + pt.z * sinY,
        y: pt.y,
        z: -pt.x * sinY + pt.z * cosY
      };
    };

    const interpolate = (start, end, progress) => start + (end - start) * progress;

    const tokenizeLine = (line) => {
      const tokens = [];
      const words = line.split(/(\s+|=|>|<|\(|\)|\{|\}|\[|\]|;|'|"|\/)/);
      let inString = false;
      let stringChar = null;
      let currentString = "";

      const keywords = ['import', 'from', 'const', 'let', 'function', 'return', 'export', 'default', 'class', 'extends'];
      const components = ['Navbar', 'Hero', 'About', 'Services', 'Dev3DBackground', 'App'];
      const cyanGlowKeywords = ['className', 'id', 'div', 'section', 'h1', 'p', 'button'];

      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        if (!w) continue;

        if (inString) {
          currentString += w;
          if (w === stringChar) {
            tokens.push({ text: currentString, color: '#a3be8c' }); // green for strings
            inString = false;
            currentString = "";
          }
          continue;
        }

        if (w === "'" || w === '"') {
          inString = true;
          stringChar = w;
          currentString = w;
          continue;
        }

        if (keywords.includes(w)) {
          tokens.push({ text: w, color: '#ffaa00' }); // amber for keywords
        } else if (components.includes(w)) {
          tokens.push({ text: w, color: '#61afef' }); // blue for components
        } else if (cyanGlowKeywords.includes(w)) {
          tokens.push({ text: w, color: '#00f2ff' }); // cyan for html/tags
        } else if (w === 'return') {
          tokens.push({ text: w, color: '#c678dd' }); // purple
        } else if (/^\d+$/.test(w)) {
          tokens.push({ text: w, color: '#d19a66' }); // orange for numbers
        } else {
          const punc = ['=', '>', '<', '(', ')', '{', '}', '[', ']', ';'];
          if (punc.includes(w)) {
            tokens.push({ text: w, color: '#abb2bf' });
          } else {
            tokens.push({ text: w, color: '#ffffff' });
          }
        }
      }

      if (inString && currentString) {
        tokens.push({ text: currentString, color: '#a3be8c' });
      }

      return tokens;
    };

    const getTypedLines = (lines, charsLimit) => {
      let count = 0;
      const result = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (count + line.length < charsLimit) {
          result.push(line);
          count += line.length + 1; // +1 for newline character
        } else {
          const remaining = charsLimit - count;
          result.push(line.substring(0, remaining));
          break;
        }
      }
      return result;
    };

    let animId;

    const animate = () => {
      time++;

      // Clear with obsidian base
      ctx.fillStyle = '#070a12';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse spring interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      // Scroll interpolation calculator
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollPercent = scrollY / maxScroll;

      // Typewriter incrementation inside Hero
      if (scrollPercent < 0.20 && charsTyped < 250) {
        charsTyped += 0.55;
      }

      // Compile logs controller inside Services section
      if (scrollPercent >= 0.40 && scrollPercent <= 0.70) {
        compileTimer += 1;
      } else {
        compileTimer = 0; // reset
      }

      // Set up camera coordinates
      const camera = {
        x: 0,
        y: 0,
        z: 460, // distance
        rotX: -currentMouseY * 0.015, // tilt
        rotY: -currentMouseX * 0.015,
        fov: 380
      };

      // 3D coordinate projection matrix
      const projectPoint = (lx, ly, lz, pos, rot) => {
        let x = lx;
        let y = ly;
        let z = lz;

        // Apply local rotation around Y axis
        if (rot.y !== 0) {
          const cosY = Math.cos(rot.y);
          const sinY = Math.sin(rot.y);
          const x1 = x * cosY + z * sinY;
          const z1 = -x * sinY + z * cosY;
          x = x1;
          z = z1;
        }
        // Apply local rotation around X axis
        if (rot.x !== 0) {
          const cosX = Math.cos(rot.x);
          const sinX = Math.sin(rot.x);
          const y1 = y * cosX - z * sinX;
          const z1 = y * sinX + z * cosX;
          y = y1;
          z = z1;
        }
        // Apply local rotation around Z axis
        if (rot.z !== 0) {
          const cosZ = Math.cos(rot.z);
          const sinZ = Math.sin(rot.z);
          const x1 = x * cosZ - y * sinZ;
          const y1 = x * sinZ + y * cosZ;
          x = x1;
          y = y1;
        }

        // Translate to world space coordinates
        const wx = x + pos.x;
        const wy = y + pos.y;
        const wz = z + pos.z;

        // Camera translation (offset from camera eye)
        let cx = wx - camera.x;
        let cy = wy - camera.y;
        let cz = wz - camera.z;

        // Rotate point around camera Y axis (horizontal pan)
        if (camera.rotY !== 0) {
          const cosY = Math.cos(camera.rotY);
          const sinY = Math.sin(camera.rotY);
          const rx = cx * cosY - cz * sinY;
          const rz = cx * sinY + cz * cosY;
          cx = rx;
          cz = rz;
        }
        // Rotate point around camera X axis (vertical tilt)
        if (camera.rotX !== 0) {
          const cosX = Math.cos(camera.rotX);
          const sinX = Math.sin(camera.rotX);
          const ry = cy * cosX - cz * sinX;
          const rz = cy * sinX + cz * cosX;
          cy = ry;
          cz = rz;
        }

        // Camera looks at negative Z axis. Distance is -cz.
        const distance = -cz;
        if (distance <= 40) return null; // clipped/behind camera

        const scale = camera.fov / distance;
        const screenX = cx * scale + width / 2;
        const screenY = cy * scale + height / 2;

        return { x: screenX, y: screenY, scale, depth: distance };
      };

      // Project World Space coordinates to Screen Space
      const projectWorld = (wx, wy, wz) => {
        let cx = wx - camera.x;
        let cy = wy - camera.y;
        let cz = wz - camera.z;

        if (camera.rotY !== 0) {
          const cosY = Math.cos(camera.rotY);
          const sinY = Math.sin(camera.rotY);
          const rx = cx * cosY - cz * sinY;
          const rz = cx * sinY + cz * cosY;
          cx = rx;
          cz = rz;
        }
        if (camera.rotX !== 0) {
          const cosX = Math.cos(camera.rotX);
          const sinX = Math.sin(camera.rotX);
          const ry = cy * cosX - cz * sinX;
          const rz = cy * sinX + cz * cosX;
          cy = ry;
          cz = rz;
        }

        const distance = -cz;
        if (distance <= 40) return null;

        const scale = camera.fov / distance;
        return {
          x: cx * scale + width / 2,
          y: cy * scale + height / 2,
          scale,
          depth: distance
        };
      };

      // Get interpolated window coordinates based on active scroll section
      const getEditorState = () => {
        const isMobile = width < 768;

        // Configuration sets: pos (x, y, z), rot (rx, ry, rz), browser split percentage
        const config = [
          { // 0: Hero (Centered, typing)
            pos: { x: 0, y: 15, z: 0 },
            rot: { x: 0.08, y: -0.20, z: -0.01 },
            split: 0
          },
          { // 1: About (Shifted right, side rotation bezel visible)
            pos: { x: width * 0.17, y: -25, z: -80 },
            rot: { x: 0.12, y: -0.46, z: 0.04 },
            split: 0
          },
          { // 2: Services (Shifted left, console typing terminal compiling)
            pos: { x: -width * 0.17, y: 30, z: -70 },
            rot: { x: -0.06, y: 0.40, z: -0.04 },
            split: 0
          },
          { // 3: Projects (Double panel layout split)
            pos: { x: -width * 0.19, y: -5, z: -40 },
            rot: { x: 0.05, y: 0.20, z: 0.02 },
            split: 1.0
          },
          { // 4: Contact (Cyber console bottom-stage zoom-out)
            pos: { x: 0, y: -130, z: 220 },
            rot: { x: 0.65, y: -0.28, z: 0.12 },
            split: 0
          }
        ];

        // Adaptive styling metrics for mobile viewports
        if (isMobile) {
          config[0].pos = { x: 0, y: 70, z: 80 };
          config[0].rot = { x: 0.04, y: -0.06, z: 0.0 };

          config[1].pos = { x: 0, y: 110, z: 120 };
          config[1].rot = { x: 0.06, y: -0.10, z: 0.01 };

          config[2].pos = { x: 0, y: 120, z: 120 };
          config[2].rot = { x: -0.04, y: 0.10, z: -0.01 };

          config[3].pos = { x: 0, y: 140, z: 100 };
          config[3].rot = { x: 0.03, y: 0.05, z: 0.0 };
          config[3].split = 0.5; // half-width overlay split on mobile

          config[4].pos = { x: 0, y: 100, z: 190 };
          config[4].rot = { x: 0.30, y: -0.08, z: 0.03 };
        }

        let idx = 0;
        let t = 0;

        if (scrollPercent <= 0.15) {
          return config[0];
        } else if (scrollPercent <= 0.40) {
          idx = 0;
          t = (scrollPercent - 0.15) / 0.25;
        } else if (scrollPercent <= 0.65) {
          idx = 1;
          t = (scrollPercent - 0.40) / 0.25;
        } else if (scrollPercent <= 0.85) {
          idx = 2;
          t = (scrollPercent - 0.65) / 0.20;
        } else {
          idx = 3;
          t = Math.min(1, (scrollPercent - 0.85) / 0.15);
        }

        const k1 = config[idx];
        const k2 = config[idx + 1];

        // Smooth cubic interpolation curves
        const ease = t * t * (3 - 2 * t);

        return {
          pos: {
            x: interpolate(k1.pos.x, k2.pos.x, ease),
            y: interpolate(k1.pos.y, k2.pos.y, ease),
            z: interpolate(k1.pos.z, k2.pos.z, ease)
          },
          rot: {
            x: interpolate(k1.rot.x, k2.rot.x, ease),
            y: interpolate(k1.rot.y, k2.rot.y, ease),
            z: interpolate(k1.rot.z, k2.rot.z, ease)
          },
          split: interpolate(k1.split, k2.split, ease)
        };
      };

      const editorState = getEditorState();

      // Project drawing configurations for elements
      const project = (lx, ly, lz) => {
        return projectPoint(lx, ly, lz, editorState.pos, editorState.rot);
      };

      // ----------------------------------------------------
      // DRAW 1. FLOATING WORLD BACKGROUND NODES
      // ----------------------------------------------------
      backgroundNodes.forEach(node => {
        node.y -= node.speed;
        if (node.y < -400) node.y = 400; // Loop vertically
        node.z += Math.sin(time * node.rotSpeed) * 0.2;

        const p = projectWorld(node.x, node.y, node.z);
        if (!p || p.scale < 0.1) return;

        // Draw symbol
        ctx.fillStyle = node.color;
        ctx.font = `${Math.floor(10 * p.scale)}px monospace`;
        ctx.fillText(node.symbol, p.x, p.y);

        // Connections to other nearby nodes
        backgroundNodes.forEach(n2 => {
          if (n2 === node) return;
          const dx = n2.x - node.x;
          const dy = n2.y - node.y;
          const dz = n2.z - node.z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist < 150) {
            const p2 = projectWorld(n2.x, n2.y, n2.z);
            if (p2) {
              const alpha = (1 - dist / 150) * 0.05 * p.scale;
              ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
              ctx.lineWidth = 0.5 * p.scale;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });

      // ----------------------------------------------------
      // DRAW PANEL REUSABLE HELPER
      // ----------------------------------------------------
      const drawPanel = (x1, y1, x2, y2, z, fillColor, borderColor, projFunc = project) => {
        const c0 = projFunc(x1, y1, z);
        const c1 = projFunc(x2, y1, z);
        const c2 = projFunc(x2, y2, z);
        const c3 = projFunc(x1, y2, z);
        if (!c0 || !c1 || !c2 || !c3) return;

        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(c0.x, c0.y);
        ctx.lineTo(c1.x, c1.y);
        ctx.lineTo(c2.x, c2.y);
        ctx.lineTo(c3.x, c3.y);
        ctx.closePath();
        ctx.fill();

        if (borderColor) {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.8 * c0.scale;
          ctx.beginPath();
          ctx.moveTo(c0.x, c0.y);
          ctx.lineTo(c1.x, c1.y);
          ctx.lineTo(c2.x, c2.y);
          ctx.lineTo(c3.x, c3.y);
          ctx.closePath();
          ctx.stroke();
        }
      };

      // ----------------------------------------------------
      // DRAW TEXT REUSABLE HELPER
      // ----------------------------------------------------
      const drawText = (txt, lx, ly, lz, color, fontSize = 10, align = 'left', bold = false, projFunc = project) => {
        const p = projFunc(lx, ly, lz);
        if (!p || p.scale < 0.15) return;

        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.font = `${bold ? 'bold' : ''} ${Math.floor(fontSize * p.scale)}px Courier, monospace`;
        ctx.fillText(txt, p.x, p.y);
      };

      const drawCircle = (lx, ly, lz, radius, fillColor, shadowColor, projFunc = project) => {
        const p = projFunc(lx, ly, lz);
        if (!p) return;

        ctx.fillStyle = fillColor;
        if (shadowColor && p.scale > 0.4) {
          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = 10 * p.scale;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * p.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      };

      // ----------------------------------------------------
      // DRAW 2. CODE EDITOR 3D WINDOW RENDER
      // ----------------------------------------------------
      const pt_editor = [
        // Front corners
        { x: -W_editor/2, y: -H_editor/2, z: 0 },
        { x: W_editor/2, y: -H_editor/2, z: 0 },
        { x: W_editor/2, y: H_editor/2, z: 0 },
        { x: -W_editor/2, y: H_editor/2, z: 0 },
        // Back corners
        { x: -W_editor/2, y: -H_editor/2, z: -D_editor },
        { x: W_editor/2, y: -H_editor/2, z: -D_editor },
        { x: W_editor/2, y: H_editor/2, z: -D_editor },
        { x: -W_editor/2, y: H_editor/2, z: -D_editor }
      ];

      const projEditor = pt_editor.map(p => project(p.x, p.y, p.z));

      const isClipped = projEditor.some(p => p === null);

      if (!isClipped) {
        // 1. Back Plate
        ctx.fillStyle = '#05070c';
        ctx.beginPath();
        ctx.moveTo(projEditor[4].x, projEditor[4].y);
        ctx.lineTo(projEditor[5].x, projEditor[5].y);
        ctx.lineTo(projEditor[6].x, projEditor[6].y);
        ctx.lineTo(projEditor[7].x, projEditor[7].y);
        ctx.closePath();
        ctx.fill();

        // 2. Bezel Side Panels (extrusions)
        // Left
        ctx.fillStyle = '#0a101b';
        ctx.beginPath();
        ctx.moveTo(projEditor[7].x, projEditor[7].y);
        ctx.lineTo(projEditor[4].x, projEditor[4].y);
        ctx.lineTo(projEditor[0].x, projEditor[0].y);
        ctx.lineTo(projEditor[3].x, projEditor[3].y);
        ctx.closePath();
        ctx.fill();

        // Right
        ctx.fillStyle = '#060a12';
        ctx.beginPath();
        ctx.moveTo(projEditor[5].x, projEditor[5].y);
        ctx.lineTo(projEditor[6].x, projEditor[6].y);
        ctx.lineTo(projEditor[2].x, projEditor[2].y);
        ctx.lineTo(projEditor[1].x, projEditor[1].y);
        ctx.closePath();
        ctx.fill();

        // Top
        ctx.fillStyle = '#111b2b';
        ctx.beginPath();
        ctx.moveTo(projEditor[4].x, projEditor[4].y);
        ctx.lineTo(projEditor[5].x, projEditor[5].y);
        ctx.lineTo(projEditor[1].x, projEditor[1].y);
        ctx.lineTo(projEditor[0].x, projEditor[0].y);
        ctx.closePath();
        ctx.fill();

        // Bottom
        ctx.fillStyle = '#04060a';
        ctx.beginPath();
        ctx.moveTo(projEditor[3].x, projEditor[3].y);
        ctx.lineTo(projEditor[2].x, projEditor[2].y);
        ctx.lineTo(projEditor[6].x, projEditor[6].y);
        ctx.lineTo(projEditor[7].x, projEditor[7].y);
        ctx.closePath();
        ctx.fill();

        // 3. Front Face Window Frame & Main Panels
        // Workspace body (Navy obsidian)
        drawPanel(-W_editor/2, -H_editor/2, W_editor/2, H_editor/2, 0, '#0b1424', 'rgba(0, 242, 255, 0.1)');

        // Title Header Bar
        drawPanel(-W_editor/2, -H_editor/2, W_editor/2, -H_editor/2 + 28, 0, '#070c14', '#162235');

        // Window red/yellow/green control lights
        drawCircle(-W_editor/2 + 16, -H_editor/2 + 14, 0, 3.8, '#ff5f56', 'rgba(255, 95, 86, 0.4)');
        drawCircle(-W_editor/2 + 27, -H_editor/2 + 14, 0, 3.8, '#ffbd2e', 'rgba(255, 189, 46, 0.4)');
        drawCircle(-W_editor/2 + 38, -H_editor/2 + 14, 0, 3.8, '#27c93f', 'rgba(39, 201, 63, 0.4)');

        // Header Title text
        drawText('src/components/About.jsx - Editor', 0, -H_editor/2 + 18, 0, '#8fbcbb', 9, 'center', true);

        // Sidebar Panel (File tree)
        drawPanel(-W_editor/2, -H_editor/2 + 28, -W_editor/2 + 120, H_editor/2 - 20, 0, '#050912', '#162235');

        // Sidebar Directory Contents
        let sbY = -H_editor/2 + 45;
        const dirList = [
          { text: '📁 src', color: '#8fbcbb' },
          { text: '  📁 components', color: '#8fbcbb' },
          { text: '    📄 Hero.jsx', color: '#a3be8c' },
          { text: '    📄 About.jsx', color: '#00f2ff', active: true },
          { text: '    📄 Services.jsx', color: '#a3be8c' },
          { text: '  📄 App.jsx', color: '#a3be8c' },
          { text: '  📄 index.css', color: '#88c0d0' },
          { text: '📄 package.json', color: '#b48ead' }
        ];
        dirList.forEach(item => {
          if (item.active) {
            drawPanel(-W_editor/2 + 4, sbY - 9, -W_editor/2 + 116, sbY + 4, 0, 'rgba(0, 242, 255, 0.1)', 'rgba(0, 242, 255, 0.22)');
          }
          drawText(item.text, -W_editor/2 + 10, sbY, 0, item.color, 9, 'left', item.active);
          sbY += 16;
        });

        // Tab menu on top of code body
        const tabX = -W_editor/2 + 120;
        const tabY = -H_editor/2 + 28;
        drawPanel(tabX, tabY, W_editor/2, tabY + 20, 0, '#070c14', '#162235');
        // App.jsx tab active
        drawPanel(tabX, tabY, tabX + 75, tabY + 20, 0, '#0b1424', '#162235');
        drawPanel(tabX, tabY, tabX + 75, tabY + 2, 0, '#00f2ff', null);
        drawText('About.jsx', tabX + 10, tabY + 13, 0, '#ffffff', 8.5);
        drawText('×', tabX + 63, tabY + 13, 0, '#00f2ff', 9.5);

        // index.css tab inactive
        drawText('index.css', tabX + 85, tabY + 13, 0, '#abb2bf', 8.5);

        // Render code lines (Workspace)
        const startX = -W_editor/2 + 152;
        let codeY = -H_editor/2 + 62;
        const activeCode = (scrollPercent < 0.20)
          ? getTypedLines(codeAppJsx, charsTyped)
          : codeAppJsx;

        activeCode.forEach((line, lineIdx) => {
          // Draw line number
          drawText(String(lineIdx + 1).padStart(2, ' '), startX - 22, codeY, 0, '#4b5263', 9.5);

          // Highlights line
          const tokens = tokenizeLine(line);
          let tkX = startX;
          const charW = 5.6; // local width spacing per character

          tokens.forEach(tok => {
            drawText(tok.text, tkX, codeY, 0, tok.color, 9.5);
            tkX += tok.text.length * charW;
          });

          // Draw blinking typing cursor on Hero
          if (scrollPercent < 0.20 && lineIdx === activeCode.length - 1) {
            const cursorX = startX + line.length * charW;
            if (Math.floor(time / 20) % 2 === 0) {
              drawText('|', cursorX, codeY, 0, '#00f2ff', 10, 'left', true);
            }
          }
          codeY += 14.5;
        });

        // ----------------------------------------------------
        // MOCK COMPILATION TERMINAL LOGGER (Services)
        // ----------------------------------------------------
        // Drawer opens at H_editor/2 - 80
        const termY1 = H_editor/2 - 80;
        const termY2 = H_editor/2 - 20;
        drawPanel(-W_editor/2 + 120, termY1, W_editor/2, termY2, 0, '#04060c', '#162235');

        // Draw logs based on Services compile progress timer
        let logs = [];
        if (compileTimer > 0) {
          logs.push({ text: '➜  landing_page_dev git:(master) npm run build', color: '#00f2ff' });
          if (compileTimer > 25) logs.push({ text: '   vite v6.0.2 building for production...', color: '#abb2bf' });
          if (compileTimer > 60) logs.push({ text: '   ✓ 28 modules transformed.', color: '#a3be8c' });
          if (compileTimer > 95) logs.push({ text: '   dist/assets/index-D5f9G1.js  145.2 kB │ gzip: 42.1 kB', color: '#abb2bf' });
          if (compileTimer > 120) logs.push({ text: '   ✔ compiled successfully in 320ms.', color: '#00f2ff', bold: true });
        } else {
          // Static local dev ready logs
          logs = [
            { text: '➜  landing_page_dev git:(master) npm run dev', color: '#abb2bf' },
            { text: '   Vite v6.0.2 ready in 154 ms', color: '#5c6370' },
            { text: '   ➜  Local:   http://localhost:5173/my-landing-page/', color: '#00f2ff' },
            { text: '   ✔ HMR hot updates active', color: '#a3be8c' }
          ];
        }

        let lY = termY1 + 12;
        logs.slice(-4).forEach(log => {
          drawText(log.text, -W_editor/2 + 128, lY, 0, log.color, 8.5, 'left', log.bold);
          lY += 12;
        });

        // Status bar panel
        drawPanel(-W_editor/2, H_editor/2 - 20, W_editor/2, H_editor/2, 0, '#060a12', '#162235');
        drawText('⚙ master', -W_editor/2 + 10, H_editor/2 - 6, 0, '#8fbcbb', 8.5);
        drawText('UTF-8', W_editor/2 - 90, H_editor/2 - 6, 0, '#8fbcbb', 8.5);
        drawText('React 19.2', W_editor/2 - 45, H_editor/2 - 6, 0, '#00f2ff', 8.5, 'left', true);

        // Neon outline overlay borders
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.28)';
        ctx.lineWidth = 1.2 * projEditor[0].scale;
        ctx.shadowColor = '#00f2ff';
        ctx.shadowBlur = 12 * projEditor[0].scale;
        ctx.beginPath();
        ctx.moveTo(projEditor[0].x, projEditor[0].y);
        ctx.lineTo(projEditor[1].x, projEditor[1].y);
        ctx.lineTo(projEditor[2].x, projEditor[2].y);
        ctx.lineTo(projEditor[3].x, projEditor[3].y);
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // ----------------------------------------------------
      // DRAW 3. WEB PREVIEW BROWSER 3D WINDOW (Projects)
      // ----------------------------------------------------
      if (editorState.split > 0.05) {
        const splitVal = editorState.split;

        // Position Browser window in tandem next to Editor
        const pos_b = {
          x: editorState.pos.x + W_editor * 0.58 * splitVal,
          y: editorState.pos.y + 12 * splitVal,
          z: editorState.pos.z - 20 * splitVal
        };

        const rot_b = {
          x: editorState.rot.x,
          y: editorState.rot.y - 0.28 * splitVal,
          z: editorState.rot.z
        };

        // Project coordinate using Browser state
        const projectB = (lx, ly, lz) => {
          return projectPoint(lx, ly, lz, pos_b, rot_b);
        };

        const pt_browser = [
          // Front corners
          { x: -W_browser/2, y: -H_browser/2, z: 0 },
          { x: W_browser/2, y: -H_browser/2, z: 0 },
          { x: W_browser/2, y: H_browser/2, z: 0 },
          { x: -W_browser/2, y: H_browser/2, z: 0 },
          // Back corners
          { x: -W_browser/2, y: -H_browser/2, z: -D_browser },
          { x: W_browser/2, y: -H_browser/2, z: -D_browser },
          { x: W_browser/2, y: H_browser/2, z: -D_browser },
          { x: -W_browser/2, y: H_browser/2, z: -D_browser }
        ];

        const projBrowser = pt_browser.map(p => projectB(p.x, p.y, p.z));

        const isBClipped = projBrowser.some(p => p === null);

        if (!isBClipped) {
          // 1. Back Plate
          ctx.fillStyle = '#04050a';
          ctx.beginPath();
          ctx.moveTo(projBrowser[4].x, projBrowser[4].y);
          ctx.lineTo(projBrowser[5].x, projBrowser[5].y);
          ctx.lineTo(projBrowser[6].x, projBrowser[6].y);
          ctx.lineTo(projBrowser[7].x, projBrowser[7].y);
          ctx.closePath();
          ctx.fill();

          // 2. Bezel Side Panels
          // Left
          ctx.fillStyle = '#080c14';
          ctx.beginPath();
          ctx.moveTo(projBrowser[7].x, projBrowser[7].y);
          ctx.lineTo(projBrowser[4].x, projBrowser[4].y);
          ctx.lineTo(projBrowser[0].x, projBrowser[0].y);
          ctx.lineTo(projBrowser[3].x, projBrowser[3].y);
          ctx.closePath();
          ctx.fill();

          // Right
          ctx.fillStyle = '#05070d';
          ctx.beginPath();
          ctx.moveTo(projBrowser[5].x, projBrowser[5].y);
          ctx.lineTo(projBrowser[6].x, projBrowser[6].y);
          ctx.lineTo(projBrowser[2].x, projBrowser[2].y);
          ctx.lineTo(projBrowser[1].x, projBrowser[1].y);
          ctx.closePath();
          ctx.fill();

          // Top
          ctx.fillStyle = '#0f1725';
          ctx.beginPath();
          ctx.moveTo(projBrowser[4].x, projBrowser[4].y);
          ctx.lineTo(projBrowser[5].x, projBrowser[5].y);
          ctx.lineTo(projBrowser[1].x, projBrowser[1].y);
          ctx.lineTo(projBrowser[0].x, projBrowser[0].y);
          ctx.closePath();
          ctx.fill();

          // Bottom
          ctx.fillStyle = '#030407';
          ctx.beginPath();
          ctx.moveTo(projBrowser[3].x, projBrowser[3].y);
          ctx.lineTo(projBrowser[2].x, projBrowser[2].y);
          ctx.lineTo(projBrowser[6].x, projBrowser[6].y);
          ctx.lineTo(projBrowser[7].x, projBrowser[7].y);
          ctx.closePath();
          ctx.fill();

          // 3. Front Window Panel
          drawPanel(-W_browser/2, -H_browser/2, W_browser/2, H_browser/2, 0, '#060a12', 'rgba(255, 170, 0, 0.1)', projectB);

          // Browser Header
          drawPanel(-W_browser/2, -H_browser/2, W_browser/2, -H_browser/2 + 25, 0, '#04060c', '#162235', projectB);

          // Back/Forward/Reload symbols
          drawText('← → ↻', -W_browser/2 + 10, -H_browser/2 + 16, 0, '#8fbcbb', 9, 'left', false, projectB);

          // URL Address Bar
          drawPanel(-W_browser/2 + 65, -H_browser/2 + 5, W_browser/2 - 15, -H_browser/2 + 20, 0, '#090f1a', '#1d2c42', projectB);
          drawCircle(-W_browser/2 + 73, -H_browser/2 + 12.5, 0, 2, '#27c93f', null, projectB); // Secure green padlock
          drawText('https://arcova.io/dashboard', -W_browser/2 + 82, -H_browser/2 + 15, 0, '#88c0d0', 7.5, 'left', false, projectB);

          // ----------------------------------------------------
          // DRAW BUILDING CAD SIMULATION MODEL (Inside Browser)
          // ----------------------------------------------------
          const bAngle = time * 0.012; // slow horizontal rotate
          const projBuilding = buildingVertices.map(v => {
            const rot = rotateY(v, bAngle);
            return projectB(rot.x, rot.y, rot.z);
          });

          // Draw building connections
          ctx.lineWidth = 0.7;
          buildingLines.forEach(([i1, i2]) => {
            const p1 = projBuilding[i1];
            const p2 = projBuilding[i2];
            if (!p1 || !p2) return;

            // Gradient line representing active CAD wireframe
            ctx.strokeStyle = `rgba(255, 170, 0, ${0.36 * p1.scale})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          });

          // Draw building structural nodes (dots)
          projBuilding.forEach(p => {
            if (!p) return;
            ctx.fillStyle = '#ffaa00';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.8 * p.scale, 0, Math.PI * 2);
            ctx.fill();
          });

          // Floating Dashboard Analytics details
          drawText('BIM STRUCTURAL SIMULATOR v1.0', -W_browser/2 + 15, -H_browser/2 + 42, 0, 'rgba(255, 170, 0, 0.7)', 8, 'left', true, projectB);
          drawPanel(-W_browser/2 + 15, -H_browser/2 + 48, -W_browser/2 + 120, -H_browser/2 + 70, 0, 'rgba(255, 170, 0, 0.06)', 'rgba(255, 170, 0, 0.15)', projectB);
          drawText('LOAD: ACTIVE 98%', -W_browser/2 + 20, -H_browser/2 + 58, 0, '#ffaa00', 7, 'left', true, projectB);
          drawText('FPS: 60.0 STABLE', -W_browser/2 + 20, -H_browser/2 + 66, 0, '#27c93f', 7, 'left', true, projectB);

          // Neon amber borders for Browser
          ctx.strokeStyle = 'rgba(255, 170, 0, 0.28)';
          ctx.lineWidth = 1.2 * projBrowser[0].scale;
          ctx.shadowColor = '#ffaa00';
          ctx.shadowBlur = 12 * projBrowser[0].scale;
          ctx.beginPath();
          ctx.moveTo(projBrowser[0].x, projBrowser[0].y);
          ctx.lineTo(projBrowser[1].x, projBrowser[1].y);
          ctx.lineTo(projBrowser[2].x, projBrowser[2].y);
          ctx.lineTo(projBrowser[3].x, projBrowser[3].y);
          ctx.closePath();
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        }

        // ----------------------------------------------------
        // DRAW FLOWING LASER ENERGY BEAMS (Code to Preview)
        // ----------------------------------------------------
        // Spawn beam trigger ticker
        if (time % 35 === 0 && laserBeams.length < 4) {
          laserBeams.push({
            progress: 0,
            yStart: (Math.random() - 0.5) * 160,
            yEnd: (Math.random() - 0.5) * 140,
            speed: 0.015 + Math.random() * 0.02
          });
        }

        // Draw and update active laser beams
        laserBeams = laserBeams.filter(beam => {
          beam.progress += beam.speed;
          if (beam.progress >= 1.0) return false; // dead

          // Start relative to Editor local coords
          const editorLocal = { x: W_editor/2 - 10, y: beam.yStart, z: 0 };
          const worldStart = localToWorld(editorLocal.x, editorLocal.y, editorLocal.z, editorState.pos, editorState.rot);

          // End relative to Browser local coords
          const browserLocal = { x: -W_browser/2 + 10, y: beam.yEnd, z: 0 };
          const worldEnd = localToWorld(browserLocal.x, browserLocal.y, browserLocal.z, pos_b, rot_b);

          // Interpolated world coordinates
          const wx = interpolate(worldStart.x, worldEnd.x, beam.progress);
          const wy = interpolate(worldStart.y, worldEnd.y, beam.progress);
          const wz = interpolate(worldStart.z, worldEnd.z, beam.progress);

          // Project world coordinates
          const p = projectWorld(wx, wy, wz);
          if (p) {
            const alpha = Math.sin(beam.progress * Math.PI) * 0.7; // fade at ends
            ctx.fillStyle = `rgba(0, 242, 255, ${alpha})`;
            ctx.shadowColor = '#00f2ff';
            ctx.shadowBlur = 8 * p.scale;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3.5 * p.scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw a trailing laser vector tail
            const pPrev = projectWorld(
              interpolate(worldStart.x, worldEnd.x, Math.max(0, beam.progress - 0.06)),
              interpolate(worldStart.y, worldEnd.y, Math.max(0, beam.progress - 0.06)),
              interpolate(worldStart.z, worldEnd.z, Math.max(0, beam.progress - 0.06))
            );
            if (pPrev) {
              ctx.strokeStyle = `rgba(0, 242, 255, ${alpha * 0.45})`;
              ctx.lineWidth = 2.2 * p.scale;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pPrev.x, pPrev.y);
              ctx.stroke();
            }
          }
          return true;
        });
      }

      animId = requestAnimationFrame(animate);
    };

    // Calculate World Coordinate relative to window space rotations
    const localToWorld = (lx, ly, lz, pos, rot) => {
      let x = lx;
      let y = ly;
      let z = lz;

      if (rot.y !== 0) {
        const cosY = Math.cos(rot.y);
        const sinY = Math.sin(rot.y);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        x = x1;
        z = z1;
      }
      if (rot.x !== 0) {
        const cosX = Math.cos(rot.x);
        const sinX = Math.sin(rot.x);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        y = y1;
        z = z1;
      }
      if (rot.z !== 0) {
        const cosZ = Math.cos(rot.z);
        const sinZ = Math.sin(rot.z);
        const x1 = x * cosZ - y * sinZ;
        const y1 = x * sinZ + y * cosZ;
        x = x1;
        y = y1;
      }

      return {
        x: x + pos.x,
        y: y + pos.y,
        z: z + pos.z
      };
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#070a12' }}
    />
  );
};

export default Dev3DBackground;
