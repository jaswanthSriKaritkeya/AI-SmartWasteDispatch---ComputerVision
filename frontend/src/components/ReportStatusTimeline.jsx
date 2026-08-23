import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const ReportStatusTimeline = ({ currentStatus }) => {
  const steps = [
    { key: 'pending', label: 'Submitted' },
    { key: 'analyzing', label: 'AI Analysis' }, // Optional step depending on backend flow
    { key: 'dispatching', label: 'Dispatching' },
    { key: 'assigned', label: 'Captain Assigned' },
    { key: 'in_progress', label: 'Collection In Progress' },
    { key: 'completed', label: 'Completed' }
  ];

  // Map backend status to timeline steps
  let currentIndex = 0;
  if (currentStatus === 'pending') currentIndex = 1;
  else if (currentStatus === 'assigned') currentIndex = 3;
  else if (currentStatus === 'in_progress' || currentStatus === 'in progress') currentIndex = 4;
  else if (currentStatus === 'completed') currentIndex = 5;
  else if (currentStatus === 'rejected') currentIndex = 0; // Or handle rejected separately

  return (
    <div className="py-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.key} className="flex flex-col items-center group relative">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-white ${
                  isCompleted ? 'ring-2 ring-black' : 'ring-2 ring-gray-300'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-black" />
                  ) : (
                    <Circle className="h-3 w-3 text-gray-300" />
                  )}
                </div>
                <div className="absolute top-10 w-24 text-center -ml-8">
                  <span className={`text-xs font-medium ${isCurrent ? 'text-black' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportStatusTimeline;
