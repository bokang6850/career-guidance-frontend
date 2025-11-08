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
  Rating,
  Divider
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
  LocationOn
} from '@mui/icons-material';

const ViewApplicants = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const applicants = [
    {
      id: 1,
      name: 'Thabo Mokoena',
      email: 'thabo.mokoena@email.com',
      phone: '+266 1234 5678',
      position: 'Senior Software Developer',
      appliedDate: '2024-01-15',
      status: 'shortlisted',
      matchScore: 92,
      avatar: '👨‍💼',
      education: 'BSc Computer Science - Limkokwing University',
      experience: '3 years at Tech Solutions Ltd',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
      location: 'Maseru, Lesotho',
      expectedSalary: 'M15,000',
      noticePeriod: '2 weeks'
    },
    {
      id: 2,
      name: 'Matseliso Phiri',
      email: 'matseliso.phiri@email.com',
      phone: '+266 2345 6789',
      position: 'Senior Software Developer',
      appliedDate: '2024-01-14',
      status: 'new',
      matchScore: 88,
      avatar: '👩‍💻',
      education: 'BSc Information Technology - Botho University',
      experience: '2 years at Digital Innovations',
      skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
      location: 'Maseru, Lesotho',
      expectedSalary: 'M14,000',
      noticePeriod: '1 month'
    },
    {
      id: 3,
      name: 'John Mohapi',
      email: 'john.mohapi@email.com',
      phone: '+266 3456 7890',
      position: 'Senior Software Developer',
      appliedDate: '2024-01-13',
      status: 'rejected',
      matchScore: 65,
      avatar: '👨‍🎓',
      education: 'Diploma in Software Development - Limkokwing University',
      experience: '1 year at Startup Co',
      skills: ['PHP', 'Laravel', 'JavaScript', 'MySQL'],
      location: 'Roma, Lesotho',
      expectedSalary: 'M12,000',
      noticePeriod: 'Immediate'
    },
    {
      id: 4,
      name: 'Sarah Letsie',
      email: 'sarah.letsie@email.com',
      phone: '+266 4567 8901',
      position: 'Senior Software Developer',
      appliedDate: '2024-01-12',
      status: 'interview',
      matchScore: 95,
      avatar: '👩‍🎓',
      education: 'BSc Software Engineering - NUL',
      experience: '4 years at Enterprise Solutions',
      skills: ['C#', '.NET', 'SQL Server', 'Azure', 'React'],
      location: 'Maseru, Lesotho',
      expectedSalary: 'M16,000',
      noticePeriod: '3 weeks'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setDialogOpen(true);
  };

  const handleStatusChange = (applicantId, newStatus) => {
    // Handle status change logic here
    console.log(`Changing status of applicant ${applicantId} to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'primary';
      case 'shortlisted': return 'success';
      case 'interview': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const filteredApplicants = applicants.filter(applicant => {
    switch (tabValue) {
      case 0: return true; // All
      case 1: return applicant.status === 'new';
      case 2: return applicant.status === 'shortlisted';
      case 3: return applicant.status === 'interview';
      case 4: return applicant.status === 'rejected';
      default: return true;
    }
  });

  const statusCounts = {
    all: applicants.length,
    new: applicants.filter(a => a.status === 'new').length,
    shortlisted: applicants.filter(a => a.status === 'shortlisted').length,
    interview: applicants.filter(a => a.status === 'interview').length,
    rejected: applicants.filter(a => a.status === 'rejected').length
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Job Applications
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Senior Software Developer Position • 24 Applications
        </Typography>
      </Box>

      {/* Status Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            label={`All Applications (${statusCounts.all})`} 
            icon={<Work />}
            iconPosition="start"
          />
          <Tab 
            label={`New (${statusCounts.new})`} 
            icon={<Email />}
            iconPosition="start"
          />
          <Tab 
            label={`Shortlisted (${statusCounts.shortlisted})`} 
            icon={<CheckCircle />}
            iconPosition="start"
          />
          <Tab 
            label={`Interview (${statusCounts.interview})`} 
            icon={<CalendarToday />}
            iconPosition="start"
          />
          <Tab 
            label={`Rejected (${statusCounts.rejected})`} 
            icon={<Cancel />}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* Applicants Grid */}
      <Grid container spacing={3}>
        {filteredApplicants.map((applicant) => (
          <Grid item xs={12} md={6} key={applicant.id}>
            <Card 
              sx={{ 
                transition: 'all 0.3s ease',
                border: '2px solid',
                borderColor: applicant.status === 'new' ? 'primary.main' : 'transparent',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, fontSize: '1.5rem', mr: 2 }}>
                    {applicant.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {applicant.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label={applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                        color={getStatusColor(applicant.status)}
                        size="small"
                      />
                      <Chip
                        label={`${applicant.matchScore}% Match`}
                        color="success"
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <School sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {applicant.education}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Work sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {applicant.experience}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {applicant.location}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Key Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {applicant.skills.slice(0, 4).map((skill, index) => (
                      <Chip key={index} label={skill} size="small" variant="outlined" />
                    ))}
                    {applicant.skills.length > 4 && (
                      <Chip label={`+${applicant.skills.length - 4}`} size="small" />
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Applied: {applicant.appliedDate}
                  </Typography>
                  <Box>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewDetails(applicant)}
                      size="small"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" size="small">
                      <Download />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {applicant.status === 'new' && (
                    <>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="success"
                        onClick={() => handleStatusChange(applicant.id, 'shortlisted')}
                      >
                        Shortlist
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        onClick={() => handleStatusChange(applicant.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {applicant.status === 'shortlisted' && (
                    <Button 
                      size="small" 
                      variant="contained" 
                      color="warning"
                      onClick={() => handleStatusChange(applicant.id, 'interview')}
                    >
                      Schedule Interview
                    </Button>
                  )}
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => handleViewDetails(applicant)}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Applicant Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        {selectedApplicant && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 60, height: 60, fontSize: '1.5rem', mr: 2 }}>
                  {selectedApplicant.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedApplicant.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {selectedApplicant.position}
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
                    {selectedApplicant.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    {selectedApplicant.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    {selectedApplicant.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Expected Salary</Typography>
                  <Typography variant="body1">
                    {selectedApplicant.expectedSalary}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Education</Typography>
                  <Typography variant="body1">{selectedApplicant.education}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Experience</Typography>
                  <Typography variant="body1">{selectedApplicant.experience}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Skills</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedApplicant.skills.map((skill, index) => (
                      <Chip key={index} label={skill} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
              <Button variant="contained" color="primary">
                Download CV
              </Button>
              <Button variant="contained" color="success">
                Schedule Interview
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ViewApplicants;