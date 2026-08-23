import React, { useEffect, useState } from 'react';
import { getReports } from '../../services/citizenService';
import ReportCard from '../../components/ReportCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { FileText } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        const reportList = Array.isArray(data) ? data : data.reports || [];
        setReports(reportList);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports.filter(r => {
    if (filter === 'All') return true;
    const st = r.status?.toLowerCase() || '';
    if (filter === 'Pending' && st === 'pending') return true;
    if (filter === 'Assigned' && st === 'assigned') return true;
    if (filter === 'In Progress' && (st === 'in_progress' || st === 'in progress')) return true;
    if (filter === 'Completed' && st === 'completed') return true;
    return false;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-black mb-4 md:mb-0">My Reports History</h1>
        
        <select 
          className="input-field w-full md:w-48 bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading reports..." />
      ) : filteredReports.length === 0 ? (
        <EmptyState 
          icon={FileText}
          title="No reports found" 
          message={filter === 'All' ? "You haven't submitted any reports yet." : `No reports found with status: ${filter}`} 
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, i) => (
            <ReportCard key={report._id || report.report_id || i} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
