import React from 'react';

const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-black">{value}</p>
      </div>
      {Icon && (
        <div className="p-3 bg-gray-50 rounded-full">
          <Icon className="h-6 w-6 text-gray-700" />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
