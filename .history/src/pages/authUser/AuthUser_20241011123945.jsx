import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Container,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { clearUser } from '../../redux/userSlice';
import { deleteUserData } from '../../firebaseUtils/apiService';

const AuthUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState('');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEmailToDelete('');
  };

  const handleDeleteConfirm = async () => {
    if (emailToDelete === user.email) {
      try {
        await deleteUserData(user.userId);
        dispatch(clearUser());
        setOpenConfirmationModal(true);
      } catch (error) {
        console.error('Error deleting user data: ', error);
      }
    }
    handleCloseDialog();
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationModal(false);
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          {user.name ? (
            <>
              <LockOpenIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Welcome, {user.name}!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                You are successfully logged in.
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Email: {user.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Date of Birth: {formatDate(user.dateOfBirth)}{' '}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteClick}
              >
                Delete Account
              </Button>
            </>
          ) : (
            <>
              <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Authentication Error
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Please try again.
              </Typography>
            </>
          )}
          {!openConfirmationModal && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(clearUser());
                  navigate('/login');
                }}
              >
                Login Again
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Please type your email to confirm account deletion:
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={emailToDelete}
            onChange={(e) => setEmailToDelete(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmationModal} onClose={handleConfirmationClose}>
        <DialogTitle>Account Deleted</DialogTitle>
        <DialogContent>
          <Typography>
            Your account has been deleted successfully. Please note that your
            biometric is also been deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AuthUser;
