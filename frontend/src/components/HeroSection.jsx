import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaRecycle, FaTruckFast,FaLeaf } from 'react-icons/fa6';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10">
      {/* Background Particles/Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] -z-10 mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full glass border border-primary/30 text-primary-light text-sm font-semibold mb-6 shadow-glow"
          >
            <span className="w-2 h-2 rounded-full bg-primary-light mr-2 animate-pulse" />
            AI-Powered Smart City Solution
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            AI Smart Garbage <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-cyan text-glow">
              Dispatch System
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 font-light">
            Detect • Analyze • Dispatch • Keep Cities Clean
            <br className="hidden md:block"/> Revolutionizing municipal waste management with real-time YOLO11 analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => navigate('/citizen-dashboard')}
              className="relative overflow-hidden group bg-primary text-black font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(126,217,87,0.4)] hover:shadow-[0_0_30px_rgba(126,217,87,0.8)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              <span className="relative flex items-center justify-center">
                <FaTrash className="mr-2" /> Upload Garbage
              </span>
            </button>
            <button 
              onClick={() => navigate('/fleet-dashboard')}
              className="glass glass-hover text-white font-bold py-4 px-8 rounded-full border border-white/20"
            >
              <span className="flex items-center justify-center">
                <FaTruckFast className="mr-2" /> Fleet Dashboard
              </span>
            </button>
          </div>
        </motion.div>

        {/* 3D Smart Dustbin Illusion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[500px] flex items-center justify-center z-10"
        >
          {/* Scanning Rings */}
          <motion.div 
            className="absolute w-[400px] h-[100px] border-2 border-primary-light/50 rounded-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-glow"
            animate={{ top: ['20%', '80%', '20%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Dustbin Base (CSS 3D illusion) */}
          <motion.div 
            className="relative w-64 h-80 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[20px] rounded-t-[10px] border border-white/10 shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center"
            animate={{ rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-[20px]" />
            <FaRecycle className="text-6xl text-primary/40" />
          </motion.div>

          {/* Floating symbols */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-10 p-3 glass rounded-xl shadow-glow border-primary/30"
          >
            <FaLeaf className="text-primary-light text-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
