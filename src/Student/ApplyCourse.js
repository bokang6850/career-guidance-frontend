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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox
} from '@mui/material';
import {
  School,
  Description,
  CheckCircle,
  Upload,
  Assignment,
  Schedule,
  AttachMoney,
  Group,
  Book
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const ApplyCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [course, setCourse] = useState(null);
  const [documents, setDocuments] = useState([]);

  const [applicationData, setApplicationData] = useState({
    personalStatement: '',
    preferredIntake: '',
    fundingSource: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    agreeToTerms: false
  });

  useEffect(() => {
    // Simulate fetching course data
    setTimeout(() => {
      setCourse({
        id: courseId,
        name: 'BSc Information Technology',
        institution: 'Limkokwing University',
        duration: '4 years',
        fee: 'M45,000 per year',
        requirements: ['Mathematics B or better', 'English C or better', 'Science C or better'],
        deadline: '2024-02-15',
        intake: 'January 2024',
        description: 'This comprehensive IT degree covers programming, networking, database management, and system administration. Students will gain practical skills in software development and IT infrastructure management.'
      });
    }, 1000);
  }, [courseId]);

  const steps = ['Course Details', 'Application Form', 'Documents Upload', 'Review & Submit'];

  const requiredDocuments = [
    'High School Transcript',
    'National ID Copy',
    'Passport Photo',
    'Birth Certificate',
    'Recommendation Letter (Optional)'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setApplicationData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setApplicationData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleDocumentUpload = (e, documentName) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => [...prev, {
        name: documentName,
        file: file,
        uploaded: new Date()
      }]);
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Application failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {course && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <School sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {course.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {course.institution}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Schedule sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">Duration</Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">{course.duration}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AttachMoney sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">Tuition Fee</Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">{course.fee}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Group sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">Next Intake</Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">{course.intake}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Assignment sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">Deadline</Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">{course.deadline}</Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>Description</Typography>
                    <Typography variant="body1" paragraph>
                      {course.description}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>Admission Requirements</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {course.requirements.map((req, index) => (
                        <Chip key={index} label={req} color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
            
            <Alert severity="info" sx={{ mb: 2 }}>
              Please review the course details and requirements before proceeding with your application.
            </Alert>
          </Box>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Personal Statement"
                name="personalStatement"
                value={applicationData.personalStatement}
                onChange={handleChange}
                placeholder="Tell us about your motivation for applying to this course, your career goals, and why you're a good fit..."
                helperText="This statement helps the admission committee understand your motivation and suitability for the course"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Preferred Intake</InputLabel>
                <Select
                  name="preferredIntake"
                  value={applicationData.preferredIntake}
                  label="Preferred Intake"
                  onChange={handleChange}
                >
                  <MenuItem value="january-2024">January 2024</MenuItem>
                  <MenuItem value="may-2024">May 2024</MenuItem>
                  <MenuItem value="september-2024">September 2024</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Funding Source</InputLabel>
                <Select
                  name="fundingSource"
                  value={applicationData.fundingSource}
                  label="Funding Source"
                  onChange={handleChange}
                >
                  <MenuItem value="self">Self-funded</MenuItem>
                  <MenuItem value="government">Government Sponsorship</MenuItem>
                  <MenuItem value="scholarship">Scholarship</MenuItem>
                  <MenuItem value="loan">Student Loan</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Emergency Contact Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Name"
                name="emergencyContact.name"
                value={applicationData.emergencyContact.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Relationship"
                name="emergencyContact.relationship"
                value={applicationData.emergencyContact.relationship}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="emergencyContact.phone"
                value={applicationData.emergencyContact.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="emergencyContact.email"
                type="email"
                value={applicationData.emergencyContact.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Required Documents
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Please upload all required documents. Supported formats: PDF, JPG, PNG (Max 5MB per file)
            </Typography>

            <List>
              {requiredDocuments.map((doc, index) => {
                const uploadedDoc = documents.find(d => d.name === doc);
                const isOptional = doc.includes('(Optional)');
                
                return (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Description color={uploadedDoc ? "success" : "disabled"} />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc}
                      secondary={uploadedDoc ? `Uploaded: ${uploadedDoc.uploaded.toLocaleDateString()}` : 'Not uploaded'}
                    />
                    <Button
                      variant={uploadedDoc ? "outlined" : "contained"}
                      component="label"
                      startIcon={uploadedDoc ? <CheckCircle /> : <Upload />}
                      color={uploadedDoc ? "success" : "primary"}
                    >
                      {uploadedDoc ? 'Reupload' : 'Upload'}
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleDocumentUpload(e, doc)}
                      />
                    </Button>
                  </ListItem>
                );
              })}
            </List>

            {documents.length > 0 && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {documents.length} of {requiredDocuments.length} documents uploaded
              </Alert>
            )}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Application
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Course Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Course</Typography>
                    <Typography variant="body1" fontWeight="medium">{course?.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Institution</Typography>
                    <Typography variant="body1" fontWeight="medium">{course?.institution}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Application Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Preferred Intake</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {applicationData.preferredIntake || 'Not specified'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Funding Source</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {applicationData.fundingSource || 'Not specified'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Uploaded Documents
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {documents.map((doc, index) => (
                    <Chip
                      key={index}
                      icon={<CheckCircle />}
                      label={doc.name}
                      color="success"
                      variant="outlined"
                    />
                  ))}
                  {documents.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No documents uploaded
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={applicationData.agreeToTerms}
                  onChange={handleChange}
                />
              }
              label="I certify that the information provided is accurate and complete. I understand that false information may lead to application rejection."
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            Application Submitted!
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Thank you for applying to {course?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your application has been received and is under review. 
            You will be notified via email once a decision is made.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/student/dashboard')}
            size="large"
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Course Application
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete your application in {steps.length} simple steps
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !applicationData.agreeToTerms}
                startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                sx={{
                  background: 'linear-gradient(45deg, #4caf50, #8bc34a)'
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ApplyCourse;