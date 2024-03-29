import { Helmet } from 'react-helmet-async';

import { AddProducts } from 'src/sections/addProducts/view';

function AddProduct() {
  return (
    <>
      <Helmet>
        <title> Add Course </title>
      </Helmet>

      <AddProducts />
    </>
  )
}

export default AddProduct