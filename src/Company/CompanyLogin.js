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
  Card,
  CardContent,
  Divider,
  Link
} from '@mui/material';
import { 
  Business, 
  Login, 
  Visibility, 
  VisibilityOff,
  CorporateFare,
  Group,
  TrendingUp
} from '@mui/icons-material';

const CompanyLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'company@test.com' && formData.password === 'company123') {
        onLogin(true);
      } else {
        setError('Invalid company credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Group sx={{ fontSize: 40 }} />,
      title: 'Find Qualified Candidates',
      description: 'Access our pool of talented graduates and professionals'
    },
    {
      icon: <CorporateFare sx={{ fontSize: 40 }} />,
      title: 'Manage Job Postings',
      description: 'Create and manage multiple job opportunities easily'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Track Applications',
      description: 'Monitor application progress and candidate status'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Features Section */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800}>
              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  color="white" 
                  gutterBottom
                  sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                >
                  Connect with Top Talent
                </Typography>
                <Typography 
                  variant="h6" 
                  color="white" 
                  sx={{ mb: 4, opacity: 0.9 }}
                >
                  Find the perfect candidates for your organization from our network of qualified graduates and professionals.
                </Typography>
                
                <Grid container spacing={3}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} key={index}>
                      <Card 
                        sx={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: 'white'
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ mr: 2 }}>
                              {feature.icon}
                            </Box>
                            <Typography variant="h6" fontWeight="bold">
                              {feature.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Grid>

          {/* Login Form */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Paper
                elevation={24}
                sx={{
                  padding: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Business 
                    sx={{ 
                      fontSize: 48, 
                      color: 'primary.main',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Company Login
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Access your recruitment dashboard
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Company Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    margin="normal"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    margin="normal"
                    required
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ minWidth: 'auto', color: 'text.secondary' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      background: 'linear-gradient(45deg, #2196f3, #21cbf3)'
                    }}
                    startIcon={loading ? <CircularProgress size={20} /> : <Login />}
                  >
                    {loading ? 'Signing In...' : 'Sign In to Dashboard'}
                  </Button>

                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      New to platform?
                    </Typography>
                  </Divider>

                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1rem',
                      textTransform: 'none'
                    }}
                  >
                    Register Company Account
                  </Button>

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Link href="#" variant="body2" color="primary">
                      Forgot your password?
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CompanyLogin;