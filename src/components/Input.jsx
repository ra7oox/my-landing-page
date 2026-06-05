import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  rows = 5,
  ...props
}) => {
  // Common styling classes for input fields
  const baseInputClass = `w-full mt-1.5 bg-[#0b1120]/80 border text-white rounded-xl font-sans text-sm outline-none transition-all duration-300 placeholder-white/20 ${
    error
      ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.15)]'
      : 'border-white/10 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,242,255,0.15)]'
  } ${className}`;

  const defaultStyle = { padding: '14px 18px' };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[10px] tracking-widest text-white/50 font-bold uppercase font-mono px-1">
          {label}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInputClass} resize-none`}
          style={{ ...defaultStyle, ...props.style }}
          rows={rows}
          required={required}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseInputClass}
          style={{ ...defaultStyle, ...props.style }}
          required={required}
          {...props}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-[11px] font-sans mt-1.5 flex items-center gap-1"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
