import React from 'react'
import './CSS/AboutUs.css'
import { Container, Grid, Typography, Card, Box } from '@mui/material'

import AboutUsImage1 from '../Components/Assets/AboutUs_Images/about_us_1.jpg'
import AboutUsImage2 from '../Components/Assets/AboutUs_Images/about_us_2.jpg'
import AboutUsImage3 from '../Components/Assets/AboutUs_Images/about_us_3.jpg'

function AboutUs() {
  return (
    <Container container className='aboutus-container'>
        <Grid container item xs={12}>
            <Typography className='about-us-title'>About Us</Typography>
            <Typography className='about-us-content-typo'>
                Welcome to Norway Aqua Expert, where the allure of the underwater world meets exceptional service!, we take pride in being your premier destination for all things aquarium-related. As avid enthusiasts ourselves, we've curated an extensive selection of aquatic treasures, ensuring that every visit to our store is an immersive experience.
            </Typography>
            <Typography className='about-us-content-typo'>
                At Norway Aqua Expert, we prioritize the health and happiness of your aquatic companions. Our team of knowledgeable and passionate staff is dedicated to providing personalized guidance, from selecting the perfect tank setup to choosing the ideal inhabitants for your underwater haven. With a commitment to quality, we offer a carefully curated range of top-tier products, from state-of-the-art equipment to captivating decorations, to enhance the beauty of your aquatic sanctuary.
            </Typography>
            <Typography className='about-us-content-typo'>
                Discover the extraordinary at Norway Aqua Expert, your trusted partner in creating and maintaining enchanting aquariums. Welcome to a world where every ripple tells a story and every fin dances to its own rhythm.
            </Typography>
        </Grid>

        <Grid container item xs={12} lg={12} className='about-us-image-container'  justifyContent='space-around'>
            <Grid item xs={12} sm={6} md={4} className='about-us-image-grid'>
                <div>
                    <Card>
                        <Box
                            component="img"
                            alt='image'
                            src={AboutUsImage1}
                            sx={{
                                top: 0,
                                width: 1,
                                height: 1,
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                </div>
            </Grid>
            <Grid item xs={12}  sm={6} md={4} className='about-us-image-grid'>
                <div>
                    <Card>
                        <Box
                            component="img"
                            alt='image'
                            src={AboutUsImage2}
                            sx={{
                                top: 0,
                                width: 1,
                                height: 1,
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                </div>
            </Grid> 
            <Grid item xs={12}  sm={6} md={4} className='about-us-image-grid'>
                <div>
                    <Card>
                        <Box
                            component="img"
                            alt='image'
                            src={AboutUsImage3}
                            sx={{
                                top: 0,
                                width: 1,
                                height: 1,
                                objectFit: 'cover',
                            }}
                        />
                    </Card>
                </div>
            </Grid>          
        </Grid>
    </Container>
  )
}

export default AboutUs