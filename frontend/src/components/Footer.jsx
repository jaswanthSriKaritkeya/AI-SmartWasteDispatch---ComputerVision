import React from 'react';
import { FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative mt-20 pt-10 pb-6 bg-[#0a0a0a] border-t border-white/5 text-center overflow-hidden">
      {/* Animated wave effect simulation */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#1B1B1B]"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white flex items-center justify-center md:justify-start">
             SmartDispatch
          </h2>
          <p className="text-gray-400 text-sm mt-2 flex items-center justify-center md:justify-start">
            Made with <FaHeart className="text-primary-light mx-2 animate-pulse" /> for Sustainable Cities 🌱
          </p>
        </div>
        
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-primary-light transition-colors">About</a>
          <a href="#" className="hover:text-primary-light transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary-light transition-colors">Support</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center">
            <FaGithub className="mr-2 text-lg" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
