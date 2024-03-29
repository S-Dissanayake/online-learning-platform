import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/products'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AddProduct = lazy(() => import('src/pages/addProduct'));
export const StudentManagement = lazy(() => import('src/pages/studentManagement'));

// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            {sessionStorage.getItem("auth-token") ? <Outlet /> : <Navigate to="/login"/>}
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'addProduct', element: <AddProduct />, index: true },
        { path: 'studentManagement', element: <StudentManagement />, index: true },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
