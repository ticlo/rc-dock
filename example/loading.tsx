import React from 'react';
import {CircularProgress, Box} from '@mui/material';

const LoadingComponent = () => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
