import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = forwardRef((props, ref)=> <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function CustomizedSnackbars(props) {

  const {
    snackText,
    snackVariant,  // error, warning, info, success
    handleReset,
  } = props;

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [variant, setVariant] = useState("info");

  useEffect(() => {
    if(snackText){
      setVariant(snackVariant);
      setText(snackText);
      setOpen(true);
    }
  }, [snackText,snackVariant, props])  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    handleReset();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={()=>handleClose()}>
        <Alert onClose={()=>handleClose()} severity={variant} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

CustomizedSnackbars.propTypes = {
  snackText: PropTypes.string,
  snackVariant: PropTypes.string,
  handleReset: PropTypes.func
};