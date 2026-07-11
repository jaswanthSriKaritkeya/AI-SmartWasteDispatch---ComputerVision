import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-10 border border-primary/20">
        <h1 className="text-4xl font-bold text-white mb-6">About <span className="text-primary-light text-glow">SmartDispatch</span></h1>
        <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light">
          <p>
            The AI Smart Garbage Dispatch System was built to revolutionize how municipal corporations handle solid waste management. 
            Traditional dispatch methods rely on manual routing, often resulting in delayed pickups, misallocated vehicles, and inefficient operations.
          </p>
          <p>
            By leveraging state-of-the-art AI vision models like <strong className="text-white">YOLO11</strong>, our system instantly analyzes images of uncollected garbage. 
            It calculates severity, identifies recyclable content, and estimates the exact volume.
          </p>
          <p>
            These metrics are fed into our <strong className="text-accent-cyan">Intelligent Dispatch Engine</strong> which automatically assigns the optimal vehicle (e.g., Mini Truck, Compactor) 
            and required personnel to the location, enabling a data-driven, zero-latency response for cleaner and greener cities.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
