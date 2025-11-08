import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  CardActions,
  CardHeader,
  Divider,
  Tooltip,
  Fab
} from '@mui/material';
import {
  School,
  Business,
  BusinessCenter,
  AdminPanelSettings,
  Person,
  ExitToApp,
  Dashboard as DashboardIcon,
  People,
  Work,
  Assignment,
  CheckCircle,
  Warning,
  TrendingUp,
  Email,
  Phone,
  LocationOn,
  Add,
  Edit,
  Delete,
  Visibility,
  Upload,
  Download,
  Notifications,
  DateRange,
  Book,
  EmojiEvents,
  Security,
  Star,
  Search,
  FilterList,
  Refresh,
  MoreVert
} from '@mui/icons-material';

// ===== THEME CONFIGURATION =====
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20'
    },
    secondary: {
      main: '#FF6F00',
      light: '#FF9800',
      dark: '#E65100'
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 12
  }
});

// ===== DATA STORAGE & CONTEXT =====
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Initialize data
  const [institutions, setInstitutions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    initializeData();
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const initializeData = () => {
    // Sample institutions
    const sampleInstitutions = [
      {
        id: 1,
        name: 'Limkokwing University of Creative Technology',
        email: 'admin@limkokwing.ls',
        type: 'University',
        location: 'Maseru',
        phone: '+266 2231 7242',
        status: 'approved',
        faculties: [
          {
            id: 1,
            name: 'Faculty of Information & Communication Technology',
            courses: [
              { id: 1, name: 'BSc in Information Technology', duration: '4 years', requirements: 'LGCSE with Math and English' },
              { id: 2, name: 'BSc in Software Engineering', duration: '4 years', requirements: 'LGCSE with Math and Physics' }
            ]
          },
          {
            id: 2,
            name: 'Faculty of Business',
            courses: [
              { id: 3, name: 'BBA in Business Management', duration: '3 years', requirements: 'LGCSE with Math and English' }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'National University of Lesotho',
        email: 'admin@nul.ls',
        type: 'University',
        location: 'Roma',
        phone: '+266 2234 0601',
        status: 'approved',
        faculties: [
          {
            id: 3,
            name: 'Faculty of Science & Technology',
            courses: [
              { id: 4, name: 'BSc in Computer Science', duration: '4 years', requirements: 'LGCSE with Math and Science' }
            ]
          }
        ]
      }
    ];

    // Sample companies
    const sampleCompanies = [
      {
        id: 1,
        name: 'Econet Telecom Lesotho',
        email: 'hr@econet.ls',
        industry: 'Telecommunications',
        location: 'Maseru',
        phone: '+266 2232 0000',
        status: 'approved'
      },
      {
        id: 2,
        name: 'Standard Bank Lesotho',
        email: 'careers@standardbank.ls',
        industry: 'Banking',
        location: 'Maseru',
        phone: '+266 2231 0001',
        status: 'approved'
      }
    ];

    // Sample students
    const sampleStudents = [
      {
        id: 1,
        name: 'John Molapo',
        email: 'john@student.ls',
        phone: '+266 5954 1234',
        location: 'Maseru',
        qualifications: {
          lgcse: {
            english: 'A',
            math: 'B',
            science: 'B',
            sesotho: 'A'
          }
        },
        status: 'active'
      }
    ];

    // Sample jobs
    const sampleJobs = [
      {
        id: 1,
        title: 'Junior Software Developer',
        company: 'Econet Telecom Lesotho',
        companyId: 1,
        location: 'Maseru',
        type: 'Full-time',
        salary: 'M8,000 - M12,000',
        description: 'We are looking for a passionate Junior Software Developer to design, develop and install software solutions.',
        requirements: 'BSc in Computer Science or related field, knowledge of programming languages, problem-solving skills',
        postedDate: '2024-01-15',
        status: 'active'
      },
      {
        id: 2,
        title: 'IT Support Specialist',
        company: 'Standard Bank Lesotho',
        companyId: 2,
        location: 'Maseru',
        type: 'Full-time',
        salary: 'M6,000 - M9,000',
        description: 'Provide technical assistance to our staff and customers, troubleshoot hardware and software issues.',
        requirements: 'Diploma in IT, knowledge of Windows OS, good communication skills',
        postedDate: '2024-01-10',
        status: 'active'
      }
    ];

    // Load from localStorage if available
    const savedInstitutions = localStorage.getItem('institutions');
    const savedCompanies = localStorage.getItem('companies');
    const savedStudents = localStorage.getItem('students');
    const savedApplications = localStorage.getItem('applications');
    const savedJobs = localStorage.getItem('jobs');
    const savedJobApplications = localStorage.getItem('jobApplications');

    setInstitutions(savedInstitutions ? JSON.parse(savedInstitutions) : sampleInstitutions);
    setCompanies(savedCompanies ? JSON.parse(savedCompanies) : sampleCompanies);
    setStudents(savedStudents ? JSON.parse(savedStudents) : sampleStudents);
    setApplications(savedApplications ? JSON.parse(savedApplications) : []);
    setJobs(savedJobs ? JSON.parse(savedJobs) : sampleJobs);
    setJobApplications(savedJobApplications ? JSON.parse(savedJobApplications) : []);
  };

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('institutions', JSON.stringify(institutions));
  }, [institutions]);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
  }, [jobApplications]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const login = (email, password) => {
    // Demo login - in real app, this would be an API call
    const demoUsers = {
      'admin@lesotho.ls': { 
        id: 1, 
        name: 'System Administrator', 
        email: 'admin@lesotho.ls', 
        password: 'admin123', 
        role: 'admin' 
      },
      'institution@limkokwing.ls': { 
        id: 2, 
        name: 'Limkokwing University', 
        email: 'institution@limkokwing.ls', 
        password: 'inst123', 
        role: 'institution',
        institutionId: 1
      },
      'company@econet.ls': { 
        id: 3, 
        name: 'Econet Telecom', 
        email: 'company@econet.ls', 
        password: 'company123', 
        role: 'company',
        companyId: 1
      },
      'student@test.ls': { 
        id: 4, 
        name: 'Test Student', 
        email: 'student@test.ls', 
        password: 'student123', 
        role: 'student',
        studentId: 1
      }
    };

    const user = demoUsers[email];
    if (user && user.password === password) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      showSnackbar(`Welcome back, ${user.name}!`, 'success');
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      status: userData.role === 'student' || userData.role === 'admin' ? 'active' : 'pending'
    };

    if (userData.role === 'student') {
      const newStudent = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
        qualifications: {},
        status: 'active'
      };
      setStudents(prev => [...prev, newStudent]);
      newUser.studentId = newStudent.id;
    } else if (userData.role === 'institution') {
      const newInstitution = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        type: userData.institutionType,
        location: userData.location,
        phone: userData.phone,
        status: 'pending',
        faculties: []
      };
      setInstitutions(prev => [...prev, newInstitution]);
      newUser.institutionId = newInstitution.id;
    } else if (userData.role === 'company') {
      const newCompany = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        industry: userData.industry,
        location: userData.location,
        phone: userData.phone,
        status: 'pending'
      };
      setCompanies(prev => [...prev, newCompany]);
      newUser.companyId = newCompany.id;
    }
    // For admin role, no additional data needs to be created

    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showSnackbar('Registration successful!', 'success');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    showSnackbar('Logged out successfully', 'info');
  };

  const addInstitution = (institutionData) => {
    const newInstitution = {
      id: Date.now(),
      ...institutionData,
      status: 'approved',
      faculties: []
    };
    setInstitutions(prev => [...prev, newInstitution]);
    showSnackbar('Institution added successfully!', 'success');
    return newInstitution;
  };

  const addFaculty = (institutionId, facultyData) => {
    setInstitutions(prev => prev.map(inst => 
      inst.id === institutionId 
        ? { ...inst, faculties: [...inst.faculties, { id: Date.now(), ...facultyData, courses: [] }] }
        : inst
    ));
    showSnackbar('Faculty added successfully!', 'success');
  };

  const addCourse = (institutionId, facultyId, courseData) => {
    setInstitutions(prev => prev.map(inst => 
      inst.id === institutionId 
        ? {
            ...inst,
            faculties: inst.faculties.map(faculty =>
              faculty.id === facultyId
                ? { ...faculty, courses: [...faculty.courses, { id: Date.now(), ...courseData }] }
                : faculty
            )
          }
        : inst
    ));
    showSnackbar('Course added successfully!', 'success');
  };

  const submitApplication = (applicationData) => {
    const institutionApplications = applications.filter(app => 
      app.studentId === applicationData.studentId && app.institutionId === applicationData.institutionId
    );

    if (institutionApplications.length >= 2) {
      showSnackbar('You can only apply for maximum 2 courses per institution', 'error');
      return { success: false };
    }

    const newApplication = {
      id: Date.now(),
      ...applicationData,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [...prev, newApplication]);
    showSnackbar('Application submitted successfully!', 'success');
    return { success: true };
  };

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(prev => prev.map(app =>
      app.id === applicationId ? { ...app, status } : app
    ));
    showSnackbar(`Application ${status.toLowerCase()}!`, 'success');
  };

  const postJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setJobs(prev => [...prev, newJob]);
    showSnackbar('Job posted successfully!', 'success');
    return newJob;
  };

  const applyForJob = (jobApplicationData) => {
    const newJobApplication = {
      id: Date.now(),
      ...jobApplicationData,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setJobApplications(prev => [...prev, newJobApplication]);
    showSnackbar('Job application submitted!', 'success');
    return { success: true };
  };

  const deleteInstitution = (institutionId) => {
    setInstitutions(prev => prev.filter(inst => inst.id !== institutionId));
    showSnackbar('Institution deleted successfully!', 'success');
  };

  const deleteCompany = (companyId) => {
    setCompanies(prev => prev.filter(comp => comp.id !== companyId));
    showSnackbar('Company deleted successfully!', 'success');
  };

  const deleteCourse = (institutionId, facultyId, courseId) => {
    setInstitutions(prev => prev.map(inst => 
      inst.id === institutionId 
        ? {
            ...inst,
            faculties: inst.faculties.map(faculty =>
              faculty.id === facultyId
                ? { ...faculty, courses: faculty.courses.filter(course => course.id !== courseId) }
                : faculty
            )
          }
        : inst
    ));
    showSnackbar('Course deleted successfully!', 'success');
  };

  const value = {
    currentUser,
    institutions,
    companies,
    students,
    applications,
    jobs,
    jobApplications,
    login,
    register,
    logout,
    addInstitution,
    addFaculty,
    addCourse,
    submitApplication,
    updateApplicationStatus,
    postJob,
    applyForJob,
    deleteInstitution,
    deleteCompany,
    deleteCourse,
    showSnackbar,
    setInstitutions,
    setCompanies,
    setStudents
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// ===== COMPONENTS =====
const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();

  const getRoleIcon = () => {
    switch(currentUser?.role) {
      case 'admin': return <AdminPanelSettings />;
      case 'institution': return <Business />;
      case 'company': return <BusinessCenter />;
      default: return <Person />;
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main', boxShadow: 3 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <School sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Lesotho Career Platform
          </Typography>
        </Box>
        
        {currentUser ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              icon={getRoleIcon()} 
              label={`${currentUser.name} (${currentUser.role})`} 
              variant="outlined" 
              sx={{ color: 'white', borderColor: 'white', fontWeight: 'bold' }}
            />
            <Button 
              color="inherit" 
              onClick={() => {
                logout();
                navigate('/');
              }} 
              startIcon={<ExitToApp />}
              sx={{ fontWeight: 'bold' }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{ fontWeight: 'bold' }}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              variant="outlined" 
              onClick={() => navigate('/register')}
              sx={{ fontWeight: 'bold', borderColor: 'white' }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              🎓 Lesotho Career Platform
            </Typography>
            <Typography variant="body2">
              Connecting students with educational institutions and career opportunities across Lesotho.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Contact Info</Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ fontSize: 16, mr: 1 }} /> info@lesothocareer.ls
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ fontSize: 16, mr: 1 }} /> +266 1234 5678
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Developed By</Typography>
            <Typography variant="body2">
              Faculty of Information & Communication Technology<br />
              Limkokwing University of Creative Technology<br />
              BSc. in Information Technology
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: 1, borderColor: 'grey.800', mt: 3, pt: 2 }}>
          <Typography variant="body2" align="center">
            © 2024 Lesotho Career Guidance and Employment Integration Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

