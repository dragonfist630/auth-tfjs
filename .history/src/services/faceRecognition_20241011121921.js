import * as faceapi from '@vladmandic/face-api';

export const faceRecognition = async (img, userData) => {
  try {
    return new Promise(async (resolve) => {
      const labeledDescriptors = [...Array(5)].map(
        (_, i) =>
          new faceapi.LabeledFaceDescriptors(userData.name, [
            new Float32Array(userData.descriptors[i]),
          ])
      );
      let result = false;
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      if (detections.length > 1) {
        resolve(false);
        return;
      }
      detections.forEach((face) => {
        const { descriptor } = face;
        const bestMatch = faceMatcher.findBestMatch(descriptor);
        if (bestMatch.label) {
          result = userData.name;
        } else {
          result = false;
        }
      });
      resolve(result);
    });
  } catch (error) {
    console.log('Error caught in faceRecognition', error);
  }
};
