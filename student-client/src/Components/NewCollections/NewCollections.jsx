import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import './NewCollections.css'
import ProductCard from '../ProductCard/product-card'

const NewCollections = (props) => {
  return (
    <Container className='new-collections'>
      <Typography className='title-typo'>Latest Courses</Typography>
      <Grid container item className="collections" spacing={4}>
        {props.data.map((item,i)=>{
          return (
            <Grid item key={i} xs={12} sm={6} md={3}>
              <ProductCard product={item} callingFromMyList={false}/>
            </Grid>           
          )
          })
        } 
      </Grid>
    </Container>
  )
}
export default NewCollections