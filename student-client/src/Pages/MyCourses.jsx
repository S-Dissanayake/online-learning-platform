import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography,  } from '@mui/material'
import axios from 'axios'

import "./CSS/MyCourses.css"

const MyCourses = () => {

  const [productList, setProductList] = useState([]);
  

  const fetchInfo = () => { 
    let payload = {
      productCategory : category
    }
    axios.post('http://localhost:8800/getProductsByCategory', payload)
    .then(res => {
      if(res.data.error) {
        alert("Error on get Favorite Products")
      } else if(res.data) {
        setProductList(res.data);
      } else {
        alert("Error on get Favorite Products")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <Container container className='contact-container'>
        <Grid container item xs={12}>
            <Typography className='contact-title'>Contact Us</Typography>
            <Typography className='contact-content-typo'>
                We're here to make a splash in your aquarium journey! Whether you have questions, need guidance, or simply want to share your aquatic adventures, our dedicated team at Norway Aqua Expert is just a message away.
            </Typography>
            <Typography className='contact-content-typo'>
                Reach out to us for expert advice on tank setups, equipment recommendations, or assistance with your recent purchase. We value your feedback and are committed to providing the highest level of customer satisfaction.
            </Typography>
        </Grid>
        <Grid container item xs={12} direction='column'>
            <Typography className='contact-content-typo'>
                Connect with Norway Aqua Expert through the following channels:
            </Typography>

            <Typography className='contact-content-typo'>
                Email :  <a href="mailto:norwayaquaexperts@gmail.com" target="_blank" rel="noreferrer" className='contact-us-email'>norwayaquaexperts@gmail.com</a>
            </Typography>
            <Typography className='contact-content-typo'>
                Whatsapp : <a href="https://wa.me/4796960777" target="_blank" rel="noreferrer" className='contact-us-whatsapp'>+47 9696 0777</a>
            </Typography>
        </Grid>
    </Container>
  )
}
export default MyCourses
