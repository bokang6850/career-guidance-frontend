export const companyDashboardStyles = {
  // Container Styles
  container: {
    py: 4
  },

  // Header Styles
  header: {
    mb: 4
  },
  title: {
    background: 'linear-gradient(45deg, #1976d2 30%, #00bcd4 90%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    opacity: 0.8
  },

  // Stats Grid
  statsGrid: {
    mb: 4
  },

  // Stat Card Styles
  statCard: (color) => ({
    background: getStatCardGradient(color),
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    transform: 'translateY(0)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: 2,
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
    }
  }),
  statCardContent: {
    p: 3,
    '&:last-child': {
      pb: 3
    }
  },
  statCardInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    lineHeight: 1.2
  },
  statTitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
    mt: 1
  },
  statIcon: {
    opacity: 0.8,
    fontSize: '3rem',
    '& .MuiSvgIcon-root': {
      fontSize: '2.5rem'
    }
  },

  // Main Card Styles
  mainCard: {
    mb: 3,
    borderRadius: 2,
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 12px 48px rgba(0,0,0,0.15)'
    }
  },

  // Card Header Styles
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3
  },
  cardTitle: {
    color: 'text.primary'
  },
  viewAllButton: {
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 'bold'
  },

  // Table Styles
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: 'background.default',
    fontSize: '0.875rem',
    py: 2
  },
  tableRow: {
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'action.hover'
    }
  },

  // Applicant Cell Styles
  applicantCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: 32,
    height: 32,
    mr: 2,
    backgroundColor: 'primary.main',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  },

  // Position Cell
  positionCell: {
    fontWeight: 'medium'
  },

  // Status Chip
  statusChip: {
    fontWeight: 'bold',
    minWidth: 100
  },

  // Match Cell Styles
  matchCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  progressBar: (match) => ({
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'grey.200',
    '& .MuiLinearProgress-bar': {
      backgroundColor: match >= 80 ? '#4caf50' : match >= 60 ? '#ff9800' : '#f44336',
      borderRadius: 3
    }
  }),
  matchText: {
    fontWeight: 'medium',
    minWidth: 35
  },

  // Date Cell
  dateCell: {
    color: 'text.secondary',
    fontSize: '0.875rem'
  },

  // View Button
  viewButton: {
    textTransform: 'none',
    fontWeight: 'bold',
    borderRadius: 1
  },

  // Side Cards
  sideCard: {
    mb: 3,
    borderRadius: 2,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      transform: 'translateY(-2px)'
    }
  },
  sideCardTitle: {
    fontWeight: 'bold',
    color: 'text.primary'
  },

  // Actions Container
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5
  },
  primaryAction: {
    justifyContent: 'flex-start',
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '0.875rem'
  },
  secondaryAction: {
    justifyContent: 'flex-start',
    py: 1.2,
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 'medium',
    fontSize: '0.875rem'
  },

  // Jobs Container
  jobsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5
  },
  jobItem: {
    padding: 2,
    backgroundColor: 'background.default',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'action.hover',
      borderColor: 'primary.light'
    }
  },
  jobTitle: {
    color: 'text.primary',
    mb: 0.5
  },
  jobDetails: {
    color: 'text.secondary',
    lineHeight: 1.4
  }
};

// Helper function for stat card gradients
const getStatCardGradient = (color) => {
  const gradients = {
    activeJobs: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    totalApplicants: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
    interviews: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    hired: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)'
  };
  return gradients[color] || gradients.activeJobs;
};