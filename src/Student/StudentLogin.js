import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { School, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StudentLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'student@test.com' && formData.password === 'student123') {
        onLogin({
          id: 1,
          name: 'Test Student',
          email: formData.email,
          role: 'student',
        });
        navigate('/student/dashboard');
      } else {
        setError('Invalid credentials. Use student@test.com / student123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>Student Login</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" type="email" margin="normal" required 
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <TextField fullWidth label="Password" type="password" margin="normal" required 
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, py: 1.5 }}
              startIcon={loading ? <CircularProgress size={20} /> : <Login />}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Demo: student@test.com / student123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentLogin;