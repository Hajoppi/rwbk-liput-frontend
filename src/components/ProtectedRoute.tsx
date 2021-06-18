import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { proxy } from '../utils/axios';

const ProtectedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const { logout } = useContext(AuthContext);
  proxy.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        return logout();
      }
      return Promise.reject(error);
    }
  );
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? <Route {...rest}>{children}</Route> : <Redirect to="/kirjaudu"/>
}

export default ProtectedRoute;