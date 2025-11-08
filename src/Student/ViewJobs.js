import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  Business,
  LocationOn,
  Schedule,
  AttachMoney,
  Work,
  School,
  Groups,
  TrendingUp,
  CheckCircle,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const ViewJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [matchScore, setMatchScore] = useState(0);

  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    expectedSalary: '',
    noticePeriod: '',
    availableFrom: ''
  });

  useEffect(() => {
    // Simulate fetching job data
    setTimeout(() => {
      setJob({
        id: jobId,
        title: 'Junior Software Developer',
        company: 'Econet Telecom Lesotho',
        location: 'Maseru, Lesotho',
        type: 'Full-time',
        salary: 'M12,000 - M15,000',
        posted: '2024-01-15',
        deadline: '2024-02-15',
        description: 'We are looking for a passionate Junior Software Developer to design, develop and maintain software solutions. The successful candidate will be part of a talented software team that works on mission-critical applications.',
        responsibilities: [
          'Develop and maintain web applications using modern technologies',
          'Collaborate with cross-functional teams to define, design, and ship new features',
          'Write clean, readable, and testable code',
          'Troubleshoot and debug applications',
          'Participate in code reviews'
        ],
        requirements: {
          education: 'BSc in Computer Science or related field',
          experience: '0-2 years of software development experience',
          technical: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
          soft: ['Problem-solving skills', 'Team player', 'Good communication']
        },
        benefits: [
          'Competitive salary package',
          'Health insurance',
          'Professional development opportunities',
          'Flexible working hours',
          'Young and dynamic team environment'
        ],
        applicationCount: 24
      });
      
      // Simulate match score calculation
      setMatchScore(85);
    }, 1000);
  }, [jobId]);

  const handleApply = () => {
    setApplyDialogOpen(true);
  };

  const handleApplicationSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setApplicationSuccess(true);
      setApplyDialogOpen(false);
      
    } catch (error) {
      console.error('Application failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  if (applicationSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            Application Submitted!
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You've successfully applied for {job?.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The company will review your application and contact you if you're shortlisted. 
            You can track your application status in your dashboard.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/jobs')}
            >
              Browse More Jobs
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/student/dashboard')}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading job details...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/jobs')}
        sx={{ mb: 3 }}
      >
        Back to Jobs
      </Button>

      <Grid container spacing={4}>
        {/* Job Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {job.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip icon={<Business />} label={job.company} color="primary" />
                  <Chip icon={<LocationOn />} label={job.location} variant="outlined" />
                  <Chip icon={<Work />} label={job.type} variant="outlined" />
                </Box>
              </Box>
              
              {/* Match Score */}
              <Card sx={{ background: 'linear-gradient(45deg, #4caf50, #8bc34a)', color: 'white', minWidth: 120 }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" fontWeight="bold">
                    {matchScore}%
                  </Typography>
                  <Typography variant="body2">
                    Match Score
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <LinearProgress 
              variant="determinate" 
              value={matchScore} 
              sx={{ mb: 3, height: 8, borderRadius: 4 }}
              color="success"
            />

            {/* Key Information */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachMoney sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">Salary</Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium">{job.salary}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">Posted</Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium">{job.posted}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">Deadline</Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium">{job.deadline}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Groups sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">Applicants</Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium">{job.applicationCount}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Job Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Job Description
              </Typography>
              <Typography variant="body1" paragraph>
                {job.description}
              </Typography>
            </Box>

            {/* Responsibilities */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Key Responsibilities
              </Typography>
              <List>
                {job.responsibilities.map((responsibility, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={responsibility} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Requirements */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Requirements
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Education</Typography>
                <Typography variant="body1">{job.requirements.education}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Experience</Typography>
                <Typography variant="body1">{job.requirements.experience}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Technical Skills</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {job.requirements.technical.map((skill, index) => (
                    <Chip key={index} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Soft Skills</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {job.requirements.soft.map((skill, index) => (
                    <Chip key={index} label={skill} color="secondary" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Benefits */}
            <Box>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Benefits & Perks
              </Typography>
              <Grid container spacing={2}>
                {job.benefits.map((benefit, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                      <Typography variant="body1">{benefit}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar - Application & Company Info */}
        <Grid item xs={12} md={4}>
          {/* Application Card */}
          <Card sx={{ mb: 3, position: 'sticky', top: 100 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Ready to Apply?
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Your profile matches {matchScore}% of this job's requirements
              </Alert>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleApply}
                sx={{
                  mb: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #2196f3, #21cbf3)'
                }}
              >
                Apply for this Job
              </Button>

              <Typography variant="body2" color="text.secondary" align="center">
                {job.applicationCount} people have already applied
              </Typography>
            </CardContent>
          </Card>

          {/* Company Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                About {job.company}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Leading telecommunications company in Lesotho, providing innovative solutions and excellent career growth opportunities.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" fullWidth>
                  View Company Profile
                </Button>
                <Button variant="outlined" fullWidth>
                  See Other Jobs
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Application Dialog */}
      <Dialog 
        open={applyDialogOpen} 
        onClose={() => setApplyDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Apply for {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.company} • {job.location}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity="info">
                Your profile and documents will be automatically submitted with this application.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Cover Letter"
                name="coverLetter"
                value={applicationData.coverLetter}
                onChange={handleChange}
                placeholder="Explain why you're interested in this position and why you'd be a good fit..."
                helperText="This helps the employer understand your motivation and suitability"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expected Salary"
                name="expectedSalary"
                value={applicationData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g., M12,000"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Notice Period"
                name="noticePeriod"
                value={applicationData.noticePeriod}
                onChange={handleChange}
                placeholder="e.g., 2 weeks"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Available From"
                name="availableFrom"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={applicationData.availableFrom}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleApplicationSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewJob;