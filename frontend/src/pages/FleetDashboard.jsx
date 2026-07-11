import React, { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { getReports } from '../services/api';
import { useNotification } from '../hooks/useNotification';
import { FaTruckLoading, FaSearch } from 'react-icons/fa';

const FleetDashboard = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const data = await getReports();
      console.log("Reports API response :",data);
      // Ensure data is an array before setting
      if (Array.isArray(data)) {
        setReports(data);
      } else if (data && Array.isArray(data.reports)) {
        setReports(data.reports);
      } else {
        setReports([]);
      }
    } catch (error) {
      addNotification('Failed to fetch dispatch reports', 'error');
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReports = reports.filter(r => 
    r.report_id?.toLowerCase().includes(search.toLowerCase()) || 
    r.waste_type?.toLowerCase().includes(search.toLowerCase()) ||
    r.assigned_vehicle?.vehicle_no?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[80vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Fleet <span className="text-accent-cyan">Dashboard</span></h1>
          <p className="text-gray-400">Live overview of all generated reports and vehicle dispatch status.</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search reports or vehicles..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 bg-[#111] border border-white/10 rounded-full py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FaTruckLoading className="text-6xl text-accent-cyan mb-4 animate-bounce" />
          <p>Loading dispatch network...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="glass p-12 text-center border border-white/5">
          <p className="text-xl text-gray-500">No dispatch reports found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <VehicleCard key={report.report_id || index} report={report} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FleetDashboard;
