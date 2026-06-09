import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const testimonials = [
  {
    nameEn: 'Alex Chen',
    nameAr: 'أليكس تشن',
    roleEn: 'Founder, Nexus SaaS',
    roleAr: 'مؤسس Nexus SaaS',
    avatarColor: 'from-cyan-glow/40 to-violet-glow/40',
    accentColor: 'cyan',
    rating: 5,
    quoteEn:
      "Working with R7x was an absolute game-changer. The 3D portfolio he built for our platform exceeded every benchmark we had. Delivery was ahead of schedule and the attention to detail was impeccable.",
    quoteAr:
      "التعاون مع R7x كان نقلة نوعية حقيقية. المعرض ثلاثي الأبعاد الذي بناه لمنصتنا تجاوز كل توقعاتنا. التسليم كان قبل الموعد المحدد والاهتمام بالتفاصيل كان لا مثيل له.",
    projectEn: 'Nexus Platform Portfolio',
    projectAr: 'معرض منصة Nexus',
  },
  {
    nameEn: 'Camille Moreau',
    nameAr: 'كاميل مورو',
    roleEn: 'CEO, LuxBrand Agency',
    roleAr: 'رئيسة تنفيذية، وكالة LuxBrand',
    avatarColor: 'from-amber-glow/40 to-cyan-glow/30',
    accentColor: 'amber',
    rating: 5,
    quoteEn:
      "The landing page converted at 3x our previous rate. The design was stunning — immersive, fast, and exactly on-brand. R7x clearly understands both design and conversion psychology.",
    quoteAr:
      "صفحة الهبوط حققت معدل تحويل 3 أضعاف ما كنا عليه سابقاً. التصميم كان مذهلاً — غامر وسريع ومتوافق تماماً مع هويتنا. R7x يفهم التصميم وعلم نفس التحويل بشكل واضح.",
    projectEn: 'LuxBrand Landing Page',
    projectAr: 'صفحة هبوط LuxBrand',
  },
  {
    nameEn: 'Tariq Al-Rashid',
    nameAr: 'طارق الراشد',
    roleEn: 'CTO, DevFlow Systems',
    roleAr: 'مدير تقني، DevFlow Systems',
    avatarColor: 'from-violet-glow/40 to-amber-glow/30',
    accentColor: 'violet',
    rating: 5,
    quoteEn:
      "R7x built our internal dashboard from scratch in record time. The codebase is clean, documented, and scalable. He integrated our APIs seamlessly and delivered exactly what we asked for.",
    quoteAr:
      "بنى R7x لوحة التحكم الداخلية لدينا من الصفر في وقت قياسي. قاعدة الكود نظيفة وموثقة وقابلة للتوسع. قام بدمج واجهات برمجتنا بسلاسة وسلّم بالضبط ما طلبناه.",
    projectEn: 'DevFlow Analytics Dashboard',
    projectAr: 'لوحة تحليلات DevFlow',
  },
  {
    nameEn: 'Sara Lindqvist',
    nameAr: 'سارة لندكفيست',
    roleEn: 'Product Manager, Helios App',
    roleAr: 'مديرة منتج، تطبيق Helios',
    avatarColor: 'from-emerald-400/40 to-cyan-glow/30',
    accentColor: 'emerald',
    rating: 5,
    quoteEn:
      "Our React Native app went from concept to App Store in 6 weeks. The performance is buttery smooth and our users love the UI. R7x communicated clearly throughout the whole process.",
    quoteAr:
      "انتقل تطبيق React Native الخاص بنا من الفكرة إلى متجر التطبيقات في 6 أسابيع. الأداء سلس للغاية ومستخدمونا يحبون الواجهة. تواصل R7x بوضوح طوال العملية بأكملها.",
    projectEn: 'Helios Fitness App',
    projectAr: 'تطبيق Helios للياقة',
  },
];

const accentMap = {
  cyan: {
    border: 'border-cyan-glow/30',
    hoverBorder: 'hover:border-cyan-glow/60',
    text: 'text-cyan-glow',
    bg: 'bg-cyan-glow/5',
    glow: 'rgba(0,242,255,0.12)',
    starColor: '#00f2ff',
  },
  amber: {
    border: 'border-amber-glow/30',
    hoverBorder: 'hover:border-amber-glow/60',
    text: 'text-amber-glow',
    bg: 'bg-amber-glow/5',
    glow: 'rgba(255,170,0,0.12)',
    starColor: '#ffaa00',
  },
  violet: {
    border: 'border-violet-glow/30',
    hoverBorder: 'hover:border-violet-glow/60',
    text: 'text-violet-glow',
    bg: 'bg-violet-glow/5',
    glow: 'rgba(168,85,247,0.12)',
    starColor: '#a855f7',
  },
  emerald: {
    border: 'border-emerald-400/30',
    hoverBorder: 'hover:border-emerald-400/60',
    text: 'text-emerald-400',
    bg: 'bg-emerald-400/5',
    glow: 'rgba(52,211,153,0.12)',
    starColor: '#34d399',
  },
};

