import React from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaIdCard, FaPhoneAlt, FaExclamationTriangle } from 'react-icons/fa';

const VehicleCard = ({ report, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass glass-hover p-5 border border-white/5 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-16 h-16 blur-2xl -z-10 rounded-full ${
        report.severity === 'High' ? 'bg-red-500/20' : 
        report.severity === 'Medium' ? 'bg-yellow-500/20' : 'bg-primary/20'
      }`} />
      
      <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
        <div>
          <span className="text-xs text-gray-500 block mb-1">REPORT ID</span>
          <span className="text-primary-light font-mono font-bold">{report.report_id}</span>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-semibold ${
          report.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
          report.status === 'Assigned' ? 'bg-blue-500/20 text-blue-400' :
          'bg-primary/20 text-primary-light'
        }`}>
          {report.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 flex items-center"><FaExclamationTriangle className="mr-1"/> Severity</p>
          <p className="font-semibold text-white">{report.severity}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Waste Type</p>
          <p className="font-semibold text-white">{report.waste_type}</p>
        </div>
      </div>

      <div className="bg-[#111] rounded-lg p-3 border border-white/5 mt-auto">
        <h4 className="text-xs text-gray-400 mb-2 flex items-center">
          <FaTruck className="mr-2" /> {report.recommended_vehicle}
        </h4>
        {report.assigned_vehicle ? (
          <div className="space-y-1">
            <p className="text-sm text-white flex justify-between">
              <span className="flex items-center text-gray-400"><FaIdCard className="mr-2 text-xs" /> Driver:</span> 
              {report.assigned_vehicle.driver}
            </p>
            <p className="text-sm text-white flex justify-between">
              <span className="text-gray-400">Vehicle No:</span> 
              <span className="text-accent-cyan font-mono">{report.assigned_vehicle.vehicle_no}</span>
            </p>
          </div>
        ) : (
          <p className="text-sm text-yellow-500 italic">No vehicle assigned yet</p>
        )}
      </div>
    </motion.div>
  );
};

export default VehicleCard;
