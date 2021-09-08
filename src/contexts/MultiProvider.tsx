import { ThemeProvider } from 'styled-components';
import CartProvider from './CartContext';
import ContactProvider from './ContactContext';
import AuthProvider from './AuthContext';
import TimeProvider from './TimeContext';
import { theme } from '../styles/Styles';

const MultiProvider: React.FC = ({children}) => (
  <TimeProvider>
  <AuthProvider>
  <CartProvider>
  <ContactProvider>
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
  </ContactProvider>
  </CartProvider>
  </AuthProvider>
  </TimeProvider>
);

export default MultiProvider;