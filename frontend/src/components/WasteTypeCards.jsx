import React from 'react';
import { motion } from 'framer-motion';
import { FaRecycle, FaCube, FaLeaf, FaGlassMartini, FaNewspaper, FaMicrochip, FaTrash } from 'react-icons/fa';

const categories = [
  { id: 'Plastic', label: 'Plastic', icon: <FaRecycle /> },
  { id: 'Metal', label: 'Metal', icon: <FaCube /> },
  { id: 'Organic', label: 'Organic', icon: <FaLeaf /> },
  { id: 'Glass', label: 'Glass', icon: <FaGlassMartini /> },
  { id: 'Paper', label: 'Paper', icon: <FaNewspaper /> },
  { id: 'Electronic', label: 'Electronic', icon: <FaMicrochip /> },
  { id: 'Mixed', label: 'Mixed', icon: <FaTrash /> },
];

const WasteTypeCards = ({ selectedType, onSelectType }) => {
  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-semibold text-white mb-4">Select Waste Type</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((cat, index) => {
          const isSelected = selectedType === cat.id;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectType(cat.id)}
              className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-primary/20 border-primary-light shadow-glow text-primary-light'
                  : 'glass border-transparent text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <span className="text-xs font-medium">{cat.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WasteTypeCards;
