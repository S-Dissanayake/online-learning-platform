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
            Our online learning platform is committed to revolutionizing education by providing accessible, high-quality learning experiences to learners worldwide. With a diverse range of courses spanning various subjects, disciplines, and skill levels, we empower learners to pursue their educational goals at their own pace and convenience.
            </Typography>
            <Typography className='about-us-content-typo'>
            Our platform offers interactive content, engaging multimedia resources, and personalized learning paths to cater to individual learning styles and preferences. We prioritize flexibility, allowing learners to choose from self-paced courses, instructor-led classes, or micro-learning modules. Backed by expert instructors and cutting-edge technology, we strive to create a dynamic learning environment that fosters collaboration, community, and continuous growth. 
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