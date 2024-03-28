import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

const Item = (props) => {
  return (
    <>
    {/* <div className='item'>
      <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="products" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
      </div>
    </div> */}
    <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}>
      <Card className='item'>
        <CardMedia
          component="img"
          image={props.image}
          alt="Image"
          className='item-img'
        />
        <CardContent className='item-content'>
          <Typography className="item-name">
            {props.name}
          </Typography>
          <Typography className="item-price-new">
            ${props.new_price}
          </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </Link>
  </>
  )
}

export default Item
