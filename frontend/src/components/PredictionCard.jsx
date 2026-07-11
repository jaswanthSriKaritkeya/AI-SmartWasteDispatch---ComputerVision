import React from 'react';
import { motion } from 'framer-motion';
import { FaHashtag, FaRecycle, FaExclamationTriangle, FaTruck, FaUsers, FaChartPie, FaIdCard , FaTrash } from 'react-icons/fa';

const MetricItem = ({ icon, label, value, colorClass = 'text-white' }) => (
  <div className="glass p-4 rounded-xl flex items-center space-x-4 border border-white/5">
    <div className={`p-3 rounded-lg bg-black/30 ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={`text-lg font-bold ${colorClass}`}>{value}</p>
    </div>
  </div>
);

const PredictionCard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full glass p-6 border border-primary/30 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -z-10" />
      
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FaRecycle className="text-primary-light mr-3 animate-spin-slow" />
          AI Analysis Report
        </h2>
        <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary-light text-primary-light text-sm font-semibold flex items-center">
          <FaHashtag className="mr-1 text-xs" /> {result.report_id}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricItem 
          icon={<FaTrash className="text-xl" />} 
          label="Waste Type" 
          value={result.waste_type} 
        />
        <MetricItem 
          icon={<FaChartPie className="text-xl" />} 
          label="Coverage" 
          value={`${result.coverage}%`} 
          colorClass="text-accent-cyan"
        />
        <MetricItem 
          icon={<FaExclamationTriangle className="text-xl" />} 
          label="Severity" 
          value={result.severity} 
          colorClass={result.severity === 'High' ? 'text-red-400' : result.severity === 'Medium' ? 'text-yellow-400' : 'text-primary-light'}
        />
        <MetricItem 
          icon={<FaRecycle className="text-xl" />} 
          label="Recyclable" 
          value={result.recyclable ? 'Yes' : 'No'} 
          colorClass={result.recyclable ? 'text-primary-light' : 'text-gray-400'}
        />
        <MetricItem 
          icon={<FaHashtag className="text-xl" />} 
          label="Garbage Count" 
          value={result.garbage_count} 
        />
        <MetricItem 
          icon={<FaTruck className="text-xl" />} 
          label="Recommended Vehicle" 
          value={result.recommended_vehicle} 
        />
        <MetricItem 
          icon={<FaUsers className="text-xl" />} 
          label="Personnel Req." 
          value={result.personnel_required} 
        />
      </div>

      {result.assigned_vehicle && (
        <div className="bg-black/40 rounded-xl p-5 border border-white/10">
          <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center">
            <FaTruck className="mr-2 text-primary-light" /> Dispatch Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase">Driver</p>
              <p className="font-medium text-white flex items-center">
                <FaIdCard className="mr-2 text-gray-400" /> {result.assigned_vehicle.driver}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Vehicle No.</p>
              <p className="font-medium text-accent-cyan font-mono">{result.assigned_vehicle.vehicle_no}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Status</p>
              <p className="font-medium text-primary-light">{result.assigned_vehicle.status}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PredictionCard;
