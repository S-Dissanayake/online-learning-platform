import React from 'react'
import { Container, Grid, Typography,  } from '@mui/material'
import './CSS/Contact.css'

function Contact() {
  return (
    <Container container className='contact-container'>
        <Grid container item xs={12}>
            <Typography className='contact-title'>Contact Us</Typography>
            <Typography className='contact-content-typo'>
                Our dedicated support team is here to assist you with any questions, concerns, or feedback you may have regarding our online learning platform. Whether you need assistance with course enrollment, technical issues, or general inquiries, we are committed to providing timely and helpful responses to ensure your learning experience is seamless and enjoyable. Feel free to reach out to us via email, phone, or through our online contact form. 
            </Typography>
            <Typography className='contact-content-typo'>
            Your input is valuable to us as we continuously strive to improve and enhance our platform to better serve your educational needs. We look forward to hearing from you and assisting you on your learning journey.
            </Typography>
        </Grid>
    </Container>
  )
}

export default Contact