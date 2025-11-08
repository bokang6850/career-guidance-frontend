import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Fade,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { 
  School, 
  Person, 
  HowToReg,
  Visibility, 
  VisibilityOff,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const StudentRegister = ({ onRegister }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    
    // Step 2: Academic Information
    highSchool: '',
    graduationYear: new Date().getFullYear(),
    grades: {
      mathematics: '',
      english: '',
      science: '',
      computer: ''
    },
    
    // Step 3: Preferences
    interests: [],
    preferredLocations: [],
    careerGoals: ''
  });

  const steps = ['Personal Information', 'Academic Background', 'Career Preferences'];
  const interestsList = ['Programming', 'Business', 'Engineering', 'Healthcare', 'Arts', 'Science', 'Mathematics', 'Design'];
  const locationsList = ['Maseru', 'Roma', 'Leribe', 'Mafeteng', 'Butha-Buthe', 'Remote'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleLocationToggle = (location) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(location)
        ? prev.preferredLocations.filter(l => l !== location)
        : [...prev.preferredLocations, location]
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful registration
      onRegister({
        id: Math.random().toString(36).substr(2, 9),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: 'student',
        avatar: '👨‍🎓'
      });
      
      setSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="High School"
                name="highSchool"
                value={formData.highSchool}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Graduation Year</InputLabel>
                <Select
                  name="graduationYear"
                  value={formData.graduationYear}
                  label="Graduation Year"
                  onChange={handleChange}
                >
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Academic Grades
              </Typography>
            </Grid>
            {Object.entries(formData.grades).map(([subject, grade]) => (
              <Grid item xs={12} sm={6} md={3} key={subject}>
                <FormControl fullWidth>
                  <InputLabel>{subject.charAt(0).toUpperCase() + subject.slice(1)}</InputLabel>
                  <Select
                    name={`grades.${subject}`}
                    value={grade}
                    label={subject.charAt(0).toUpperCase() + subject.slice(1)}
                    onChange={handleChange}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="E">E</MenuItem>
                    <MenuItem value="F">F</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Areas of Interest
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {interestsList.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    clickable
                    color={formData.interests.includes(interest) ? 'primary' : 'default'}
                    onClick={() => handleInterestToggle(interest)}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Preferred Study Locations
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {locationsList.map((location) => (
                  <Chip
                    key={location}
                    label={location}
                    clickable
                    color={formData.preferredLocations.includes(location) ? 'primary' : 'default'}
                    onClick={() => handleLocationToggle(location)}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Career Goals & Aspirations"
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                placeholder="Tell us about your career aspirations and what you hope to achieve..."
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Fade in={true} timeout={500}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 3
            }}
          >
            <CheckCircle 
              sx={{ 
                fontSize: 64, 
                color: 'success.main',
                mb: 3
              }} 
            />
            <Typography variant="h4" gutterBottom color="success.main">
              Registration Successful!
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Welcome to CareerGuide, {formData.firstName}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Your student account has been created successfully. 
              We're redirecting you to your dashboard...
            </Typography>
            <CircularProgress />
          </Paper>
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true} timeout={500}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Student Registration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join thousands of students discovering their career path
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <HowToReg />}
                  sx={{
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)'
                  }}
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Button component={RouterLink} to="/student/login" color="primary">
                Sign In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default StudentRegister;