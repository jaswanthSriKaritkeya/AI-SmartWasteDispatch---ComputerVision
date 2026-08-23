import React, { useState } from 'react';
import { MapPin, AlertTriangle, Truck, Loader2 } from 'lucide-react';
import { acceptRequest, rejectRequest } from '../services/captainService';
import ErrorMessage from './ErrorMessage';
import { getApiErrorMessage } from '../utils/errorUtils';

const RequestCard = ({ request, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // The dispatch request object uses `request_id` (the string ObjectId) for accept/reject.
  // Do NOT use request.report_id here — that's a different identifier.
  const requestId = request.request_id;

  const handleAccept = async () => {
    setLoading(true);
    setError(null);
    try {
      await acceptRequest(requestId);
      onStatusChange();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setError(null);
    try {
      await rejectRequest(requestId);
      onStatusChange();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 mb-2 inline-block">
            {request.report_id || request._id}
          </span>
          <h3 className="font-semibold text-lg text-black">{request.waste_type} Waste</h3>
        </div>
        <span className="text-xs text-gray-500">{new Date(request.created_at).toLocaleTimeString()}</span>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Severity: <span className="font-medium ml-1 text-black">{request.severity}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Truck className="h-4 w-4 mr-2" />
          Recommended: <span className="font-medium ml-1 text-black">{request.recommended_vehicle}</span>
        </div>
        {request.location && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            Location: {request.location.latitude.toFixed(4)}, {request.location.longitude.toFixed(4)}
          </div>
        )}
      </div>

      <ErrorMessage message={error} />

      <div className="flex space-x-3">
        <button 
          onClick={handleAccept} 
          disabled={loading}
          className="flex-1 btn-primary py-2 text-sm flex justify-center items-center"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Accept'}
        </button>
        <button 
          onClick={handleReject} 
          disabled={loading}
          className="flex-1 btn-secondary py-2 text-sm flex justify-center items-center"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Reject'}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
