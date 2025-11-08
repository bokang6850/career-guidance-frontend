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
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Tab,
  Tabs,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  School,
  Work,
  TrendingUp,
  Assignment,
  Notifications,
  Book,
  Schedule,
  CheckCircle,
  Pending,
  Star,
  EmojiEvents,
  MoreVert,
  AccessTime,
  CalendarToday,
  LocationOn,
  Business,
  Person
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({
    applications: 0,
    admitted: 0,
    pending: 0,
    recommendedJobs: 0,
    upcomingDeadlines: 2
  });
  const [loading, setLoading] = useState(true);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStats({
          applications: 5,
          admitted: 2,
          pending: 3,
          recommendedJobs: 12,
          upcomingDeadlines: 2
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const recentApplications = [
    {
      id: 1,
      course: 'BSc Information Technology',
      institution: 'Limkokwing University',
      status: 'admitted',
      date: '2024-01-15',
      match: 92,
      institutionLogo: '🏫',
      nextSteps: 'Submit required documents by 2024-02-01'
    },
    {
      id: 2,
      course: 'BSc Business IT',
      institution: 'Botho University',
      status: 'pending',
      date: '2024-01-14',
      match: 85,
      institutionLogo: '🎓',
      nextSteps: 'Under review - Decision expected in 2 weeks'
    },
    {
      id: 3,
      course: 'Diploma in Software Development',
      institution: 'Limkokwing University',
      status: 'pending',
      date: '2024-01-10',
      match: 78,
      institutionLogo: '🏫',
      nextSteps: 'Application processing'
    }
  ];

  const recommendedCourses = [
    {
      id: 1,
      name: 'BSc Computer Science',
      institution: 'National University of Lesotho',
      match: 95,
      deadline: '2024-02-15',
      duration: '4 years',
      fee: 'M40,000/year',
      location: 'Roma, Lesotho'
    },
    {
      id: 2,
      name: 'BSc Data Science',
      institution: 'Limkokwing University',
      match: 88,
      deadline: '2024-02-20',
      duration: '4 years',
      fee: 'M45,000/year',
      location: 'Maseru, Lesotho'
    },
    {
      id: 3,
      name: 'Diploma in Web Development',
      institution: 'Botho University',
      match: 82,
      deadline: '2024-03-01',
      duration: '2 years',
      fee: 'M25,000/year',
      location: 'Maseru, Lesotho'
    }
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'Junior Software Developer',
      company: 'Econet Telecom Lesotho',
      location: 'Maseru, Lesotho',
      type: 'Full-time',
      salary: 'M12,000 - M15,000',
      match: 88,
      posted: '2 days ago',
      urgent: true
    },
    {
      id: 2,
      title: 'IT Support Specialist',
      company: 'Standard Bank Lesotho',
      location: 'Maseru, Lesotho',
      type: 'Full-time',
      salary: 'M10,000 - M13,000',
      match: 76,
      posted: '1 week ago',
      urgent: false
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Application Update',
      message: 'Your application to Limkokwing University has been accepted!',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'New Recommendation',
      message: '3 new courses match your profile',
      time: '1 day ago',
      read: true,
      type: 'info'
    },
    {
      id: 3,
      title: 'Deadline Reminder',
      message: 'Application deadline for NUL is approaching',
      time: '2 days ago',
      read: true,
      type: 'warning'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'University Fair 2024',
      date: '2024-02-10',
      time: '09:00 AM',
      location: 'Lešotho High School, Maseru',
      type: 'fair'
    },
    {
      id: 2,
      title: 'Career Guidance Workshop',
      date: '2024-02-15',
      time: '02:00 PM',
      location: 'Online',
      type: 'workshop'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'admitted': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'admitted': return <CheckCircle />;
      case 'pending': return <Pending />;
      case 'rejected': return <Schedule />;
      default: return <Assignment />;
    }
  };

  const statsCards = [
    {
      title: 'Total Applications',
      value: stats.applications,
      icon: <Assignment sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #2196f3, #21cbf3)',
      action: () => navigate('/student/applications'),
      description: 'Course applications submitted'
    },
    {
      title: 'Admitted',
      value: stats.admitted,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #4caf50, #8bc34a)',
      action: () => navigate('/student/applications?status=admitted'),
      description: 'Successful admissions'
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      icon: <Pending sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #ff9800, #ffb74d)',
      action: () => navigate('/student/applications?status=pending'),
      description: 'Applications in process'
    },
    {
      title: 'Recommended Jobs',
      value: stats.recommendedJobs,
      icon: <Work sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #9c27b0, #e91e63)',
      action: () => navigate('/jobs'),
      description: 'Jobs matching your profile'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, {user?.name}!
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Here's your academic and career journey overview
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Badge badgeContent={unreadNotificationsCount} color="error">
              <IconButton onClick={handleNotificationsOpen}>
                <Notifications />
              </IconButton>
            </Badge>
            <Menu
              anchorEl={notificationsAnchor}
              open={Boolean(notificationsAnchor)}
              onClose={handleNotificationsClose}
              PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
            >
              {notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </MenuItem>
              ))}
            </Menu>
            <Chip 
              icon={<Person />} 
              label="Student" 
              variant="outlined" 
              color="primary" 
            />
          </Box>
        </Box>

        {/* Progress Alert */}
        <Alert severity="info" sx={{ mb: 2 }}>
          Complete your profile to get better course and job recommendations!
        </Alert>
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
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
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
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {stat.description}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.9 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs Section */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Applications" icon={<Assignment />} iconPosition="start" />
          <Tab label="Recommended Courses" icon={<School />} iconPosition="start" />
          <Tab label="Job Opportunities" icon={<Work />} iconPosition="start" />
          <Tab label="Upcoming Events" icon={<CalendarToday />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  Recent Applications
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<School />}
                  onClick={() => navigate('/courses')}
                >
                  Apply for More Courses
                </Button>
              </Box>

              <List>
                {recentApplications.map((application, index) => (
                  <React.Fragment key={application.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {application.institutionLogo}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h6">
                                {application.course}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {application.institution}
                              </Typography>
                            </Box>
                            <Chip
                              icon={getStatusIcon(application.status)}
                              label={application.status.toUpperCase()}
                              color={getStatusColor(application.status)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={application.match} 
                                sx={{ width: 100, mr: 2 }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                {application.match}% match
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                                Applied: {application.date}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="primary">
                              {application.nextSteps}
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
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Upcoming Deadlines */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                ⏰ Upcoming Deadlines
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="NUL Applications"
                    secondary="Due: Feb 15, 2024"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Limkokwing Scholarship"
                    secondary="Due: Feb 20, 2024"
                  />
                </ListItem>
              </List>
            </Paper>

            {/* Profile Completion */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Profile Completion
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ mb: 2, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                75% complete
              </Typography>
              <Button 
                fullWidth 
                variant="outlined" 
                onClick={() => navigate('/student/profile')}
              >
                Complete Profile
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {recommendedCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
                      {course.name}
                    </Typography>
                    <Chip 
                      icon={<Star />} 
                      label={`${course.match}% match`} 
                      color="primary" 
                      size="small" 
                    />
                  </Box>
                  
                  <Typography color="primary" gutterBottom>
                    {course.institution}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                      {course.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ⏱️ {course.duration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      💰 {course.fee}
                    </Typography>
                    <Typography variant="body2" color="error" gutterBottom>
                      ⏰ Apply by: {course.deadline}
                    </Typography>
                  </Box>
                </CardContent>
                <CardContent>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={() => navigate(`/apply-course/${course.id}`)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {featuredJobs.map((job) => (
            <Grid item xs={12} md={6} key={job.id}>
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
                        {job.title}
                      </Typography>
                      {job.urgent && (
                        <Chip label="Urgent" color="error" size="small" />
                      )}
                    </Box>
                    <Typography color="primary" gutterBottom>
                      <Business sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                      {job.company}
                    </Typography>
                  </Box>
                  <Chip 
                    label={`${job.match}% match`} 
                    color="primary" 
                    variant="outlined" 
                  />
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                    {job.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    💼 {job.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    💰 {job.salary}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🕒 {job.posted}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    sx={{ flex: 1 }}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View Details
                  </Button>
                  <Button variant="outlined" sx={{ flex: 1 }}>
                    Quick Apply
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          {upcomingEvents.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <CalendarToday />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <CalendarToday sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                      {event.date} at {event.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                      {event.location}
                    </Typography>
                  </Box>
                </Box>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                >
                  Add to Calendar
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default StudentDashboard;