// import React, { useRef, useEffect } from 'react';
// import * as faceapi from 'face-api.js';

// function WebcamCapture({ onCapture }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       videoRef.current.srcObject = stream;
//     });
//   }, []);

//   const capture = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/jpeg');
//     onCapture(dataURL); // send to parent
//   };

//   return (
//     <div>
//       <video ref={videoRef} width="320" height="240" autoPlay muted />
//       <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
//       <button onClick={capture}>Capture</button>
//     </div>
//   );
// }

// export default WebcamCapture;


import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceCapture() {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    // Load models
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]).then(startVideo);

    function startVideo() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error('Error starting video:', err));
    }
  }, []);

  useEffect(() => {
    async function uploadToCloudinary(canvas) {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
      const formData = new FormData();
      formData.append('image', blob, 'face.jpg');

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      console.log('Uploaded to Cloudinary:', data.imageUrl);

      // TODO: send data.imageUrl to your DB
    }

    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const displaySize = {
        width: videoRef.current.width,
        height: videoRef.current.height
      };

      const resized = faceapi.resizeResults(detections, displaySize);
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

      if (detections.length > 0) {
        await uploadToCloudinary(canvasRef.current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
}
