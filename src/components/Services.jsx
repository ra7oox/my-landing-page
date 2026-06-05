import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const Services = () => {
  const { t, lang } = useLanguage();

  const services = [
    { 
      idx: 0, // Left building (Apex Hub)
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ), 
      titleKey: 'servicesEng', 
      descKey: 'servicesEngDesc' 
    },
    { 
      idx: 1, // Center building (Zenith Spire)
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" fill="currentColor" fillOpacity="0.1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ), 
      titleKey: 'servicesConst', 
      descKey: 'servicesConstDesc' 
    },
    { 
      idx: 2, // Right building (Lumina Grid)
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2C12 2 15 7 15 12C15 17 12 22 12 22" />
          <path d="M12 2C12 2 9 7 9 12C9 17 12 22 12 22" />
        </svg>
      ), 
      titleKey: 'servicesMgmt', 
      descKey: 'servicesMgmtDesc' 
    },
    { 
      idx: 3, // Full structural dome highlight (Lumina + Apex)
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12,2 22,12 12,22 2,12" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ), 
      titleKey: 'servicesInnov', 
      descKey: 'servicesInnovDesc' 
    },
  ];

  const handleCardHover = (buildingIndex) => {
    if (window.highlightBuilding) {
      window.highlightBuilding(buildingIndex);
    }
  };

  return (
    <section 
      id="services" 
      className="relative py-32 bg-transparent min-h-screen flex items-center overflow-hidden"
    >
      <div className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]`} />
      <div className={`absolute inset-0 z-10 pointer-events-none ${lang === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#070a12]/95 via-[#070a12]/50 to-transparent`} />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="flex flex-col gap-3 max-w-md w-full"
          >
            {/* Services Header */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: lang === 'ar' ? 50 : -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="bg-navy-800/80 backdrop-blur-md border border-cyan-glow/30 rounded-t-2xl p-6 shadow-[0_0_20px_rgba(0,242,255,0.1),inset_0_0_15px_rgba(0,242,255,0.03)]"
            >
              <h2 
                className="font-sans font-bold text-3xl text-white tracking-widest uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t('servicesTitle')}
              </h2>
            </motion.div>

            {/* Core Services Cards List */}
            {services.map((svc, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: lang === 'ar' ? 50 : -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                whileHover={{ x: lang === 'ar' ? -12 : 12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                onMouseEnter={() => handleCardHover(svc.idx)}
                onMouseLeave={() => handleCardHover(-1)}
                className={`group relative bg-navy-800/65 backdrop-blur-md border border-cyan-glow/20 p-6 flex items-center gap-6 hover:bg-cyan-glow/10 duration-300 shadow-[0_0_20px_rgba(0,242,255,0.05),inset_0_0_15px_rgba(0,242,255,0.02)] hover:border-cyan-glow hover:shadow-[0_0_30px_rgba(0,242,255,0.25),inset_0_0_20px_rgba(0,242,255,0.12)] cursor-none ${i === services.length - 1 ? 'rounded-b-2xl' : ''}`}
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full border border-cyan-glow/30 bg-navy-900/80 text-cyan-glow group-hover:scale-110 group-hover:border-cyan-glow transition-all duration-300">
                  {svc.icon}
                </div>

                {/* Card Text Info */}
                <div className="flex flex-col">
                  <h4 className="font-sans font-bold text-white text-lg tracking-wide group-hover:text-cyan-glow transition-colors duration-300 uppercase">
                    {t(svc.titleKey)}
                  </h4>
                  <p className="font-sans text-gray-400 text-sm mt-1 leading-tight">
                    {t(svc.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Spacer for Right-side 3D model representation */}
          <div className="hidden lg:block animate-pulse pointer-events-none" />
          
        </div>
      </div>
    </section>
  );
};

export default Services;
