import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const timelineItems = [
  {
    yearEn: '2025 — Present',
    yearAr: '2025 — الآن',
    titleEn: 'Senior Full-Stack Developer',
    titleAr: 'مطوّر Full-Stack أول',
    orgEn: 'Freelance & Remote Projects',
    orgAr: 'مشاريع مستقلة وعن بعد',
    descEn:
      'Building premium digital products for global clients — immersive 3D portfolios, high-conversion SaaS platforms, cross-platform apps, and Python automation systems.',
    descAr:
      'بناء منتجات رقمية راقية لعملاء عالميين — معارض أعمال ثلاثية الأبعاد غامرة، منصات SaaS عالية التحويل، تطبيقات متعددة المنصات، وأنظمة أتمتة بايثون.',
    tagsEn: ['React', 'Three.js', 'Node.js', 'Python'],
    tagsAr: ['React', 'Three.js', 'Node.js', 'Python'],
    accent: 'cyan',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    yearEn: '2024',
    yearAr: '2024',
    titleEn: 'Front-End Specialist',
    titleAr: 'متخصص في تطوير الواجهات',
    orgEn: 'Digital Agency Collaboration',
    orgAr: 'تعاون مع وكالات رقمية',
    descEn:
      'Collaborated with design agencies to deliver pixel-perfect React interfaces. Specialized in Framer Motion animations, WebGL scenes, and responsive design systems.',
    descAr:
      'تعاون مع وكالات تصميم لتسليم واجهات React بدقة بكسل مثالية. متخصص في حركات Framer Motion، ومشاهد WebGL، وأنظمة تصميم متجاوبة.',
    tagsEn: ['Next.js', 'Framer Motion', 'WebGL', 'GSAP'],
    tagsAr: ['Next.js', 'Framer Motion', 'WebGL', 'GSAP'],
    accent: 'amber',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    yearEn: '2023',
    yearAr: '2023',
    titleEn: 'Mobile & Web Developer',
    titleAr: 'مطوّر تطبيقات ويب وهواتف',
    orgEn: 'Independent Projects',
    orgAr: 'مشاريع مستقلة',
    descEn:
      'Launched several React Native apps to iOS & Android markets. Developed full-stack web systems with REST APIs, authentication, and database design.',
    descAr:
      'أطلق عدة تطبيقات React Native على متجري iOS و Android. طوّر أنظمة ويب متكاملة مع REST APIs والمصادقة وتصميم قواعد البيانات.',
    tagsEn: ['React Native', 'PostgreSQL', 'Expo', 'Express'],
    tagsAr: ['React Native', 'PostgreSQL', 'Expo', 'Express'],
    accent: 'violet',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
      </svg>
    ),
  },
  {
    yearEn: '2022',
    yearAr: '2022',
    titleEn: 'Python & Automation Engineer',
    titleAr: 'مهندس بايثون وأتمتة',
    orgEn: 'Data-Driven Projects',
    orgAr: 'مشاريع مدفوعة بالبيانات',
    descEn:
      'Built complex web scrapers, automation bots, and data pipelines using Python. Delivered tools that saved clients hundreds of hours of manual work.',
    descAr:
      'بناء أدوات تجميع بيانات متطورة، روبوتات أتمتة، وخطوط معالجة بيانات باستخدام Python. وفّر لعملائه مئات الساعات من العمل اليدوي.',
    tagsEn: ['Python', 'Selenium', 'BeautifulSoup', 'APIs'],
    tagsAr: ['Python', 'Selenium', 'BeautifulSoup', 'APIs'],
    accent: 'emerald',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
];

const accents = {
  cyan: {
    nodeBg: 'bg-cyan-glow/15',
    nodeBorder: 'border-cyan-glow',
    nodeText: 'text-cyan-glow',
    tag: 'border-cyan-glow/25 text-cyan-glow bg-cyan-glow/5',
    year: 'text-cyan-glow',
    yearBorder: 'border-cyan-glow/30',
    yearBg: 'bg-cyan-glow/8',
    cardBorder: 'border-cyan-glow/20 hover:border-cyan-glow/50',
    cardGlow: 'rgba(0,242,255,0.12)',
    lineColor: '#00f2ff',
    dotGlow: '0 0 12px rgba(0,242,255,0.8), 0 0 24px rgba(0,242,255,0.4)',
  },
  amber: {
    nodeBg: 'bg-amber-glow/15',
    nodeBorder: 'border-amber-glow',
    nodeText: 'text-amber-glow',
    tag: 'border-amber-glow/25 text-amber-glow bg-amber-glow/5',
    year: 'text-amber-glow',
    yearBorder: 'border-amber-glow/30',
    yearBg: 'bg-amber-glow/8',
    cardBorder: 'border-amber-glow/20 hover:border-amber-glow/50',
    cardGlow: 'rgba(255,170,0,0.12)',
    lineColor: '#ffaa00',
    dotGlow: '0 0 12px rgba(255,170,0,0.8), 0 0 24px rgba(255,170,0,0.4)',
  },
  violet: {
    nodeBg: 'bg-violet-glow/15',
    nodeBorder: 'border-violet-glow',
    nodeText: 'text-violet-glow',
    tag: 'border-violet-glow/25 text-violet-glow bg-violet-glow/5',
    year: 'text-violet-glow',
    yearBorder: 'border-violet-glow/30',
    yearBg: 'bg-violet-glow/8',
    cardBorder: 'border-violet-glow/20 hover:border-violet-glow/50',
    cardGlow: 'rgba(168,85,247,0.12)',
    lineColor: '#a855f7',
    dotGlow: '0 0 12px rgba(168,85,247,0.8), 0 0 24px rgba(168,85,247,0.4)',
  },
  emerald: {
    nodeBg: 'bg-emerald-400/15',
    nodeBorder: 'border-emerald-400',
    nodeText: 'text-emerald-400',
    tag: 'border-emerald-400/25 text-emerald-400 bg-emerald-400/5',
    year: 'text-emerald-400',
    yearBorder: 'border-emerald-400/30',
    yearBg: 'bg-emerald-400/8',
    cardBorder: 'border-emerald-400/20 hover:border-emerald-400/50',
    cardGlow: 'rgba(52,211,153,0.12)',
    lineColor: '#34d399',
    dotGlow: '0 0 12px rgba(52,211,153,0.8), 0 0 24px rgba(52,211,153,0.4)',
  },
};

