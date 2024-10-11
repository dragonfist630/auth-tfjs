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
      // console.log('labelDecritors', labeledDescriptors);
      let result = false;
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);
      // console.log('faceMatcher', faceMatcher);
      const Fpredictions = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();
      if (Fpredictions.length > 1) {
        resolve(false);
        return;
      }
      Fpredictions.forEach((face) => {
        const { descriptor } = face;
        const bestMatch = faceMatcher.findBestMatch(descriptor);
        if (bestMatch.distance < 0.5) {
          // console.log('bestMatch', bestMatch);
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
