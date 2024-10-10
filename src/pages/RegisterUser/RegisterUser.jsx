import React, { useState, useMemo } from 'react';
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CaptureUser from '../CaptureUser/CaptureUser';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const RegisterUser = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
  });

  const [dateError, setDateError] = useState(null);
  const [capture, setCapture] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const dateErrorMessage = useMemo(() => {
    switch (dateError) {
      case 'minDate':
      case 'maxDate':
        return 'Date of Birth cannot be in the future or an invalid range';
      case 'invalidDate':
        return 'Invalid date format';
      default:
        return '';
    }
  }, [dateError]);

  const validate = () => {
    let tempErrors = { ...errors };

    // FirstName and LastName validations
    tempErrors.firstName = formValues.firstName ? '' : 'First Name is required';
    tempErrors.lastName = formValues.lastName ? '' : 'Last Name is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    tempErrors.email = emailRegex.test(formValues.email)
      ? ''
      : 'Email is not valid'; // Check email format

    // Ensure no date-related errors before submitting
    tempErrors.dateOfBirth = formValues.dateOfBirth
      ? dateErrorMessage
      : 'Date of Birth is required';

    // Check if user is at least 13 years old
    if (formValues.dateOfBirth) {
      const age = dayjs().diff(dayjs(formValues.dateOfBirth), 'year');
      if (age < 13) {
        tempErrors.dateOfBirth = 'You must be at least 13 years old';
      }
    }

    setErrors(tempErrors);
    console.log(errors);

    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setCapture(true);
    }
  };

  if (capture) {
    return (
      <CaptureUser
        firstName={formValues.firstName}
        lastName={formValues.lastName}
        email={formValues.email}
        dateOfBirth={formValues.dateOfBirth?.toISOString()}
        onBack={() => setCapture(false)}
      />
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Card variant="outlined" sx={{ width: '400px', p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Registration Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={formValues.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              margin="normal"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formValues.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={formValues.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={formValues.dateOfBirth}
                onChange={(date) => handleChange('dateOfBirth', date)}
                onError={(newError) => setDateError(newError)}
                slotProps={{
                  textField: {
                    helperText: errors.dateOfBirth || dateErrorMessage,
                    error: !!errors.dateOfBirth || !!dateError,
                  },
                }}
                sx={{ mt: 2, mb: 1, width: 1 }}
                minDate={dayjs().subtract(100, 'year')}
                maxDate={dayjs()}
              />
            </LocalizationProvider>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </CardContent>
        <Typography variant="body2" textAlign="center">
          Already have an account &nbsp;
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
      </Card>
    </Box>
  );
};

export default RegisterUser;
