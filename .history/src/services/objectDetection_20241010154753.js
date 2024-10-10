import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

let model;

export const loadModel = async () => {
  model = await cocoSsd.load();
};

export const detectMobilePhone = async (video) => {
  if (!model || !video) return false;
  const predictions = await model.detect(video);
  const mobilePhoneDetected = predictions.some(
    (prediction) => prediction.class === 'cell phone'
  );
  return mobilePhoneDetected;
};
