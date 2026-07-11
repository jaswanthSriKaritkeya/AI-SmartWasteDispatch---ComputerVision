import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ message = 'AI Scanning in Progress...' }) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl rounded-tl-[60px] rounded-br-[60px]">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-transparent border-t-primary border-b-primary-light opacity-80"
        />
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-16 h-16 rounded-full border-4 border-transparent border-l-accent-cyan border-r-primary shadow-glow-cyan"
        />
        {/* Center Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute w-4 h-4 bg-primary-light rounded-full shadow-glow"
        />
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-6 text-primary-light font-semibold tracking-widest text-sm"
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loader;
