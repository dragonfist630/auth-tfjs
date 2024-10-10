import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useObjectDetection = (video) => {
  const [model, setModel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const detectMobilePhone = async () => {
    if (!model || !video) return false;
    const predictions = await model.detect(video);
    const mobilePhoneDetected = predictions.some(
      (prediction) => prediction.class === 'cell phone'
    );
    return mobilePhoneDetected;
  };

  const detect = async () => {
    try {
      const mobileDetected = await detectMobilePhone();
      if (mobileDetected) {
        console.log('Mobile phone detected in the video feed.');
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.error('Error during object detection:', e);
      return false;
    }
  };

  return { detect };
};

export default useObjectDetection;
