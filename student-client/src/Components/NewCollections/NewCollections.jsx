import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import './NewCollections.css'
import ProductCard from '../ProductCard/product-card'

const NewCollections = (props) => {
  return (
    <Container className='new-collections'>
      <Typography className='title-typo'>Latest Arrival Products</Typography>
      <Grid container item className="collections" spacing={4}>
        {props.data.map((item,i)=>{
          return (
            <Grid item key={item.id} xs={12} sm={6} md={3}>
              <ProductCard product={item}/>
            </Grid>           
          )
          })
        } 
      </Grid>
    </Container>
  )
}
export default NewCollections