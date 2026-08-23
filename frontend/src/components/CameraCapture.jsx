import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';

const CameraCapture = ({ onImageCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      // Handle specific camera permission / hardware errors
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Camera access was denied. You can upload an image instead.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No camera found on this device. Please upload an image instead.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Camera is in use by another application. Please close it and try again.');
      } else if (err.name === 'AbortError') {
        setError('Camera access was interrupted. Please try again.');
      } else {
        setError('Camera is not available on this device. You can upload an image instead.');
      }
    }
  }, []);

  // Start camera ONCE on mount; stop it on unmount.
  // capturedImage must NOT be in this dependency array —
  // doing so caused the camera to restart every time a photo was captured.
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // Revoke the captured preview blob URL when it is replaced or on unmount.
  useEffect(() => {
    return () => {
      if (capturedImage?.url) {
        URL.revokeObjectURL(capturedImage.url);
      }
    };
  }, [capturedImage]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas frame to a real File object.
      // The parent receives a File — never a blob URL, base64, or canvas reference.
      canvas.toBlob((blob) => {
        if (!blob) {
          setError('Failed to capture photo. Please try again.');
          return;
        }
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        const previewUrl = URL.createObjectURL(blob);
        setCapturedImage({ url: previewUrl, file });
        stopCamera(); // Stop the stream immediately after capture
      }, 'image/jpeg', 0.9);
    }
  };

  const handleRetake = () => {
    // Revoke previous preview URL before restarting camera
    if (capturedImage?.url) {
      URL.revokeObjectURL(capturedImage.url);
    }
    setCapturedImage(null);
    startCamera();
  };

  const handleUsePhoto = () => {
    if (capturedImage && capturedImage.file) {
      // Pass the actual File object to parent — never a blob URL or base64
      onImageCapture(capturedImage.file);
    }
  };

  const handleCancel = () => {
    stopCamera();
    onCancel();
  };

  if (error) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Camera className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <p className="text-red-600 font-medium mb-2">Camera Unavailable</p>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button onClick={onCancel} className="btn-secondary">
          Upload Image Instead
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="p-4 flex justify-between items-center text-white bg-black">
        <span className="font-medium">{capturedImage ? 'Review Photo' : 'Take Photo'}</span>
        <button onClick={handleCancel} className="p-2 hover:bg-gray-800 rounded-full">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-grow relative flex items-center justify-center bg-black overflow-hidden">
        {capturedImage ? (
          <img src={capturedImage.url} alt="Captured" className="max-w-full max-h-full object-contain" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="max-w-full max-h-full object-contain"
          />
        )}
        {/* Hidden canvas — used only to capture a frame. Never sent to backend. */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="p-6 bg-black flex justify-center items-center space-x-8">
        {capturedImage ? (
          <>
            <button onClick={handleRetake} className="flex flex-col items-center text-white p-2">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-1">
                <RefreshCw className="h-5 w-5" />
              </div>
              <span className="text-xs">Retake</span>
            </button>

            <button onClick={handleUsePhoto} className="flex flex-col items-center text-white p-2">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-1">
                <Check className="h-8 w-8" />
              </div>
              <span className="text-xs">Use Photo</span>
            </button>
          </>
        ) : (
          <button
            onClick={capturePhoto}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1"
          >
            <div className="w-full h-full bg-white rounded-full" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;

