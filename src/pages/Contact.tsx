import { Redirect, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { Wrapper } from '../styles/Styles';
import { CartContext } from '../contexts/CartContext';
import ContactForm from '../components/ContactForm';
import { ContactContext, CustomerInfo } from '../contexts/ContactContext';

const Contact = () => {
  const { cartIsEmpty } = useContext(CartContext);
  const history = useHistory();
  const {customerInfo, updateInfo} = useContext(ContactContext);
  const handleUpdate = (customerInfo: CustomerInfo) => {
    updateInfo(customerInfo)
    history.push('/yhteenveto');
  }
  if (cartIsEmpty) return <Redirect to="/"/>
  return (
    <Wrapper>
      <h1>Yhteystiedot</h1>
      <ContactForm customerInfo={customerInfo} updateInfo={handleUpdate} />
    </Wrapper>
  )
}

export default Contact