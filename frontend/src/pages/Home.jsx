import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Cpu, Truck, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <div className="inline-block border border-gray-200 rounded-full px-4 py-1 text-xs font-semibold tracking-wider uppercase text-gray-500 mb-6">
            Smarter Waste Collection
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-black leading-tight tracking-tight mb-6">
            Smarter Waste Collection.<br />
            Cleaner Communities.
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl font-light leading-relaxed">
            Report waste from wherever you are. Our AI analyzes the waste and SmartWaste Dispatch connects the request with the right collection team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/citizen/report" className="btn-primary flex items-center justify-center text-lg px-8">
              Report Waste <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/login" className="btn-secondary flex items-center justify-center text-lg px-8">
              Get Started
            </Link>
          </div>
        </div>
        
        {/* Minimal 2D Illustration */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-gray-50 rounded-2xl p-8 border border-gray-100 relative">
            <div className="absolute top-4 left-4 h-3 w-3 bg-red-400 rounded-full"></div>
            <div className="absolute top-4 left-9 h-3 w-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-4 left-14 h-3 w-3 bg-green-400 rounded-full"></div>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <Camera className="h-6 w-6 text-gray-400" />
                <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
              </div>
              <div className="flex justify-center"><div className="h-8 w-px bg-gray-200"></div></div>
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <Cpu className="h-6 w-6 text-gray-400" />
                <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
              </div>
              <div className="flex justify-center"><div className="h-8 w-px bg-gray-200"></div></div>
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-black">
                <Truck className="h-6 w-6 text-black" />
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="bg-gray-50 py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">A simple, transparent process from reporting to collection.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Capture Waste', desc: 'Upload an image or take a photo directly using your camera.' },
              { num: '02', title: 'AI Analysis', desc: 'AI analyzes the image and estimates the waste quantity and severity.' },
              { num: '03', title: 'Smart Dispatch', desc: 'The system finds suitable nearby collection vehicles and captains.' },
              { num: '04', title: 'Collection', desc: 'A captain accepts the request and collects the waste promptly.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-4xl font-black text-gray-200 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-6 right-0 w-1/2 h-px bg-gray-200"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <CheckCircle2 className="h-8 w-8 text-black mb-4" />
              <h3 className="text-lg font-bold text-black mb-2">AI Waste Detection</h3>
              <p className="text-gray-500 text-sm">Automatic classification and volume estimation using advanced vision models.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <CheckCircle2 className="h-8 w-8 text-black mb-4" />
              <h3 className="text-lg font-bold text-black mb-2">Location-Based Dispatch</h3>
              <p className="text-gray-500 text-sm">Matches requests with the nearest available collection team.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
              <CheckCircle2 className="h-8 w-8 text-black mb-4" />
              <h3 className="text-lg font-bold text-black mb-2">Real-Time Status</h3>
              <p className="text-gray-500 text-sm">Track the progress of your report from submission to completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-6">See waste? Report it.</h2>
          <p className="text-gray-400 mb-8 text-lg">Join the community effort to keep our streets clean.</p>
          <Link to="/citizen/report" className="bg-white text-black px-8 py-4 rounded font-bold hover:bg-gray-100 transition-colors inline-block text-lg">
            Report Waste Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
