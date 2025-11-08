import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Paper,
  alpha,
  useTheme,
  Fade,
  Slide,
  Zoom,
  Fab
} from '@mui/material';
import {
  School,
  BusinessCenter,
  TrendingUp,
  Groups,
  Search,
  ArrowForward,
  PlayArrow,
  Star,
  LocationOn,
  CheckCircle,
  EmojiEvents,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    students: 0,
    institutions: 0,
    companies: 0,
    jobs: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targetStats = {
      students: 12500,
      institutions: 25,
      companies: 150,
      jobs: 850
    };

    const duration = 3000;
    const steps = 60;
    const stepDuration = duration / steps;

    const counters = {};
    Object.keys(targetStats).forEach(key => {
      counters[key] = setInterval(() => {
        setStats(prev => ({
          ...prev,
          [key]: Math.min(prev[key] + Math.ceil(targetStats[key] / steps), targetStats[key])
        }));
      }, stepDuration);
    });

    return () => Object.values(counters).forEach(clearInterval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'Find Your Perfect Course',
      description: 'Discover courses from top institutions in Lesotho that match your interests and career goals.',
      color: theme.palette.primary.main
    },
    {
      icon: <BusinessCenter sx={{ fontSize: 40 }} />,
      title: 'Career Opportunities',
      description: 'Connect with leading companies and find job opportunities that align with your qualifications.',
      color: theme.palette.secondary.main
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Growth Tracking',
      description: 'Monitor your academic progress and career development with our comprehensive tracking system.',
      color: theme.palette.success.main
    },
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      title: 'Community Support',
      description: 'Join a vibrant community of students, graduates, and industry professionals.',
      color: theme.palette.info.main
    }
  ];

  const institutions = [
    { name: 'Limkokwing University', logo: '🏫', students: '1,200+' },
    { name: 'National University of Lesotho', logo: '🎓', students: '8,000+' },
    { name: 'Botho University', logo: '💼', students: '900+' },
    { name: 'Lesotho College of Education', logo: '📚', students: '1,500+' }
  ];

  const testimonials = [
    {
      name: 'Thabo Mokoena',
      role: 'Software Engineer at Econet',
      content: 'This platform helped me find the perfect IT program and later connected me with my dream job!',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Matseliso Phiri',
      role: 'Business Graduate',
      content: 'The career guidance and job matching features are incredible. I got multiple job offers within weeks!',
      avatar: '👩‍🎓',
      rating: 5
    },
    {
      name: 'John Mohapi',
      role: 'HR Manager, Standard Bank',
      content: 'We found highly qualified candidates through this platform. The matching algorithm is spot on!',
      avatar: '👨‍💼',
      rating: 4
    }
  ];

  const statsData = [
    { icon: <Groups />, label: 'Students Helped', value: stats.students },
    { icon: <School />, label: 'Partner Institutions', value: stats.institutions },
    { icon: <BusinessCenter />, label: 'Companies', value: stats.companies },
    { icon: <TrendingUp />, label: 'Jobs Posted', value: stats.jobs }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Chip 
                    label="Transforming Education & Employment" 
                    sx={{ 
                      bgcolor: 'white', 
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      mb: 2
                    }} 
                  />
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.2
                    }}
                  >
                    Your Career Journey Starts 
                    <Box component="span" sx={{ color: theme.palette.warning.main }}>
                      {' Here'}
                    </Box>
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9,
                      fontSize: { xs: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    Connect with top institutions in Lesotho, discover your ideal career path, 
                    and launch your professional journey with confidence.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      endIcon={<ArrowForward />}
                      sx={{
                        bgcolor: 'white',
                        color: theme.palette.primary.main,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.common.white, 0.9)
                        }
                      }}
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large"
                      startIcon={<PlayArrow />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: alpha(theme.palette.common.white, 0.1)
                        }
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={true} timeout={1500}>
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    p: 4,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    Find Your Path
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<School />}
                      sx={{
                        bgcolor: 'white',
                        color: theme.palette.primary.main,
                        py: 2,
                        fontSize: '1.1rem',
                        justifyContent: 'flex-start'
                      }}
                    >
                      Explore Courses & Institutions
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<BusinessCenter />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        py: 2,
                        fontSize: '1.1rem',
                        justifyContent: 'flex-start'
                      }}
                    >
                      Browse Job Opportunities
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Search />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        py: 2,
                        fontSize: '1.1rem',
                        justifyContent: 'flex-start'
                      }}
                    >
                      Career Guidance Test
                    </Button>
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: theme.palette.grey[50] }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {statsData.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Slide in={true} timeout={800} direction="up" style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card 
                    sx={{ 
                      textAlign: 'center', 
                      p: 3,
                      bgcolor: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      border: '1px solid',
                      borderColor: theme.palette.grey[200]
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                      {stat.value.toLocaleString()}+
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              How We Help You Succeed
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              From student to professional - we guide you through every step of your career journey
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card 
                    sx={{ 
                      p: 4, 
                      height: '100%',
                      border: '1px solid',
                      borderColor: theme.palette.grey[200],
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        color: feature.color,
                        mb: 3
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Partner Institutions */}
      <Box sx={{ py: 12, bgcolor: theme.palette.grey[50] }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Partner Institutions
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Leading educational institutions in Lesotho
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {institutions.map((institution, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {institution.logo}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {institution.name}
                  </Typography>
                  <Chip 
                    icon={<Groups sx={{ fontSize: 16 }} />} 
                    label={institution.students} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Success Stories
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Hear from students and professionals who transformed their careers
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', minHeight: 200 }}>
            {testimonials.map((testimonial, index) => (
              <Fade 
                key={index} 
                in={index === currentTestimonial} 
                timeout={500}
              >
                <Box
                  sx={{
                    display: index === currentTestimonial ? 'block' : 'none',
                    textAlign: 'center',
                    maxWidth: 800,
                    mx: 'auto'
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {testimonial.avatar}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 3, fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: theme.palette.warning.main, fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Box>
              </Fade>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: index === currentTestimonial ? theme.palette.primary.main : theme.palette.grey[300],
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          py: 12,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students and professionals who have found their path to success
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: alpha(theme.palette.common.white, 0.9)
                }
              }}
            >
              Create Account
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: alpha(theme.palette.common.white, 0.1)
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: theme.palette.grey[900], color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Career Guidance Platform
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
                Empowering students and professionals in Lesotho through education and career development.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Facebook sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }} />
                <Twitter sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }} />
                <LinkedIn sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }} />
                <Instagram sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                Limkokwing University, Maseru, Lesotho
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                📧 liteboho.molaoa@limkokwing.ac.ls
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                📧 tsekiso.thokoana@limkokwing.ac.ls
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3 }}>
            <Typography variant="body2" textAlign="center" sx={{ opacity: 0.6 }}>
              © 2024 Career Guidance and Employment Integration Platform. 
              BSc. in Information Technology - Faculty of ICT
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="get started"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: theme.palette.primary.main,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
        }}
      >
        <ArrowForward />
      </Fab>
    </Box>
  );
};

export default Home;