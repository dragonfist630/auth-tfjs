import * as faceapi from '@vladmandic/face-api';

export const loadModels = async () => {
  try {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/model'),
      faceapi.nets.tinyFaceDetector.loadFromUri('/model'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/model'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/model'),
    ]);
    console.log('Face Models are loaded!!!');
  } catch (error) {
    console.error('Error loading models:', error);
  }
};
