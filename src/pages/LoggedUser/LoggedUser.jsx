import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Alert,
  Link,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const LoggedUser = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();
  const generatedId = useSelector((state) => state.user.generatedId);

  useEffect(() => {
    if (!generatedId) {
      navigate('/error');
    }
  }, [generatedId, navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!generatedId) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      padding={3}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 500 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Congratulations!
        </Typography>
        <Typography variant="body1" textAlign="center" gutterBottom>
          You have been successfully registered in our system.
        </Typography>
        <Typography variant="h6" textAlign="center" gutterBottom>
          User ID:
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <TextField
            value={generatedId}
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: '80%' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            sx={{ ml: 2 }}
            startIcon={<ContentCopyIcon />}
          >
            Copy
          </Button>
        </Box>
        {copySuccess && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            onClose={() => setCopySuccess(false)}
          >
            User ID copied to clipboard!
          </Alert>
        )}
        <Typography variant="body2" textAlign="center">
          Kindly save this ID safely as it will be used to authenticate you.
        </Typography>
        <Typography variant="body2" textAlign="center">
          Want to use this ID &nbsp;
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate('/login');
            }}
          >
            Click here to Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoggedUser;
