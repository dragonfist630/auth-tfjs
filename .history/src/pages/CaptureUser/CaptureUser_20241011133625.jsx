import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from '@vladmandic/face-api';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { encryptEmail, encryptDescriptors } from '../../services/cryptography';
import { addUserData } from '../../firebaseUtils/apiService';
import { useDispatch } from 'react-redux';
import { setGeneratedId } from '../../redux/userSlice';

const descriptors = [];

const CaptureUser = ({ firstName, lastName, email, dateOfBirth, onBack }) => {
  const webcamRef = useRef(null);
  const [buttonClickedCount, setButtonClickedCount] = useState(0);
  const [snackbarAlert, setSnackbarAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [captureImgLoader, setCaptureImgLoader] = useState(false);
  const [captureImgError, setCaptureImgError] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const captureImage = async () => {
    try {
      setCaptureImgLoader(true);
      const imageSrc = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = imageSrc;
      await img.decode();
      const detections = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
      if (detections) {
        descriptors.push(Array.from(detections.descriptor));
        setButtonClickedCount((prev) => prev + 1);
      } else {
        setCaptureImgError(true);
        setSnackbarAlert('Please re-take the image');
      }
    } catch (error) {
      setCaptureImgError(true);
      setSnackbarAlert('Please re-take the image');
    } finally {
      setCaptureImgLoader(false);
    }
  };

  const DBWrite = async () => {
    setLoading(true);
    // setError(null);
    try {
      const encryptedEmail = encryptEmail(
        email,
        firstName,
        lastName,
        dateOfBirth
      );
      const encryptedDescriptors = encryptDescriptors(
        descriptors,
        firstName,
        lastName,
        dateOfBirth
      );

      const userDetails = {
        name: `${firstName || ''} ${lastName || ''}`,
        email: encryptedEmail,
        DOB: dateOfBirth || '',
        ...encryptedDescriptors.reduce((acc, descriptor, index) => {
          acc[`descriptors_${index}`] = descriptor || [];
          return acc;
        }, {}),
      };

      const docRef = await addUserData(userDetails);
      console.log('Document written with ID: ', docRef.id);
      dispatch(setGeneratedId(docRef.id));
      navigate('/loggedUser');
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  if (buttonClickedCount === 5) {
    DBWrite();
    setButtonClickedCount((prev) => prev + 1);
  }
  const { current: webcam } = webcamRef;
  const { video } = webcam || {};

  if (!webcam || !webcam.video) {
    console.error('Webcam or canvas not available for face detection.');
    setSnackbarAlert('Webcam or canvas not available for face detection.');
    setCaptureImgError(true);
    return;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 4, maxWidth: 900, width: '100%' }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Capture Your Photo
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={onBack}
          sx={{ marginBottom: 2, position: 'absolute', left: 20, top: 20 }}
        >
          Back
        </Button>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          gap={5}
          alignItems="center"
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{
              borderRadius: 10,
              width: '100%',
              maxWidth: 650,
              height: 'auto',
            }}
          />
          {buttonClickedCount < 5 && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box>
                <Box
                  component="img"
                  alt="Face Snapshot Guide"
                  src={`/snapshotGuide/face_${buttonClickedCount + 1}.jpg`}
                  sx={{
                    width: { xs: '80%', md: 250 },
                    height: 'auto',
                    borderRadius: 2,
                    objectFit: 'contain',
                    boxShadow: 2,
                  }}
                />
              </Box>
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={captureImage}
                disabled={buttonClickedCount > 4}
                sx={{ marginTop: 3, width: '100%' }}
                loading={captureImgLoader}
              >
                Capture Photo
              </LoadingButton>
            </Box>
          )}
        </Box>
      </Paper>
      <Snackbar
        open={captureImgError}
        autoHideDuration={3000}
        onClose={() => setCaptureImgError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="error" sx={{ width: '30vw' }}>
          {snackbarAlert}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CaptureUser;
