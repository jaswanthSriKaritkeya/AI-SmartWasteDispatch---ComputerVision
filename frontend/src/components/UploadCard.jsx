import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';

const UploadCard = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  return (
    <div className="w-full">
      <motion.div
        className={`relative glass border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging ? 'border-primary-light shadow-glow' : 'border-gray-500 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        whileHover={{ scale: preview ? 1 : 1.02 }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <div className="relative h-64 w-full rounded-xl overflow-hidden">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white font-semibold flex items-center">
                <FaCloudUploadAlt className="mr-2" /> Change Image
              </p>
            </div>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              animate={{ y: isDragging ? -10 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {isDragging ? (
                <FaTrash className="text-6xl text-primary-light mb-4 text-glow" />
              ) : (
                <FaCloudUploadAlt className="text-6xl text-gray-400 mb-4" />
              )}
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">
              {isDragging ? 'Drop Garbage Image Here' : 'Drag & Drop Image'}
            </h3>
            <p className="text-gray-400 text-sm">
              or click to browse from your device
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadCard;
