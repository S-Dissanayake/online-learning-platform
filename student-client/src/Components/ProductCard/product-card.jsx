import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid  from '@mui/material/Grid';

import { fCurrency } from '../../utils/format-number';

import Label from '../label/index';
import "./product-card.css";

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {

  const [status, setStates] = useState(null);

  useEffect(() => {
    if(product.outOfStock){
      setStates("outOfStock")
    }else if(!product.outOfStock && product.sale){
      setStates("sale")
    }   
  },[product])

  const saleLabel =(
    <Label
      variant="filled"
      color='info'
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      Sale
    </Label>
  )

  const outOfStockLabel =(
    <Label
      variant="filled"
      color='error'
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      Out of Stock
    </Label>
  )

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography className='product-price'>
      {fCurrency(product.price)}
      <Typography
        component="span"
        className='old-product-price'
      >
        {product.oldPrice && fCurrency(product.oldPrice)}
      </Typography >      
    </Typography>
  );

  return (
    <div className='dev-container'>
    <Link to='/product' state={{data: product}} className='product-card-link'>
    <Card className='card-container'>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status === "outOfStock" && outOfStockLabel}
        {status === "sale" && saleLabel}
        {renderImg}
      </Box>

      <Grid spacing={2} sx={{ p: 2 }}>
        <Typography className='product-card-product-name'>{product?.name}</Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Stack>
      </Grid>
    </Card>
    </Link>
    </div>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
