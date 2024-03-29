import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function studentManagement() {
  return (
    <>
      <Helmet>
        <title> Products List</title>
      </Helmet>

      <ProductsView />
    </>
  );
}