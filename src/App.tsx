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
const Summary = lazy(() => import('./pages/Summary'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Admin = lazy(() => import('./pages/admin/Admin'));
const Login = lazy(() => import('./pages/admin/Login'));
const PlaceOrder = lazy(() => import('./pages/admin/PlaceOrder'));
const AdminCreate = lazy(() => import('./pages/admin/Create'));
const GeneralAdmin = lazy(() => import('./pages/admin/General'));
const Modify = lazy(() => import('./pages/Modify'));

const allowedUrls = ['liput.rwbk.fi', 'localhost', '127.0.0.1'];
const correctOrigin = allowedUrls.some(url => window.location.origin.indexOf(url) >= 0);

const App = () => {
  if (!correctOrigin) return <div>Ei näin</div>
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Router>
        <GlobalStyle/>
        <MultiProvider>
        <Header/>
        <Images/>
        <Switch>
          <Route path="/yhteystiedot">
            <Contact />
          </Route>
          <Route path="/yhteenveto">
            <Summary />
          </Route>
          <Route path="/maksu">
            <Checkout />
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
          <Route path="/muokkaa/:orderId">
            <Modify />
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
          <ProtectedRoute path="/admin/create" exact>
            <AdminCreate />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/general" exact>
            <GeneralAdmin />
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
