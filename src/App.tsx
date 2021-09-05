import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Images from './components/Images';
import MultiProvider from './contexts/MultiProvider';
import { GlobalStyle } from './styles/Styles';


const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const Instructions = lazy(() => import('./pages/Instruction'));
const Contact = lazy(() => import('./pages/Contact'));
const Home = lazy(() => import('./pages/Home'));
const Callback = lazy(() => import('./pages/Callback'));
const Payment = lazy(() => import('./pages/Payment'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));

const allowedUrls = ['liput.rwbk.fi','localhost','127.0.0.1'];
const correctOrigin = allowedUrls.some(url => window.location.origin.indexOf(url) >= 0);

const App = () => {
  if (!correctOrigin) return <div>Ei näin</div>
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Router>
        <GlobalStyle/>
        <Header/>
        <MultiProvider>
        <Images/>
          <Switch>
            <Route path="/yhteystiedot">
              <Contact />
            </Route>
            <Route path="/maksu">
              <Payment />
            </Route>
            <Route path="/ohjeet">
              <Instructions />
            </Route>
            <Route path="/ehdot">
              <TermsAndConditions />
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
         <Footer/>
        </MultiProvider>
      </Router>
    </Suspense>
  );
}

export default App;
