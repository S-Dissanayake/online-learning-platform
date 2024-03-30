import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography,  } from '@mui/material'
import ProductCard from '../Components/ProductCard/product-card';
import "./CSS/Courses.css"

const Courses = () => {
  const userName = sessionStorage.getItem('userName');
  const [courseList, setCoursetList] = useState([]);

  useEffect(() => {
    userName && fetchInfo();
  }, [])
  
  const fetchInfo = () => { 
    axios.post('http://localhost:8800/api/coursesByStudent/getAll/', {'userName': userName})
    .then(res => {
      if(res.data.error) {
        alert("Error on get Favorite Products")
      } else if(res.data) {
        setCoursetList(res.data.courseList);
      } else {
        alert("Error on get Favorite Products")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <Container className='new-collections'>
      <Typography className='title-typo'>My Courses</Typography>
      <Grid container item className="collections" spacing={4}>
        {courseList.map((item,i)=>{
          return (
            <Grid item key={i} xs={12} sm={6} md={3}>
              <ProductCard product={item} callingFromMyList= {true}/>
            </Grid>           
          )
          })
        } 
      </Grid>
    </Container>
  )
}
export default Courses
