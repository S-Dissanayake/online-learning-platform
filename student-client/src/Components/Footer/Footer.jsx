import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Typography } from '@mui/material'

import footer_logo from '../Assets/logo.png';
import email_icon from '../Assets/email.svg';
import whatsapp_icon from '../Assets/whatsapp.svg';

import './Footer.css'


const Footer = () => {
  return (
    
    <footer className='footer'>
      <Container>
        <Grid container xs={12}  className='footer-link-container'>
          <Grid item container sm={12} md={12} lg={5} justifyContent='flex-start'>
            <Grid item container xs={12} md={4} className='footer-link-sub-container' direction='column'>
              <Typography className='footer-title-typo'>Quick Links</Typography>
              <Link to='/' style={{ textDecoration: 'none' }} className="quick-links-typo"> Home </Link>
              <Link to='/mycourses' style={{ textDecoration: 'none' }} className="quick-links-typo"> My Courses </Link>
              <Link to='/aboutus' style={{ textDecoration: 'none' }} className="quick-links-typo"> About Us </Link>
              <Link to='/contact' style={{ textDecoration: 'none' }} className="quick-links-typo"> Contact </Link>
            </Grid>
            <Grid item container xs={12} md={8} className='footer-link-sub-container' direction='column'>
            </Grid>
          </Grid>
          <Grid container item sm="12" md="12" lg="7" className='footer-links-container' justifyContent='flex-end'>
            <Grid item container xs='12' md='6' className='footer-link-sub-container' alignContent='flex-start'>
              <Typography className='footer-title-typo'>Contact Info</Typography>
              <Typography className='footer-common-typo'>
                <img src={email_icon} className='contact-info-email-icon' alt="logo" />
                <a href="mailto:onlinelearningplatform@gmail.com" target="_blank" className='contact-info-email-link' rel="noreferrer">onlinelearningplatform@gmail.com</a>
              </Typography>
            </Grid>
            <Grid item container xs='12' md='6' className='footer-link-sub-container' alignContent='flex-start'>
              <Typography className='footer-title-typo'>Opening Hours</Typography>
              <Typography className='footer-common-typo'>Monday – Sunday: 09:00AM – 06:00PM</Typography>
              <Typography className='footer-common-typo'>Public Holidays: 09:00AM – 06:00PM</Typography>
            </Grid>           
          </Grid>     
        </Grid>
        <Grid container item  className='footer-logo-container' alignItems='center' >
            <Grid item container lg={7}className="footer-logo">
              <Typography className='all-right-reserved-typo'>
                Copyright © 2024 Online Learning Platform, All rights reserved.
              </Typography>
            </Grid>
        </Grid>
      </Container>
    </footer>
    
  )
}

export default Footer
