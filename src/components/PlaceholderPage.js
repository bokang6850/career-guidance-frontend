import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const PlaceholderPage = ({ title, description, showHomeButton }) => {
  return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      {showHomeButton && (
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" component={Link} to="/">
            Go Back Home
          </Button>
        </Box>
      )}
    </Container>
  );
};

PlaceholderPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  showHomeButton: PropTypes.bool,
};

PlaceholderPage.defaultProps = {
  description: "This page is coming soon...",
  showHomeButton: true,
};

export default PlaceholderPage;
