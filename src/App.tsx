import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import MultiProvider from './contexts/MultiProvider';
import { GlobalStyle } from './styles/Styles';

const Contact = React.lazy(() => import('./pages/Contact'));
const Home = React.lazy(() => import('./pages/Home'));
const Callback = React.lazy(() => import('./pages/Callback'));
const Payment = React.lazy(() => import('./pages/Payment'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Login = React.lazy(() => import('./pages/Login'));
const PlaceOrder = React.lazy(() => import('./pages/PlaceOrder'));

const App = () => {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Router>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
        <MultiProvider>
          <Switch>
            <Route path="/yhteystiedot">
              <Contact />
            </Route>
            <Route path="/maksu">
              <Payment />
            </Route>
            <Route path="/success">
              <Callback />
            </Route>
            <Route path="/cancel">
              <Callback />
            </Route>
            <ProtectedRoute path="/admin" exact>
                <Admin />
            </ProtectedRoute>
            <ProtectedRoute path="/admin/order/:orderId" exact>
                <PlaceOrder />
            </ProtectedRoute>
            <Route path="/kirjaudu">
                <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </MultiProvider>
      </Router>
    </React.Suspense>
  );
}

export default App;
