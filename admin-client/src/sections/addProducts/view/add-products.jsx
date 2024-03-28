import axios from 'axios';
import { useState } from 'react';
import { format } from 'date-fns';
import { ref, uploadBytes, getDownloadURL,  } from "firebase/storage";

import {Grid, Button, Switch, MenuItem , Container, TextField, Typography, FormControl, OutlinedInput,  InputAdornment, FormControlLabel,  } from '@mui/material';

import { API_URL } from 'src/utils/API';

import UploadArea from 'src/assets/Icons/upload_area.svg';
import UploadAreaRed from 'src/assets/Icons/upload_area_red.svg';

import "./add-products.css";
import { storage } from "../../../firebase";
import Snackbar from '../../../components/Snackbar/Snackbar';




export default function ProductsView() {
  const Categories = [
    {
      value: 'Discus',
      label: 'Discus',
    },
    {
      value: 'Arowana',
      label: 'Arowana',
    },
    {
      value: 'Angel',
      label: 'Angel',
    },
    {
      value: 'Gourami',
      label: 'Gourami',
    },
    {
      value: 'Platty',
      label: 'Platty',
    },
    {
      value: 'Tetra',
      label: 'Tetra',
    },
    {
      value: 'Flower Horn',
      label: 'Flower Horn',
    },
    {
      value: 'Ramirez',
      label: 'Ramirez',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

  const initialFormValues = {
    name:"",
    category:"Discus",
    price: "",
    oldPrice: "",
    description:"",
    favorite: false,
    sale: false,
    outOfStock: false
  }

  const initialFormErrors = {
    name:false, 
    category:false, 
    price: false,
  }

  const[image, setImage]= useState(false);
  const[productImage, setProductImage]= useState(null);
  const[formValues, setFormValues]= useState(initialFormValues);
  const[formErrors, setFormErrors]= useState(initialFormErrors);
  const[imageError, setImageError]= useState(false);
  const[snackData, setSnackData]= useState({text: "", variant: ""});

  // function for handle image upload
  const imageHandler = (e) => {
    setImage(true);
    setProductImage(e.target.files[0]);
    setImageError(false);
  }

  const handleFormValues =(e)=> {
    setFormValues({...formValues, [e.target.name]: e.target.value});
    setFormErrors({...formErrors, [e.target.name]: false});
  }

  const handleToggleSwitchChange =(e, value)=> {
    setFormValues({...formValues, [e.target.name]: value});
  }

  const handleReset=()=> {
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
    setImage(false);
    setProductImage(null);
    setImageError(false);
  }

  const handleSubmit =()=> {
    let tempFormErrors = formErrors;
    let isValidationPass = true;

    if(!image) {
      isValidationPass = false;
      setImageError(true);
    };

    Object.keys(tempFormErrors).forEach((singleItem) => {
      if(!formValues[singleItem]){
        tempFormErrors = {...tempFormErrors, [singleItem]: true};
        isValidationPass= false;
      }
    })
    setFormErrors(tempFormErrors);

    if(isValidationPass) {
      submitProductImage(productImage);
    }else{
      setSnackData({
        text: "Please Fill All Required Fields !",
        variant: "error"
      })
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
        submitProductData(url);
      });
    });  
  }  

  const submitProductData =(imgUrl)=> {   
    const myDate = new Date();
    const payload = {
      name: formValues.name, 
      category: formValues.category, 
      price: parseFloat(formValues.price), 
      oldPrice: parseFloat(formValues.oldPrice), 
      description: formValues.description, 
      imageUrl: imgUrl, 
      createdDate: format(myDate, 'yyyy-MM-dd HH:mm:ss'), 
      latestUpdatedDate: format(myDate, 'yyyy-MM-dd HH:mm:ss'), 
      favorite: formValues.favorite, 
      sale: formValues.sale, 
      outOfStock: formValues.outOfStock
    }
    const token = `Bearer ${sessionStorage.getItem('auth-token')}`;
    const config = { headers: { Authorization: token}}
    axios.post(`${API_URL}/addProduct`, payload,config)
    .then(res => {
      if(res.data.error) {
        setSnackData({text: "Error on adding product !", variant: "error"})
      } else if(res.data) {
          handleReset();
          setSnackData({text: "Product Added Sucessfully !", variant: "success"})
        } else {
          setSnackData({ text: "Error on adding product !",variant: "error"})
        }
    })
    .catch(err =>{
      if(err.response.status === 403) setSnackData({ text: "Your session has expired. please login again",variant: "error"})
    });
  }

  const handleSnackReset = () => {
    setSnackData({text: "", variant: ""})
  }

  return (
    <Container >
      <Snackbar 
        snackText={snackData.text} 
        snackVariant={snackData.variant} 
        handleReset={()=>handleSnackReset()} 
      />
      <Typography variant="h4" className='titile-typo'>
        Add Product
      </Typography>

      <form>
        <Grid container item direction='row'>
          <Grid container item  xs={12} md={6} direction='row' spacing={2} className='form-left-container'>
            <Grid item container xs={12}>
              <FormControl sx={{ mr: 1 }} fullWidth>
                <p className='form-label'> 
                  Product Name 
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
            
            {/* category */}
            <Grid item container>
              <Grid container item  xs={12} md={6} direction='column'>
                <FormControl sx={{ mr: 1 }}>
                  <p className='form-label'> 
                    Product Category
                    <Typography className='required-red-star'>*</Typography>
                  </p> 
                  <TextField
                    name='category'
                    id="outlined-select-category"
                    className='form-text-field'
                    select
                    defaultValue="Discus"
                    value={formValues?.category}
                    onChange={(e)=> {handleFormValues(e)}}
                    error={formErrors.category}
                  >
                    {Categories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            {/* Toggle */}
            <Grid container item xs={12} className='toggle-switch-container'>
              <FormControlLabel 
                control={
                  <Switch 
                    name='favorite'
                    checked={formValues.favorite} 
                    onChange={(e)=> {handleToggleSwitchChange(e,!formValues.favorite)}}
                  />} 
                labelPlacement="end"
                label="Favorite"
                className='toggle-switch-favorite'
              />
              <FormControlLabel control={
                <Switch 
                  name='sale'
                  checked={formValues.sale}
                  color="secondary"
                  onChange={(e)=> {handleToggleSwitchChange(e,!formValues.sale)}}
                />} 
                labelPlacement="end"
                label="Sale" 
                className='toggle-switch-sale'
              />
              <FormControlLabel control={
                <Switch 
                  name='outOfStock'
                  checked={formValues.outOfStock}
                  color="warning"
                  onChange={(e)=> {handleToggleSwitchChange(e,!formValues.outOfStock)}}
                />} 
                labelPlacement="end"
                label="Out of Stock"
                className='toggle-switch-outOfStock'
              />              
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
                  startAdornment={<InputAdornment position="start">NOK</InputAdornment>}
                  value={formValues?.price}
                  type='number'
                  onChange={(e)=> {handleFormValues(e)}}
                  error={formErrors.price}
                />
              </FormControl>
              </Grid>
              <Grid container item  xs={12} md={6} direction='column' alignItems='flex-end'>
              {formValues.sale && ( <FormControl sx={{ mr: 1 }}>
                  <p className='form-label-old-price'> Old Price </p>
                  <OutlinedInput
                    name='oldPrice'
                    className='form-text-field'
                    id="outlined-adornment-old-price"
                    startAdornment={<InputAdornment position="start">NOK</InputAdornment>}
                    value={formValues?.oldPrice}
                    type='number'
                    onChange={(e)=> {handleFormValues(e)}}
                  />
                </FormControl>
              )}
              </Grid>
            </Grid>

            <Grid item container xs={12}>
              <FormControl sx={{ mr: 1 }} fullWidth>
                <p className='form-label'> Product Description </p>
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
          </Grid>

          <Grid container item  xs={12} md={6} direction='column' spacing={2} justifyContent='center' alignContent='center'>
            <Grid item>
              <p className='form-label'>
                  Image Upload
                  <Typography className='required-red-star'>*</Typography>
              </p>
              <div>
              <FormControl>
                <label htmlFor="fileInput">
                  { image ?
                    <img className="addproduct-thumbnail-img" src={URL.createObjectURL(productImage)} alt="" height="350px"/>
                    :
                    <img className="addproduct-thumbnail-img" src={imageError ? UploadAreaRed : UploadArea} alt="" height="150px"/>
                  }                      
                  <input id="fileInput" onChange={(e)=>{imageHandler(e)}} type="file" name="image"  hidden />   
                </label>       
              </FormControl>
              </div>          
            </Grid>
          </Grid>          

          <Grid item>
            <Button 
              sx={{m:"2rem 1rem 0 0", minWidth: "10rem"}}
              variant="contained"
              onClick={()=>{handleSubmit()}}
              className='add-product-btn'
              >
                Add Product
            </Button>
            <Button 
              sx={{m:"2rem 1rem 0 0", minWidth: "10rem"}}
              variant="outlined"
              onClick={()=>{handleReset()}}
              className='cancel-btn'

            >
              Cancel
            </Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
}
