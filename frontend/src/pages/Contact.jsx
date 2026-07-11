import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-10 border border-accent-cyan/20">
        <h1 className="text-4xl font-bold text-white mb-6">Contact <span className="text-accent-cyan text-glow">Us</span></h1>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent-cyan transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent-cyan transition-colors" placeholder="john@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea rows="5" className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent-cyan transition-colors" placeholder="How can we help?"></textarea>
          </div>
          <button type="submit" className="bg-accent-cyan hover:bg-[#00d0e0] text-black font-bold py-3 px-8 rounded-lg transition-colors">
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
