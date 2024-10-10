import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { renderHand } from '../aslComponents/handRenderer';
import * as fp from 'fingerpose';
import aslSigns from '../aslComponents/gesture';
import * as faceapi from '@vladmandic/face-api';
import { faceRecognition } from '../services/faceRecognition';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { uploadImageAndSendEmail } from '../firebaseUtils/apiService';
import { generateRandomLetter } from '../services/randomLetterService';
import { clearUser } from '../redux/userSlice';
import objectDetection from '../services/objectDetection';

tf.setBackend('webgl');
const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const Recognition = ({ userData, userId }) => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [canvasState, setCanvasState] = useState('block');
  const [actionTaken, setActionTaken] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const selectedHandSign = 'B';
  // generateRandomLetter();

  const imgURL = `https://firebasestorage.googleapis.com/v0/b/auth-tfjs.appspot.com/o/HandSign%20Image%2F${selectedHandSign}.jpg?alt=media&token=${process.env.REACT_APP_TOKEN}`;

  const emailContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
  <h1 style="color: #0066cc; text-align: center;">Authentication Instructions</h1>
  <p style="font-size: 16px; line-height: 1.5;">Dear User,</p>
  <p style="font-size: 16px; line-height: 1.5;">To authenticate yourself, please follow these steps:</p>
  <ol style="font-size: 16px; line-height: 1.5;">
    <li>Position yourself in front of your camera.</li>
    <li>Ensure your background is clear and no other person is in the frame.</li>
    <li>Make the hand sign for the letter ${selectedHandSign} in American Sign Language, as shown in the image below.</li>
    <li>Make sure both your face and hand sign are clearly visible in the camera frame.</li>
  </ol>
  <h2 style="color: #0066cc; text-align: center;">Hand Sign for Letter ${selectedHandSign}</h2>
  <img src=${imgURL} alt="Hand sign for letter ${selectedHandSign} in American Sign Language" style="display: block; max-width: 100%; height: auto; margin: 20px auto; border: 2px solid #0066cc;">
  <p style="font-size: 16px; line-height: 1.5; font-weight: bold;">Important Notes:</p>
  <ul style="font-size: 16px; line-height: 1.5;">
    <li>Ensure good lighting for clear visibility.</li>
    <li>Hold the hand sign steady for a few seconds.</li>
  </ul>
  <p style="font-size: 16px; line-height: 1.5;">Thank you for your cooperation in maintaining the security of your account.</p>
  <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>Your Authentication Team</p>
  </div>`;

  const startCountdown = () => {
    setCountdown(60);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          dispatch(clearUser());
          navigate('/authenticated?username=invalid');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const runHandpose = async () => {
    await uploadImageAndSendEmail(
      userData.email,
      emailContent,
      selectedHandSign,
      startCountdown
    );
    const net = await handpose.load();
    intervalRef.current = setInterval(() => {
      recognize(net, selectedHandSign);
    }, 170);
  };

  const drawOval = (ctx, width, height, color) => {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(
      width / 2,
      height / 2 - 20,
      width / 6,
      height / 3.5,
      0,
      0,
      2 * Math.PI
    );
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
  };

  const recognize = async (net, letter) => {
    const { current: webcam } = webcamRef;
    const { video } = webcam || {};

    if (!webcam || !webcam.video || !canvasRef.current) {
      console.error('Webcam or canvas not available for face detection.');
      return;
    }

    if (actionTaken || !video || video.readyState !== 4) {
      return;
    }
    try {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcam.video.width = videoWidth;
      webcam.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const estimatedHands = await net.estimateHands(video);

      const ctx = canvasRef.current.getContext('2d');
      renderHand(estimatedHands, ctx);
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(
        canvasRef.current.width / 2,
        canvasRef.current.height / 2 - 20,
        canvasRef.current.width / 6,
        canvasRef.current.height / 3.5,
        0,
        0,
        2 * Math.PI
      );
      ctx.clip();
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();
      const imageData = canvasRef.current.toDataURL('image/png');
      const img = await faceapi.fetchImage(imageData);
      const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();
      if (detections.length > 0) {
        console.log('Face Detected', detections);
        drawOval(
          ctx,
          canvasRef.current.width,
          canvasRef.current.height,
          'green'
        );
      } else {
        drawOval(
          ctx,
          canvasRef.current.width,
          canvasRef.current.height,
          'purple'
        );
      }
      if (estimatedHands.length > 0) {
        const alphabetSigns = ALPHABETS.toLowerCase()
          .split('')
          .map((l) => aslSigns[`${l}_ASL`]);
        const GE = new fp.GestureEstimator([
          fp.Gestures.ThumbsUpGesture,
          ...alphabetSigns,
        ]);
        const estimatedGestures = await GE.estimate(
          estimatedHands[0].landmarks,
          6.5
        );
        const handSign = estimatedGestures.gestures.reduce((maxObj, obj) => {
          return obj.score > maxObj.score ? obj : maxObj;
        }, estimatedGestures.gestures[0])?.name;
        if (handSign === letter) {
          if (detections.length < 1) {
            setSnackbarMessage(
              'Kindly fit your face inside the circle and wait till it goes green.'
            );
            setSnackbarOpen(true);
            return;
          }
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setActionTaken(true);
          setCanvasState('none');
          const objectResult = objectDetection(video);
          console.log(objectResult);
          const isRecognized = await faceRecognition(
            // videoWidth,
            // videoHeight,
            img,
            userData
          );
          if (webcam && webcam.video && webcam.video.srcObject) {
            const stream = webcam.video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
          }
          if (isRecognized) {
            dispatch(
              setUser({
                name: userData.name,
                email: userData.email,
                dateOfBirth: userData.DOB,
                userId: userId,
              })
            );
            return navigate(`/authenticated?username=${isRecognized}`);
          } else {
            return navigate(`/error`);
          }
        }
      }
    } catch (error) {
      console.log('Error during the recognition:', error);
    }
  };

  useEffect(() => {
    const loadAndRunModels = async () => {
      try {
        runHandpose();
      } catch (error) {
        console.error('Error during model loading or inference:', error);
      }
    };
    loadAndRunModels();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Box
      padding={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={9} lg={8}>
          <Box
            display="flex"
            justifyContent="center"
            position="relative"
            sx={{ width: '100%' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
              }}
            >
              <Webcam
                id="webcam"
                ref={webcamRef}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
              <canvas
                id="gesture-canvas"
                ref={canvasRef}
                style={{
                  display: canvasState,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Box>
          <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
            Time Remaining: {countdown} seconds
          </Typography>
        </Grid>

        <Grid item xs={12} md={3} lg={2}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6" align="center">
                Kindly Check your email for Instructions on performing Hand
                Signs
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{ marginTop: '10px' }}
              >
                Ensure your background is clear and no other person is present
                in the frame.
              </Typography>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: 'bold', color: '#333' }}
              >
                Kindly Fit Your Face Inside the circle
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{ marginTop: '10px', color: '#555' }}
              >
                Adjust your face until the circle turns green.
              </Typography>
            </Paper>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MuiAlert
                onClose={handleSnackbarClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recognition;
