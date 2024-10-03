import * as faceapi from '@vladmandic/face-api';

export const loadModels = async () => {
  try {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    ]);
    console.log('Face Models are loaded!!!');
  } catch (error) {
    console.error('Error loading models:', error);
  }
};
