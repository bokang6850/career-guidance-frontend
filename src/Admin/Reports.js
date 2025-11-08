import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
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
  LinearProgress
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  School,
  Business,
  Group,
  Book
} from '@mui/icons-material';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  // Sample data for charts
  const applicationData = [
    { name: 'Jan', applications: 400, admissions: 240 },
    { name: 'Feb', applications: 300, admissions: 139 },
    { name: 'Mar', applications: 200, admissions: 180 },
    { name: 'Apr', applications: 278, admissions: 190 },
    { name: 'May', applications: 189, admissions: 120 },
    { name: 'Jun', applications: 239, admissions: 150 },
  ];

  const institutionData = [
    { name: 'Limkokwing', students: 1200 },
    { name: 'NUL', students: 8000 },
    { name: 'Botho', students: 900 },
    { name: 'LUCT', students: 600 },
  ];

  const courseDistribution = [
    { name: 'IT', value: 35 },
    { name: 'Business', value: 25 },
    { name: 'Engineering', value: 20 },
    { name: 'Arts', value: 15 },
    { name: 'Science', value: 5 },
  ];

  const jobData = [
    { name: 'Jan', posted: 45, filled: 30 },
    { name: 'Feb', posted: 52, filled: 35 },
    { name: 'Mar', posted: 48, filled: 40 },
    { name: 'Apr', posted: 60, filled: 45 },
    { name: 'May', posted: 55, filled: 38 },
    { name: 'Jun', posted: 65, filled: 50 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const topCourses = [
    { name: 'BSc IT', applications: 156, institution: 'Limkokwing' },
    { name: 'Business Admin', applications: 143, institution: 'NUL' },
    { name: 'Computer Science', applications: 132, institution: 'Botho' },
    { name: 'Electrical Eng', applications: 98, institution: 'NUL' },
    { name: 'Software Dev', applications: 87, institution: 'Limkokwing' },
  ];

  const stats = [
    { 
      title: 'Total Applications', 
      value: '2,456', 
      change: '+12%', 
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #2196f3, #21cbf3)'
    },
    { 
      title: 'Active Institutions', 
      value: '15', 
      change: '+2', 
      icon: <School sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #4caf50, #8bc34a)'
    },
    { 
      title: 'Partner Companies', 
      value: '48', 
      change: '+5', 
      icon: <Business sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #ff9800, #ffb74d)'
    },
    { 
      title: 'Job Placements', 
      value: '324', 
      change: '+18%', 
      icon: <Group sx={{ fontSize: 40 }} />,
      color: 'linear-gradient(45deg, #9c27b0, #e91e63)'
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          System Reports & Analytics
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Period</InputLabel>
          <Select
            value={timeRange}
            label="Period"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ background: stat.color, color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                      {stat.change} from last period
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Applications & Admissions Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                <Bar dataKey="admissions" fill="#82ca9d" name="Admissions" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Course Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Job Market Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="posted" stroke="#8884d8" name="Jobs Posted" />
                <Line type="monotone" dataKey="filled" stroke="#82ca9d" name="Jobs Filled" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Student Distribution by Institution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={institutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#ffc658" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Top Courses Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Most Popular Courses
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Course Name</strong></TableCell>
                <TableCell><strong>Institution</strong></TableCell>
                <TableCell align="right"><strong>Applications</strong></TableCell>
                <TableCell align="right"><strong>Admission Rate</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topCourses.map((course, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Book sx={{ mr: 2, color: 'primary.main' }} />
                      {course.name}
                    </Box>
                  </TableCell>
                  <TableCell>{course.institution}</TableCell>
                  <TableCell align="right">{course.applications}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.min((course.applications / 200) * 100, 100)} 
                        sx={{ width: 60, mr: 1 }}
                      />
                      {Math.min(Math.round((course.applications / 200) * 100), 100)}%
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Reports;