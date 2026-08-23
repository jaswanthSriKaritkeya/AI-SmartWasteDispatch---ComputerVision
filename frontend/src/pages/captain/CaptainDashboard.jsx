import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getActiveTask, getRequests } from '../../services/captainService';
import StatsCard from '../../components/StatsCard';
import ActiveTaskCard from '../../components/ActiveTaskCard';
import RequestCard from '../../components/RequestCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import { Truck, AlertCircle, CheckCircle2 } from 'lucide-react';

const CaptainDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTask, setActiveTask] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      // Use Promise.all to fetch concurrently
      const [taskData, requestsData] = await Promise.all([
        getActiveTask().catch(() => null),
        getRequests().catch(() => ({ requests: [] }))
      ]);

      // GET /captain/tasks/active returns { success, task: {...} | null }
      if (taskData && taskData.task && taskData.task.report_id) {
        setActiveTask(taskData.task);
      } else {
        setActiveTask(null);
      }

      // GET /captain/requests returns { success, requests: [...] }
      const reqList = Array.isArray(requestsData)
        ? requestsData
        : (requestsData?.requests || []);
      setRequests(reqList);
    } catch (err) {
      console.error("Dashboard fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Poll for new requests every 10 seconds if there's no active task
    // Actually, prompt says: Call GET /captain/requests every 10 seconds
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh]">
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-black mb-1">Captain Dashboard</h1>
        <div className="flex flex-col sm:flex-row sm:items-center text-gray-500">
          <span className="font-medium text-black mr-4">{user?.name}</span>
          <span className="flex items-center text-sm"><Truck className="h-4 w-4 mr-1"/> Vehicle: {user?.vehicle_no || 'Assigned Vehicle'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatsCard title="Pending Requests" value={requests.length} icon={AlertCircle} />
        <StatsCard title="Active Task" value={activeTask ? 1 : 0} icon={Truck} />
        <StatsCard title="Completed Today" value="--" icon={CheckCircle2} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-200 pb-2">Current Assignment</h2>
          {loading && !activeTask ? (
            <LoadingSpinner text="Checking for active tasks..." />
          ) : activeTask ? (
            <ActiveTaskCard task={activeTask} onTaskUpdate={fetchDashboardData} />
          ) : (
            <EmptyState 
              icon={CheckCircle2}
              title="No active collection task" 
              message="You are currently available. Check incoming dispatch requests." 
            />
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-black border-b border-gray-200 pb-2">Incoming Requests</h2>
          {loading && requests.length === 0 ? (
            <LoadingSpinner text="Finding requests..." />
          ) : requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map(req => (
                <RequestCard key={req.report_id || req._id} request={req} onStatusChange={fetchDashboardData} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded p-6 text-center text-gray-500 text-sm">
              No new dispatch requests in your area.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptainDashboard;
