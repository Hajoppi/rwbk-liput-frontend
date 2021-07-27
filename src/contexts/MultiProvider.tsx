import { ThemeProvider } from 'styled-components';
import CartProvider from './CartContext';
import ContactProvider from './ContactContext';
import AuthProvider from './AuthContext';
import TimeProvider from './TimeContext';
import { theme } from '../styles/Styles';

const MultiProvider: React.FC = ({children}) => (
  <CartProvider>
  <ContactProvider>
  <AuthProvider>
  <TimeProvider>
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
  </TimeProvider>
  </AuthProvider>
  </ContactProvider>
  </CartProvider>
);

export default MultiProvider;