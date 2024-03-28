import axios from 'axios';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { API_URL } from 'src/utils/API';

import { DeleteProduct } from 'src/sections/deleteProduct';
import { UpdateProduct } from 'src/sections/updateProduct/view';

import ProductCard from '../product-card';
import ProductFilters from '../product-filters';
import Snackbar from "../../../components/Snackbar/Snackbar";

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productDetailsForDelete, setProductDetailsForDelete] = useState({});
  const [productDetailsForEdit, setProductDetailsForEdit] = useState({});
  const[snackData, setSnackData]= useState({text: "", variant: ""});
  const[selectedfilterCategory, setSelectedfilterCategory]= useState("All");

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
  }

  const getProductsByCategory =(category)=> {
    const payload = {
      productCategory : category
    }
    axios.post(`${API_URL}/getProductsByCategory`, payload)
    .then(res => {
      if(res.data.error) {
        alert("Error on get Favorite Products")
      } else if(res.data) {
        setProductList(res.data);
      } else {
        alert("Error on get Favorite Products")
      }
    })
    .catch(err => console.log(err));
  }


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleFilterOptions = (category) => {
    setSelectedfilterCategory(category)
    if(category === "All"){
      getAllProducts();
    }else{
      getProductsByCategory(category);
    }
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
          Product List
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap-reverse"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilters
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              handleClearAllBtn={() => handleFilterOptions("All")}
              handleSelectedRadioBtn={(value) => handleFilterOptions(value)}
              selectedfilterCategory={selectedfilterCategory}
            />
          </Stack>
        </Stack>

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
