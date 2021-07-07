import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import AdminProvider from '../contexts/AdminContext';

import { proxy } from '../utils/axios';

const ProtectedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const { logout } = useContext(AuthContext);
  proxy.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        return logout();
      }
      return Promise.reject(error);
    }
  );
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? (
    <AdminProvider>
      <Route {...rest}>{children}</Route>
    </AdminProvider>
  ) : <Redirect to="/kirjaudu"/>
}

export default ProtectedRoute;