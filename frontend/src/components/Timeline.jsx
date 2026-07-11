import React from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaBrain, FaCrosshairs, FaTruck, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';

const Timeline = ({ currentStage }) => {
  const stages = [
    { id: 1, label: 'Photo Uploaded', icon: <FaImage /> },
    { id: 2, label: 'AI Processing', icon: <FaBrain /> },
    { id: 3, label: 'Garbage Detected', icon: <FaCrosshairs /> },
    { id: 4, label: 'Vehicle Assigned', icon: <FaTruck /> },
    { id: 5, label: 'Waiting', icon: <FaHourglassHalf /> },
    { id: 6, label: 'Completed', icon: <FaCheckCircle /> },
  ];

  return (
    <div className="w-full relative mt-8 pl-4">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700 rounded-full" />
      <div className="flex flex-col space-y-6">
        {stages.map((stage, index) => {
          const isCompleted = currentStage >= stage.id;
          const isCurrent = currentStage === stage.id;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center z-10"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-primary border-primary-light text-black shadow-glow' 
                    : isCurrent
                      ? 'bg-black border-accent-cyan text-accent-cyan shadow-glow-cyan animate-pulse'
                      : 'bg-[#1a1a1a] border-gray-600 text-gray-500'
                }`}
              >
                {stage.icon}
              </div>
              <div className="ml-6">
                <p className={`font-semibold text-sm transition-colors duration-300 ${
                  isCompleted ? 'text-primary-light' : isCurrent ? 'text-white' : 'text-gray-500'
                }`}>
                  {stage.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
