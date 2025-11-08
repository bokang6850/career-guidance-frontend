import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
  School
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Paper 
      component="footer" 
      elevation={0}
      sx={{ 
        bgcolor: 'grey.900', 
        color: 'white',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                CareerGuide
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.8, lineHeight: 1.6 }}>
              Empowering students and professionals in Lesotho through education and career development.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, index) => (
                <IconButton 
                  key={index}
                  sx={{ 
                    color: 'white', 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: 'primary.main' }
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              For Students
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Register', 'Login', 'Browse Courses', 'Find Jobs'].map((item) => (
                <Link key={item} href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              For Institutions & Companies
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Institution Registration', 'Company Registration', 'Post a Job', 'Manage Courses'].map((item) => (
                <Link key={item} href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Limkokwing University, Maseru, Lesotho
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +266 2231 0000 (ext. 117)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  contact@careerguide.ls
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Career Guidance and Employment Integration Platform. 
            Faculty of Information & Communication Technology • Limkokwing University
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;