import React from 'react';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';
import { FaRobot, FaBolt, FaLeaf, FaGlobe } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass glass-hover p-8 border border-white/5 text-center group"
  >
    <div className="w-16 h-16 mx-auto bg-black/40 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It <span className="text-primary-light text-glow">Works</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our AI engine processes visual data in real-time, instantly analyzing and dispatching the right resources for waste management.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} viewport={{ once: true }}
              className="glass p-8 relative overflow-hidden"
            >
              <div className="text-5xl font-black text-white/5 absolute -top-4 -right-4">01</div>
              <h3 className="text-2xl font-bold text-primary-light mb-4">Capture Garbage</h3>
              <p className="text-gray-300 text-sm">Citizens or municipal workers simply upload an image of the detected waste via our intuitive dashboard.</p>
            </motion.div>
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="glass p-8 relative overflow-hidden border-primary/30"
            >
              <div className="text-5xl font-black text-white/5 absolute -top-4 -right-4">02</div>
              <h3 className="text-2xl font-bold text-accent-cyan mb-4">AI Analysis</h3>
              <p className="text-gray-300 text-sm">Backend YOLO11 performs Object Detection, calculates Garbage Count, Coverage, Severity, and estimates Personnel.</p>
            </motion.div>
            
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="glass p-8 relative overflow-hidden"
            >
              <div className="text-5xl font-black text-white/5 absolute -top-4 -right-4">03</div>
              <h3 className="text-2xl font-bold text-white mb-4">Vehicle Dispatch</h3>
              <p className="text-gray-300 text-sm">The intelligent dispatch engine assigns the nearest, most suitable vehicle based on the AI's recommendations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core <span className="text-accent-cyan">Features</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaRobot className="text-3xl text-primary-light" />}
              title="AI Detection"
              description="State-of-the-art YOLO11 vision model for highly accurate waste classification."
              delay={0}
            />
            <FeatureCard 
              icon={<FaBolt className="text-3xl text-yellow-400" />}
              title="Fast Dispatch"
              description="Zero-latency assignments ensuring rapid municipal response times."
              delay={0.2}
            />
            <FeatureCard 
              icon={<FaLeaf className="text-3xl text-primary" />}
              title="Sustainability"
              description="Identify recyclables automatically to promote eco-friendly waste processing."
              delay={0.4}
            />
            <FeatureCard 
              icon={<FaGlobe className="text-3xl text-accent-cyan" />}
              title="Live Tracking Ready"
              description="Designed to seamlessly integrate with real-time GPS fleet tracking modules."
              delay={0.6}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