// ===== AUTH PAGES =====
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
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
        <Paper elevation={24} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, textAlign: 'center' }}>
            <School sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1">
              Sign in to your account
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                sx={{ mb: 3 }}
              />
              
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Button 
                  color="primary" 
                  onClick={() => navigate('/register')}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  Sign up here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    phone: '',
    location: '',
    institutionType: '',
    industry: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Container maxWidth="md">
        <Paper elevation={24} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, textAlign: 'center' }}>
            <School sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body1">
              Join the Lesotho Career Platform
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name / Institution Name / Company Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Account Type"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="institution">Institution</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                    <MenuItem value="admin">Administrator</MenuItem>
                  </TextField>
                </Grid>

                {formData.role === 'institution' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Institution Type"
                      value={formData.institutionType}
                      onChange={(e) => setFormData({...formData, institutionType: e.target.value})}
                      required
                    >
                      <MenuItem value="University">University</MenuItem>
                      <MenuItem value="Technical College">Technical College</MenuItem>
                      <MenuItem value="Vocational School">Vocational School</MenuItem>
                      <MenuItem value="Polytechnic">Polytechnic</MenuItem>
                    </TextField>
                  </Grid>
                )}

                {formData.role === 'company' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      required
                    >
                      <MenuItem value="Technology">Technology</MenuItem>
                      <MenuItem value="Banking">Banking</MenuItem>
                      <MenuItem value="Telecommunications">Telecommunications</MenuItem>
                      <MenuItem value="Healthcare">Healthcare</MenuItem>
                      <MenuItem value="Education">Education</MenuItem>
                      <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    </TextField>
                  </Grid>
                )}

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5, mb: 2, mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Account'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Button 
                  color="primary" 
                  onClick={() => navigate('/login')}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  Sign in here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

