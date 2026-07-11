import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLeaf, FaTruck, FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome className="mr-2" /> },
    { name: 'Upload Waste', path: '/citizen-dashboard', icon: <FaLeaf className="mr-2" /> },
    { name: 'Fleet Dashboard', path: '/fleet-dashboard', icon: <FaTruck className="mr-2" /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle className="mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope className="mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass rounded-none border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center text-primary font-bold text-2xl tracking-wide"
        >
          <FaLeaf className="mr-2 text-primary-light animate-pulse-glow" />
          SmartDispatch
        </motion.div>
        
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink 
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center text-sm font-medium transition-all duration-300 group ${isActive ? 'text-primary-light text-glow' : 'text-gray-300 hover:text-white'}`
                }
              >
                {link.icon}
                <span className="relative">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
