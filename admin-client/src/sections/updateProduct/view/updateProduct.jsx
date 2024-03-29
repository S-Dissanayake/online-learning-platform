import axios from 'axios';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";

import {
  Grid, 
  Dialog,  
  Button,
  TextField,
  Typography,
  DialogTitle,
  FormControl, 
  OutlinedInput,
  DialogActions,
  DialogContent,  
  InputAdornment,
} from '@mui/material';

import { API_URL } from 'src/utils/API';

import UploadArea from 'src/assets/Icons/upload_area.svg';

import './updateProduct.css';
import { storage } from "../../../firebase";
import Snackbar from '../../../components/Snackbar/Snackbar';


export default function UpdateProduct(props) {

  const  {
    isDialogOpen,
    setIsDialogOpen,
    product,
    getAllCourses,
  }  = props;



  const initialFormValues = {
    name:"",
    price: "",
    description:"",
    createdDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }

  const initialFormErrors = {
    name:false, 
    price: false,
  }

  const[image, setImage]= useState(false);
  const[productImage, setProductImage]= useState(null);
  const[formValues, setFormValues]= useState(initialFormValues);
  const[formErrors, setFormErrors]= useState(initialFormErrors);
  const[snackData, setSnackData]= useState({text: "", variant: ""});

  useEffect(() => {
    fillFormbyClickedProductData(product)
  }, [product])

  const fillFormbyClickedProductData = (productDetails) => {
    const modifiedCreatedDate =  productDetails?.createdDate && (productDetails.createdDate).split(".")[0].replace("T", " ");
      
    const productData = {
      name: productDetails?.name,
      category: productDetails?.category,
      price: productDetails?.price,
      oldPrice: productDetails?.oldPrice,
      description: productDetails?.description,
      favorite: Boolean(productDetails?.favorite),
      sale: Boolean(productDetails?.sale),
      outOfStock: Boolean(productDetails?.outOfStock),
      createdDate: modifiedCreatedDate
    }
    setFormValues(productData);
  }

  // function for handle image upload
  const imageHandler = (e) => {
    setImage(true);
    setProductImage(e.target.files[0]);
  }

  const handleFormValues =(e)=> {
    setFormValues({...formValues, [e.target.name]: e.target.value});
    setFormErrors({...formErrors, [e.target.name]: false});
  }

  const handleReset=()=> {
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
    setImage(false);
    setProductImage(null);
  }

  const handleSubmit =()=> {
    let tempFormErrors = formErrors;
    let isValidationPass = true;

    Object.keys(tempFormErrors).forEach((singleItem) => {
      if(!formValues[singleItem]){
        tempFormErrors = {...tempFormErrors, [singleItem]: true};
        isValidationPass= false;
      }
    })
    setFormErrors(tempFormErrors);

    if(isValidationPass && image) {
      submitProductImage(productImage);
    }else if(isValidationPass && !image){
      submitProductData(product?.imageUrl, false)
    }else{
      alert("validation error")
    }
  }

  // Function to add product image into firebase
  const submitProductImage =(productImg)=> {
    if (productImg == null) return;
    const myDate = new Date();
    const formattedDate = format(myDate, 'yyyy-MM-dd HH:mm:ss');
    const imageRef = ref(storage, `images/${formattedDate}${productImg.name}`);

    uploadBytes(imageRef, productImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        submitProductData(url,true);
      });
    });  
  }  

  const submitProductData =(imgUrl, isNewImage)=> {   
    const myDate = new Date();
    const name = product?.name;
    const payload = {
      name: formValues.name, 
      price: parseFloat(formValues.price), 
      description: formValues.description, 
      imageUrl: imgUrl, 
      createdDate: formValues?.createdDate, 
      latestUpdatedDate: format(myDate, 'yyyy-MM-dd HH:mm:ss')
    }
    const token = `Bearer ${sessionStorage.getItem('auth-token')}`;
    const config = { headers: { Authorization: token}}
    axios.put(`${API_URL}/api/course/updateCourse/${name}`, payload, config)
    .then(res => {
      if(res.data.error) {
        setSnackData({ text: "Error on updating product !",variant: "error"})
      } else if(res.data) {
        setSnackData({ text: "Product Updated Sucessfully !",variant: "success"})
        handleReset();
        if(isNewImage) removePrevImageFromFirebase(product.imageUrl);
        getAllCourses();
        handleClose();       
      } else {
        setSnackData({ text: "Error on updating product !",variant: "error"})
      }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const removePrevImageFromFirebase = (imgUrlForDelete) => {
    const imageRef = ref(storage, imgUrlForDelete)
    deleteObject(imageRef)
    .then(() => {
      console.log("old image deleted");
    })
    .catch((error) => {
      console.error('Error deleting Image:', error);
    });
  }

  const handleClose = () => {
    setIsDialogOpen(false);
  };

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
      <Dialog open={isDialogOpen} maxWidth='md' onClose={() => {handleClose()}}>
        <DialogTitle sx={{backgroundColor: '#CCE5FF'}}>Product Update</DialogTitle>
        <DialogContent>
          <form>
            <Grid container item direction='row'>
              <Grid container item  xs={12} direction='row' spacing={2} className='form-left-container'>
                <Grid item container xs={12}>
                  <FormControl sx={{ mr: 1 }} fullWidth>
                    <p className='form-label'> 
                      Course Name 
                      <Typography className='required-red-star'>*</Typography>
                    </p> 
                    <TextField 
                      name='name'
                      className='form-text-field' 
                      fullWidth id="outlined-basic" 
                      placeholder="Name" variant="outlined" 
                      value={formValues?.name}
                      onChange={(e)=> {handleFormValues(e)}}
                      error={formErrors.name}
                    />       
                  </FormControl>
                </Grid>

                {/* Price */}
                <Grid item container>
                  <Grid container item  xs={12} md={6} direction='column'>
                  <FormControl sx={{ mr: 1 }}>
                    <p className='form-label'> 
                      Price 
                      <Typography className='required-red-star'>*</Typography>
                    </p>
                    <OutlinedInput
                      name='price'
                      className='form-text-field'
                      id="outlined-adornment-price"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      value={formValues?.price}
                      type='number'
                      onChange={(e)=> {handleFormValues(e)}}
                      error={formErrors.price}
                    />
                  </FormControl>
                  </Grid>
                </Grid>

                <Grid item container xs={12}>
                  <FormControl sx={{ mr: 1 }} fullWidth>
                    <p className='form-label'> Course Description </p>
                    <TextField
                      name='description'
                      id="outlined-multiline-static"
                      className='form-text-field'
                      multiline
                      rows={4}
                      defaultValue=""
                      placeholder='Description'
                      value={formValues?.description}
                      onChange={(e)=> {handleFormValues(e)}}
                    />
                  </FormControl>
                </Grid>

                <Grid container item  xs={12} direction='column' spacing={2}>
                  <Grid item>
                    <p className='form-label'>
                        Image
                        <Typography className='required-red-star'>*</Typography>
                    </p>
                    <div>
                    <FormControl>
                      <label htmlFor="fileInput">
                        { image ?
                          <img className="update-product-thumbnail-img" src={URL.createObjectURL(productImage)} alt="" height="350px"/>
                          :
                          <img className="update-product-thumbnail-img" src={ product?.imageUrl ?  product?.imageUrl : UploadArea} alt="" height="350px" />
                        }                      
                        <input id="fileInput" onChange={(e)=>{imageHandler(e)}} type="file" name="image" hidden/>   
                      </label>       
                    </FormControl>
                    </div>          
                  </Grid>
                </Grid>           
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{backgroundColor: '#CCE5FF'}} >
          <Grid container item justifyContent='flex-end' alignItems='center'>
            <Button 
              sx={{m:"1rem 1rem 1rem 0", minWidth: "10rem"}}
              variant="contained"
              onClick={()=>{handleSubmit()}}
              >
                Update
            </Button>
            <Button 
              sx={{m:"1rem 1rem 1rem 0", minWidth: "10rem"}}
              variant="outlined"
              onClick={()=>{handleReset();handleClose()}}
            >
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
    
  );
}

UpdateProduct.propTypes = {
  isDialogOpen: PropTypes.bool,
  setIsDialogOpen: PropTypes.func,
  product: PropTypes.object,
  getAllCourses: PropTypes.func,
};