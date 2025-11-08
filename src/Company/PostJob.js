import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Alert,
  CircularProgress,
  Divider,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  PostAdd,
  Work,
  AttachMoney,
  Schedule,
  LocationOn,
  Category,
  School,
  Add,
  Check
} from '@mui/icons-material';

const PostJob = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    jobType: 'full-time',
    salary: '',
    description: '',
    requirements: [],
    qualifications: [],
    experience: '',
    applicationDeadline: '',
    category: ''
  });

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Remote'
  ];

  const categories = [
    'Information Technology',
    'Business & Management',
    'Engineering',
    'Healthcare',
    'Education',
    'Marketing',
    'Finance',
    'Sales'
  ];

  const qualifications = [
    'High School',
    'Diploma',
    'Bachelor Degree',
    'Honours Degree',
    'Masters Degree',
    'PhD'
  ];

  const steps = ['Job Details', 'Requirements', 'Review & Post'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRequirementsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      requirements: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleQualificationsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      qualifications: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                placeholder="e.g., Senior Software Developer"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  name="jobType"
                  value={formData.jobType}
                  label="Job Type"
                  onChange={handleChange}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type.toLowerCase()}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
                }}
                placeholder="e.g., Maseru, Lesotho"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary Range"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <AttachMoney sx={{ color: 'text.secondary', mr: 1 }} />
                }}
                placeholder="e.g., M10,000 - M15,000"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and what makes your company great..."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Requirements & Skills</InputLabel>
                <Select
                  multiple
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleRequirementsChange}
                  input={<OutlinedInput label="Requirements & Skills" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {[
                    'JavaScript',
                    'Python',
                    'React',
                    'Node.js',
                    'Communication',
                    'Leadership',
                    'Project Management',
                    'Teamwork'
                  ].map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Minimum Qualification</InputLabel>
                <Select
                  multiple
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleQualificationsChange}
                  input={<OutlinedInput label="Minimum Qualification" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {qualifications.map((qual) => (
                    <MenuItem key={qual} value={qual}>
                      {qual}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience Required"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 2+ years"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Application Deadline"
                name="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <Schedule sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Job Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Job Title
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.jobTitle}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Company
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.company}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.location}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Job Type
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.jobType}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Requirements
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Skills Required:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.requirements.map((req, index) => (
                      <Chip key={index} label={req} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Experience: {formData.experience}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Check sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            Job Posted Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your job posting has been published and is now visible to qualified candidates.
          </Typography>
          <Button variant="contained" onClick={() => {
            setSuccess(false);
            setActiveStep(0);
            setFormData({
              jobTitle: '',
              company: '',
              location: '',
              jobType: 'full-time',
              salary: '',
              description: '',
              requirements: [],
              qualifications: [],
              experience: '',
              applicationDeadline: '',
              category: ''
            });
          }}>
            Post Another Job
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <PostAdd sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Post a New Job
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill in the details below to create your job posting
            </Typography>
          </Box>
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
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Check />}
                sx={{
                  background: 'linear-gradient(45deg, #4caf50, #8bc34a)'
                }}
              >
                {loading ? 'Posting...' : 'Post Job'}
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

export default PostJob;