const Timeline = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--bg, #070a12)' }}
    >
      {/* Solid dark base */}
      <div className="absolute inset-0 bg-[#070a12]/95 z-0 pointer-events-none" />
      {/* Subtle hex grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#34d399_1px,transparent_1px),linear-gradient(to_bottom,#34d399_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
      {/* Top/bottom fade */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]" />

      <div className="container mx-auto px-6 relative z-20 max-w-[1100px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`mb-20 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <span className="story-step mb-3">06 / 06</span>
          <span className="text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-mono font-bold block mb-3">
            {lang === 'ar' ? 'المسيرة المهنية' : 'Professional Journey'}
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white tracking-wide uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {lang === 'ar' ? 'رحلتي البرمجية' : 'My Journey'}
          </h2>
          <div className={`h-[2px] w-16 bg-emerald-400 mt-4 mb-6 ${lang === 'ar' ? 'mr-0 ml-auto' : 'ml-0'}`}
            style={{ boxShadow: '0 0 12px rgba(52,211,153,0.5)' }}
          />
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans font-light max-w-2xl">
            {lang === 'ar'
              ? 'مسيرة مهنية متطورة مبنية على الشغف بالتقنية والتزام دائم بالجودة والابتكار.'
              : 'A progressive career built on a deep passion for technology and an unwavering commitment to quality and innovation.'}
          </p>
        </motion.div>

        {/* Timeline body */}
        <div className="relative">

          {/* THE VERTICAL LINE — centered at 28px from left (position of node center) */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
            className="absolute top-4 bottom-4 origin-top pointer-events-none"
            style={{
              left: lang === 'ar' ? 'auto' : '27px',
              right: lang === 'ar' ? '27px' : 'auto',
              width: '2px',
              background: 'linear-gradient(to bottom, #00f2ff 0%, #a855f7 40%, #34d399 100%)',
              boxShadow: '0 0 10px rgba(0,242,255,0.4)',
            }}
          />

          <div className="flex flex-col gap-10 md:gap-12">
            {timelineItems.map((item, i) => {
              const a = accents[item.accent];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.25 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* NODE ICON — always at the left (or right for AR) */}
                  <div className="flex-shrink-0 relative" style={{ zIndex: 2 }}>
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 ${a.nodeBorder} ${a.nodeBg} ${a.nodeText} transition-all duration-300`}
                      style={{ boxShadow: inView ? a.dotGlow : 'none', minWidth: '56px', minHeight: '56px' }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* CARD */}
                  <div
                    className={`group flex-1 border-2 ${a.cardBorder} rounded-xl transition-all duration-300 cursor-default`}
                    style={{
                      backgroundColor: '#0b0f1a',
                      padding: '28px 32px',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 35px ${a.cardGlow}, inset 0 0 20px ${a.cardGlow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Top row: year badge + connector line */}
                    <div className={`flex items-center gap-3 mb-5 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <span
                        className={`inline-flex items-center text-[9px] font-mono uppercase tracking-[0.2em] border rounded-full px-3 py-1 font-bold ${a.year} ${a.yearBorder}`}
                        style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                      >
                        {lang === 'ar' ? item.yearAr : item.yearEn}
                      </span>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(${lang === 'ar' ? 'to left' : 'to right'}, ${a.lineColor}30, transparent)` }} />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-white font-bold text-xl md:text-2xl uppercase tracking-wide mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2 }}
                    >
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>

                    {/* Org */}
                    <div className={`text-[11px] font-mono uppercase tracking-[0.2em] ${a.year} mb-5`}
                      style={{ opacity: 0.8 }}
                    >
                      {lang === 'ar' ? item.orgAr : item.orgEn}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                      {lang === 'ar' ? item.descAr : item.descEn}
                    </p>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
                      {(lang === 'ar' ? item.tagsAr : item.tagsEn).map((tag) => (
                        <span
                          key={tag}
                          className={`text-[9px] font-mono uppercase tracking-widest border rounded px-2.5 py-1 font-semibold ${a.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom scan line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-16 h-px origin-left"
          style={{ background: 'linear-gradient(to right, transparent, #34d399 30%, #a855f7 70%, transparent)' }}
        />
      </div>
    </section>
  );
};

export default Timeline;
