import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReport } from '../../services/citizenService';
import StatusBadge from '../../components/StatusBadge';
import ReportStatusTimeline from '../../components/ReportStatusTimeline';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ArrowLeft, MapPin, Truck, AlertTriangle } from 'lucide-react';

const ReportDetails = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport(reportId);
        setReport(data.report || data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch report details.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  if (loading) return <LoadingSpinner text="Loading report details..." />;
  if (error) return <div className="max-w-3xl mx-auto py-10 px-4"><ErrorMessage message={error} /></div>;
  if (!report) return <div className="max-w-3xl mx-auto py-10 px-4"><ErrorMessage message="Report not found." /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh]">
      <Link to="/citizen/reports" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Reports
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 shadow-subtle">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-black mb-2 flex items-center">
              Report <span className="text-gray-400 font-mono ml-3 text-lg">#{report.report_id || report._id}</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Submitted on {new Date(report.created_at).toLocaleString()}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <StatusBadge status={report.status} />
          </div>
        </div>

        <ReportStatusTimeline currentStatus={report.status} />

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div>
            <h3 className="text-lg font-bold text-black mb-4">AI Analysis Results</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Waste Type</span>
                <span className="font-semibold text-black">{report.waste_type}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Garbage Count</span>
                <span className="font-semibold text-black">{report.garbage_count}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Coverage</span>
                <span className="font-semibold text-black">{report.coverage?.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2 items-center">
                <span className="text-gray-500 flex items-center"><AlertTriangle className="h-4 w-4 mr-1" /> Severity</span>
                <span className="font-semibold text-black">{report.severity}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-black mb-4">Dispatch Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2 items-center">
                <span className="text-gray-500 flex items-center"><Truck className="h-4 w-4 mr-1" /> Recommended Vehicle</span>
                <span className="font-semibold text-black">{report.recommended_vehicle}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Personnel Required</span>
                <span className="font-semibold text-black">{report.personnel_required}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2 items-center">
                <span className="text-gray-500 flex items-center"><MapPin className="h-4 w-4 mr-1" /> Location</span>
                <span className="font-medium text-black text-right text-sm">
                  Lat: {report.location?.latitude?.toFixed(5)}<br/>
                  Lng: {report.location?.longitude?.toFixed(5)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
