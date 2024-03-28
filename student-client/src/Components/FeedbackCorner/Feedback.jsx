import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./Feedback.css";

function Feedback(props) {

  return (
    <Card className={(props.i)%2 === 0 ? 'container-white' : 'container-blue'}>
      <CardContent>
        <Typography className={(props.i)%2 === 0 ? 'feedback-name-typo-white' : 'feedback-name-typo-blue'}>
          {'" ' + props.feedback.name + ' "'}
        </Typography>
        <Typography className={(props.i)%2 === 0 ? 'feedback-content-typo-white' : 'feedback-content-typo-blue'}>
          {props.feedback.msg}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default Feedback