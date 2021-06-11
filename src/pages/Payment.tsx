import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Order from '../components/Order';
import { Button, BackButton, Base } from '../styles/Styles';
import { ContactContext } from "../contexts/ContactContext";
import { CartContext } from "../contexts/CartContext";
import { proxy } from '../utils/axios';


interface FormProps {
  formFields: Record<string,string>
}

const Form = ({ formFields }: FormProps) => (
  <form action="https://payment.paytrail.com/e2" method="post">
    {
      Object.keys(formFields).map((key) => 
          <input name={key} type="hidden" value={formFields[key]} key={key} />
        )
    }
    <Button as="input" type="submit" value="Maksa"/>
  </form>
)

const Payment = () => {
  const { customerInfo } = useContext(ContactContext);
  const { cart } = useContext(CartContext);
  const [formFields, setFormFields] = useState<Record<string,string>>({});
  const history = useHistory();
  useEffect(() => {
    if (!cart.length) history.push('/');
    if (!customerInfo.firstName.length) history.push('/yhteystiedot');
    const orderNumber = sessionStorage.getItem('order') || '';
    proxy.post<Record<string,string>>('/payment/create',
      {
        cart: cart.filter(ticket => ticket.amount > 0),
        customerInfo,
        orderNumber,
      }).then((response) => {
      const {data} = response;
      sessionStorage.setItem('order', data.ORDER_NUMBER)
      setFormFields(data);
    });
  },[cart, customerInfo, history]);
  
  return (
    <>
    <Base>
      <Contact>
        <h1>Yhteystiedot</h1>
        <Element>
          {customerInfo.firstName} {customerInfo.lastName}
        </Element>
        <Element>
          {customerInfo.email}
        </Element>
        <Element>
          {customerInfo.phone}
        </Element>
        <Element>
          {customerInfo.address}
        </Element>
        <Element>
          {customerInfo.city}
        </Element>
        <Element>
          {customerInfo.postalCode}
        </Element>
        <Element>
          {customerInfo.extra}
        </Element>
      </Contact>
      <Order></Order>
    </Base>
    <Wrapper>
      <BackButton onClick={() => history.push('/yhteystiedot')}>Takaisin</BackButton>
      <Form formFields={formFields}></Form>
    </Wrapper>
    </>
  );
}


export const Element = styled.div`
  flex: 1;
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
`

const Contact = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 0 1rem;
`;

export default Payment;