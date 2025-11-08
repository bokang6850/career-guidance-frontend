import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  School,
  Business,
  BusinessCenter,
  AdminPanelSettings,
  Login,
  HowToReg,
  Work,
  TrendingUp,
  Assignment,
  Notifications,
  Book,
  CheckCircle,
  Pending,
  Star,
  EmojiEvents,
  Menu as MenuIcon
} from '@mui/icons-material';

// ===== NAVBAR COMPONENT =====
const Navbar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/student/login');
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🎓 Lesotho Career Guide
        </Typography>
        
        {user ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate('/student/dashboard')}>Dashboard</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

// ===== FOOTER COMPONENT =====
const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2024 Lesotho Career Guidance System. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

// ===== PROTECTED ROUTE COMPONENT =====
const ProtectedRoute = ({ children, user, allowedRoles }) => {
  if (!user) {
    return <Navigate to="/student/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// ===== LOGIN COMPONENTS =====
const StudentLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
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
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      display: 'flex', 
      alignItems: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>Student Login</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              label="Email" 
              type="email" 
              margin="normal" 
              required 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
            <TextField 
              fullWidth 
              label="Password" 
              type="password" 
              margin="normal" 
              required 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              disabled={loading} 
              sx={{ mt: 3, py: 1.5 }}
              startIcon={loading ? <CircularProgress size={20} /> : <Login />}
            >
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

// ===== STUDENT DASHBOARD COMPONENT =====
const StudentDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    applications: 0,
    admitted: 0,
    pending: 0,
    recommendedJobs: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        applications: 5,
        admitted: 2,
        pending: 3,
        recommendedJobs: 12
      });
    }, 1000);
  }, []);

  const recentApplications = [
    {
      id: 1,
      course: 'BSc Information Technology',
      institution: 'Limkokwing University',
      status: 'admitted',
      date: '2024-01-15',
      match: 92
    },
    {
      id: 2,
      course: 'BSc Business IT',
      institution: 'Botho University',
      status: 'pending',
      date: '2024-01-14',
      match: 85
    }
  ];

  const statsCards = [
    {
      title: 'Total Applications',
      value: stats.applications,
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #2196f3, #21cbf3)',
      action: () => console.log('View applications')
    },
    {
      title: 'Admitted',
      value: stats.admitted,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #4caf50, #8bc34a)',
      action: () => console.log('View admitted')
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      icon: <Pending sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #ff9800, #ffb74d)',
      action: () => console.log('View pending')
    },
    {
      title: 'Recommended Jobs',
      value: stats.recommendedJobs,
      icon: <Work sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #9c27b0, #e91e63)',
      action: () => navigate('/jobs')
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Here's your academic and career journey overview
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                background: stat.color,
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
              onClick={stat.action}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="h6">
                      {stat.title}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Applications */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Recent Applications
        </Typography>
        <List>
          {recentApplications.map((application, index) => (
            <React.Fragment key={application.id}>
              <ListItem>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <School />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={application.course}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {application.institution}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {application.status} | Match: {application.match}%
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < recentApplications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

// ===== LANDING PAGE COMPONENT =====
const LandingPage = () => (
  <Container sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h3" gutterBottom>
      🎓 Lesotho Career Guidance System
    </Typography>
    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
      Your pathway to academic and career success in Lesotho
    </Typography>
    
    <Grid container spacing={4} sx={{ mt: 2 }}>
      <Grid item xs={12} md={3}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>For Students</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Find courses, get career guidance, and connect with opportunities
          </Typography>
          <Button 
            variant="contained" 
            component="a"
            href="/student/login"
          >
            Student Login
          </Button>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Business sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>For Institutions</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manage courses and connect with prospective students
          </Typography>
          <Button variant="outlined">Institution Login</Button>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <BusinessCenter sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>For Companies</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Find talented graduates and post job opportunities
          </Typography>
          <Button variant="outlined">Company Login</Button>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <AdminPanelSettings sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>Administration</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            System management and analytics
          </Typography>
          <Button variant="outlined">Admin Login</Button>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

// ===== MAIN APP COMPONENT =====
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Check for stored user session on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#ff4081',
      },
      background: {
        default: '#f5f5f5',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar user={user} onLogout={handleLogout} />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/student/login" element={<StudentLogin onLogin={handleLogin} />} />
              
              {/* Protected Routes */}
              <Route 
                path="/student/dashboard" 
                element={
                  <ProtectedRoute user={user} allowedRoles={['student']}>
                    <StudentDashboard user={user} />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;