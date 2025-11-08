import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Fab
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Add,
  School,
  Group,
  Book,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

const ManageInstitution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInstitutions([
        {
          id: 1,
          name: 'Limkokwing University',
          location: 'Maseru',
          email: 'info@limkokwing.ac.ls',
          phone: '+266 2231 0000',
          faculties: 5,
          courses: 45,
          students: 1200,
          status: 'active',
          established: '2008'
        },
        {
          id: 2,
          name: 'National University of Lesotho',
          location: 'Roma',
          email: 'admissions@nul.ls',
          phone: '+266 2234 0000',
          faculties: 7,
          courses: 60,
          students: 8000,
          status: 'active',
          established: '1945'
        },
        {
          id: 3,
          name: 'Botho University',
          location: 'Maseru',
          email: 'lesotho@bothouniversity.com',
          phone: '+266 2231 1111',
          faculties: 4,
          courses: 35,
          students: 900,
          status: 'pending',
          established: '2013'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddInstitution = () => {
    setSelectedInstitution(null);
    setDialogOpen(true);
  };

  const handleEdit = (institution) => {
    setSelectedInstitution(institution);
    setDialogOpen(true);
  };

  const handleDelete = (institutionId) => {
    setInstitutions(institutions.filter(inst => inst.id !== institutionId));
  };

  const handleStatusToggle = (institutionId) => {
    setInstitutions(institutions.map(inst =>
      inst.id === institutionId 
        ? { ...inst, status: inst.status === 'active' ? 'inactive' : 'active' }
        : inst
    ));
  };

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'error';
  };

  const stats = {
    total: institutions.length,
    active: institutions.filter(inst => inst.status === 'active').length,
    pending: institutions.filter(inst => inst.status === 'pending').length,
    totalStudents: institutions.reduce((sum, inst) => sum + inst.students, 0),
    totalCourses: institutions.reduce((sum, inst) => sum + inst.courses, 0)
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Manage Institutions
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196f3, #21cbf3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <School sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.total}
                  </Typography>
                  <Typography variant="body2">Total Institutions</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4caf50, #8bc34a)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <CheckCircle sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.active}
                  </Typography>
                  <Typography variant="body2">Active</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #ff9800, #ffb74d)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Group sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalStudents}
                  </Typography>
                  <Typography variant="body2">Total Students</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #9c27b0, #e91e63)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Book sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalCourses}
                  </Typography>
                  <Typography variant="body2">Total Courses</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Add Button */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddInstitution}
            sx={{
              background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
              borderRadius: 2
            }}
          >
            Add Institution
          </Button>
        </Box>
      </Paper>

      {/* Institutions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Institution</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Faculties</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Courses</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Students</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstitutions.map((institution) => (
              <TableRow key={institution.id} hover>
                <TableCell>
                  <Typography fontWeight="bold">{institution.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Est. {institution.established}
                  </Typography>
                </TableCell>
                <TableCell>{institution.location}</TableCell>
                <TableCell>
                  <Typography variant="body2">{institution.email}</Typography>
                  <Typography variant="body2">{institution.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={institution.faculties} color="primary" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip label={institution.courses} color="secondary" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip label={institution.students} color="success" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={institution.status.charAt(0).toUpperCase() + institution.status.slice(1)}
                    color={getStatusColor(institution.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(institution)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color={institution.status === 'active' ? 'warning' : 'success'}
                      onClick={() => handleStatusToggle(institution.id)}
                      size="small"
                    >
                      {institution.status === 'active' ? <Cancel /> : <CheckCircle />}
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(institution.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Institution Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            {selectedInstitution ? 'Edit Institution' : 'Add New Institution'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Institution Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Location" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Established Year" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Website" variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            {selectedInstitution ? 'Update' : 'Add'} Institution
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddInstitution}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(45deg, #2196f3, #21cbf3)'
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default ManageInstitution;