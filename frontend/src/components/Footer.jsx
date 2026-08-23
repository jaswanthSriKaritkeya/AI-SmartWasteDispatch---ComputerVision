import React from 'react';
import { Recycle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Recycle className="h-5 w-5 text-black mr-2" />
          <span className="font-bold text-lg text-black">SmartWaste Dispatch</span>
        </div>
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SmartWaste Dispatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
