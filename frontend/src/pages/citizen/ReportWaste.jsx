import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraCapture from '../../components/CameraCapture';
import ImageUploader from '../../components/ImageUploader';
import LocationPicker from '../../components/LocationPicker';
import { createReport } from '../../services/citizenService';
import ErrorMessage from '../../components/ErrorMessage';
import { getApiErrorMessage } from '../../utils/errorUtils';
import { Camera, UploadCloud, Loader2, RefreshCw } from 'lucide-react';

const ReportWaste = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [wasteType, setWasteType] = useState('Mixed');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageCapture = (file) => {
    setImageFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setShowCamera(false);
  };

  const handleRetake = () => {
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Please upload or capture a waste image.");
      return;
    }
    if (!wasteType) {
      setError("Please select the waste type.");
      return;
    }
    if (!location) {
      setError("Please allow location access.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('waste_type', wasteType);
    formData.append('latitude', String(location.latitude));
    formData.append('longitude', String(location.longitude));

    try {
      const response = await createReport(formData);
      // Navigate to report details after successful creation
      const reportId = response.report?.report_id || response.report?._id;
      if (reportId) {
        navigate(`/citizen/reports/${reportId}`);
      } else {
        navigate('/citizen/dashboard');
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (showCamera) {
    return <CameraCapture onImageCapture={handleImageCapture} onCancel={() => setShowCamera(false)} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-black">Report Waste</h1>
        <p className="text-gray-500 mt-2">Upload a photo and details to dispatch a collection vehicle.</p>
      </div>

      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Step 1: Image */}
        <section>
          <h2 className="text-xl font-bold text-black mb-4">1. Waste Photo</h2>
          
          {!imageFile ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-center font-medium text-gray-700 mb-6">How would you like to add your waste photo?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  type="button"
                  onClick={() => setShowCamera(true)}
                  className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Camera className="h-8 w-8 text-black mb-2" />
                  <span className="font-semibold text-black">Take Photo</span>
                </button>
                <div className="flex-1">
                  <ImageUploader onImageSelect={handleImageCapture} />
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center">
              <img src={previewUrl} alt="Waste Preview" className="max-h-64 mx-auto rounded object-cover mb-4" />
              <button type="button" onClick={handleRetake} className="btn-secondary text-sm flex items-center justify-center mx-auto">
                <RefreshCw className="h-4 w-4 mr-2" /> Retake / Change Image
              </button>
            </div>
          )}
        </section>

        {/* Step 2: Details */}
        <section>
          <h2 className="text-xl font-bold text-black mb-4">2. Waste Details</h2>
          <div className="card space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type</label>
              <select 
                className="input-field bg-white" 
                value={wasteType} 
                onChange={(e) => setWasteType(e.target.value)}
                required
              >
                <option value="Plastic">Plastic</option>
                <option value="Metal">Metal</option>
                <option value="Organic">Organic</option>
                <option value="Mixed">Mixed</option>
                <option value="Glass">Glass</option>
                <option value="Paper">Paper</option>
                <option value="E-Waste">E-Waste</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <LocationPicker onLocationSelect={setLocation} />
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-4 border-t border-gray-200">
          <button 
            type="submit" 
            disabled={loading || !imageFile || !location}
            className={`w-full py-4 text-lg font-bold flex justify-center items-center rounded transition-colors ${
              (loading || !imageFile || !location) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 mr-2 animate-spin" />
                Analyzing waste and finding collection team...
              </>
            ) : (
              'Analyze & Dispatch'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportWaste;
