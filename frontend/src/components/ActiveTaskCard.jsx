import React, { useState } from 'react';
import { startTask, completeTask } from '../services/captainService';
import ErrorMessage from './ErrorMessage';
import StatusBadge from './StatusBadge';
import { MapPin, Truck, AlertTriangle, CheckCircle, Play } from 'lucide-react';

const ActiveTaskCard = ({ task, onTaskUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!task) return null;

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      await startTask(task.report_id || task._id);
      onTaskUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start collection.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    setError(null);
    try {
      await completeTask(task.report_id || task._id);
      onTaskUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete collection.');
    } finally {
      setLoading(false);
    }
  };

  const isInProgress = task.status === 'in_progress' || task.status === 'in progress';

  return (
    <div className="card border-black ring-1 ring-black">
      <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-black mb-2">Active Collection Task</h2>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
              {task.report_id || task._id}
            </span>
            <StatusBadge status={task.status} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-24 font-medium">Type:</span>
            <span className="text-black font-semibold">{task.waste_type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-24 font-medium"><AlertTriangle className="h-4 w-4 inline mr-1" /> Severity:</span>
            <span className="text-black font-semibold">{task.severity}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-24 font-medium">Garbage Ct:</span>
            <span className="text-black font-semibold">{task.garbage_count}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-24 font-medium"><Truck className="h-4 w-4 inline mr-1" /> Vehicle:</span>
            <span className="text-black">{task.assigned_vehicle?.vehicle_no || 'Assigned'}</span>
          </div>
          {task.location && (
            <div className="flex items-start text-sm text-gray-600">
              <span className="w-24 font-medium"><MapPin className="h-4 w-4 inline mr-1" /> Location:</span>
              <span className="text-black break-all">
                {task.location.latitude}, <br/>{task.location.longitude}
              </span>
            </div>
          )}
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="flex">
        {!isInProgress ? (
          <button 
            onClick={handleStart}
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center py-4"
          >
            <Play className="h-5 w-5 mr-2" />
            {loading ? 'Starting...' : 'Start Collection'}
          </button>
        ) : (
          <button 
            onClick={handleComplete}
            disabled={loading}
            className="w-full bg-green-600 text-white hover:bg-green-700 px-6 py-4 rounded font-medium transition-colors flex justify-center items-center"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {loading ? 'Completing...' : 'Complete Collection'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveTaskCard;
