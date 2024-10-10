import * as faceapi from '@vladmandic/face-api';

export const faceRecognition = async (
  // videoWidth,
  // videoHeight,
  // video,
  img,
  userData
) => {
  try {
    // const snapshotCanvas = document.createElement('canvas');
    // snapshotCanvas.width = videoWidth;
    // snapshotCanvas.height = videoHeight;
    // const snapshotCtx = snapshotCanvas.getContext('2d');
    // snapshotCtx.drawImage(video, 0, 0, videoWidth, videoHeight);

    // const snapshotImage = snapshotCanvas.toDataURL('image/png');
    // const img = new Image();
    // img.src = snapshotImage;

    return new Promise(async (resolve) => {
      // img.onload = async () => {
      const labeledDescriptors = [...Array(5)].map(
        (_, i) =>
          new faceapi.LabeledFaceDescriptors(userData.name, [
            new Float32Array(userData.descriptors[i]),
          ])
      );
      let result = false;
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      if (detections.length > 1) {
        resolve(false); // Return false if more than one face is detected
        return; // Exit the function
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
      // };
    });
  } catch (error) {
    console.log('Error caught in faceRecognition', error);
  }
};
