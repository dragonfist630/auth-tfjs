import * as faceapi from '@vladmandic/face-api';

export const faceRecognition = async (
  videoWidth,
  videoHeight,
  video,
  userData
) => {
  const snapshotCanvas = document.createElement('canvas');
  snapshotCanvas.width = videoWidth;
  snapshotCanvas.height = videoHeight;
  const snapshotCtx = snapshotCanvas.getContext('2d');
  snapshotCtx.drawImage(video, 0, 0, videoWidth, videoHeight);

  const snapshotImage = snapshotCanvas.toDataURL('image/png');
  const img = new Image();
  img.src = snapshotImage;

  return new Promise((resolve) => {
    img.onload = async () => {
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
    };
  });
};
