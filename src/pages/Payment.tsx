import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
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
  const [giftCard, setGiftCard] = useState('');
  const { cart, giftCards, addGiftCard } = useContext(CartContext);
  const [formFields, setFormFields] = useState<Record<string,string>>({});
  const history = useHistory();
  const handleGiftCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGiftCard(e.target.value);
  }
  const submitClick = () => {
    addGiftCard(giftCard);
  }
  useEffect(() => {
    if (!cart.length) history.push('/');
    if (!customerInfo.firstName.length) history.push('/yhteystiedot');
    const orderNumber = sessionStorage.getItem('order') || '';
    proxy.post<Record<string,string>>('/payment/create',
      {
        cart: cart.filter(ticket => ticket.amount > 0),
        customerInfo,
        giftCards,
        orderNumber,
      }).then((response) => {
      const { data } = response;
      sessionStorage.setItem('order', data.ORDER_NUMBER)
      setFormFields(data);
    });
  },[cart, giftCards, customerInfo, history]);
  
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
      {giftCards}
      <Order></Order>
    </Base>
      <Label>
        Lahjakortti
        <Input type="text" name="giftCard" onChange={handleGiftCardChange}></Input>
      </Label>
      <Button onClick={submitClick}>Lisää Lahjakortti</Button>
    <Wrapper>
      <BackButton onClick={() => history.push('/yhteystiedot')}>Takaisin</BackButton>
      <Form formFields={formFields}></Form>
    </Wrapper>
    </>
  );
}
const Label = styled.label`
  color: ${props => props.theme.neutral};
  font-size: 1rem;
`;
const Input = styled.input`
  display: block;
  background: ${props => props.theme.backgroundColor};
  border: solid 2px ${props => props.theme.neutralLight};
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  width: 100%;
  margin-bottom: 2rem;
  ::placeholder{
    //color: hsl(0, 0%, 60%);
    color: ${props => props.theme.backgroundColor};
  }
  &:focus {
    outline-width: 0;
    border-color: ${props => props.theme.neutralActive};
  }
`;
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