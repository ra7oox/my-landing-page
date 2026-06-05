import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const Contact = () => {
  const { t, lang } = useLanguage();

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate single fields in real-time
  const validateField = (name, value) => {
    let err = '';
    if (name === 'name' && !value.trim()) {
      err = t('errName');
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim() || !emailRegex.test(value)) {
        err = t('errEmail');
      }
    } else if (name === 'message' && !value.trim()) {
      err = t('errMessage');
    }
    return err;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on type
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final checks on all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success state
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <section 
      id="contact" 
      className="relative py-32 bg-transparent min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Top/bottom dark fades */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]" />

      <div className="container px-6 mx-auto relative z-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          
          {/* Contact Info Panel (Left side in English, right in Arabic) */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="contact-info max-w-xl"
          >
            <h2 
              className="font-sans font-bold text-4xl md:text-5xl text-white tracking-wide uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t('contactTitle')}
            </h2>
            <div className={`h-[2px] w-20 bg-gradient-to-r from-cyan-glow to-transparent mt-4 mb-6 ${lang === 'ar' ? 'mr-0 ml-auto' : 'ml-0'}`} />
            
            <p className="text-gray-400 font-sans text-lg leading-relaxed mb-8">
              {t('contactDesc')}
            </p>
            
            <div className="contact-icons flex flex-col gap-5">
              <div className="contact-icon-row flex items-center gap-4 text-gray-300">
                <span className="c-icon text-cyan-glow text-lg flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 border border-cyan-glow/20">📍</span>
                <span className="c-text font-sans text-sm md:text-base">124 Cyber Avenue, Neo-District</span>
              </div>
              <div className="contact-icon-row flex items-center gap-4 text-gray-300">
                <span className="c-icon text-cyan-glow text-lg flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 border border-cyan-glow/20">✉️</span>
                <span className="c-text font-sans text-sm md:text-base">build@arcova.com</span>
              </div>
              <div className="contact-icon-row flex items-center gap-4 text-gray-300">
                <span className="c-icon text-cyan-glow text-lg flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 border border-cyan-glow/20">📞</span>
                <span className="c-text font-sans text-sm md:text-base">+1 (555) 019-8472</span>
              </div>
            </div>
          </motion.div>
          
          {/* Glassmorphic Contact Form Panel */}
          <div className="relative w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="contact-form bg-navy-800/80 backdrop-blur-md border border-cyan-glow/25 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(0,242,255,0.03)] flex flex-col gap-5" 
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs font-mono font-bold uppercase">{t('contactName')}</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contactName')}
                      className={`w-full bg-navy-900/40 border text-white rounded-lg p-4 font-sans focus:shadow-[0_0_15px_rgba(0,242,255,0.15)] outline-none transition-all duration-300 ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-cyan-glow/20 focus:border-cyan-glow'
                      }`}
                      required 
                      tabIndex="0"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-xs font-sans mt-0.5">{errors.name}</span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs font-mono font-bold uppercase">{t('contactEmail')}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contactEmail')}
                      className={`w-full bg-navy-900/40 border text-white rounded-lg p-4 font-sans focus:shadow-[0_0_15px_rgba(0,242,255,0.15)] outline-none transition-all duration-300 ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-cyan-glow/20 focus:border-cyan-glow'
                      }`}
                      required 
                      tabIndex="0"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs font-sans mt-0.5">{errors.email}</span>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-xs font-mono font-bold uppercase">{t('contactMessage')}</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('contactMessage')}
                      className={`w-full bg-navy-900/40 border text-white rounded-lg p-4 font-sans h-32 focus:shadow-[0_0_15px_rgba(0,242,255,0.15)] outline-none transition-all duration-300 resize-none ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-cyan-glow/20 focus:border-cyan-glow'
                      }`}
                      required
                      tabIndex="0"
                    ></textarea>
                    {errors.message && (
                      <span className="text-red-400 text-xs font-sans mt-0.5">{errors.message}</span>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border border-cyan-glow text-cyan-glow bg-cyan-glow/5 p-4 rounded-lg font-sans font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:bg-cyan-glow hover:text-navy-900 hover:shadow-[0_0_35px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 cursor-none mt-2 select-none"
                    tabIndex="0"
                  >
                    {t('contactSubmit')} {lang === 'ar' ? '←' : '→'}
                  </motion.button>
                </motion.form>
              ) : (
                // Success feedback display card
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-navy-800/80 backdrop-blur-md border border-cyan-glow/30 p-10 rounded-2xl shadow-[0_0_50px_rgba(0,242,255,0.2),inset_0_0_20px_rgba(0,242,255,0.05)] text-center flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full border border-cyan-glow bg-cyan-glow/10 flex items-center justify-center text-cyan-glow text-3xl animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-wide uppercase font-sans">
                    {t('contactSuccess')}
                  </h3>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 rounded border border-cyan-glow text-cyan-glow text-xs uppercase font-sans font-bold tracking-widest bg-cyan-glow/5 hover:bg-cyan-glow hover:text-black cursor-none transition-all duration-300 select-none shadow-[0_0_20px_rgba(0,242,255,0.1)]"
                  >
                    {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
