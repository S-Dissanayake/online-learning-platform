import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import  Grid  from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import editIcon from 'src/assets/Icons/edit.svg';
import deleteIcon from 'src/assets/Icons/delete.svg';

import Label from 'src/components/label';

import './product-card.css';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, handleEditClickedProduct, handleDeleteClickedProduct }) {

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
    <Typography variant="subtitle1">
      NOK {product.price}
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
          marginLeft: '10px'
        }}
      >
        {product.oldPrice && `NOK ${product.oldPrice}`}
      </Typography>
    </Typography>
  );

  const renderEditIcon = (
    <Box
      className='edit-icon'
      onClick={()=> {handleEditClickedProduct(product)}}
    >
      <img
      id= {`${product.id} + _edit_icon`}
      src={editIcon}
      alt='edit_icon'
      height='30px'
    />
    </Box>
    
  )

  const renderDeleteIcon = (
    <Box
      className='delete-icon'
      onClick={()=> {handleDeleteClickedProduct(product)}}
    >
    <img
      id= {`${product.id} + _delete_icon`}
      src={deleteIcon}
      alt='delete_icon'
      height='30px'
    />
    </Box>
  )

  return (
    <div className='div-container'>
    <Card className='product-card-container'>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status === "outOfStock" && outOfStockLabel}
        {status === "sale" && saleLabel}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 2, borderTop: '1px solid #D4E1ED'}}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">          
          <Grid container item xs={6}>{renderPrice}</Grid>

          <Grid container item xs={6} justifyContent='right'>
            {renderEditIcon} {renderDeleteIcon}
          </Grid>          
        </Stack>
      </Stack>
    </Card>
    </div>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  handleEditClickedProduct: PropTypes.func,
  handleDeleteClickedProduct: PropTypes.func
};
