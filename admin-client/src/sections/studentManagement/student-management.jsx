import axios from 'axios';
import { useState } from 'react';
import { format } from 'date-fns';

import { Box, Grid, Button, Container,  TextField, Typography, FormControl, OutlinedInput, } from '@mui/material';

import { API_URL } from 'src/utils/API';

import editIcon from 'src/assets/Icons/edit.svg';
import deleteIcon from 'src/assets/Icons/delete.svg';

import "./student-management.css";
import Snackbar from '../../components/Snackbar/Snackbar';


export default function StudentManagement() {

  const initialFormValues = {
    name:"",
    email: "",
    password:"",
  }

  const initialFormErrors = {
    name:false, 
    email: false,
    password: false,
  }

  const[formValues, setFormValues]= useState(initialFormValues);
  const[isFormView, setIsFormView]= useState(false);
  const[formErrors, setFormErrors]= useState(initialFormErrors);
  const[editMode, setEditMode]= useState(false);
  const[snackData, setSnackData]= useState({text: "", variant: ""});

  const handleFormValues =(e)=> {
    setFormValues({...formValues, [e.target.name]: e.target.value});
    setFormErrors({...formErrors, [e.target.name]: false});
  }

  const handleReset=()=> {
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
  }

  const handleSubmit =()=> {
    let tempFormErrors = formErrors;
    let isValidationPass = true;

    Object.keys(tempFormErrors).forEach((singleItem) => {
      if(!formValues[singleItem]){
        tempFormErrors = {...tempFormErrors, [singleItem]: true};
        isValidationPass= false;
      }
    })
    setFormErrors(tempFormErrors);

    if(isValidationPass) {
      submitProductData()
    }else{
      setSnackData({
        text: "Please Fill All Required Fields !",
        variant: "error"
      })
    }
  }

  const submitProductData =()=> {   
    const myDate = new Date();
    const payload = {
      name: formValues.name, 
      email: parseFloat(formValues.email), 
      description: formValues.description, 
      createdDate: format(myDate, 'yyyy-MM-dd HH:mm:ss'), 
      latestUpdatedDate: format(myDate, 'yyyy-MM-dd HH:mm:ss'), 
    }
    const token = `Bearer ${sessionStorage.getItem('auth-token')}`;
    const config = { headers: { Authorization: token}}
    axios.post(`${API_URL}/addProduct`, payload,config)
    .then(res => {
      if(res.data.error) {
        setSnackData({text: "Error on adding product !", variant: "error"})
      } else if(res.data) {
          handleReset();
          setSnackData({text: "Product Added Sucessfully !", variant: "success"})
        } else {
          setSnackData({ text: "Error on adding product !",variant: "error"})
        }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const handleSnackReset = () => {
    setSnackData({text: "", variant: ""})
  }

  const handleDeleteClickedProduct = () => {

  }

  const handleEditClickedProduct = (student) => {
    setEditMode(true);
    setFormValues(
      {
        name: student.name,
        email: student.email,
        password: student.password,
      }
    )
    setIsFormView(true)
  }

  return (
    <Container >
      <Snackbar 
        snackText={snackData.text} 
        snackVariant={snackData.variant} 
        handleReset={()=>handleSnackReset()} 
      />
      <Typography variant="h4" className='titile-typo'>
        Student Management
      </Typography>
      {!isFormView &&
        <Button 
          sx={{m:"2rem 1rem 0 0", minWidth: "10rem"}}
          variant="outlined"
          onClick={()=>{setIsFormView(true)}}
          className='add-student-btn'

        >
          Add Student
        </Button>
      } 

      {isFormView &&
        <form>
        <Grid container item direction='row'>
          <Grid container item  xs={12} direction='row' spacing={2} className='form-left-container'>
            <Grid item container xs={12} md={4}>
              <FormControl sx={{ mr: 1 }} fullWidth>
                <p className='form-label'> 
                  Student Name 
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

            {/* email */}
              <Grid container item  xs={12} md={4} direction='column'>
              <FormControl sx={{ mr: 1 }}>
                <p className='form-label'> 
                  E-mail 
                  <Typography className='required-red-star'>*</Typography>
                </p>
                <OutlinedInput
                  name='email'
                  className='form-text-field'
                  id="outlined-adornment-email"
                  value={formValues?.email}
                  type='text'
                  onChange={(e)=> {handleFormValues(e)}}
                  error={formErrors.email}
                />
              </FormControl>
            </Grid>

            {/* Password */}
              <Grid container item  xs={12} md={4} direction='column'>
              <FormControl sx={{ mr: 1 }}>
                <p className='form-label'> 
                  Password 
                  <Typography className='required-red-star'>*</Typography>
                </p>
                <OutlinedInput
                  name='password'
                  className='form-text-field'
                  id="outlined-adornment-password"
                  value={formValues?.password}
                  type='text'
                  onChange={(e)=> {handleFormValues(e)}}
                  error={formErrors.password}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button 
                sx={{m:"1rem 1rem 0 0", minWidth: "10rem"}}
                variant="contained"
                onClick={()=>{handleSubmit()}}
                className='add-submit-student-btn'
                >
                  {editMode ? 'Update' : 'Add' } 
              </Button>
              <Button 
                variant="outlined"
                onClick={()=>{handleReset(); setIsFormView(false)}}
                className='cancel-btn'
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        
        </Grid>
      </form>
      }
      {student_list &&
        <Grid container item xs={12} className='student-table-titile'>
        <Grid container item xs={12} md={3} >
          Name
        </Grid>
        <Grid container item xs={12} md={3}>
          Email
        </Grid>
        <Grid container item xs={12} md={3}>
          Password
        </Grid>
        <Grid container item xs={12} md={3}> Actions</Grid> 
        </Grid>
      }
      {student_list.map((student)=> <Grid container item xs={12} className='student-table'>
        <Grid container item xs={12} md={3} >
          {student.name}
        </Grid>
        <Grid container item xs={12} md={3}>
          {student.email}
        </Grid>
        <Grid container item xs={12} md={3}>
          {student.password}
        </Grid>
        <Grid container item xs={12} md={3}>
              <Box
            className='edit-icon'
            onClick={()=> {handleEditClickedProduct(student)}}
          >
            <img
            id= {`${student.id} + _edit_icon`}
            src={editIcon}
            alt='edit_icon'
            height='30px'
          />
          </Box>
          <Box
            className='delete-icon'
            onClick={()=> {handleDeleteClickedProduct(student)}}
          >
            <img
              id= {`${student.id} + _delete_icon`}
              src={deleteIcon}
              alt='delete_icon'
              height='30px'
            />
          </Box>      
        </Grid>           
      </Grid>
        
      )
      }

    </Container>
  );
}


const student_list = [
  {
    id: 1,
    name: "saman",
    email: "saman@gmail.com",
    password: "saman123"
  },
  {
    id: 2,
    name: "kasun",
    email: "kasun@gmail.com",
    password: "kasun123"
  },
  {
    id: 3,
    name: "nirmal",
    email: "nirmal@gmail.com",
    password: "nirmal123"
  },
  {
    id: 4,
    name: "banuka",
    email: "banuka@gmail.com",
    password: "banuka123"
  },
]
