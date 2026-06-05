import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 bg-navy-900 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container px-6 mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Contact Info (Slide in from Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="contact-info max-w-xl"
          >
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white tracking-wide uppercase">
              Start Your Project
            </h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-glow to-transparent mt-4 mb-6" />
            <p className="text-gray-400 font-sans text-lg leading-relaxed mb-8">
              Partner with ARCOVA to build the future. Reach out to our engineering team to discuss your structural requirements, technological integrations, and visionary design concepts.
            </p>
            
            <div className="contact-icons flex flex-col gap-4">
              <div className="contact-icon-row flex items-center gap-4 text-gray-300">
                <span className="c-icon text-cyan-glow text-xl flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 border border-cyan-glow/20">📍</span>
                <span className="c-text font-sans">124 Cyber Avenue, Neo-District</span>
              </div>
              <div className="contact-icon-row flex items-center gap-4 text-gray-300">
                <span className="c-icon text-cyan-glow text-xl flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 border border-cyan-glow/20">✉️</span>
                <span className="c-text font-sans">build@arcova.com</span>
              </div>
              <div className="contact-icon-row flex items-center gap-4 text-gray-300">
                <span className="c-icon text-cyan-glow text-xl flex items-center justify-center w-10 h-10 rounded-full bg-navy-900 border border-cyan-glow/20">📞</span>
                <span className="c-text font-sans">+1 (555) 019-8472</span>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form (Slide in from Right) */}
          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="contact-form bg-navy-900/60 backdrop-blur-md border border-cyan-glow/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col gap-5" 
            onSubmit={e => e.preventDefault()}
          >
            <div className="flex flex-col gap-1">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-navy-900/40 border border-cyan-glow/20 text-white rounded-lg p-4 font-sans focus:border-cyan-glow focus:shadow-[0_0_15px_rgba(0,212,255,0.25)] outline-none transition-all duration-300"
                required 
              />
            </div>
            <div className="flex flex-col gap-1">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-navy-900/40 border border-cyan-glow/20 text-white rounded-lg p-4 font-sans focus:border-cyan-glow focus:shadow-[0_0_15px_rgba(0,212,255,0.25)] outline-none transition-all duration-300"
                required 
              />
            </div>
            <div className="flex flex-col gap-1">
              <input 
                type="text" 
                placeholder="Project Type" 
                className="w-full bg-navy-900/40 border border-cyan-glow/20 text-white rounded-lg p-4 font-sans focus:border-cyan-glow focus:shadow-[0_0_15px_rgba(0,212,255,0.25)] outline-none transition-all duration-300"
                required 
              />
            </div>
            <div className="flex flex-col gap-1">
              <textarea 
                placeholder="Tell us about your project..." 
                className="w-full bg-navy-900/40 border border-cyan-glow/20 text-white rounded-lg p-4 font-sans h-32 focus:border-cyan-glow focus:shadow-[0_0_15px_rgba(0,212,255,0.25)] outline-none transition-all duration-300 resize-none"
                required
              ></textarea>
            </div>
            
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-cyan-glow text-cyan-glow bg-cyan-glow/5 p-4 rounded-lg font-sans font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:bg-cyan-glow hover:text-navy-900 hover:shadow-[0_0_35px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 cursor-none"
            >
              SEND MESSAGE <span>&rarr;</span>
            </motion.button>
          </motion.form>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
