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
  Alert,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  Search,
  CheckCircle,
  Cancel,
  Delete,
  Visibility,
  Business,
  Group,
  Email,
  Phone
} from '@mui/icons-material';

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCompanies([
        {
          id: 1,
          name: 'Econet Telecom Lesotho',
          email: 'hr@econet.co.ls',
          phone: '+266 2231 2231',
          status: 'approved',
          jobsPosted: 12,
          registrationDate: '2024-01-15',
          contactPerson: 'John Doe'
        },
        {
          id: 2,
          name: 'Standard Bank Lesotho',
          email: 'careers@standardbank.co.ls',
          phone: '+266 2232 2232',
          status: 'pending',
          jobsPosted: 0,
          registrationDate: '2024-02-01',
          contactPerson: 'Jane Smith'
        },
        {
          id: 3,
          name: 'Vodacom Lesotho',
          email: 'recruitment@vodacom.co.ls',
          phone: '+266 2233 2233',
          status: 'approved',
          jobsPosted: 8,
          registrationDate: '2024-01-20',
          contactPerson: 'Mike Johnson'
        },
        {
          id: 4,
          name: 'Lesotho Mounted Police',
          email: 'recruitment@police.gov.ls',
          phone: '+266 2234 2234',
          status: 'suspended',
          jobsPosted: 5,
          registrationDate: '2024-01-10',
          contactPerson: 'Sarah Wilson'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (companyId) => {
    setCompanies(companies.map(company =>
      company.id === companyId ? { ...company, status: 'approved' } : company
    ));
  };

  const handleSuspend = (companyId) => {
    setCompanies(companies.map(company =>
      company.id === companyId ? { ...company, status: 'suspended' } : company
    ));
  };

  const handleDelete = (companyId) => {
    setCompanies(companies.filter(company => company.id !== companyId));
  };

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setDialogOpen(true);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const stats = {
    total: companies.length,
    approved: companies.filter(c => c.status === 'approved').length,
    pending: companies.filter(c => c.status === 'pending').length,
    suspended: companies.filter(c => c.status === 'suspended').length
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
        Manage Companies
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196f3, #21cbf3)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Business sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.total}
                  </Typography>
                  <Typography variant="body2">Total Companies</Typography>
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
                    {stats.approved}
                  </Typography>
                  <Typography variant="body2">Approved</Typography>
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
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2">Pending</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #f44336, #ef5350)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Cancel sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.suspended}
                  </Typography>
                  <Typography variant="body2">Suspended</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
            }}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Paper>

      {/* Companies Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jobs Posted</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Registration Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id} hover>
                <TableCell>
                  <Typography fontWeight="bold">{company.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {company.contactPerson}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{company.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{company.phone}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={company.jobsPosted} 
                    color="primary" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    color={getStatusColor(company.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{company.registrationDate}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      color="info" 
                      onClick={() => handleViewDetails(company)}
                      size="small"
                    >
                      <Visibility />
                    </IconButton>
                    {company.status !== 'approved' && (
                      <IconButton 
                        color="success" 
                        onClick={() => handleApprove(company.id)}
                        size="small"
                      >
                        <CheckCircle />
                      </IconButton>
                    )}
                    {company.status !== 'suspended' && (
                      <IconButton 
                        color="warning" 
                        onClick={() => handleSuspend(company.id)}
                        size="small"
                      >
                        <Cancel />
                      </IconButton>
                    )}
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(company.id)}
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

      {/* Company Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Company Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedCompany && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Company Name</Typography>
                <Typography variant="body1" fontWeight="medium">{selectedCompany.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Contact Person</Typography>
                <Typography variant="body1" fontWeight="medium">{selectedCompany.contactPerson}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography variant="body1" fontWeight="medium">{selectedCompany.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                <Typography variant="body1" fontWeight="medium">{selectedCompany.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                <Chip
                  label={selectedCompany.status}
                  color={getStatusColor(selectedCompany.status)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">Jobs Posted</Typography>
                <Typography variant="body1" fontWeight="medium">{selectedCompany.jobsPosted}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCompanies;