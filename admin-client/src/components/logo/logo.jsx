import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import Logo_icon from 'src/assets/Icons/logo1.png'

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {


  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 50,
        height: 50,
        display: 'inline-flex',
        m: '0 0 20px 20px',
        ...sx,
      }}
      {...other}
    >

      <img src={Logo_icon} alt='logo'/>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <>
      {logo}    
    </>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
