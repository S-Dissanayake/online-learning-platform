import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductCard from '../ProductCard/product-card';
import "./ProductsGridView.css"


// ----------------------------------------------------------------------

export default function ProductsGridView(props) {

  return (
    <>   
      <Container className='product-view-grid'>
        <Grid container item xs={12} >
          <Typography className='title-typo'>
              {props.title}
          </Typography>
        </Grid>

        <Grid container spacing={3}>
          {props.productList.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
              <ProductCard 
                product={product}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
