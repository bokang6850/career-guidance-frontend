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
  IconButton
} from '@mui/material';
import {
  School,
  People,
  Assignment,
  CheckCircle,
  Pending,
  Add,
  TrendingUp,
  Notifications
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const InstitutionDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalApplications: 0,
    admittedStudents: 0,
    pendingApplications: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading institution data
    setTimeout(() => {
      setStats({
        totalCourses: 12,
        totalApplications: 156,
        admittedStudents: 45,
        pendingApplications: 23
      });
    }, 1000);
  }, []);

  const recentApplications = [
    { id: 1, student: 'John Doe', course: 'BSc Information Technology', date: '2024-01-15', status: 'Under Review' },
    { id: 2, student: 'Jane Smith', course: 'BSc Business IT', date: '2024-01-14', status: 'Admitted' },
    { id: 3, student: 'Bob Johnson', course: 'Diploma in Software Dev', date: '2024-01-13', status: 'Pending' }
  ];

  const statsCards = [
    { title: 'Total Courses', value: stats.totalCourses, color: '#2196f3', icon: <School />, action: () => navigate('/institution/courses') },
    { title: 'Applications', value: stats.totalApplications, color: '#4caf50', icon: <Assignment />, action: () => navigate('/institution/applications') },
    { title: 'Admitted Students', value: stats.admittedStudents, color: '#ff9800', icon: <CheckCircle />, action: () => navigate('/institution/admissions') },
    { title: 'Pending Review', value: stats.pendingApplications, color: '#9c27b0', icon: <Pending />, action: () => navigate('/institution/applications') }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Institution Dashboard - {user?.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your courses, applications, and admissions
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                bgcolor: stat.color, 
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
              onClick={stat.action}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="h6">{stat.title}</Typography>
                  </Box>
                  <Box sx={{ opacity: 0.9 }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Applications */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">Recent Applications</Typography>
                <Button variant="outlined" startIcon={<Assignment />}>
                  View All Applications
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                              {app.student.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            {app.student}
                          </Box>
                        </TableCell>
                        <TableCell>{app.course}</TableCell>
                        <TableCell>{app.date}</TableCell>
                        <TableCell>
                          <Chip 
                            label={app.status} 
                            color={
                              app.status === 'Admitted' ? 'success' : 
                              app.status === 'Under Review' ? 'warning' : 'default'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small">Review</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Notifications */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/institution/courses/new')}>
                  Add New Course
                </Button>
                <Button variant="outlined" startIcon={<Assignment />} onClick={() => navigate('/institution/applications')}>
                  Review Applications
                </Button>
                <Button variant="outlined" startIcon={<CheckCircle />} onClick={() => navigate('/institution/admissions')}>
                  Manage Admissions
                </Button>
                <Button variant="outlined" startIcon={<TrendingUp />} onClick={() => navigate('/institution/analytics')}>
                  View Analytics
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Notifications</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Notifications color="primary" />
                  <Box>
                    <Typography variant="body2" fontWeight="bold">New Applications</Typography>
                    <Typography variant="caption">5 new applications received today</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Notifications color="warning" />
                  <Box>
                    <Typography variant="body2" fontWeight="bold">Deadline Reminder</Typography>
                    <Typography variant="caption">Course application deadline approaching</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstitutionDashboard;