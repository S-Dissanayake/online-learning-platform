import React from 'react'
import { Container, Grid , Typography } from '@mui/material';
import Feedback from './Feedback'
import "./FeedbackCorner.css";

function FeedbackCorner() {
  return (
    <Container className='feedback'>
      <Typography className='title-typo'>Feedback Corner</Typography>
      <Grid container item className='feedback-list' spacing={4}>         
          {data.map((item,i)=>{
            return (
                <Grid container item xs={12} md={6} lg={4} className="feedback-item">
                  <Feedback feedback={item} i={i}/>
                </Grid>
              )
            })
          }        
      </Grid>
    </Container>
  )
}
export default FeedbackCorner

const data = [
    {
        name: "Thea Kristiansen",
        msg: "The customer experience was exceptional from start to finish. Very Quality Courses and Good service, I'm beyond satisfied!",
    },
    {
        name: "Henrik Larsen",
        msg: "I absolutely love the Course I purchased from this website. Course content was outstanding, Highly recommended!",
    },
    {
        name: "Sander Jakobsen",
        msg: "I had a great experience learning on this website. Quality online courses. ",
    }

]