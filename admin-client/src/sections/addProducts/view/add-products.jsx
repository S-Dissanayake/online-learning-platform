import axios from 'axios';
import { useState } from 'react';
import { format } from 'date-fns';
import { ref, uploadBytes, getDownloadURL,  } from "firebase/storage";

import {Grid, Button, Container, TextField, Typography, FormControl, OutlinedInput,  InputAdornment} from '@mui/material';

import { API_URL } from 'src/utils/API';

import UploadArea from 'src/assets/Icons/upload_area.svg';
import UploadAreaRed from 'src/assets/Icons/upload_area_red.svg';

import "./add-products.css";
import { storage } from "../../../firebase";
import Snackbar from '../../../components/Snackbar/Snackbar';

export default function ProductsView() {
  const initialFormValues = {
    name:"",
    price: "",
    description:"",
  }

  const initialFormErrors = {
    name:false, 
    price: false,
  }

  const[image, setImage]= useState(false);
  const[courseImage, setCourseImage]= useState(null);
  const[formValues, setFormValues]= useState(initialFormValues);
  const[formErrors, setFormErrors]= useState(initialFormErrors);
  const[imageError, setImageError]= useState(false);
  const[snackData, setSnackData]= useState({text: "", variant: ""});

  // function for handle image upload
  const imageHandler = (e) => {
    setImage(true);
    setCourseImage(e.target.files[0]);
    setImageError(false);
  }

  const handleFormValues =(e)=> {
    setFormValues({...formValues, [e.target.name]: e.target.value});
    setFormErrors({...formErrors, [e.target.name]: false});
  }

  const handleReset=()=> {
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
    setImage(false);
    setCourseImage(null);
    setImageError(false);
  }

  const handleSubmit =()=> {
    let tempFormErrors = formErrors;
    let isValidationPass = true;
    if(!image) {
      isValidationPass = false;
      setImageError(true);
    };
    Object.keys(tempFormErrors).forEach((singleItem) => {
      if(!formValues[singleItem]){
        tempFormErrors = {...tempFormErrors, [singleItem]: true};
        isValidationPass= false;
      }
    })
    setFormErrors(tempFormErrors);
    if(isValidationPass) {
      submitCourseImage(courseImage);
    }else{
      setSnackData({
        text: "Please Fill All Required Fields !",
        variant: "error"
      })
    }
  }

  // Function to add product image into firebase
  const submitCourseImage =(courseImg)=> {
    if (courseImg == null) return;

    const myDate = new Date();
    const formattedDate = format(myDate, 'yyyy-MM-dd HH:mm:ss');

    const imageRef = ref(storage, `images/${formattedDate}${courseImg.name}`);

    uploadBytes(imageRef, courseImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        submitCourseData(url);
      });
    });  
  }  

  const submitCourseData =(imgUrl)=> {   
    const myDate = new Date();
    const payload = {
      name: formValues.name, 
      price: parseFloat(formValues.price), 
      description: formValues.description, 
      imageUrl: imgUrl, 
      createdDate: format(myDate, 'yyyy-MM-dd HH:mm:ss'), 
      latestUpdatedDate: format(myDate, 'yyyy-MM-dd HH:mm:ss'), 
    }
    const token = `Bearer ${sessionStorage.getItem('auth-token')}`;
    const config = { headers: { Authorization: token}}
    axios.post(`${API_URL}/api/course/addCourse`, payload, config)
    .then(res => {
      if(res.data.error) {
        setSnackData({text: "Error on adding course !", variant: "error"})
      } else if(res.data) {
          handleReset();
          setSnackData({text: "Course Added Sucessfully !", variant: "success"})
        } else {
          setSnackData({ text: "Error on adding course !",variant: "error"})
        }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const handleSnackReset = () => {
    setSnackData({text: "", variant: ""})
  }

  return (
    <Container >
      <Snackbar 
        snackText={snackData.text} 
        snackVariant={snackData.variant} 
        handleReset={()=>handleSnackReset()} 
      />
      <Typography variant="h4" className='titile-typo'>
        Add Course
      </Typography>

      <form>
        <Grid container item direction='row'>
          <Grid container item  xs={12} md={6} direction='row' spacing={2} className='form-left-container'>
            <Grid item container xs={12}>
              <FormControl sx={{ mr: 1 }} fullWidth>
                <p className='form-label'> 
                  Course Name 
                  <Typography className='required-red-star'>*</Typography>
                </p> 
                <TextField 
                  name='name'
                  className='form-text-field' 
                  fullWidth id="outlined-basic" 
                  placeholder="Name" variant="outlined" 
                  value={formValues?.name}
                  onChange={(e)=> {handleFormValues(e)}}
                  error={formErrors.name}
                />       
              </FormControl>
            </Grid>

            {/* Price */}
            <Grid item container>
              <Grid container item  xs={12} md={6} direction='column'>
              <FormControl sx={{ mr: 1 }}>
                <p className='form-label'> 
                  Price 
                  <Typography className='required-red-star'>*</Typography>
                </p>
                <OutlinedInput
                  name='price'
                  className='form-text-field'
                  id="outlined-adornment-price"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  value={formValues?.price}
                  type='number'
                  onChange={(e)=> {handleFormValues(e)}}
                  error={formErrors.price}
                />
              </FormControl>
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <FormControl sx={{ mr: 1 }} fullWidth>
                <p className='form-label'> Course Description </p>
                <TextField
                  name='description'
                  id="outlined-multiline-static"
                  className='form-text-field'
                  multiline
                  rows={4}
                  defaultValue=""
                  placeholder='Description'
                  value={formValues?.description}
                  onChange={(e)=> {handleFormValues(e)}}
                />
              </FormControl>
            </Grid>          
          </Grid>

          <Grid container item  xs={12} md={6} direction='column' spacing={2} justifyContent='center' alignContent='center'>
            <Grid item>
              <p className='form-label'>
                  Image Upload
                  <Typography className='required-red-star'>*</Typography>
              </p>
              <div>
              <FormControl>
                <label htmlFor="fileInput">
                  { image ?
                    <img className="addproduct-thumbnail-img" src={URL.createObjectURL(courseImage)} alt="" height="350px"/>
                    :
                    <img className="addproduct-thumbnail-img" src={imageError ? UploadAreaRed : UploadArea} alt="" height="150px"/>
                  }                      
                  <input id="fileInput" onChange={(e)=>{imageHandler(e)}} type="file" name="image"  hidden />   
                </label>       
              </FormControl>
              </div>          
            </Grid>
          </Grid>          

          <Grid item>
            <Button 
              sx={{m:"2rem 1rem 0 0", minWidth: "10rem"}}
              variant="contained"
              onClick={()=>{handleSubmit()}}
              className='add-product-btn'
              >
                Add Course
            </Button>
            <Button 
              sx={{m:"2rem 1rem 0 0", minWidth: "10rem"}}
              variant="outlined"
              onClick={()=>{handleReset()}}
              className='cancel-btn'

            >
              Cancel
            </Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
}
