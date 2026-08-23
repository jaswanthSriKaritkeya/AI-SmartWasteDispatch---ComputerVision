import React from 'react';

const EmptyState = ({ icon: Icon, title, message }) => {
  return (
    <div className="card text-center py-16">
      {Icon && (
        <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm mx-auto">{message}</p>
    </div>
  );
};

export default EmptyState;
