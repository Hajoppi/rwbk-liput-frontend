import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import CartProvider from './contexts/CartContext';
import ContactProvider from './contexts/ContactContext';
import AuthProvider from './contexts/AuthContext';
import { GlobalStyle, theme } from './styles/Styles';


import {ThemeProvider} from 'styled-components';

const Contact = React.lazy(() => import('./pages/Contact'));
const Home = React.lazy(() => import('./pages/Home'));
const Callback = React.lazy(() => import('./pages/Callback'));
const Payment = React.lazy(() => import('./pages/Payment'));
const Admin = React.lazy(() => import('./pages/Admin'));


const App = () => {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Router>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
        <CartProvider>
          <ContactProvider>
            <ThemeProvider theme={theme}>
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
              <Route path="/admin">
                <AuthProvider>
                  <Admin />
                </AuthProvider>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            </ThemeProvider>
          </ContactProvider>
        </CartProvider>
      </Router>
    </React.Suspense>
  );
}




export default App;
