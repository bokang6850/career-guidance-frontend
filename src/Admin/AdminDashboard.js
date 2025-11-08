import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Alert,
  Tabs,
  Tab,
  AppBar
} from '@mui/material';
import {
  AdminPanelSettings,
  People,
  Business,
  BusinessCenter,
  School,
  Assignment,
  Warning,
  TrendingUp,
  Add,
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Block,
  BarChart
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalInstitutions: 0,
    totalCompanies: 0,
    pendingApprovals: 0,
    totalCourses: 0,
    activeAdmissions: 0
  });
  
  const [institutions, setInstitutions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    type: '',
    location: '',
    email: '',
    phone: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setStats({
        totalStudents: 1254,
        totalInstitutions: 24,
        totalCompanies: 156,
        pendingApprovals: 8,
        totalCourses: 342,
        activeAdmissions: 12
      });

      // Sample institutions data
      setInstitutions([
        {
          id: 1,
          name: 'National University of Lesotho',
          type: 'University',
          location: 'Roma',
          email: 'admin@nul.ls',
          phone: '+266 22340601',
          status: 'Active',
          faculties: 8,
          courses: 45,
          students: 1200
        },
        {
          id: 2,
          name: 'Limkokwing University',
          type: 'University',
          location: 'Maseru',
          email: 'info@limkokwing.ls',
          phone: '+266 22317242',
          status: 'Active',
          faculties: 6,
          courses: 38,
          students: 800
        },
        {
          id: 3,
          name: 'Maseru Technical College',
          type: 'Technical College',
          location: 'Maseru',
          email: 'registrar@maserutech.ls',
          phone: '+266 22310245',
          status: 'Pending',
          faculties: 4,
          courses: 22,
          students: 350
        }
      ]);

      // Sample companies data
      setCompanies([
        {
          id: 1,
          name: 'Standard Bank Lesotho',
          industry: 'Banking',
          email: 'hr@standardbank.ls',
          phone: '+266 22310001',
          status: 'Approved',
          joined: '2023-05-15',
          internships: 8
        },
        {
          id: 2,
          name: 'Econet Telecom',
          industry: 'Telecommunications',
          email: 'careers@econet.ls',
          phone: '+266 22320000',
          status: 'Approved',
          joined: '2023-08-22',
          internships: 12
        },
        {
          id: 3,
          name: 'New Startup Tech',
          industry: 'Technology',
          email: 'contact@newstartup.ls',
          phone: '+266 59548762',
          status: 'Pending',
          joined: '2024-01-10',
          internships: 3
        }
      ]);
    }, 1000);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (type, institution = null) => {
    setDialogType(type);
    setSelectedInstitution(institution);
    if (type === 'edit' && institution) {
      setNewInstitution(institution);
    } else {
      setNewInstitution({
        name: '',
        type: '',
        location: '',
        email: '',
        phone: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInstitution(null);
  };

  const handleSaveInstitution = () => {
    if (dialogType === 'add') {
      // Add new institution
      const newInst = {
        ...newInstitution,
        id: institutions.length + 1,
        status: 'Active',
        faculties: 0,
        courses: 0,
        students: 0
      };
      setInstitutions([...institutions, newInst]);
    } else if (dialogType === 'edit' && selectedInstitution) {
      // Update institution
      setInstitutions(institutions.map(inst => 
        inst.id === selectedInstitution.id ? { ...inst, ...newInstitution } : inst
      ));
    }
    handleCloseDialog();
  };

  const handleDeleteInstitution = (id) => {
    if (window.confirm('Are you sure you want to delete this institution?')) {
      setInstitutions(institutions.filter(inst => inst.id !== id));
    }
  };

  const handleCompanyAction = (companyId, action) => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { ...company, status: action === 'approve' ? 'Approved' : action === 'suspend' ? 'Suspended' : company.status }
        : company
    ));
  };

  const pendingApprovals = [
    { id: 1, name: 'Maseru Technical College', type: 'Institution', date: '2024-01-15', status: 'Pending' },
    { id: 2, name: 'Tech Solutions Ltd', type: 'Company', date: '2024-01-14', status: 'Pending' },
    { id: 3, name: 'Botho University', type: 'Institution', date: '2024-01-13', status: 'Pending' }
  ];

  const statsCards = [
    { 
      title: 'Total Students', 
      value: stats.totalStudents, 
      color: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', 
      icon: <People />, 
      action: () => navigate('/admin/students') 
    },
    { 
      title: 'Institutions', 
      value: stats.totalInstitutions, 
      color: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)', 
      icon: <Business />, 
      action: () => setActiveTab(1) 
    },
    { 
      title: 'Companies', 
      value: stats.totalCompanies, 
      color: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', 
      icon: <BusinessCenter />, 
      action: () => setActiveTab(2) 
    },
    { 
      title: 'Pending Approvals', 
      value: stats.pendingApprovals, 
      color: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)', 
      icon: <Warning />, 
      action: () => navigate('/admin/approvals') 
    },
    { 
      title: 'Total Courses', 
      value: stats.totalCourses, 
      color: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)', 
      icon: <School />, 
      action: () => navigate('/admin/courses') 
    },
    { 
      title: 'Active Admissions', 
      value: stats.activeAdmissions, 
      color: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)', 
      icon: <Assignment />, 
      action: () => navigate('/admin/admissions') 
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ 
          background: 'linear-gradient(45deg, #1976d2 30%, #00bcd4 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          System administration and management
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card 
              sx={{ 
                background: stat.color,
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                transform: 'translateY(0)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
                }
              }}
              onClick={stat.action}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ fontSize: '1.75rem' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.8, fontSize: '2rem' }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Management Tabs */}
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Overview" />
            <Tab label="Institutions Management" />
            <Tab label="Companies Management" />
            <Tab label="System Reports" />
          </Tabs>
        </AppBar>

        <CardContent sx={{ p: 3 }}>
          {/* Overview Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5" fontWeight="bold">Pending Approvals</Typography>
                      <Button variant="outlined" startIcon={<Warning />} onClick={() => navigate('/admin/approvals')}>
                        View All Approvals
                      </Button>
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Submission Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pendingApprovals.map((item) => (
                            <TableRow key={item.id} hover>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar sx={{ 
                                    width: 32, 
                                    height: 32, 
                                    mr: 2, 
                                    bgcolor: item.type === 'Institution' ? '#4caf50' : '#ff9800',
                                    fontSize: '1rem'
                                  }}>
                                    {item.type === 'Institution' ? <Business /> : <BusinessCenter />}
                                  </Avatar>
                                  {item.name}
                                </Box>
                              </TableCell>
                              <TableCell>{item.type}</TableCell>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={item.status} 
                                  color="warning" 
                                  size="small" 
                                  sx={{ fontWeight: 'bold' }}
                                />
                              </TableCell>
                              <TableCell>
                                <Button size="small" variant="contained" color="primary">
                                  Review
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Actions & System Info */}
              <Grid item xs={12} md={4}>
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">Quick Actions</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        startIcon={<Add />}
                        onClick={() => handleOpenDialog('add')}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        Add Institution
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<People />} 
                        onClick={() => navigate('/admin/users')}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        Manage Users
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Business />} 
                        onClick={() => setActiveTab(1)}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        Institutions
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<BusinessCenter />} 
                        onClick={() => setActiveTab(2)}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        Companies
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<TrendingUp />} 
                        onClick={() => setActiveTab(3)}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        System Analytics
                      </Button>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">System Information</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">Platform Status</Typography>
                        <Chip label="Operational" color="success" size="small" sx={{ fontWeight: 'bold' }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">Total Applications</Typography>
                        <Typography variant="body2">2,847 applications processed</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight="bold" color="text.secondary">System Uptime</Typography>
                        <Typography variant="body2">99.8%</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Institutions Management Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">Institutions Management</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => handleOpenDialog('add')}
                >
                  Add Institution
                </Button>
              </Box>

              <TableContainer component={Paper} elevation={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Institution</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Faculties</TableCell>
                      <TableCell>Courses</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {institutions.map((institution) => (
                      <TableRow key={institution.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: '#4caf50' }}>
                              <Business />
                            </Avatar>
                            <Box>
                              <Typography fontWeight="bold">{institution.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{institution.email}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{institution.type}</TableCell>
                        <TableCell>{institution.location}</TableCell>
                        <TableCell>{institution.faculties}</TableCell>
                        <TableCell>{institution.courses}</TableCell>
                        <TableCell>{institution.students}</TableCell>
                        <TableCell>
                          <Chip 
                            label={institution.status} 
                            color={institution.status === 'Active' ? 'success' : 'warning'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Manage Faculties">
                            <IconButton size="small" onClick={() => navigate(`/admin/institutions/${institution.id}/faculties`)}>
                              <School />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleOpenDialog('edit', institution)}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDeleteInstitution(institution.id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Companies Management Tab */}
          {activeTab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">Companies Management</Typography>
                <Typography variant="body2" color="text.secondary">
                  {companies.filter(c => c.status === 'Pending').length} pending approvals
                </Typography>
              </Box>

              <TableContainer component={Paper} elevation={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company</TableCell>
                      <TableCell>Industry</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Internships</TableCell>
                      <TableCell>Joined Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: '#ff9800' }}>
                              <BusinessCenter />
                            </Avatar>
                            <Box>
                              <Typography fontWeight="bold">{company.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{company.email}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{company.industry}</TableCell>
                        <TableCell>{company.phone}</TableCell>
                        <TableCell>{company.internships}</TableCell>
                        <TableCell>{company.joined}</TableCell>
                        <TableCell>
                          <Chip 
                            label={company.status} 
                            color={
                              company.status === 'Approved' ? 'success' : 
                              company.status === 'Pending' ? 'warning' : 'error'
                            } 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          {company.status === 'Pending' && (
                            <>
                              <Tooltip title="Approve">
                                <IconButton size="small" color="success" onClick={() => handleCompanyAction(company.id, 'approve')}>
                                  <CheckCircle />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reject">
                                <IconButton size="small" color="error" onClick={() => handleCompanyAction(company.id, 'reject')}>
                                  <Block />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="View Details">
                            <IconButton size="small">
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Suspend">
                            <IconButton size="small" color="warning" onClick={() => handleCompanyAction(company.id, 'suspend')}>
                              <Warning />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* System Reports Tab */}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                System Reports & Analytics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>User Registration Trends</Typography>
                    <Box sx={{ height: 200, background: 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)', borderRadius: 1 }} />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>Application Statistics</Typography>
                    <Box sx={{ height: 200, background: 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)', borderRadius: 1 }} />
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Institution Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? 'Add New Institution' : 'Edit Institution'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Institution Name"
              value={newInstitution.name}
              onChange={(e) => setNewInstitution({...newInstitution, name: e.target.value})}
              fullWidth
            />
            <TextField
              label="Type"
              select
              value={newInstitution.type}
              onChange={(e) => setNewInstitution({...newInstitution, type: e.target.value})}
              fullWidth
            >
              <MenuItem value="University">University</MenuItem>
              <MenuItem value="Technical College">Technical College</MenuItem>
              <MenuItem value="Vocational School">Vocational School</MenuItem>
              <MenuItem value="Polytechnic">Polytechnic</MenuItem>
            </TextField>
            <TextField
              label="Location"
              value={newInstitution.location}
              onChange={(e) => setNewInstitution({...newInstitution, location: e.target.value})}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={newInstitution.email}
              onChange={(e) => setNewInstitution({...newInstitution, email: e.target.value})}
              fullWidth
            />
            <TextField
              label="Phone"
              value={newInstitution.phone}
              onChange={(e) => setNewInstitution({...newInstitution, phone: e.target.value})}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveInstitution} variant="contained">
            {dialogType === 'add' ? 'Add Institution' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;