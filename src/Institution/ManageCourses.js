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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Divider,
  Fab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  School,
  Group,
  Schedule,
  AttachMoney,
  Book,
  Category,
  Visibility,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

const ManageCourse = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'BSc Information Technology',
      code: 'BIT001',
      faculty: 'Faculty of ICT',
      duration: '4 years',
      fee: 'M45,000',
      students: 120,
      capacity: 150,
      status: 'active',
      description: 'Comprehensive IT degree covering programming, networking, and system administration.',
      requirements: ['Mathematics B', 'English C', 'Science C'],
      intake: 'January 2024'
    },
    {
      id: 2,
      name: 'BSc Business Information Technology',
      code: 'BBIT001',
      faculty: 'Faculty of ICT',
      duration: '4 years',
      fee: 'M42,000',
      students: 85,
      capacity: 100,
      status: 'active',
      description: 'Business-focused IT degree combining technology and management skills.',
      requirements: ['Mathematics C', 'English C', 'Commerce C'],
      intake: 'January 2024'
    },
    {
      id: 3,
      name: 'Diploma in Software Development',
      code: 'DSD001',
      faculty: 'Faculty of ICT',
      duration: '2 years',
      fee: 'M25,000',
      students: 60,
      capacity: 80,
      status: 'active',
      description: 'Practical software development diploma focusing on modern programming technologies.',
      requirements: ['Mathematics D', 'English D'],
      intake: 'January 2024'
    },
    {
      id: 4,
      name: 'Certificate in Computer Basics',
      code: 'CCB001',
      faculty: 'Faculty of ICT',
      duration: '1 year',
      fee: 'M12,000',
      students: 45,
      capacity: 60,
      status: 'inactive',
      description: 'Introductory computer skills certificate for beginners.',
      requirements: ['None'],
      intake: 'July 2024'
    }
  ]);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setDialogOpen(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleStatusToggle = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId 
        ? { ...course, status: course.status === 'active' ? 'inactive' : 'active' }
        : course
    ));
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const stats = {
    total: courses.length,
    active: courses.filter(course => course.status === 'active').length,
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
    totalCapacity: courses.reduce((sum, course) => sum + course.capacity, 0)
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Manage Courses
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Create and manage academic courses and programs
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196f3, #21cbf3)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    {stats.total}
                  </Typography>
                  <Typography variant="h6">Total Courses</Typography>
                </Box>
                <Book sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4caf50, #8bc34a)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    {stats.active}
                  </Typography>
                  <Typography variant="h6">Active Courses</Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #ff9800, #ffb74d)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    {stats.totalStudents}
                  </Typography>
                  <Typography variant="h6">Enrolled Students</Typography>
                </Box>
                <Group sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #9c27b0, #e91e63)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    {Math.round((stats.totalStudents / stats.totalCapacity) * 100)}%
                  </Typography>
                  <Typography variant="h6">Capacity Filled</Typography>
                </Box>
                <School sx={{ fontSize: 48, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            All Courses
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddCourse}
            sx={{
              background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
              borderRadius: 2
            }}
          >
            Add New Course
          </Button>
        </Box>
      </Paper>

      {/* Courses Grid */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card 
              sx={{ 
                transition: 'all 0.3s ease',
                border: '2px solid',
                borderColor: course.status === 'active' ? 'success.main' : 'transparent',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Code: {course.code} • {course.faculty}
                    </Typography>
                    <Chip
                      label={course.status === 'active' ? 'Active' : 'Inactive'}
                      color={getStatusColor(course.status)}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditCourse(course)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteCourse(course.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Schedule sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">
                        {course.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoney sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">
                        {course.fee}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Group sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">
                        {course.students}/{course.capacity} students
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Category sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">
                        {course.intake}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Requirements:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {course.requirements.map((req, index) => (
                      <Chip key={index} label={req} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={course.status === 'active'}
                        onChange={() => handleStatusToggle(course.id)}
                        color="success"
                      />
                    }
                    label={course.status === 'active' ? 'Active' : 'Inactive'}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<Visibility />}
                  >
                    View Applications
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Course Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            {selectedCourse ? 'Edit Course' : 'Add New Course'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Course Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Course Code" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Faculty</InputLabel>
                <Select label="Faculty">
                  <MenuItem value="ict">Faculty of ICT</MenuItem>
                  <MenuItem value="business">Faculty of Business</MenuItem>
                  <MenuItem value="engineering">Faculty of Engineering</MenuItem>
                  <MenuItem value="arts">Faculty of Arts</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Duration" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Tuition Fee" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Student Capacity" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline 
                rows={3} 
                label="Course Description" 
                variant="outlined" 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Admission Requirements" 
                variant="outlined"
                placeholder="Separate requirements with commas"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Next Intake" type="date" variant="outlined" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Active Course"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">
            {selectedCourse ? 'Update Course' : 'Create Course'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add course"
        onClick={handleAddCourse}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #2196f3, #21cbf3)'
        }}
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default ManageCourse;