import { Helmet } from 'react-helmet-async';

import { StudentManagement } from 'src/sections/studentManagement';

// ----------------------------------------------------------------------

export default function studentManagement() {
  return (
    <>
      <Helmet>
        <title> Products List</title>
      </Helmet>

      <StudentManagement />
    </>
  );
}