const QuoteIcon = ({ color }) => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 22V13.2C0 9.77333 0.906667 6.98667 2.72 4.84C4.57333 2.69333 7.2 1.21333 10.6 0.4L12 3.2C9.8 3.8 8.13333 4.72 7 5.96C5.86667 7.16 5.2 8.84 5 11H9.6V22H0ZM16.8 22V13.2C16.8 9.77333 17.7067 6.98667 19.52 4.84C21.3733 2.69333 24 1.21333 27.4 0.4L28.8 3.2C26.6 3.8 24.9333 4.72 23.8 5.96C22.6667 7.16 22 8.84 21.8 11H26.4V22H16.8Z"
      fill={color}
      fillOpacity="0.4"
    />
  </svg>
);

const StarRating = ({ rating, color }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < rating ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: i < rating ? 1 : 0.3 }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const autoRef = useRef(null);

  const goTo = (idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const goNext = () => {
    const next = (active + 1) % testimonials.length;
    setDirection(1);
    setActive(next);
  };

  const goPrev = () => {
    const prev = (active - 1 + testimonials.length) % testimonials.length;
    setDirection(-1);
    setActive(prev);
  };

  useEffect(() => {
    autoRef.current = setInterval(goNext, 6000);
    return () => clearInterval(autoRef.current);
  }, [active]);

  const current = testimonials[active];
  const accent = accentMap[current.accentColor];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--bg, #070a12)' }}
    >
      {/* Solid dark background */}
      <div className="absolute inset-0 bg-[#070a12]/95 z-0 pointer-events-none" />
      {/* Subtle grid */}
      <div className="absolute inset-0 z-0 opacity-[0.025] bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      {/* Top/bottom vignettes */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]" />

      <div className="container mx-auto px-6 relative z-20 max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`mb-16 max-w-4xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <span className="story-step mb-3">05 / 06</span>
          <span className="text-violet-glow text-[10px] uppercase tracking-[0.3em] font-mono font-bold block mb-3">
            {lang === 'ar' ? 'آراء العملاء' : 'Client Testimonials'}
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white tracking-wide uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {lang === 'ar' ? 'ماذا يقول عملائي' : 'What Clients Say'}
          </h2>
          <div className={`h-[2px] w-16 bg-violet-glow mt-4 mb-6 ${lang === 'ar' ? 'mr-0 ml-auto' : 'ml-0'}`} />
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative bg-[#0d1220] border-2 ${accent.border} rounded-2xl`}
              style={{
                padding: '40px 48px',
                boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 40px ${accent.glow}`,
              }}
            >
              {/* Top corner decoration */}
              <div className={`absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none`}>
                <svg viewBox="0 0 100 100" fill="none" className={`w-full h-full ${accent.text}`}>
                  <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div className={`absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none`}>
                <svg viewBox="0 0 100 100" fill="none" className={`w-full h-full ${accent.text}`}>
                  <line x1="100" y1="100" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              <div className={`flex flex-col ${lang === 'ar' ? 'items-end text-right' : 'items-start text-left'} gap-6`}>
                {/* Quote icon + rating */}
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <QuoteIcon color={accent.starColor} />
                  <StarRating rating={current.rating} color={accent.starColor} />
                </div>

                {/* Quote text */}
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light font-sans max-w-3xl">
                  {lang === 'ar' ? current.quoteAr : current.quoteEn}
                </p>

                {/* Divider */}
                <div className={`h-px w-24 ${lang === 'ar' ? 'mr-0 ml-auto' : ''}`} style={{ background: `linear-gradient(to right, ${accent.starColor}60, transparent)` }} />

                {/* Author info */}
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${current.avatarColor} border border-white/10 flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-lg font-bold font-display ${accent.text}`}>
                      {(lang === 'ar' ? current.nameAr : current.nameEn).charAt(0)}
                    </span>
                  </div>

                  <div>
                    <div className="text-white font-bold text-sm font-sans tracking-wide">
                      {lang === 'ar' ? current.nameAr : current.nameEn}
                    </div>
                    <div className={`text-[11px] font-mono uppercase tracking-widest ${accent.text} mt-0.5`}>
                      {lang === 'ar' ? current.roleAr : current.roleEn}
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 mt-0.5 uppercase tracking-wider">
                      {lang === 'ar' ? current.projectAr : current.projectEn}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? 'w-8 bg-violet-glow' : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={goPrev}
                className="group w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg hover:border-violet-glow/40 hover:bg-violet-glow/5 transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-violet-glow transition-colors duration-300">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="group w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg hover:border-violet-glow/40 hover:bg-violet-glow/5 transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-violet-glow transition-colors duration-300">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {[
            { valueEn: '70+', valueAr: '+70', labelEn: 'Happy Clients', labelAr: 'عميل سعيد', color: 'text-cyan-glow' },
            { valueEn: '5.0', valueAr: '5.0', labelEn: 'Average Rating', labelAr: 'متوسط التقييم', color: 'text-amber-glow' },
            { valueEn: '98%', valueAr: '98%', labelEn: 'Satisfaction Rate', labelAr: 'معدل الرضا', color: 'text-violet-glow' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 bg-[#0d1220] border border-white/10 rounded-xl py-5 px-3"
            >
              <span className={`text-2xl md:text-3xl font-bold font-display ${stat.color}`}>
                {lang === 'ar' ? stat.valueAr : stat.valueEn}
              </span>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest text-center">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
