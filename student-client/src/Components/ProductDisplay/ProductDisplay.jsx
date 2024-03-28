import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Grid, Typography, Stack} from "@mui/material";
import "./ProductDisplay.css";


const ProductDisplay = () => {
  const location = useLocation();

  const [product, setProduct] = useState();

  useEffect(() => {
    setProduct(location?.state?.data)
  }, [location])

  console.log(product);
  

  return (
    <Container className="productdisplay">
      <Grid container item xs={12} direction='row' className="productdisplay-container-grid">
        <Grid container item xs={12} md={6}>
            <img src={product?.imageUrl} alt="product" className="productdisplay-product-image"/>
        </Grid>
        <Grid container item xs={12} md={6} direction='column' className="productdisplay-product-content">
            <Typography className="productdisplay-product-name">{product?.name}</Typography>
            <Stack container item xs={12} md={6} direction='row'>
              <Typography className="productdisplay-product-price">$ {product?.price}</Typography>
              {product?.oldPrice && <Typography className="productdisplay-product-old-price"> {`$ ${product?.oldPrice}`}</Typography> }
            </Stack>
            <Typography className="productdisplay-product-description">{product?.description}</Typography>            
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDisplay;
