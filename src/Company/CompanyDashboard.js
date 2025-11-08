import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
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
  LinearProgress
} from '@mui/material';
import {
  BusinessCenter,
  People,
  Work,
  DateRange,
  CheckCircle,
  Add,
  TrendingUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { companyDashboardStyles } from './CompanyDashboard.styles';

const CompanyDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    interviews: 0,
    hired: 0
  });
  const navigate = useNavigate();
  const styles = companyDashboardStyles;

  useEffect(() => {
    // Simulate loading company data
    setTimeout(() => {
      setStats({
        activeJobs: 8,
        totalApplicants: 45,
        interviews: 12,
        hired: 3
      });
    }, 1000);
  }, []);

  const recentApplicants = [
    { 
      id: 1, 
      name: 'John Doe', 
      position: 'Software Developer', 
      status: 'Interview', 
      date: '2024-01-15', 
      match: 92 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      position: 'Data Analyst', 
      status: 'Under Review', 
      date: '2024-01-14', 
      match: 85 
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      position: 'IT Support', 
      status: 'Rejected', 
      date: '2024-01-13', 
      match: 65 
    }
  ];

  const activeJobs = [
    {
      title: 'Junior Software Developer',
      applicants: 12,
      closingDate: 'Feb 15'
    },
    {
      title: 'Data Analyst Intern',
      applicants: 8,
      closingDate: 'Feb 20'
    }
  ];

  const statsCards = [
    { 
      title: 'Active Jobs', 
      value: stats.activeJobs, 
      color: 'activeJobs', 
      icon: <Work />, 
      action: () => navigate('/company/jobs') 
    },
    { 
      title: 'Total Applicants', 
      value: stats.totalApplicants, 
      color: 'totalApplicants', 
      icon: <People />, 
      action: () => navigate('/company/applicants') 
    },
    { 
      title: 'Interviews', 
      value: stats.interviews, 
      color: 'interviews', 
      icon: <DateRange />, 
      action: () => navigate('/company/interviews') 
    },
    { 
      title: 'Hired', 
      value: stats.hired, 
      color: 'hired', 
      icon: <CheckCircle />, 
      action: () => navigate('/company/hired') 
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview': return 'warning';
      case 'Rejected': return 'error';
      case 'Under Review': return 'primary';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={styles.container}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={styles.title}>
          Company Dashboard - {user?.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={styles.subtitle}>
          Manage job postings, applicants, and hiring process
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={styles.statsGrid}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={styles.statCard(stat.color)}
              onClick={stat.action}
            >
              <CardContent sx={styles.statCardContent}>
                <Box sx={styles.statCardInner}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" sx={styles.statValue}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={styles.statTitle}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={styles.statIcon}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Applicants */}
        <Grid item xs={12} md={8}>
          <Card sx={styles.mainCard}>
            <CardContent>
              <Box sx={styles.cardHeader}>
                <Typography variant="h5" fontWeight="bold" sx={styles.cardTitle}>
                  Recent Applicants
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<People />}
                  sx={styles.viewAllButton}
                >
                  View All Applicants
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={styles.tableHeader}>Applicant</TableCell>
                      <TableCell sx={styles.tableHeader}>Position</TableCell>
                      <TableCell sx={styles.tableHeader}>Status</TableCell>
                      <TableCell sx={styles.tableHeader}>Match</TableCell>
                      <TableCell sx={styles.tableHeader}>Date</TableCell>
                      <TableCell sx={styles.tableHeader}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentApplicants.map((applicant) => (
                      <TableRow key={applicant.id} hover sx={styles.tableRow}>
                        <TableCell>
                          <Box sx={styles.applicantCell}>
                            <Avatar sx={styles.avatar}>
                              {applicant.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            {applicant.name}
                          </Box>
                        </TableCell>
                        <TableCell sx={styles.positionCell}>
                          {applicant.position}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={applicant.status} 
                            color={getStatusColor(applicant.status)}
                            size="small"
                            sx={styles.statusChip}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={styles.matchCell}>
                            <LinearProgress 
                              variant="determinate" 
                              value={applicant.match} 
                              sx={styles.progressBar(applicant.match)}
                            />
                            <Typography variant="body2" sx={styles.matchText}>
                              {applicant.match}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={styles.dateCell}>
                          {applicant.date}
                        </TableCell>
                        <TableCell>
                          <Button size="small" sx={styles.viewButton}>
                            View
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

        {/* Quick Actions & Active Jobs */}
        <Grid item xs={12} md={4}>
          {/* Quick Actions Card */}
          <Card sx={styles.sideCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={styles.sideCardTitle}>
                Quick Actions
              </Typography>
              <Box sx={styles.actionsContainer}>
                <Button 
                  variant="contained" 
                  startIcon={<Add />} 
                  onClick={() => navigate('/company/post-job')}
                  sx={styles.primaryAction}
                >
                  Post New Job
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<People />} 
                  onClick={() => navigate('/company/applicants')}
                  sx={styles.secondaryAction}
                >
                  View Applicants
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Work />} 
                  onClick={() => navigate('/company/jobs')}
                  sx={styles.secondaryAction}
                >
                  Manage Jobs
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<TrendingUp />} 
                  onClick={() => navigate('/company/analytics')}
                  sx={styles.secondaryAction}
                >
                  Hiring Analytics
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Active Jobs Card */}
          <Card sx={styles.sideCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={styles.sideCardTitle}>
                Active Jobs
              </Typography>
              <Box sx={styles.jobsContainer}>
                {activeJobs.map((job, index) => (
                  <Box key={index} sx={styles.jobItem}>
                    <Typography variant="body2" fontWeight="bold" sx={styles.jobTitle}>
                      {job.title}
                    </Typography>
                    <Typography variant="caption" sx={styles.jobDetails}>
                      {job.applicants} applicants • Closes {job.closingDate}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyDashboard;