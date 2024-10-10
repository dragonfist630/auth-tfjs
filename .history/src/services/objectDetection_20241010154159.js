import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

let model; // Declare the model variable outside the function

// Function to load the model
export const loadModel = async () => {
  model = await cocoSsd.load(); // Load the COCO-SSD model
};

// Helper function to detect mobile phones
export const detectMobilePhone = async (video) => {
  if (!model || !video) return false; // Ensure model and video are available
  const predictions = await model.detect(video); // Run detection on the video feed
  const mobilePhoneDetected = predictions.some(
    (prediction) => prediction.class === 'cell phone' // Check for mobile phone
  );
  return mobilePhoneDetected; // Return detection result
};
