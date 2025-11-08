import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Avatar,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import {
  Visibility,
  Email,
  Phone,
  School,
  Work,
  Schedule,
  CheckCircle,
  Cancel,
  Download,
  CalendarToday,
  LocationOn,
  FilterList,
  Search,
  Person
} from '@mui/icons-material';

const ManageApplications = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterCourse, setFilterCourse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const applications = [
    {
      id: 1,
      student: {
        name: 'Thabo Mokoena',
        email: 'thabo.mokoena@email.com',
        phone: '+266 1234 5678',
        avatar: '👨‍💼',
        highSchool: 'Maseru High School',
        graduationYear: '2023'
      },
      course: 'BSc Information Technology',
      appliedDate: '2024-01-15',
      status: 'under_review',
      matchScore: 92,
      grades: {
        mathematics: 'A',
        english: 'B',
        science: 'A',
        computer: 'A'
      },
      documents: ['Transcript', 'ID Copy', 'Recommendation Letter'],
      notes: 'Excellent mathematics and computer science grades'
    },
    {
      id: 2,
      student: {
        name: 'Matseliso Phiri',
        email: 'matseliso.phiri@email.com',
        phone: '+266 2345 6789',
        avatar: '👩‍💻',
        highSchool: 'St. Marys High School',
        graduationYear: '2023'
      },
      course: 'BSc Business Information Technology',
      appliedDate: '2024-01-14',
      status: 'admitted',
      matchScore: 88,
      grades: {
        mathematics: 'B',
        english: 'A',
        science: 'B',
        business: 'A'
      },
      documents: ['Transcript', 'ID Copy'],
      notes: 'Strong in business subjects'
    },
    {
      id: 3,
      student: {
        name: 'John Mohapi',
        email: 'john.mohapi@email.com',
        phone: '+266 3456 7890',
        avatar: '👨‍🎓',
        highSchool: 'Roma High School',
        graduationYear: '2023'
      },
      course: 'Diploma in Software Development',
      appliedDate: '2024-01-13',
      status: 'rejected',
      matchScore: 65,
      grades: {
        mathematics: 'C',
        english: 'B',
        science: 'C',
        computer: 'B'
      },
      documents: ['Transcript', 'ID Copy'],
      notes: 'Does not meet minimum mathematics requirement'
    },
    {
      id: 4,
      student: {
        name: 'Sarah Letsie',
        email: 'sarah.letsie@email.com',
        phone: '+266 4567 8901',
        avatar: '👩‍🎓',
        highSchool: 'Mazenod High School',
        graduationYear: '2023'
      },
      course: 'BSc Information Technology',
      appliedDate: '2024-01-12',
      status: 'waiting_list',
      matchScore: 78,
      grades: {
        mathematics: 'B',
        english: 'B',
        science: 'B',
        computer: 'A'
      },
      documents: ['Transcript', 'ID Copy', 'Personal Statement'],
      notes: 'Good overall performance, consider for waiting list'
    }
  ];

  const courses = ['All Courses', 'BSc Information Technology', 'BSc Business Information Technology', 'Diploma in Software Development'];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const handleStatusChange = (applicationId, newStatus) => {
    // Handle status change logic here
    console.log(`Changing status of application ${applicationId} to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_review': return 'primary';
      case 'admitted': return 'success';
      case 'rejected': return 'error';
      case 'waiting_list': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'under_review': return 'Under Review';
      case 'admitted': return 'Admitted';
      case 'rejected': return 'Rejected';
      case 'waiting_list': return 'Waiting List';
      default: return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    const statusFilter = tabValue === 0 ? true : 
      tabValue === 1 ? app.status === 'under_review' :
      tabValue === 2 ? app.status === 'admitted' :
      tabValue === 3 ? app.status === 'rejected' :
      app.status === 'waiting_list';
    
    const courseFilter = filterCourse === 'all' || app.course === filterCourse;
    const searchFilter = searchTerm === '' || 
      app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase());

    return statusFilter && courseFilter && searchFilter;
  });

  const statusCounts = {
    all: applications.length,
    under_review: applications.filter(a => a.status === 'under_review').length,
    admitted: applications.filter(a => a.status === 'admitted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    waiting_list: applications.filter(a => a.status === 'waiting_list').length
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Manage Applications
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Review and process student applications for your institution
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196f3, #21cbf3)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {statusCounts.all}
              </Typography>
              <Typography variant="h6">Total Applications</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4caf50, #8bc34a)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {statusCounts.under_review}
              </Typography>
              <Typography variant="h6">Under Review</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #ff9800, #ffb74d)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {statusCounts.admitted}
              </Typography>
              <Typography variant="h6">Admitted</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #f44336, #ef5350)', color: 'white' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {statusCounts.waiting_list}
              </Typography>
              <Typography variant="h6">Waiting List</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search students or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Course</InputLabel>
              <Select
                value={filterCourse}
                label="Filter by Course"
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <MenuItem key={course} value={course === 'All Courses' ? 'all' : course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              fullWidth
            >
              Advanced Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Status Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`All Applications (${statusCounts.all})`} />
          <Tab label={`Under Review (${statusCounts.under_review})`} />
          <Tab label={`Admitted (${statusCounts.admitted})`} />
          <Tab label={`Rejected (${statusCounts.rejected})`} />
          <Tab label={`Waiting List (${statusCounts.waiting_list})`} />
        </Tabs>
      </Paper>

      {/* Applications Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applied Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Match Score</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>
                      {application.student.avatar}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">
                        {application.student.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {application.student.highSchool}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="medium">
                    {application.course}
                  </Typography>
                </TableCell>
                <TableCell>{application.appliedDate}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={application.matchScore} 
                      sx={{ width: 60, mr: 1 }}
                    />
                    <Typography variant="body2">
                      {application.matchScore}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(application.status)}
                    color={getStatusColor(application.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewDetails(application)}
                      size="small"
                    >
                      <Visibility />
                    </IconButton>
                    {application.status === 'under_review' && (
                      <>
                        <Button 
                          size="small" 
                          variant="contained" 
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => handleStatusChange(application.id, 'admitted')}
                        >
                          Admit
                        </Button>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => handleStatusChange(application.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Application Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 60, height: 60, fontSize: '1.5rem', mr: 2 }}>
                  {selectedApplication.student.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedApplication.student.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Application for {selectedApplication.course}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    {selectedApplication.student.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    {selectedApplication.student.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">High School</Typography>
                  <Typography variant="body1">
                    {selectedApplication.student.highSchool}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Graduation Year</Typography>
                  <Typography variant="body1">
                    {selectedApplication.student.graduationYear}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Academic Grades</Typography>
                  <Grid container spacing={2}>
                    {Object.entries(selectedApplication.grades).map(([subject, grade]) => (
                      <Grid item xs={6} sm={3} key={subject}>
                        <Card variant="outlined">
                          <CardContent sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {subject.charAt(0).toUpperCase() + subject.slice(1)}
                            </Typography>
                            <Typography variant="h6" color="primary" fontWeight="bold">
                              {grade}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Submitted Documents</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedApplication.documents.map((doc, index) => (
                      <Chip 
                        key={index} 
                        label={doc} 
                        color="primary" 
                        variant="outlined"
                        icon={<Download />}
                        onClick={() => console.log(`Download ${doc}`)}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Admission Notes</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    defaultValue={selectedApplication.notes}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              <Button variant="outlined" color="primary">
                Download All Documents
              </Button>
              <Button variant="contained" color="success">
                Admit Student
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ManageApplications;