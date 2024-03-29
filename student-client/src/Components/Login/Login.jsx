
import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../routes/hooks/use-router';
import { API_URL } from '../../utils/API';
import Iconify from '../../Components/iconify';

import './Login.css'


// ----------------------------------------------------------------------

export default function LoginView() {

  const router = useRouter();
  const storedtoken = sessionStorage.getItem('auth-token');
 
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData,setFormData] = useState({name:"", email:"", password:"", userType: "STUDENT"});
  const [formErrors,setFormErrors] = useState({name:false, email:false, password:false});

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    setFormErrors({...formErrors, [e.target.name]:false});
  }

  const handleBtnClick = () => {
    const tempFormData = formData;
    let tempFormErrors = {name:false, email:false, password:false};

    Object.keys(tempFormData).forEach((item)=> {
      if(tempFormData[item] === ""){
        tempFormErrors = {...tempFormErrors, [item]: true}
      }else{
        tempFormErrors = {...tempFormErrors, [item]: false}
      }
    })
    setFormErrors(tempFormErrors);  

    if(!tempFormErrors?.email && !tempFormErrors?.password && isLogin){
      login()
    }else if(!tempFormErrors?.email && !tempFormErrors?.password && !tempFormErrors?.name && !isLogin){
      signup()
    }
  }

  const signup = () => {
    axios.post(`${API_URL}/api/register`, formData)
    .then(res => {      
      if(res.data.error) {
        alert("Please check your Email and Password")
      }else if(res.data.signup) {
          sessionStorage.setItem('auth-token',res.data.token);
          sessionStorage.setItem('userName',res.data.user.name);
          createCourseListforStudent(res.data.user.name);
          router.push('/');
        } else {
          alert("Error on signup")
      }
    })
    .catch(err => console.log(err));
  }

  const login = () => {
    axios.post(`${API_URL}/api/login`, formData)
    .then(res => {
      if(res.data.error) {
        alert("Please check Email and Password")
      } else if(res.data.login) {
        sessionStorage.setItem('auth-token',res.data.token);
        sessionStorage.setItem('userName',res.data.user.name);
        router.push('/');
      } else {
        alert("Please check Email and Password")
      }
    })
    .catch(err => console.log(err));
  }

  const createCourseListforStudent = (userName)=> {
    axios.post(`${API_URL}/api/coursesByStudent/createCourseList/`, {"userName": userName})
    .then(res => {
      if(res.data.error) {
        alert("Error on creating Course List")
      } else if(res.data) {

      } else {
        alert("Error on creating Course List")
      }
    })
    .catch(err => console.log(err));
  }

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');    
    sessionStorage.removeItem('userName');
    router.push('/');
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ mb: '10px', textAlign: 'center', color: '#0C44AE'}}>Online Learning Platform</Typography>
        <Typography variant="h6" sx={{ mb: '50px', textAlign: 'center'}}>{isLogin ? 'Login': 'Sign Up'} as Student</Typography>
        {!isLogin?
          <TextField 
            name="name" 
            label="User Name" 
            value={formData.name} 
            onChange={changeHandler}
            error={formErrors.name}
          />
          : 
          <> </>
        }
        <TextField 
          name="email" 
          label="Email address" 
          value={formData.email} 
          onChange={changeHandler}
          error={formErrors.email}
        />

        <TextField
          name="password"
          label="Password"
          value={formData.password}
          type={showPassword ? 'text' : 'password'}
          onChange={changeHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={formErrors.password}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <p> {isLogin ? 'Don’t have an account?' : 'Already have an account?' }</p>
          <Button 
            className='account-check-btn'
            onClick={()=> {setIsLogin(!isLogin)}}
          >
            {isLogin ? 'Sign in' : 'Log in' }
          </Button>
        </Stack>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={()=> {handleBtnClick()}}
        sx={{mt:"2rem", color: '#ffffff'}}
      >
        {isLogin ? <Typography> Login</Typography>: <Typography>Sign Up</Typography>}
      </LoadingButton>
    </>
  );

  const logoutConfirmation = (
    <>
      <Stack spacing={3} sx={{m: '40px 0'}}>        
        <Typography variant="h4" sx={{ mb: '10px', textAlign: 'center', color: '#0C44AE'}}>Online Learning Platform</Typography>
        <Typography variant="h5" sx={{ mb: '10px', textAlign: 'center'}}> Do you want logout ?</Typography>
        <Stack spacing={3} direction='row' justifyContent='center'>
          <Button className='logout-yes-btn' onClick={()=> {handleLogout()}}> Yes </Button>
          <Button className='logout-no-btn' onClick={()=> {router.push('/');}}> No </Button>
        </Stack>        
      </Stack>
    </>
    
  )

  return (
    <Box className="login-container">
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {storedtoken? 
              logoutConfirmation
            : 
            <>
              {renderForm}
            </>          
          }
        </Card>
      </Stack>
    </Box>
  );
}
