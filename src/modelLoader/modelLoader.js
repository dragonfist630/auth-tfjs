import * as faceapi from '@vladmandic/face-api';

export const loadModels = async () => {
  try {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/auth-tfjs/models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('/auth-tfjs/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/auth-tfjs/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/auth-tfjs/models'),
    ]);
    console.log('Face Models are loaded!!!');
  } catch (error) {
    console.error('Error loading models:', error);
  }
};
