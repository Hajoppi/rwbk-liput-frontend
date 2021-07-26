import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Order from '../components/Order';
import { Button, BackButton, Base } from '../styles/Styles';
import { ContactContext, CustomerInfo } from "../contexts/ContactContext";
import { CartContext, GiftCard } from "../contexts/CartContext";
import { proxy } from '../utils/axios';



const ContactComponent = ({customerInfo}: {customerInfo: CustomerInfo}) => (
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
);

const GiftCardComponent = ({isSubmitting, orderId}: {isSubmitting: boolean, orderId: string}) => {
  const [ giftCardError, setGiftCardError ] = useState('');
  const { giftCards, addGiftCard } = useContext(CartContext);
  const [ giftCard, setGiftCard ] = useState('');
  const submitGiftcard = () => {
    proxy.post<GiftCard>('order/giftcard', {
      code: giftCard,
      orderId,
    }).then((response) => {
      const { data } = response;
      const result = addGiftCard(data);
      setGiftCardError('');
      if (!result) setGiftCardError('Et voi lisätä tätä lahjakorttia');
    }).catch((error) => {
      if (error && error.response) {
        switch(error.response.status){
          case 404:
            return setGiftCardError('Väärä lahjakortin koodi')
          case 429:
            return setGiftCardError('Liian monta yritystä peräkkäin');
        }
      }
      setGiftCardError('Tapahtui virhe');
    }).finally(() => {
      setGiftCard('')
    })
  }
  const handleGiftCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGiftCard(e.target.value);
  }
  return(
    <div>
      {giftCards.length > 0 && <h2>Lahjakortit</h2>}
      {giftCards.map(card => (
        <div key={card.id}>
          <Element>{card.code}</Element>
          <Element>{card.balance}€</Element>
        </div>
      ))}
      <Label>
      Lahjakortti
      <Input type="text" name="giftCard" value={giftCard} onChange={handleGiftCardChange}></Input>
      </Label>
      <Error>{giftCardError}</Error>
      <GiftCardButton
        disabled={isSubmitting || giftCard.length === 0}
        onClick={submitGiftcard}>
        Lisää Lahjakortti
      </GiftCardButton>
  </div>
  )
}

const Payment = () => {
  const { customerInfo } = useContext(ContactContext);
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [ error, setError ] = useState('');
  const [ orderId, setOrderId ] = useState('');
  const { cart, giftCards, paymentByInvoice, setPaymentByInvoice } = useContext(CartContext);
  const [ formFields, setFormFields ] = useState<Record<string,string>>({});
  const history = useHistory();

  const verifyPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    proxy.post<string>('/order/start',
      {
        cart: cart.filter(item => item.amount > 0),
        customerInfo,
        orderNumber: orderId,
        giftCards,
        paymentByInvoice,
      }).then((response) => {
        const nextPaymentProcess = response.data;
        if(nextPaymentProcess === 'skip'){
          return history.push(`/success?STATUS=skip&ORDER_NUMBER=${orderId}`);
        }
        form.submit();
        setSubmitting(false);
    }).catch((error) => {
      setSubmitting(false);
      if (error && error.response && error.response.status === 404) {
        return setError('Tilaus on vanhentunut, päivitä sivu')
      }
      setError('Tilauksen maksussa tapahtui virhe');
    });
  }
  useEffect(() => {
    if (!cart.length) history.push('/');
    if (!customerInfo.firstName.length) history.push('/yhteystiedot');
    const orderNumber = sessionStorage.getItem('order') || '';
    proxy.post<Record<string,string>>('/order/create',
      {
        cart: cart.filter(item => item.amount > 0),
        customerInfo,
        orderNumber,
        giftCards
      }).then((response) => {
      const { data } = response;
      sessionStorage.setItem('order', data.ORDER_NUMBER);
      setOrderId(data.ORDER_NUMBER);
      setFormFields(data);
    });
  },[cart, customerInfo, history, giftCards]);
  
  return (
    <>
    <StyledBase>
    <ContactComponent customerInfo={customerInfo}/>
      <OrderSection>
        <Order />
        <GiftCardComponent orderId={orderId} isSubmitting={isSubmitting} />
      </OrderSection>
    </StyledBase>
    <Label>
      Haluan maksaa laskulla
      <Checkbox type="checkbox" checked={paymentByInvoice} onChange={(event) => setPaymentByInvoice(event.target.checked)}/>
    </Label>
    <Error>{error}</Error>
    <Wrapper>
      <BackButton disabled={isSubmitting} onClick={() => history.push('/yhteystiedot')}>Takaisin</BackButton>

      <form onSubmit={verifyPayment} action="https://payment.paytrail.com/e2" method="post">
        {
          Object.keys(formFields).map((key) => 
              <input name={key} type="hidden" value={formFields[key]} key={key} />
            )
        }
        <Button disabled={isSubmitting} as="input" type="submit" value="Maksa"/>
      </form>
    </Wrapper>
    </>
  );
}

const Checkbox = styled.input`
  height: 1rem;
  width: 1rem;
`

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
  margin-bottom: 1rem;

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