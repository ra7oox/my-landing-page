import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  variant = 'primary',
  as = 'button',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  isCopied = false,
  ...props
}) => {
  // Variant base class mappings
  const variants = {
    primary:
      'group relative w-full md:w-fit md:min-w-[240px] self-center bg-[#0b0f19] bg-gradient-to-r from-cyan-950/60 via-[#070a12] to-violet-950/30 border border-cyan-glow/40 text-cyan-glow py-4 rounded-xl font-display font-extrabold tracking-widest text-xs uppercase transition-all duration-300 hover:from-cyan-glow hover:to-violet-glow hover:text-navy-900 hover:border-transparent hover:shadow-[0_0_35px_rgba(0,242,255,0.4),0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.15),inset_0_0_12px_rgba(0,242,255,0.05)]',
    secondary:
      'group relative w-full md:w-fit md:min-w-[200px] self-center border border-cyan-glow/40 text-cyan-glow bg-cyan-glow/5 py-4 rounded-xl font-display font-extrabold text-xs uppercase tracking-widest text-center cursor-none shadow-[0_0_20px_rgba(0,242,255,0.1),inset_0_0_10px_rgba(0,242,255,0.03)] hover:bg-gradient-to-r hover:from-cyan-glow hover:to-violet-glow hover:text-navy-900 hover:border-transparent hover:shadow-[0_0_35px_rgba(0,242,255,0.35)] transition-all duration-300 flex items-center justify-center gap-3 select-none overflow-hidden',
    hero:
      'block rounded-lg bg-navy-900/90 hover:bg-navy-900/70 backdrop-blur-md text-white font-sans font-bold tracking-widest text-xs md:text-sm uppercase cursor-none transition-all duration-300 select-none',
    nav:
      'nav-btn cursor-none font-display font-extrabold tracking-wider text-xs uppercase border border-amber-glow text-amber-glow rounded hover:bg-amber-glow hover:text-black duration-300 select-none shadow-[0_0_15px_rgba(255,170,0,0.15)]',
    copy:
      `text-[9px] font-mono rounded-md transition-all duration-300 ${
        isCopied
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : 'border border-cyan-500/20 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950'
      }`,
    lang:
      'rounded-md border border-cyan-glow/20 bg-navy-800/60 text-xs font-bold font-mono text-cyan-glow cursor-none hover:bg-cyan-glow/10 transition-all duration-300 hover:border-cyan-glow shadow-[0_0_15px_rgba(0,242,255,0.05)]',
  };

  const selectedClass = `${variants[variant] || ''} ${className}`;

  // Default padding to bypass global CSS reset * { padding: 0 }
  const defaultPadding = {
    primary: { padding: '16px 36px' },
    secondary: { padding: '14px 28px' },
    hero: { padding: '16px 40px' },
    nav: { padding: '10px 20px' },
    copy: { padding: '4px 10px' },
    lang: { padding: '8px 16px' },
  };

  const mergedStyle = {
    ...defaultPadding[variant],
    ...props.style,
  };

  // Default Framer Motion animation values
  const defaultHover = variant === 'hero' ? { scale: 1.03 } : { scale: 1.01 };
  const defaultTap = variant === 'hero' ? { scale: 0.97 } : { scale: 0.99 };

  const motionProps = {
    whileHover: props.whileHover || defaultHover,
    whileTap: props.whileTap || defaultTap,
  };

  // Shimmer effect element for primary and secondary variants
  const shimmer = (variant === 'primary' || variant === 'secondary') && (
    <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
  );

  // Cyber brackets for cyberpunk HUD aesthetic
  const cyberBrackets = (variant === 'primary' || variant === 'secondary') && (
    <>
      <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-cyan-glow/65 group-hover:border-navy-900/80 transition-colors duration-300 pointer-events-none" />
      <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-cyan-glow/65 group-hover:border-navy-900/80 transition-colors duration-300 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-cyan-glow/65 group-hover:border-navy-900/80 transition-colors duration-300 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-cyan-glow/65 group-hover:border-navy-900/80 transition-colors duration-300 pointer-events-none" />
    </>
  );

  // If hero variant, it requires a gradient border wrapper
  if (variant === 'hero') {
    return (
      <motion.div
        {...motionProps}
        className="relative p-[1px] rounded-lg bg-gradient-to-r from-cyan-glow via-violet-500 to-amber-glow shadow-[0_0_40px_rgba(0,242,255,0.15),0_0_40px_rgba(255,170,0,0.1)] hover:shadow-[0_0_60px_rgba(0,242,255,0.3),0_0_60px_rgba(255,170,0,0.2)] transition-all duration-500 cursor-none"
      >
        <a href={href} className={selectedClass} onClick={onClick} style={mergedStyle}>
          {children}
        </a>
      </motion.div>
    );
  }

  // Render as a motion-enabled anchor link
  if (as === 'a') {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={selectedClass}
        style={mergedStyle}
        {...motionProps}
        {...props}
      >
        {shimmer}
        {cyberBrackets}
        <span className="relative z-10 flex items-center justify-center gap-3 w-full">
          {children}
        </span>
      </motion.a>
    );
  }

  // Render as a motion-enabled button
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={selectedClass}
      style={mergedStyle}
      {...motionProps}
      {...props}
    >
      {shimmer}
      {cyberBrackets}
      <span className="relative z-10 flex items-center justify-center gap-3 w-full">
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
