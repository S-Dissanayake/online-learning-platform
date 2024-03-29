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
  const [courseList, setCourseList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseDetailsForDelete, setCourseDetailsForDelete] = useState({});
  const [productDetailsForEdit, setProductDetailsForEdit] = useState({});
  const[snackData, setSnackData]= useState({text: "", variant: ""});

  useEffect(() => {
    getAllCourses();
  }, [])

  const handleEditClickedCourse =(editData)=> {
    setProductDetailsForEdit(editData);
    setIsDialogOpen(true);
  }

  const handleDeleteClickedCourse =(data)=> {
    setCourseDetailsForDelete(data)
    setIsDeleteDialogOpen(true);
  }  

  const getAllCourses =()=> {
    axios.get(`${API_URL}/api/course/getAllCoursesList/`)
    .then(res => {
      if(res.data.error) {
        alert("Error on get All product")
      } else if(res.data) {
        setCourseList(res.data.result);
      } else {
        alert("Error on get All product")
      }
    })
    .catch(err => console.log(err));
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
          getAllCourses={()=> {getAllCourses()}}
        />
      }
      {
        isDeleteDialogOpen &&
        <DeleteProduct 
          isDeleteDialogOpen={isDeleteDialogOpen} 
          setIsDeleteDialogOpen={()=> {setIsDeleteDialogOpen(false)}}
          courseDetailsForDelete={courseDetailsForDelete}
          getAllCourses={()=> {getAllCourses()}}
          setSnackData={(data)=> {setSnackData(data)}}
        />
      }    
      <Container>
        <Typography variant="h4" sx={{ mb: 2, mt: 3 }}>
          Course List
        </Typography>

        <Grid container spacing={3}>
          {courseList.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
              <ProductCard 
                product={product}
                handleEditClickedCourse={(productData)=>{handleEditClickedCourse(productData)}}
                handleDeleteClickedCourse={(data)=> {handleDeleteClickedCourse(data)}}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

