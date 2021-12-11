import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import CartProvider from './CartContext';
import ItemProvider from './ItemContext';
import ContactProvider from './ContactContext';
import AuthProvider from './AuthContext';
import TimeProvider from './TimeContext';
import { theme } from '../styles/Styles';

const MultiProvider: FC = ({children}) => (
  <TimeProvider>
  <AuthProvider>
  <ItemProvider>
  <CartProvider>
  <ContactProvider>
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
  </ContactProvider>
  </CartProvider>
  </ItemProvider>
  </AuthProvider>
  </TimeProvider>
);

export default MultiProvider;