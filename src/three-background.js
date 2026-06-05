// src/three-background.js
export function initBackground() {
  // Wait for DOM
  const canvas = document.getElementById('three-bg');
  if (!canvas) return;

  // Detect mobile
  const isMobile = window.innerWidth < 768;
  let PCOUNT = 1800;
  
  // Building data
  const buildingData = [
    {x:-10,z:-10,w:2,h:10,d:2}, {x:-7,z:-15,w:1.5,h:14,d:1.5},
    {x:-4,z:-20,w:1,h:8,d:1},   {x:0,z:-25,w:3.5,h:20,d:3.5},
    {x:4,z:-18,w:2,h:13,d:2},   {x:7,z:-12,w:1.5,h:9,d:1.5},
    {x:10,z:-16,w:2,h:15,d:2},  {x:-13,z:-22,w:2.5,h:11,d:2.5},
    {x:13,z:-20,w:2,h:12,d:2},  {x:-6,z:-28,w:1.5,h:18,d:1.5},
    {x:6,z:-24,w:2,h:16,d:2},   {x:-3,z:-35,w:4,h:24,d:4}
  ];

  const renderer = new window.THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x040d18, 1);

  const scene = new window.THREE.Scene();
  scene.fog = new window.THREE.FogExp2(0x040d18, 0.022);

  const camera = new window.THREE.PerspectiveCamera(
    65, window.innerWidth / window.innerHeight, 0.1, 500
  );
  camera.position.set(0, 4, 12);
  camera.lookAt(0, 0, 0);

  const state = {
    mx:0, my:0, tmx:0, tmy:0,
    scroll:0, tscroll:0, time:0
  };

  // ── GRID FLOOR
  const gridHelper = new window.THREE.GridHelper(
    80, 40, 0x00d4ff, 0x00d4ff
  );
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.06;
  gridHelper.material.blending = window.THREE.AdditiveBlending;
  gridHelper.position.y = -2;
  scene.add(gridHelper);

  // Extra perspective lines toward horizon
  const lineGroup = new window.THREE.Group();
  for (let i = -10; i <= 10; i++) {
    const pts = [
      new window.THREE.Vector3(i * 2, -2, 10),
      new window.THREE.Vector3(i * 0.5, -2, -60)
    ];
    const geo = new window.THREE.BufferGeometry()
      .setFromPoints(pts);
    const mat = new window.THREE.LineBasicMaterial({
      color: 0x00d4ff, transparent: true,
      opacity: 0.04 + Math.abs(i/10) * 0.02,
      blending: window.THREE.AdditiveBlending
    });
    lineGroup.add(new window.THREE.Line(geo, mat));
  }
  scene.add(lineGroup);

  // ── CRANE (right side hero element)
  const craneMat = new window.THREE.LineBasicMaterial({
    color: 0xc8a060, transparent: true,
    opacity: 0.35, blending: window.THREE.AdditiveBlending
  });
  function craneLine(x1,y1,z1,x2,y2,z2) {
    const pts = [
      new window.THREE.Vector3(x1,y1,z1),
      new window.THREE.Vector3(x2,y2,z2)
    ];
    return new window.THREE.Line(
      new window.THREE.BufferGeometry().setFromPoints(pts),
      craneMat
    );
  }
  const craneGroup = new window.THREE.Group();
  craneGroup.add(craneLine(0,-2,0, 0,10,0));
  craneGroup.add(craneLine(0,10,0, 8,10,0));
  craneGroup.add(craneLine(0,10,0, -4,10,0));
  craneGroup.add(craneLine(0,10,0, 7,7,0));
  craneGroup.add(craneLine(8,10,0, 7,7,0));
  craneGroup.add(craneLine(-1,-2,0, -1.5,4,0));
  craneGroup.add(craneLine(1,-2,0, 1.5,4,0));
  craneGroup.add(craneLine(6,10,0, 6,4,0));
  craneGroup.position.set(9, 0, -3);

  // Mobile optimization
  if (isMobile) {
    PCOUNT = 400;          // instead of 1800
    buildingData.splice(6); // only 6 buildings
    renderer.setPixelRatio(1); // no retina on mobile
  } else {
    scene.add(craneGroup);  // add crane only on desktop
  }

  // ── BUILDINGS (wireframe boxes)
  const buildingGroup = new window.THREE.Group();
  buildingData.forEach(b => {
    const geo = new window.THREE.BoxGeometry(b.w, b.h, b.d);
    const edges = new window.THREE.EdgesGeometry(geo);
    const opacity = 0.06 + Math.random() * 0.08;
    const mat = new window.THREE.LineBasicMaterial({
      color: 0x00d4ff, transparent: true,
      opacity, blending: window.THREE.AdditiveBlending
    });
    const mesh = new window.THREE.LineSegments(edges, mat);
    mesh.position.set(b.x, b.h/2 - 2, b.z);
    buildingGroup.add(mesh);

    // Orange windows
    for (let w = 0; w < 6; w++) {
      const wgeo = new window.THREE.PlaneGeometry(0.25, 0.15);
      const wmat = new window.THREE.MeshBasicMaterial({
        color: 0xff8c00, transparent: true,
        opacity: 0.4 + Math.random() * 0.3,
        blending: window.THREE.AdditiveBlending,
        side: window.THREE.DoubleSide
      });
      const win = new window.THREE.Mesh(wgeo, wmat);
      win.position.set(
        b.x + (Math.random()-0.5) * b.w * 0.6,
        b.h/2 - 2 + (Math.random()-0.5) * b.h * 0.7,
        b.z + b.d/2 + 0.01
      );
      buildingGroup.add(win);
    }
  });
  scene.add(buildingGroup);

  // Crane tip light
  let craneLight;
  if (!isMobile) {
    craneLight = new window.THREE.PointLight(0x00d4ff, 1.5, 10);
    craneLight.position.set(9, 10, -3);
    scene.add(craneLight);
  }

  // ── PARTICLES
  const pPos = new Float32Array(PCOUNT * 3);
  const pSpd = new Float32Array(PCOUNT);
  for (let i = 0; i < PCOUNT; i++) {
    pPos[i*3]   = (Math.random()-0.5) * 50;
    pPos[i*3+1] = (Math.random()-0.5) * 25;
    pPos[i*3+2] = (Math.random()-0.5) * 50;
    pSpd[i] = 0.003 + Math.random() * 0.007;
  }
  const pGeo = new window.THREE.BufferGeometry();
  pGeo.setAttribute('position',
    new window.THREE.BufferAttribute(pPos, 3));
  const pMat = new window.THREE.PointsMaterial({
    color: 0x00d4ff, size: 0.07, transparent: true,
    opacity: 0.5, blending: window.THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  const particles = new window.THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ── LIGHT RAYS (stadium floodlights)
  [[-8, -1.5, -5], [8, -1.5, -5], [0, -1.5, -12]].forEach(([x,y,z]) => {
    const light = new window.THREE.PointLight(0xff8c00, 0.6, 20);
    light.position.set(x, y, z);
    scene.add(light);
  });
  scene.add(new window.THREE.AmbientLight(0x001133, 0.4));

  // ── HORIZON GLOW plane
  const glowGeo = new window.THREE.PlaneGeometry(120, 30);
  const glowMat = new window.THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new window.THREE.Color(0x00d4ff) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float d = distance(vUv, vec2(0.5, 0.0));
        float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * 0.06;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true, depthWrite: false,
    blending: window.THREE.AdditiveBlending, side: window.THREE.DoubleSide
  });
  const glow = new window.THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = -Math.PI / 2;
  glow.position.set(0, -2, -20);
  scene.add(glow);

  // ── EVENT LISTENERS
  document.addEventListener('mousemove', e => {
    state.tmx = (e.clientX/window.innerWidth - 0.5) * 2;
    state.tmy = -(e.clientY/window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    state.tscroll = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    // Just render one static frame, no loop
    renderer.render(scene, camera);
    return;
  }

  // ── ANIMATION LOOP
  function animate() {
    requestAnimationFrame(animate);
    state.time += 0.01;

    // Lerp mouse + scroll
    state.mx += (state.tmx - state.mx) * 0.04;
    state.my += (state.tmy - state.my) * 0.04;
    state.scroll += (state.tscroll - state.scroll) * 0.06;

    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(1, state.scroll / (maxScroll || 1));

    // Camera flies into scene
    camera.position.z = 12 - progress * 22;
    camera.position.y = 4 - progress * 5;
    camera.position.x += (state.mx * 1.5 - camera.position.x) * 0.03;
    camera.rotation.y += (state.mx * 0.06 - camera.rotation.y) * 0.04;
    camera.rotation.x += (-0.1 + state.my * 0.03 - camera.rotation.x) * 0.04;

    // Grid scrolls toward camera (infinite loop feel)
    gridHelper.position.z = (state.time * 0.8) % 2;

    // Particles float up + rain effect
    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < PCOUNT; i++) {
      pos[i*3+1] += pSpd[i];
      if (pos[i*3+1] > 12) pos[i*3+1] = -12;
      // Drift sideways
      pos[i*3] += Math.sin(state.time + i) * 0.0005;
    }
    pGeo.attributes.position.needsUpdate = true;

    // Building group parallax with mouse
    buildingGroup.position.x +=
      (state.mx * 0.6 - buildingGroup.position.x) * 0.02;

    // Crane sway
    if (!isMobile) {
      craneGroup.rotation.y = Math.sin(state.time * 0.4) * 0.015;
      if (craneLight) {
        craneLight.intensity = 1.0 + Math.sin(state.time * 2.5) * 0.5;
      }
    }

    // Particles rotation (slow drift)
    particles.rotation.y = state.time * 0.008;

    // FOV breathes on fast scroll
    const vel = Math.abs(state.tscroll - state.scroll);
    camera.fov = 65 + vel * 0.003;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }
  animate();
}
