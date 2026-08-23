import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { ChevronRight } from 'lucide-react';

const ReportCard = ({ report }) => {
  return (
    <Link to={`/citizen/reports/${report.report_id || report._id}`} className="block">
      <div className="card hover:border-black transition-colors flex justify-between items-center group cursor-pointer">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
              {report.report_id || 'N/A'}
            </span>
            <StatusBadge status={report.status} />
          </div>
          <h3 className="font-semibold text-lg text-black">{report.waste_type} Waste</h3>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-4">
            <span>Severity: {report.severity || 'Unknown'}</span>
            <span>Date: {report.created_at ? new Date(report.created_at).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
        <div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
