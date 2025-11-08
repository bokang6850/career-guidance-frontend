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
  School, 
  Login, 
  Visibility, 
  VisibilityOff,
  Group,
  Book,
  TrendingUp,
  Castle
} from '@mui/icons-material';

const InstitutionLogin = ({ onLogin }) => {
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
      
      if (formData.email === 'institution@test.com' && formData.password === 'institution123') {
        onLogin({
          id: 1,
          name: 'Limkokwing University',
          email: formData.email,
          role: 'institution',
          type: 'university'
        });
      } else {
        setError('Invalid institution credentials');
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
      title: 'Manage Student Applications',
      description: 'Review and process student applications efficiently'
    },
    {
      icon: <Book sx={{ fontSize: 40 }} />,
      title: 'Course Management',
      description: 'Create and manage courses and academic programs'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Admission Analytics',
      description: 'Track application trends and admission statistics'
    }
  ];

  const institutions = [
    { name: 'Limkokwing University', students: '1,200+', color: '#2196f3' },
    { name: 'National University of Lesotho', students: '8,000+', color: '#4caf50' },
    { name: 'Botho University', students: '900+', color: '#ff9800' }
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
                  Institution Portal
                </Typography>
                <Typography 
                  variant="h6" 
                  color="white" 
                  sx={{ mb: 4, opacity: 0.9 }}
                >
                  Manage your academic programs, review applications, and connect with prospective students.
                </Typography>
                
                {/* Features Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
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

                {/* Partner Institutions */}
                <Typography variant="h6" color="white" gutterBottom sx={{ opacity: 0.9 }}>
                  Partner Institutions:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {institutions.map((inst, index) => (
                    <Chip
                      key={index}
                      icon={<Castle />}
                      label={inst.name}
                      sx={{
                        background: inst.color,
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  ))}
                </Box>
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
                  <School 
                    sx={{ 
                      fontSize: 48, 
                      color: 'primary.main',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Institution Login
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Access your academic management dashboard
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
                    label="Institution Email"
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
                    {loading ? 'Signing In...' : 'Access Dashboard'}
                  </Button>

                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      New institution?
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
                    Register Institution
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

export default InstitutionLogin;