import ContactForm from '../components/ContactForm';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/CartContext';
import { useContext } from 'react';

const Contact = () => {
  const { cartTotal } = useContext(CartContext);
  const history = useHistory();
  if (!cartTotal) history.push('/');
  return (
    <Base>
      <Heading>Yhteystiedot</Heading>
      <ContactForm />
    </Base>
  )
}
const Heading = styled.h1`
  text-align: left;
  font-size: 2rem;
  width: 100%;
  margin-top: 0rem;
`
const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${props => props.theme.commonWidth};
  width: 100%;
`;

export default Contact