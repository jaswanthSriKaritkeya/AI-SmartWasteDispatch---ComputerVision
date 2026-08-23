import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getReports } from '../../services/citizenService';
import StatsCard from '../../components/StatsCard';
import ReportCard from '../../components/ReportCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { FileText, Clock, Play, CheckCircle2, Plus } from 'lucide-react';

const CitizenDashboard = () => {
  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const inProgressCount = reports.filter(r => r.status === 'in_progress' || r.status === 'in progress' || r.status === 'assigned').length;
  const completedCount = reports.filter(r => r.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-black mb-1">Good morning, {user?.name}</h1>
          <p className="text-gray-500">Help keep your community clean.</p>
        </div>
        <Link to="/citizen/report" className="mt-4 md:mt-0 btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" /> Report Waste
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatsCard title="Total Reports" value={reports.length} icon={FileText} />
        <StatsCard title="Pending" value={pendingCount} icon={Clock} />
        <StatsCard title="In Progress" value={inProgressCount} icon={Play} />
        <StatsCard title="Completed" value={completedCount} icon={CheckCircle2} />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">Recent Reports</h2>
          <Link to="/citizen/reports" className="text-sm font-medium text-black hover:underline">View All</Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading your reports..." />
        ) : reports.length === 0 ? (
          <EmptyState 
            icon={FileText}
            title="No reports yet" 
            message="You haven't reported any waste yet. When you do, it will appear here." 
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.slice(0, 6).map((report, i) => (
              <ReportCard key={report._id || report.report_id || i} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;
