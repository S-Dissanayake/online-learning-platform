import axios from 'axios';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { API_URL } from 'src/utils/API';

import { DeleteProduct } from 'src/sections/deleteProduct';
import { UpdateProduct } from 'src/sections/updateProduct/view';

import ProductCard from '../product-card';
import Snackbar from "../../../components/Snackbar/Snackbar";

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [productList, setProductList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productDetailsForDelete, setProductDetailsForDelete] = useState({});
  const [productDetailsForEdit, setProductDetailsForEdit] = useState({});
  const[snackData, setSnackData]= useState({text: "", variant: ""});

  useEffect(() => {
    getAllProducts();
  }, [])

  const handleEditClickedProduct =(editData)=> {
    setProductDetailsForEdit(editData);
    setIsDialogOpen(true);
  }

  const handleDeleteClickedProduct =(data)=> {
    setProductDetailsForDelete(data)
    setIsDeleteDialogOpen(true);
  }  

  const getAllProducts =()=> {
    axios.get(`${API_URL}/getAllProducts`)
    .then(res => {
      if(res.data.error) {
        alert("Error on get All product")
      } else if(res.data) {
        setProductList(res.data);
      } else {
        alert("Error on get All product")
      }
    })
    .catch(err => console.log(err));

    setProductList(dummy_data);

  }

  const handleSnackReset = () => {
    setSnackData({text: "", variant: ""})
  }

  return (
    <>
      <Snackbar 
        snackText={snackData.text} 
        snackVariant={snackData.variant} 
        handleReset={()=>handleSnackReset()} 
      />
      {
        isDialogOpen &&
        <UpdateProduct
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={()=> {setIsDialogOpen()}}
          product={productDetailsForEdit}
          getAllProducts={()=> {getAllProducts()}}
        />
      }
      {
        isDeleteDialogOpen &&
        <DeleteProduct 
          isDeleteDialogOpen={isDeleteDialogOpen} 
          setIsDeleteDialogOpen={()=> {setIsDeleteDialogOpen(false)}}
          productDetailsForDelete={productDetailsForDelete}
          getAllProducts={()=> {getAllProducts()}}
          setSnackData={(data)=> {setSnackData(data)}}
        />
      }    
      <Container>
        <Typography variant="h4" sx={{ mb: 2, mt: 3 }}>
          Course List
        </Typography>

        <Grid container spacing={3}>
          {productList.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
              <ProductCard 
                product={product}
                handleEditClickedProduct={(productData)=>{handleEditClickedProduct(productData)}}
                handleDeleteClickedProduct={(data)=> {handleDeleteClickedProduct(data)}}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}


const dummy_data = [
  {
    id: 1,
    name: 'fsdfhk',
    imageUrl: '',
    price: "20.00"
  },
  {
    id: 2,
    name: 'fsdfhk',
    imageUrl: '',
    price: "20.00"
  },
  {
    id: 3,
    name: 'fsdfhk',
    imageUrl: '',
    price: "20.00"
  },
  {
    id: 4,
    name: 'fsdfhk',
    imageUrl: '',
    price: "20.00"
  },
]
