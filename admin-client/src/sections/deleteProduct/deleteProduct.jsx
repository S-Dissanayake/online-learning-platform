import axios from 'axios';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { ref , deleteObject } from 'firebase/storage';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { API_URL } from 'src/utils/API';

import "./deleteProduct.css";
import { storage } from '../../firebase';

const Transition = forwardRef((props, ref1) => <Slide direction="up" ref={ref1} {...props} />);

export default function DeleteProduct(props) {
  const  {
      isDeleteDialogOpen,
      setIsDeleteDialogOpen,
      courseDetailsForDelete,
      getAllCourses,
      setSnackData,
  }  = props;
  
  const handleClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleImageDelete = () => {
    const imageRef = ref(storage, courseDetailsForDelete.imageUrl)
    deleteObject(imageRef)
    .then(() => {
      console.log("image deleted");
    })
    .catch((error) => {
      console.error('Error deleting Image:', error);
    });
  }

  const handleDelete = () => {
    const name = courseDetailsForDelete?.name;
    const token = `Bearer ${sessionStorage.getItem('auth-token')}`;
    const config = { headers: { Authorization: token}}
    axios.delete(`${API_URL}/api/course/deleteCourse/${name}`,config)
    .then(res => {
      if(res.data.error) {
        setSnackData({text: "Error on Course Delete", variant: "error"});
      } else if(res.data) {
        handleImageDelete();
        setIsDeleteDialogOpen(false);
        setSnackData({text: "Course Deleted Successfully", variant: "success"});
        getAllCourses();
      } else {
        setSnackData({text: "Error on Course Delete", variant: "error"});
      }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const msg =(
    <Typography variant="subtitle1">
        Are you sure you want to delete 
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: '#212b36',
          fontWeight: 700,
          padding: ' 0 5px ' 
        }}
      >
         {courseDetailsForDelete.name}  
      </Typography>
      ?
    </Typography>
  )

  return (
      <Dialog
        open={isDeleteDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        className='dialog'
        onClose={()=>{handleClose()}}
        aria-describedby="alert-dialog-slide-description"
        maxWidth='md'        
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"> 
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={()=>{handleClose()}}
            className='dialog-action-no-btn'
          >
            No
          </Button>
          <Button 
            onClick={()=>{handleDelete()}}
            className='dialog-action-yes-btn'
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

DeleteProduct.propTypes = {
  isDeleteDialogOpen: PropTypes.bool,
  setIsDeleteDialogOpen: PropTypes.func,
  courseDetailsForDelete: PropTypes.object,
  getAllCourses: PropTypes.func,
  setSnackData: PropTypes.func
};