import React, { useState } from 'react';
import { MapPin, Loader2, Check } from 'lucide-react';

const LocationPicker = ({ onLocationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const requestLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setLocation(coords);
        onLocationSelect(coords);
        setLoading(false);
      },
      (err) => {
        setError("Location access was denied. Please enable location or try again.");
        setLoading(false);
      }
    );
  };

  if (location) {
    return (
      <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded text-green-800">
        <Check className="h-5 w-5 mr-2 text-green-600" />
        <span className="font-medium">Location detected ✓</span>
      </div>
    );
  }

  return (
    <div>
      <button 
        type="button" 
        onClick={requestLocation}
        disabled={loading}
        className="w-full flex items-center justify-center p-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 mr-2 animate-spin text-gray-500" />
        ) : (
          <MapPin className="h-5 w-5 mr-2 text-gray-500" />
        )}
        <span className="font-medium text-gray-700">
          {loading ? 'Detecting location...' : 'Use My Current Location'}
        </span>
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default LocationPicker;
