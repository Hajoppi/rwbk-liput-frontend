import Home from './pages/Home';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Callback from './pages/Callback';
import Header from './components/Header';
import CartProvider from './contexts/CartContext';
import ContactProvider from './contexts/ContactContext';
import { GlobalStyle, theme } from './styles/Styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {ThemeProvider} from 'styled-components';


const App = () => {
  return (
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          </ThemeProvider>
        </ContactProvider>
      </CartProvider>
    </Router>
  );
}




export default App;
