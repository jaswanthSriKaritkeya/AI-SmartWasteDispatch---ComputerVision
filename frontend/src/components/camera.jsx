import { useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsCameraOn(true);

    } catch (error) {
      console.error("Camera access failed:", error);
      alert("Unable to access camera. Please allow camera permission.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      setStream(null);
      setIsCameraOn(false);
    }
  };

  return (
    <div>
      <h2>Real-Time Camera</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "500px" }}
      />

      <br />

      {!isCameraOn ? (
        <button onClick={startCamera}>
          Open Camera
        </button>
      ) : (
        <button onClick={stopCamera}>
          Stop Camera
        </button>
      )}
    </div>
  );
};

export default Camera;