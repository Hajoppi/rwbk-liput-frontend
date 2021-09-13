import { FC, useContext } from 'react';
import styled from 'styled-components';
import { Route, Redirect, RouteProps, Link} from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import AdminProvider from '../contexts/AdminContext';

import { proxy } from '../utils/axios';
const ProtectedRoute: FC<RouteProps> = ({children, ...rest}) => {
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
      <Navbar>
        <StyledLink to='/admin/'>Tilaukset</StyledLink>
        <StyledLink to='/admin/general'>Yleistiedot</StyledLink>
        <StyledLink to='/admin/create'>Luo tilaus</StyledLink>
      </Navbar>
      <Route {...rest}>{children}</Route>
    </AdminProvider>
  ) : <Redirect to="/kirjaudu"/>
}

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  color: ${props => props.theme.linkColor};
  margin: 12px 4px;
`;

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default ProtectedRoute;