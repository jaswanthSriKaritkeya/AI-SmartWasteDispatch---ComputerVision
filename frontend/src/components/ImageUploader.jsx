import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ onImageSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <input 
        ref={inputRef} 
        type="file" 
        accept="image/jpeg, image/png, image/webp" 
        onChange={handleChange} 
        className="hidden" 
      />
      <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-gray-900 font-medium mb-1">Click to upload image</p>
      <p className="text-gray-500 text-sm">or drag and drop</p>
      <p className="text-gray-400 text-xs mt-4">JPG, PNG, WEBP allowed</p>
    </div>
  );
};

export default ImageUploader;
