import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Fade,
  Button
} from '@mui/material';
import { Security, ErrorOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ 
  children, 
  user, 
  requiredRole, 
  loading = false,
  fallbackPath = '/',
  showLoading = true
}) => {
  const location = useLocation();

  if (loading && showLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Fade in={true} timeout={500}>
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" color="text.secondary">
              Verifying access...
            </Typography>
          </Paper>
        </Fade>
      </Container>
    );
  }

  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in={true} timeout={500}>
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 3 }} />
            <Typography variant="h4" gutterBottom color="error">
              Access Denied
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You don't have permission to access this page.
            </Typography>
            <Button variant="contained" component={Link} to="/">
              Go Back Home
            </Button>
          </Paper>
        </Fade>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;