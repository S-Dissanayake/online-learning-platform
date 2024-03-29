import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid  from '@mui/material/Grid';

import { API_URL } from '../../utils/API';

import { fCurrency } from '../../utils/format-number';
import { useRouter } from '../../routes/hooks/use-router';
import "./product-card.css";
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, callingFromMyList }) {
  const router = useRouter();

  const jwtToken = sessionStorage.getItem('auth-token');
  const userName = sessionStorage.getItem('userName');

  const joinBtnOnclick = () => {
    console.log("jwtToken", jwtToken);

    if (jwtToken) {
      addCourseToList(product);
    } else {
      router.push('/login');
    }
  }

  const addCourseToList = (product) => {
    console.log("product ", product);
    axios.put(`${API_URL}/api/coursesByStudent/updateCourseList/${userName}`,product).then(res => {      
      if(res.data.error) {
        alert("Error on update Course List")
      }else if(res.data) {
        } else {
          alert("Error on update Course List")
      }
    })
    .catch(err => console.log(err));
  }

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
    
    <Card className='card-container'>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Link to='/product' state={{data: product}} className='product-card-link'>
        {renderImg}
        </Link>
      </Box>

      <Grid spacing={2} sx={{ p: 2 }}>
        <Typography className='product-card-product-name'>{product?.name}</Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
          {!callingFromMyList && 
            <Button 
              className='join-btn'
              onClick={()=>{joinBtnOnclick()}}
            >
              join
            </Button>
          }          
        </Stack>
      </Grid>
    </Card>

    </div>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
