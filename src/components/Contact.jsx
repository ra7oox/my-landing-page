import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import Button from './Button';
import Input from './Input';

const Contact = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("soufianearrahou7@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText("+212632326544");
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const validateField = (name, value) => {
    if (name === 'name' && !value.trim()) return t('errName');
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim() || !emailRegex.test(value)) return t('errEmail');
    }
    if (name === 'message' && !value.trim()) return t('errMessage');
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  };



  const infoCards = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: lang === 'ar' ? 'المقر الرئيسي' : 'Office',
      value: '240 GROUPE EL OUAHDA HAY NAHDA RABAT',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7 a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      label: lang === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: 'build@r7x.dev',
      action: copyEmail,
      actionLabel: emailCopied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ' : 'Copy'),
      isCopied: emailCopied,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: lang === 'ar' ? 'الهاتف' : 'Phone',
      value: '+1 (555) 019-8472',
      action: copyPhone,
      actionLabel: phoneCopied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ' : 'Copy'),
      isCopied: phoneCopied,
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 lg:py-32 bg-[#070a12] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]" />
      <div className="absolute inset-0 z-0 opacity-[0.04] bg-[linear-gradient(to_right,#00f2ff_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="container relative z-20 mx-auto max-w-[1200px] px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:text-left lg:max-w-xl"
        >
          <span className="text-[#00f2ff] text-[11px] uppercase tracking-[0.3em] font-mono font-bold block mb-3">
            {t('contactTitle')}
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide uppercase leading-tight mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {lang === 'ar' ? 'ابدأ مشروعك' : "Let's Build Together"}
          </h2>
          <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-lg">
            {t('contactDesc')}
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ---- FORM (6/12 cols) ---- */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-6"
                  style={{ padding: '2rem' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label={t('contactName')}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={lang === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                      error={errors.name}
                      required
                    />

                    <Input
                      label={t('contactEmail')}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="hello@domain.com"
                      error={errors.email}
                      required
                    />
                  </div>

                  <Input
                    label={t('contactMessage')}
                    type="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'تفاصيل مشروعك...' : 'Describe your project...'}
                    error={errors.message}
                    required
                    style={{ height: '160px' }}
                  />

                  {/* Correction de l'espacement et du style du bouton */}
                  <div className="pt-2 flex flex-col gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      <span>{t('contactSubmit')}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                        {lang === 'ar' ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                      </svg>
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gray-500 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {lang === 'ar' ? 'قناة آمنة ومشفرة' : 'Encrypted & secure channel'}
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white/[0.02] backdrop-blur-xl border border-cyan-500/30 p-12 rounded-2xl text-center flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00f2ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide font-sans mb-2">
                      {t('contactSuccess')}
                    </h3>
                    <p className="text-gray-400 text-sm font-sans font-light">
                      {lang === 'ar' ? 'سأتواصل معك قريباً' : "I'll get back to you within 24 hours"}
                    </p>
                  </div>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="secondary"
                    className="w-auto px-8 py-3 rounded-xl"
                  >
                    {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ---- INFO (5/12 cols) ---- */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col gap-4">
              {infoCards.map((card, i) => (
                <div
                  key={i}
                  className="group bg-white/[0.01] border border-white/[0.05] rounded-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.03]"
                  style={{ padding: '1.25rem' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-300">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] tracking-widest font-mono text-white/40 font-semibold uppercase">{card.label}</span>
                        {card.action && (
                          <Button
                            variant="copy"
                            isCopied={card.isCopied}
                            onClick={(e) => { e.stopPropagation(); card.action(); }}
                          >
                            {card.actionLabel}
                          </Button>
                        )}
                      </div>
                      <span className="block text-white/90 font-sans text-sm font-medium tracking-wide mt-1.5">{card.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;