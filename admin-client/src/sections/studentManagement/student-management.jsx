import axios from 'axios';
import { useState, useEffect } from 'react';

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
  const[clickedStudentDetails, setClickedStudentDetails]= useState({});
  const[snackData, setSnackData]= useState({text: "", variant: ""});
  const[studentList, setStudentList]= useState([]);

  useEffect(() => {
    fetchAllStudents();
  }, [])
  

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

    if(isValidationPass && editMode) {
      updateSelectedStudent()
    } else if (isValidationPass && !editMode) {
      createNewStudent()
    }else{
      setSnackData({
        text: "Please Fill All Required Fields !",
        variant: "error"
      })
    }
  }

  const createNewStudent =()=> {  
    const newStudentPayload = {
      name: formValues.name, 
      email: formValues.email, 
      password: formValues.password, 
    }
    axios.post(`${API_URL}/api/register`, newStudentPayload)
    .then(res => {
      if(res.data.error) {
        setSnackData({text: "Error on adding new user !", variant: "error"})
      } else if(res.data) {
          handleReset();
          setSnackData({text: "new user added sucessfully !", variant: "success"})
          fetchAllStudents();
        } else {
          setSnackData({ text: "Error on adding new user !",variant: "error"})
        }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const updateSelectedStudent =()=> { 
    const updateStudentPayload = {
      id: clickedStudentDetails._id,
      name: formValues.name, 
      email: formValues.email, 
      password: formValues.password, 
    }
    axios.put(`${API_URL}/api/user/update_student`, updateStudentPayload)
    .then(res => {
      if(res.data.error) {
        setSnackData({text: "Error on update student !", variant: "error"})
      } else if(res.data) {
          handleReset();
          setClickedStudentDetails({});
          fetchAllStudents();
          setIsFormView(false);
          setSnackData({text: "student updated Sucessfully !", variant: "success"})
        } else {
          setSnackData({ text: "Error on update student !",variant: "error"})
        }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const handleSnackReset = () => {
    setSnackData({text: "", variant: ""})
  }

  const handleDeleteClickedProduct = (student) => {
    const id = student._id;
    axios.delete(`${API_URL}/api/user/deleteStudent/${id}`)
    .then(res => {
      if(res.data.error) {
        setSnackData({text: "Error on Student Delete", variant: "error"});
      } else if(res.data) {
        setSnackData({text: "Student Deleted Successfully", variant: "success"});
        fetchAllStudents();
      } else {
        setSnackData({text: "Error on Student Delete", variant: "error"});
      }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const handleEditClickedProduct = (student) => {
    setEditMode(true);
    setClickedStudentDetails(student);
    setFormValues(
      {
        name: student.name,
        email: student.email,
        password: student.password,
      }
    )
    setIsFormView(true)
  }

  const fetchAllStudents = () => {
      axios.get(`${API_URL}/api/user/get_all_students`)
      .then(res => {
        if(res.data.error) {
          alert("Error on get All students")
        } else if(res.data) {
          setStudentList(res.data.result);
        } else {
          alert("Error on get All students")
        }
      })
      .catch(err => console.log(err));
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
      {
        !isFormView &&
        <Button 
          sx={{m:"2rem 1rem 0 0", minWidth: "10rem"}}
          variant="outlined"
          onClick={()=>{setIsFormView(true)}}
          className='add-student-btn'

        >
          Add Student
        </Button>
      }
      { 
        isFormView &&
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
                  onClick={()=>{handleReset(); setIsFormView(false); setEditMode(false)}}
                  className='cancel-btn'
                >
                  Cancel
                </Button>             
              </Grid>
            </Grid>
          
          </Grid>
        </form>
      }
      {
        studentList &&
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
      {
        studentList.map((student)=> <Grid container item xs={12} className='student-table'>
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