import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyle = (s) => {
    const st = s?.toLowerCase() || '';
    if (st === 'pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (st === 'assigned') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (st === 'in_progress' || st === 'in progress') return 'bg-orange-100 text-orange-800 border-orange-200';
    if (st === 'completed') return 'bg-green-100 text-green-800 border-green-200';
    if (st === 'rejected' || st === 'cancelled') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (s) => {
    const st = s?.toLowerCase() || '';
    if (st === 'in_progress') return 'In Progress';
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Unknown';
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusStyle(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
