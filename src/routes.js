import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/userPage/index';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Organizations from './pages/organizations';
import ApiKeys from './pages/apiKeys';
import SuperAdmin from './pages/superAdmin';
import ChangePassword from './pages/changePassword';
import PrivateRoute from './privateRoute';
import ForgotPassword from './pages/forgotPass';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/organizations" />, index: true },
        {
          path: 'organizations',
          element: (
            <PrivateRoute>
               <Organizations />
            </PrivateRoute>
          ),
        },
        {
          path: 'user',
          element: (
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'keys',
          element: (
            <PrivateRoute>
              <ApiKeys />
            </PrivateRoute>
          ),
        },
        {
          path: 'superAdmin',
          element: (
            <PrivateRoute>
              <SuperAdmin />
            </PrivateRoute>
          ),
        },
        { path: 'updatePassword', element: <ChangePassword /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: "forgot-password", element: <ForgotPassword /> },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/organizations" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