// ===== DASHBOARD COMPONENTS =====
const StudentDashboard = () => {
  const { currentUser, institutions, applications, jobs, submitApplication, applyForJob, showSnackbar } = useApp();
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [viewJobDialog, setViewJobDialog] = useState(null);

  const studentApplications = applications.filter(app => app.studentId === currentUser?.studentId);
  const availableJobs = jobs.filter(job => job.status === 'active');
  const approvedInstitutions = institutions.filter(inst => inst.status === 'approved');

  const handleApplication = () => {
    if (!selectedInstitution || !selectedCourse) {
      showSnackbar('Please select both institution and course', 'error');
      return;
    }

    const institution = institutions.find(inst => inst.id === parseInt(selectedInstitution));
    if (!institution) {
      showSnackbar('Selected institution not found', 'error');
      return;
    }

    // Find the course across all faculties
    let selectedCourseData = null;
    let facultyName = '';

    for (const faculty of institution.faculties) {
      const course = faculty.courses.find(c => c.id === parseInt(selectedCourse));
      if (course) {
        selectedCourseData = course;
        facultyName = faculty.name;
        break;
      }
    }

    if (!selectedCourseData) {
      showSnackbar('Selected course not found', 'error');
      return;
    }

    const result = submitApplication({
      studentId: currentUser.studentId,
      studentName: currentUser.name,
      institutionId: institution.id,
      institutionName: institution.name,
      courseId: selectedCourseData.id,
      courseName: selectedCourseData.name,
      faculty: facultyName
    });

    if (result.success) {
      setSelectedInstitution('');
      setSelectedCourse('');
    }
  };

  const handleJobApplication = (job) => {
    const result = applyForJob({
      jobId: job.id,
      jobTitle: job.title,
      companyId: job.companyId,
      companyName: job.company,
      studentId: currentUser.studentId,
      studentName: currentUser.name
    });

    if (result.success) {
      setViewJobDialog(null);
    }
  };

  // Get available courses for selected institution
  const getAvailableCourses = () => {
    if (!selectedInstitution) return [];
    
    const institution = institutions.find(inst => inst.id === parseInt(selectedInstitution));
    if (!institution) return [];
    
    return institution.faculties.flatMap(faculty => 
      faculty.courses.map(course => ({
        ...course,
        facultyName: faculty.name
      }))
    );
  };

  const statsCards = [
    { 
      title: 'My Applications', 
      value: studentApplications.length, 
      color: '#2196f3', 
      icon: <Assignment />,
      description: 'Total course applications'
    },
    { 
      title: 'Admitted', 
      value: studentApplications.filter(app => app.status === 'admitted').length, 
      color: '#4caf50', 
      icon: <CheckCircle />,
      description: 'Successful admissions'
    },
    { 
      title: 'Pending', 
      value: studentApplications.filter(app => app.status === 'pending').length, 
      color: '#ff9800', 
      icon: <Warning />,
      description: 'Applications under review'
    },
    { 
      title: 'Job Matches', 
      value: availableJobs.length, 
      color: '#9c27b0', 
      icon: <Work />,
      description: 'Available job opportunities'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome back, {currentUser?.name}!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your applications and explore career opportunities
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="h6">{stat.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                      {stat.description}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.9, fontSize: '3rem' }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Apply for Courses" />
          <Tab label="My Applications" />
          <Tab label="Job Opportunities" />
          <Tab label="My Profile" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                Apply for Courses
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Institution</InputLabel>
                  <Select
                    value={selectedInstitution}
                    onChange={(e) => {
                      setSelectedInstitution(e.target.value);
                      setSelectedCourse('');
                    }}
                    label="Select Institution"
                  >
                    {approvedInstitutions.map(inst => (
                      <MenuItem key={inst.id} value={inst.id}>
                        {inst.name} - {inst.location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth disabled={!selectedInstitution}>
                  <InputLabel>Select Course</InputLabel>
                  <Select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    label="Select Course"
                  >
                    {getAvailableCourses().map(course => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name} - {course.facultyName} ({course.duration})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedCourse && (
                  <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Requirements:</strong>{' '}
                      {getAvailableCourses().find(c => c.id === parseInt(selectedCourse))?.requirements}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleApplication}
                  disabled={!selectedInstitution || !selectedCourse}
                  startIcon={<Add />}
                  sx={{ mt: 2 }}
                >
                  Submit Application
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                Available Institutions
              </Typography>
              <List>
                {approvedInstitutions.map(inst => (
                  <ListItem key={inst.id} sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
                    <ListItemIcon>
                      <Business color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {inst.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {inst.type} • {inst.location}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            {inst.faculties.flatMap(f => f.courses).length} courses available
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Card sx={{ boxShadow: 3 }}>
          <CardHeader
            title="My Applications"
            subheader="Track your course applications and their status"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Institution</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Faculty</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applied Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentApplications.map((app) => (
                  <TableRow key={app.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Business color="primary" sx={{ mr: 2 }} />
                        <Typography fontWeight="bold">{app.institutionName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{app.courseName}</TableCell>
                    <TableCell>{app.faculty}</TableCell>
                    <TableCell>{app.appliedDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={app.status} 
                        color={
                          app.status === 'admitted' ? 'success' : 
                          app.status === 'rejected' ? 'error' : 'warning'
                        }
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {studentApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No applications submitted yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            Available Job Opportunities
          </Typography>
          <Grid container spacing={3}>
            {availableJobs.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card sx={{ p: 3, height: '100%', boxShadow: 3, transition: 'all 0.3s', '&:hover': { boxShadow: 6 } }}>
                  <CardHeader
                    avatar={<BusinessCenter color="primary" />}
                    title={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {job.title}
                      </Typography>
                    }
                    subheader={`${job.company} • ${job.location}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {job.description.length > 150 ? job.description.substring(0, 150) + '...' : job.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip label={job.type} color="primary" size="small" />
                      <Chip label={job.salary} variant="outlined" size="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Posted: {job.postedDate}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      startIcon={<Visibility />}
                      onClick={() => setViewJobDialog(job)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained"
                      onClick={() => handleJobApplication(job)}
                    >
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {availableJobs.length === 0 && (
              <Grid item xs={12}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    No job opportunities available at the moment.
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {activeTab === 3 && (
        <Card sx={{ p: 4, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            My Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography><strong>Name:</strong> {currentUser?.name}</Typography>
                <Typography><strong>Email:</strong> {currentUser?.email}</Typography>
                <Typography><strong>Phone:</strong> {currentUser?.phone || 'Not provided'}</Typography>
                <Typography><strong>Location:</strong> {currentUser?.location || 'Not provided'}</Typography>
                <Typography><strong>Role:</strong> {currentUser?.role}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Application Statistics</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography><strong>Total Applications:</strong> {studentApplications.length}</Typography>
                <Typography><strong>Admitted:</strong> {studentApplications.filter(app => app.status === 'admitted').length}</Typography>
                <Typography><strong>Pending:</strong> {studentApplications.filter(app => app.status === 'pending').length}</Typography>
                <Typography><strong>Rejected:</strong> {studentApplications.filter(app => app.status === 'rejected').length}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* View Job Dialog */}
      <Dialog 
        open={!!viewJobDialog} 
        onClose={() => setViewJobDialog(null)}
        maxWidth="md"
        fullWidth
      >
        {viewJobDialog && (
          <>
            <DialogTitle>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {viewJobDialog.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {viewJobDialog.company} • {viewJobDialog.location}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Job Type</Typography>
                  <Chip label={viewJobDialog.type} color="primary" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Salary</Typography>
                  <Typography>{viewJobDialog.salary}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold">Job Description</Typography>
                  <Typography variant="body2" paragraph>
                    {viewJobDialog.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold">Requirements</Typography>
                  <Typography variant="body2">
                    {viewJobDialog.requirements}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewJobDialog(null)}>Close</Button>
              <Button 
                variant="contained" 
                onClick={() => handleJobApplication(viewJobDialog)}
                startIcon={<CheckCircle />}
              >
                Apply for this Job
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

const InstitutionDashboard = () => {
  const { currentUser, institutions, applications, addFaculty, addCourse, updateApplicationStatus, deleteCourse } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [newFaculty, setNewFaculty] = useState({ name: '', description: '' });
  const [newCourse, setNewCourse] = useState({ name: '', duration: '', requirements: '' });
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [manageCoursesDialog, setManageCoursesDialog] = useState(false);

  const institution = institutions.find(inst => inst.id === currentUser?.institutionId);
  const institutionApplications = applications.filter(app => app.institutionId === institution?.id);

  const handleAddFaculty = () => {
    if (newFaculty.name) {
      addFaculty(institution.id, newFaculty);
      setNewFaculty({ name: '', description: '' });
    }
  };

  const handleAddCourse = () => {
    if (newCourse.name && selectedFaculty) {
      addCourse(institution.id, parseInt(selectedFaculty), newCourse);
      setNewCourse({ name: '', duration: '', requirements: '' });
      setSelectedFaculty('');
    }
  };

  const handleDeleteCourse = (facultyId, courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(institution.id, facultyId, courseId);
    }
  };

  const statsCards = [
    { 
      title: 'Total Applications', 
      value: institutionApplications.length, 
      color: '#2196f3', 
      icon: <Assignment /> 
    },
    { 
      title: 'Courses Offered', 
      value: institution?.faculties.flatMap(f => f.courses).length || 0, 
      color: '#4caf50', 
      icon: <School /> 
    },
    { 
      title: 'Students Admitted', 
      value: institutionApplications.filter(app => app.status === 'admitted').length, 
      color: '#ff9800', 
      icon: <CheckCircle /> 
    },
    { 
      title: 'Pending Review', 
      value: institutionApplications.filter(app => app.status === 'pending').length, 
      color: '#9c27b0', 
      icon: <Warning /> 
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {institution?.name} Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your institution's courses and student applications
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="h6">{stat.title}</Typography>
                  </Box>
                  <Box sx={{ opacity: 0.9, fontSize: '3rem' }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label="Manage Courses" />
          <Tab label="Student Applications" />
          <Tab label="Admissions" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Recent Applications
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Applied Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {institutionApplications.slice(0, 5).map((app) => (
                      <TableRow key={app.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                              {app.studentName.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            {app.studentName}
                          </Box>
                        </TableCell>
                        <TableCell>{app.courseName}</TableCell>
                        <TableCell>{app.appliedDate}</TableCell>
                        <TableCell>
                          <Chip 
                            label={app.status} 
                            color={
                              app.status === 'admitted' ? 'success' : 
                              app.status === 'rejected' ? 'error' : 'warning'
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {institutionApplications.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                          <Typography variant="body1" color="text.secondary">
                            No applications received yet.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => setActiveTab(1)}
                >
                  Add New Course
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Assignment />}
                  onClick={() => setActiveTab(2)}
                >
                  Review Applications
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<People />}
                  onClick={() => setManageCoursesDialog(true)}
                >
                  Manage Courses
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Add New Faculty
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Faculty Name"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                  fullWidth
                />
                <TextField
                  label="Description"
                  multiline
                  rows={3}
                  value={newFaculty.description}
                  onChange={(e) => setNewFaculty({...newFaculty, description: e.target.value})}
                  fullWidth
                />
                <Button variant="contained" onClick={handleAddFaculty} startIcon={<Add />}>
                  Add Faculty
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Add New Course
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Faculty</InputLabel>
                  <Select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    label="Select Faculty"
                  >
                    {institution?.faculties.map(faculty => (
                      <MenuItem key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Course Name"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  fullWidth
                />
                <TextField
                  label="Duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  fullWidth
                />
                <TextField
                  label="Requirements"
                  multiline
                  rows={3}
                  value={newCourse.requirements}
                  onChange={(e) => setNewCourse({...newCourse, requirements: e.target.value})}
                  fullWidth
                />
                <Button variant="contained" onClick={handleAddCourse} startIcon={<Add />}>
                  Add Course
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Card sx={{ boxShadow: 3 }}>
          <CardHeader
            title="Student Applications"
            subheader="Review and manage student applications"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Faculty</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applied Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {institutionApplications.map((app) => (
                  <TableRow key={app.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                          {app.studentName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography fontWeight="bold">{app.studentName}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{app.courseName}</TableCell>
                    <TableCell>{app.faculty}</TableCell>
                    <TableCell>{app.appliedDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={app.status} 
                        color={
                          app.status === 'admitted' ? 'success' : 
                          app.status === 'rejected' ? 'error' : 'warning'
                        }
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Admit Student">
                          <IconButton 
                            color="success" 
                            onClick={() => updateApplicationStatus(app.id, 'admitted')}
                            disabled={app.status === 'admitted'}
                          >
                            <CheckCircle />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject Application">
                          <IconButton 
                            color="error" 
                            onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            disabled={app.status === 'rejected'}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {institutionApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No applications to display.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Manage Courses Dialog */}
      <Dialog 
        open={manageCoursesDialog} 
        onClose={() => setManageCoursesDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Manage Courses - {institution?.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {institution?.faculties.map(faculty => (
            <Box key={faculty.id} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                {faculty.name}
              </Typography>
              <Grid container spacing={2}>
                {faculty.courses.map(course => (
                  <Grid item xs={12} md={6} key={course.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {course.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Duration: {course.duration}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {course.requirements}
                            </Typography>
                          </Box>
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => handleDeleteCourse(faculty.id, course.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                {faculty.courses.length === 0 && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                      No courses in this faculty yet.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
          {institution?.faculties.length === 0 && (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              No faculties created yet. Add faculties first to manage courses.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setManageCoursesDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const CompanyDashboard = () => {
  const { currentUser, companies, jobs, postJob, jobApplications } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'Full-time',
    salary: ''
  });

  const company = companies.find(comp => comp.id === currentUser?.companyId);
  const companyJobs = jobs.filter(job => job.companyId === company?.id);
  const companyJobApplications = jobApplications.filter(app => 
    companyJobs.some(job => job.id === app.jobId)
  );

  const handlePostJob = () => {
    if (newJob.title && newJob.description) {
      postJob({
        ...newJob,
        company: company.name,
        companyId: company.id
      });
      setNewJob({
        title: '',
        description: '',
        requirements: '',
        location: '',
        type: 'Full-time',
        salary: ''
      });
    }
  };

  const statsCards = [
    { 
      title: 'Active Jobs', 
      value: companyJobs.length, 
      color: '#2196f3', 
      icon: <Work /> 
    },
    { 
      title: 'Total Applicants', 
      value: companyJobApplications.length, 
      color: '#4caf50', 
      icon: <People /> 
    },
    { 
      title: 'Interviews', 
      value: companyJobApplications.filter(app => app.status === 'interview').length, 
      color: '#ff9800', 
      icon: <DateRange /> 
    },
    { 
      title: 'Hired', 
      value: companyJobApplications.filter(app => app.status === 'hired').length, 
      color: '#9c27b0', 
      icon: <CheckCircle /> 
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {company?.name} Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage job postings and connect with qualified candidates
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="h6">{stat.title}</Typography>
                  </Box>
                  <Box sx={{ opacity: 0.9, fontSize: '3rem' }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label="Post Job" />
          <Tab label="Manage Jobs" />
          <Tab label="Applicants" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Recent Job Applications
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Applicant</TableCell>
                      <TableCell>Job Title</TableCell>
                      <TableCell>Applied Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companyJobApplications.slice(0, 5).map((app) => (
                      <TableRow key={app.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                              {app.studentName.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            {app.studentName}
                          </Box>
                        </TableCell>
                        <TableCell>{app.jobTitle}</TableCell>
                        <TableCell>{app.appliedDate}</TableCell>
                        <TableCell>
                          <Chip 
                            label={app.status} 
                            color={
                              app.status === 'hired' ? 'success' : 
                              app.status === 'interview' ? 'warning' : 'default'
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {companyJobApplications.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                          <Typography variant="body1" color="text.secondary">
                            No job applications received yet.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => setActiveTab(1)}
                >
                  Post New Job
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Work />}
                  onClick={() => setActiveTab(2)}
                >
                  View All Jobs
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<People />}
                  onClick={() => setActiveTab(3)}
                >
                  View Applicants
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Card sx={{ p: 4, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            Post New Job Opportunity
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Job Type"
                value={newJob.type}
                onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                required
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={newJob.location}
                onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salary Range"
                value={newJob.salary}
                onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                multiline
                rows={4}
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requirements"
                multiline
                rows={4}
                value={newJob.requirements}
                onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                onClick={handlePostJob}
                startIcon={<Add />}
                sx={{ minWidth: 200 }}
                disabled={!newJob.title || !newJob.description}
              >
                Post Job
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}

      {activeTab === 2 && (
        <Card sx={{ boxShadow: 3 }}>
          <CardHeader
            title="Active Job Postings"
            subheader="Manage your company's job opportunities"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Job Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Salary</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Posted Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applicants</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyJobs.map(job => (
                  <TableRow key={job.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold">{job.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={job.type} color="primary" size="small" />
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>{job.postedDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={companyJobApplications.filter(app => app.jobId === job.id).length} 
                        variant="outlined" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {companyJobs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No jobs posted yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {activeTab === 3 && (
        <Card sx={{ boxShadow: 3 }}>
          <CardHeader
            title="Job Applicants"
            subheader="Review candidates who applied to your jobs"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applicant</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Job Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applied Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyJobApplications.map(app => (
                  <TableRow key={app.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                          {app.studentName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography fontWeight="bold">{app.studentName}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{app.jobTitle}</TableCell>
                    <TableCell>{app.appliedDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={app.status} 
                        color={
                          app.status === 'hired' ? 'success' : 
                          app.status === 'interview' ? 'warning' : 'default'
                        }
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Schedule Interview">
                          <IconButton 
                            color="warning"
                            onClick={() => {
                              // In a real app, this would update the application status
                              showSnackbar('Interview scheduled for ' + app.studentName);
                            }}
                          >
                            <DateRange />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hire Candidate">
                          <IconButton 
                            color="success"
                            onClick={() => {
                              // In a real app, this would update the application status
                              showSnackbar(app.studentName + ' has been hired!');
                            }}
                          >
                            <CheckCircle />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View Profile">
                          <IconButton color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {companyJobApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No applicants yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Container>
  );
};

const AdminDashboard = () => {
  const { currentUser, institutions, companies, students, applications, setInstitutions, setCompanies, deleteInstitution, deleteCompany, showSnackbar } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    email: '',
    type: '',
    location: '',
    phone: ''
  });
  const [manageInstitutionsDialog, setManageInstitutionsDialog] = useState(false);
  const [manageCompaniesDialog, setManageCompaniesDialog] = useState(false);

  const pendingInstitutions = institutions.filter(inst => inst.status === 'pending');
  const pendingCompanies = companies.filter(comp => comp.status === 'pending');
  const approvedInstitutions = institutions.filter(inst => inst.status === 'approved');
  const approvedCompanies = companies.filter(comp => comp.status === 'approved');

  const handleAddInstitution = () => {
    if (newInstitution.name && newInstitution.email) {
      const institution = {
        id: Date.now(),
        ...newInstitution,
        status: 'approved',
        faculties: []
      };
      setInstitutions(prev => [...prev, institution]);
      setNewInstitution({ name: '', email: '', type: '', location: '', phone: '' });
      showSnackbar('Institution added successfully!', 'success');
    }
  };

  const handleApproveInstitution = (institutionId) => {
    setInstitutions(prev => prev.map(inst =>
      inst.id === institutionId ? { ...inst, status: 'approved' } : inst
    ));
    showSnackbar('Institution approved successfully!', 'success');
  };

  const handleApproveCompany = (companyId) => {
    setCompanies(prev => prev.map(comp =>
      comp.id === companyId ? { ...comp, status: 'approved' } : comp
    ));
    showSnackbar('Company approved successfully!', 'success');
  };

  const handleDeleteInstitution = (institutionId) => {
    if (window.confirm('Are you sure you want to delete this institution?')) {
      deleteInstitution(institutionId);
    }
  };

  const handleDeleteCompany = (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      deleteCompany(companyId);
    }
  };

  const statsCards = [
    { 
      title: 'Total Institutions', 
      value: institutions.length, 
      color: '#2196f3', 
      icon: <Business /> 
    },
    { 
      title: 'Total Companies', 
      value: companies.length, 
      color: '#4caf50', 
      icon: <BusinessCenter /> 
    },
    { 
      title: 'Total Students', 
      value: students.length, 
      color: '#ff9800', 
      icon: <People /> 
    },
    { 
      title: 'Total Applications', 
      value: applications.length, 
      color: '#9c27b0', 
      icon: <Assignment /> 
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          System administration and management
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="h6">{stat.title}</Typography>
                  </Box>
                  <Box sx={{ opacity: 0.9, fontSize: '3rem' }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" />
          <Tab label="Manage Institutions" />
          <Tab label="Manage Companies" />
          <Tab label="System Reports" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Pending Approvals
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Institutions
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {pendingInstitutions.length} pending approval
                        </Typography>
                      </Box>
                      <Chip label={pendingInstitutions.length} color="warning" />
                    </Box>
                  </CardContent>
                </Card>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Companies
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {pendingCompanies.length} pending approval
                        </Typography>
                      </Box>
                      <Chip label={pendingCompanies.length} color="warning" />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => setActiveTab(1)}
                >
                  Add Institution
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Business />}
                  onClick={() => setManageInstitutionsDialog(true)}
                >
                  Manage Institutions
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<BusinessCenter />}
                  onClick={() => setManageCompaniesDialog(true)}
                >
                  Manage Companies
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Add New Institution
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Institution Name"
                  value={newInstitution.name}
                  onChange={(e) => setNewInstitution({...newInstitution, name: e.target.value})}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  value={newInstitution.email}
                  onChange={(e) => setNewInstitution({...newInstitution, email: e.target.value})}
                  fullWidth
                  required
                />
                <TextField
                  select
                  label="Type"
                  value={newInstitution.type}
                  onChange={(e) => setNewInstitution({...newInstitution, type: e.target.value})}
                  fullWidth
                  required
                >
                  <MenuItem value="University">University</MenuItem>
                  <MenuItem value="Technical College">Technical College</MenuItem>
                  <MenuItem value="Vocational School">Vocational School</MenuItem>
                </TextField>
                <TextField
                  label="Location"
                  value={newInstitution.location}
                  onChange={(e) => setNewInstitution({...newInstitution, location: e.target.value})}
                  fullWidth
                  required
                />
                <TextField
                  label="Phone"
                  value={newInstitution.phone}
                  onChange={(e) => setNewInstitution({...newInstitution, phone: e.target.value})}
                  fullWidth
                  required
                />
                <Button 
                  variant="contained" 
                  onClick={handleAddInstitution} 
                  startIcon={<Add />}
                  disabled={!newInstitution.name || !newInstitution.email || !newInstitution.type || !newInstitution.location}
                >
                  Add Institution
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Pending Institution Approvals
              </Typography>
              <List>
                {pendingInstitutions.map(inst => (
                  <ListItem key={inst.id} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    <ListItemIcon>
                      <Business color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {inst.name}
                        </Typography>
                      }
                      secondary={`${inst.type} • ${inst.location} • ${inst.email}`}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApproveInstitution(inst.id)}
                    >
                      Approve
                    </Button>
                  </ListItem>
                ))}
                {pendingInstitutions.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="text.secondary" align="center">
                          No pending institution approvals
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Card sx={{ boxShadow: 3 }}>
          <CardHeader
            title="Pending Company Approvals"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Industry</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingCompanies.map(company => (
                  <TableRow key={company.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold">{company.name}</Typography>
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApproveCompany(company.id)}
                      >
                        Approve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {pendingCompanies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No pending company approvals
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {activeTab === 3 && (
        <Card sx={{ p: 4, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            System Reports
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Platform Statistics</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography><strong>Total Users:</strong> {students.length + institutions.length + companies.length + 1}</Typography>
                <Typography><strong>Active Institutions:</strong> {approvedInstitutions.length}</Typography>
                <Typography><strong>Active Companies:</strong> {approvedCompanies.length}</Typography>
                <Typography><strong>Total Course Applications:</strong> {applications.length}</Typography>
                <Typography><strong>Total Job Applications:</strong> {0}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2">• System is running smoothly</Typography>
                <Typography variant="body2">• All services are operational</Typography>
                <Typography variant="body2">• No critical issues reported</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Manage Institutions Dialog */}
      <Dialog 
        open={manageInstitutionsDialog} 
        onClose={() => setManageInstitutionsDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Manage Institutions
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Courses</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedInstitutions.map(inst => (
                  <TableRow key={inst.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold">{inst.name}</Typography>
                    </TableCell>
                    <TableCell>{inst.type}</TableCell>
                    <TableCell>{inst.location}</TableCell>
                    <TableCell>{inst.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={inst.faculties.flatMap(f => f.courses).length} 
                        color="primary" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteInstitution(inst.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {approvedInstitutions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No institutions to display.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setManageInstitutionsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Manage Companies Dialog */}
      <Dialog 
        open={manageCompaniesDialog} 
        onClose={() => setManageCompaniesDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Manage Companies
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Jobs</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedCompanies.map(company => (
                  <TableRow key={company.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold">{company.name}</Typography>
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={0} 
                        color="secondary" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteCompany(company.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {approvedCompanies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No companies to display.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setManageCompaniesDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// ===== DASHBOARD SELECTOR =====
const DashboardSelector = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  switch(currentUser.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'institution':
      return <InstitutionDashboard />;
    case 'company':
      return <CompanyDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
};

// ===== PROTECTED ROUTE =====
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, loading } = useApp();
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

// ===== LANDING PAGE =====
const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useApp();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 12,
        background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Your Future Starts Here
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
                Connecting Lesotho's students with educational institutions and career opportunities
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ bgcolor: 'white', color: 'primary.main', px: 4, fontWeight: 'bold' }}
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  sx={{ borderColor: 'white', color: 'white', px: 4, fontWeight: 'bold' }}
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <School sx={{ fontSize: 200, opacity: 0.8 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          How It Works
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          A complete ecosystem for education and career development in Lesotho
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%', boxShadow: 3 }}>
              <School sx={{ fontSize: 64, color: 'primary.main', mb: 3 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>For Students</Typography>
              <Typography variant="body1" color="text.secondary">
                Discover courses, apply to institutions, track applications, and find career opportunities that match your qualifications
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%', boxShadow: 3 }}>
              <Business sx={{ fontSize: 64, color: 'secondary.main', mb: 3 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>For Institutions</Typography>
              <Typography variant="body1" color="text.secondary">
                Manage courses, review applications, process admissions, and connect with qualified students
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%', boxShadow: 3 }}>
              <BusinessCenter sx={{ fontSize: 64, color: 'success.main', mb: 3 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>For Companies</Typography>
              <Typography variant="body1" color="text.secondary">
                Post jobs, find qualified candidates, and connect with Lesotho's brightest talents for your organization
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// ===== MAIN APP COMPONENT =====
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardSelector />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </Box>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;