import { ThemeProvider } from 'styled-components';
import CartProvider from './CartContext';
import ContactProvider from './ContactContext';
import AuthProvider from './AuthContext';
import { theme } from '../styles/Styles';

const MultiProvider: React.FC = ({children}) => (
  <CartProvider>
  <ContactProvider>
  <AuthProvider>
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
  </AuthProvider>
  </ContactProvider>
  </CartProvider>
);

export default MultiProvider;