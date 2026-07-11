import React, { useState } from 'react';
import UploadCard from '../components/UploadCard';
import WasteTypeCards from '../components/WasteTypeCards';
import PredictionCard from '../components/PredictionCard';
import Timeline from '../components/Timeline';
import Loader from '../components/Loader';
import { predictWaste } from '../services/api';
import { useNotification } from '../hooks/useNotification';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const CitizenDashboard = () => {
  const [file, setFile] = useState(null);
  const [wasteType, setWasteType] = useState('Mixed');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [timelineStage, setTimelineStage] = useState(1);
  const { addNotification } = useNotification();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setTimelineStage(1);
    setPredictionResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      addNotification('Please upload an image first.', 'error');
      return;
    }

    setIsLoading(true);
    setTimelineStage(2); // AI Processing

    try {
      // Simulate slight delay for animation effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await predictWaste(file, wasteType);
      
      setPredictionResult(result);
      addNotification('AI Analysis Completed Successfully!', 'success');
      
      if (result.assigned_vehicle) {
        setTimelineStage(6); // Completed
        addNotification(`Vehicle Assigned: ${result.assigned_vehicle.vehicle_no}`, 'info');
      } else {
        setTimelineStage(5); // Waiting
      }
    } catch (error) {
      addNotification('Failed to analyze the image. Is the backend running?', 'error');
      setTimelineStage(1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[80vh]">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Citizen <span className="text-primary-light">Dashboard</span></h1>
        <p className="text-gray-400">Upload a photo of uncollected garbage to trigger the AI dispatch engine.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative">
            <UploadCard onFileSelect={handleFileSelect} />
            {isLoading && <Loader />}
          </div>
          
          <WasteTypeCards selectedType={wasteType} onSelectType={setWasteType} />
          
          <div className="flex justify-end pt-4">
            <button
              onClick={handleAnalyze}
              disabled={!file || isLoading}
              className={`px-8 py-4 rounded-full font-bold text-lg shadow-glow transition-all duration-300 flex items-center ${
                !file || isLoading 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50' 
                  : 'bg-primary text-black hover:bg-primary-light hover:scale-105'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center"><FaExclamationCircle className="animate-spin mr-2"/> Analyzing...</span>
              ) : (
                <span className="flex items-center"><FaCheckCircle className="mr-2"/> Analyze Garbage</span>
              )}
            </button>
          </div>

          {predictionResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <PredictionCard result={predictionResult} />
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="glass p-6 sticky top-24">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-4">Dispatch Status</h3>
            <Timeline currentStage={timelineStage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
