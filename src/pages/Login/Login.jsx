import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { fetchUserData } from '../../firebaseUtils/apiService';
import { decryptEmail, decryptDescriptors } from '../../services/cryptography';
import Recognition from '../Recognition';

const UserIdInputPage = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [recognition, setRecognition] = useState(false);
  

  const handleSubmit = async () => {
    if (!userId) {
      setError('User ID is required.');
      return;
    }

    const validUserId = /^[a-zA-Z0-9]+$/.test(userId); 
    if (!validUserId) {
      setError('User ID must be alphanumeric.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const userDocSnap = await fetchUserData(userId);
      console.log('userDocSnap', userDocSnap.data());

      if (userDocSnap.data() !== undefined) {
        const userDetails = userDocSnap.data() ?? {};
        const decryptedEmail = decryptEmail(userDetails.email, userDetails);
        const decryptedDescriptors = decryptDescriptors(userDetails);

        setUserData({
          ...userDetails,
          email: decryptedEmail,
          descriptors: decryptedDescriptors,
        });
        setTimeout(() => {
          setRecognition(true);
        }, 1500);
      } else {
        setError('No such User ID exists.');
      }
    } catch (error) {
      // console.error('Error fetching user data:', error); 
      setError('Something went wrong! Please try again.');
    } finally {
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (recognition) {
    return <Recognition userData={userData} userId={userId} />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: 4,
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          backgroundColor: '#ffffff',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#1976d2', fontWeight: 'bold' }}
        >
          Enter Your User ID
        </Typography>
        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
            width: '100%',
            padding: '10px 0',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={!!error.length ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {!!error.length ? error : 'You are successfully Logged In!'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserIdInputPage;
