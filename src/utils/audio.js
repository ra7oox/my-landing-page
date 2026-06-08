// Programmatic Sound Design using Web Audio API

let audioCtx = null;
let ambientOsc = null;
let ambientGain = null;
let soundInterval = null;

export const initAudio = () => {
  if (audioCtx) return;

  // Create Audio Context (standard cross-browser)
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  audioCtx = new AudioContext();

  // 1. Create Ambient Low-Frequency Space Drone
  ambientOsc = audioCtx.createOscillator();
  ambientOsc.type = 'sawtooth';
  ambientOsc.frequency.setValueAtTime(45, audioCtx.currentTime); // Low 45Hz drone

  // Create filter to make the drone warm and smooth
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(120, audioCtx.currentTime);

  ambientGain = audioCtx.createGain();
  ambientGain.gain.setValueAtTime(0, audioCtx.currentTime); // Start muted

  // Connect ambient node chain
  ambientOsc.connect(filter);
  filter.connect(ambientGain);
  ambientGain.connect(audioCtx.destination);
  ambientOsc.start();

  // 2. Synthesize periodic "welding spark" sound effects at random intervals
  const playWeldingSpark = () => {
    if (!audioCtx || audioCtx.state === 'suspended' || ambientGain.gain.value === 0) return;

    // Create custom oscillator for spark
    const osc = audioCtx.createOscillator();
    const noiseGain = audioCtx.createGain();
    const sparkFilter = audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    // Random high frequency pitch sweep for sparks
    osc.frequency.setValueAtTime(800 + Math.random() * 2000, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100 + Math.random() * 200, audioCtx.currentTime + 0.35);

    // Bandpass filter for hiss/crackle
    sparkFilter.type = 'bandpass';
    sparkFilter.frequency.setValueAtTime(1800, audioCtx.currentTime);
    sparkFilter.Q.setValueAtTime(4, audioCtx.currentTime);

    // Fast envelope decay
    noiseGain.gain.setValueAtTime(0.04 + Math.random() * 0.04, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);

    osc.connect(sparkFilter);
    sparkFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.45);
  };

  // Trigger sparks every 4 to 8 seconds
  soundInterval = setInterval(() => {
    if (Math.random() > 0.4) {
      playWeldingSpark();
    }
  }, 4500);
};

export const toggleAudio = (unmute) => {
  if (!audioCtx) {
    initAudio();
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (ambientGain) {
    // Smooth transition to avoid pops
    const targetGain = unmute ? 0.08 : 0;
    ambientGain.gain.linearRampToValueAtTime(targetGain, audioCtx.currentTime + 0.2);
  }
};

export const stopAudio = () => {
  if (soundInterval) clearInterval(soundInterval);
  if (ambientOsc) {
    try {
      ambientOsc.stop();
    } catch (e) {}
  }
  audioCtx = null;
};

let hasSpokenWelcome = false;
let lastSpokenLanguage = null;

export const speakRobotWelcome = (lang = 'en', force = false) => {
  if (!('speechSynthesis' in window)) return;

  const savedAudio = localStorage.getItem('audio_prefer');
  if (savedAudio === 'disabled') return;

  if (hasSpokenWelcome && lastSpokenLanguage === lang && !force) return;

  // Cancel previous speech to avoid queue buildup
  window.speechSynthesis.cancel();

  const text = lang === 'ar' ? "مرحباً بكم في آر سفن إكس ديف" : "Welcome to R7x Dev";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'ar' ? 'ar-EG' : 'en-US';

  // Apply parameters for robotic sound
  utterance.pitch = 0.75;
  utterance.rate = 0.9;
  utterance.volume = 1.0;

  utterance.onstart = () => {
    hasSpokenWelcome = true;
    lastSpokenLanguage = lang;
  };

  utterance.onend = () => {
    hasSpokenWelcome = true;
    lastSpokenLanguage = lang;
  };

  window.speechSynthesis.speak(utterance);
  hasSpokenWelcome = true;
  lastSpokenLanguage = lang;
};
