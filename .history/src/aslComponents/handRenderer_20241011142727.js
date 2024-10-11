const jointIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  littleFinger: [0, 17, 18, 19, 20],
};

export const renderHand = (detections, canvasContext) => {
  if (detections.length > 0) {
    detections.forEach((detection) => {
      const points = detection.landmarks;

      Object.keys(jointIndices).forEach((fingerName) => {
        const joints = jointIndices[fingerName];
        joints.slice(0, -1).forEach((jointIndex, i) => {
          const startJoint = joints[i];
          const endJoint = joints[i + 1];

          canvasContext.beginPath();
          canvasContext.moveTo(points[startJoint][0], points[startJoint][1]);
          canvasContext.lineTo(points[endJoint][0], points[endJoint][1]);
          canvasContext.strokeStyle = '#FF4500';
          canvasContext.lineWidth = 3;
          canvasContext.stroke();
        });
      });

      points.forEach(([x, y]) => {
        canvasContext.beginPath();
        canvasContext.arc(x, y, 5, 0, 3 * Math.PI);
        canvasContext.fillStyle = '#32CD32';
        canvasContext.fill();
      });
    });
  }
};
