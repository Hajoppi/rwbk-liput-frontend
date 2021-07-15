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

type CartItem = {
  id: string;
  name: string;
  cost: number;
  amount: number;
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
  const [ orderId, setOrderId] = useState('');
  const [ giftCard, setGiftCard ] = useState('');
  const [ giftCardError, setGiftCardError ] = useState('');
  const { cart, addItemToCart } = useContext(CartContext);
  const [formFields, setFormFields] = useState<Record<string,string>>({});
  const history = useHistory();
  const handleGiftCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGiftCard(e.target.value);
  }
  const submitClick = () => {
    proxy.post<CartItem>('payment/giftcard', {
      code: giftCard,
      orderId,
    }).then((response) => {
      const { data } = response;
      const result = addItemToCart(data);
      if (!result) setGiftCardError('Lahjakortti on jo käytössä');
    }).catch((error) => {
      console.log(error.response);
      if (error && error.response && error.response.status === 404) {
        return setGiftCardError('Väärä lahjakortin koodi')
      }
      setGiftCardError('Tapahtui virhe');
    })
  }
  useEffect(() => {
    if (!cart.length) history.push('/');
    if (!customerInfo.firstName.length) history.push('/yhteystiedot');
    const orderNumber = sessionStorage.getItem('order') || '';
    proxy.post<Record<string,string>>('/payment/create',
      {
        cart: cart.filter(item => item.amount > 0),
        customerInfo,
        orderNumber,
      }).then((response) => {
      const { data } = response;
      sessionStorage.setItem('order', data.ORDER_NUMBER);
      setOrderId(data.ORDER_NUMBER);
      setFormFields(data);
    });
  },[cart, customerInfo, history]);
  
  return (
    <>
    <StyledBase>
      <Contact>
        <h2>Yhteystiedot</h2>
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
      <OrderSection>
        <Order></Order>
        <Label>
          Lahjakortti
          <Input type="text" name="giftCard" onChange={handleGiftCardChange}></Input>
        </Label>
        <Error>{giftCardError}</Error>
        <GiftCardButton onClick={submitClick}>Lisää Lahjakortti</GiftCardButton>
      </OrderSection>
    </StyledBase>

    <Wrapper>
      <BackButton onClick={() => history.push('/yhteystiedot')}>Takaisin</BackButton>
      <Form formFields={formFields}></Form>
    </Wrapper>
    </>
  );
}

const Error = styled.div`
  color: ${props => props.theme.error};
  height: 1rem;
`
const Label = styled.label`
  margin-top: 1rem;
  color: ${props => props.theme.neutral};
  font-size: 1rem;
`;

const GiftCardButton = styled(Button)`
  font-size: 1rem;
  margin-top: 0.25rem;
`

const StyledBase = styled(Base)`
  margin-bottom: 2rem;

`
const Input = styled.input`
  display: block;
  background: ${props => props.theme.backgroundColor};
  border: solid 2px ${props => props.theme.neutralLight};
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  width: 100%;
  max-width: 200px;
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
  font-size: 1.25rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  &> * {
    margin: 0 4px;
  }
`

const OrderSection = styled.div`
  flex: 2;
  padding: 0 1rem;
`

const Contact = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  padding: 0 1rem;
`;

export default Payment;