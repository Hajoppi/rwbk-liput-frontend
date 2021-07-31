import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Order from '../components/Order';
import { Button, Input, Label, NavigationButton } from '../styles/Styles';
import { ContactContext, CustomerInfo } from "../contexts/ContactContext";
import { CartContext, GiftCard } from "../contexts/CartContext";
import { proxy } from '../utils/axios';

const ContactComponent = ({customerInfo}: {customerInfo: CustomerInfo}) => (
  <Section>
    <div>
      {customerInfo.firstName} {customerInfo.lastName}
    </div>
    <div>
      {customerInfo.email}
    </div>
    <div>
      {customerInfo.phone}
    </div>
    <div>
      {customerInfo.address}
    </div>
    <div>
      {customerInfo.city}
    </div>
    <div>
      {customerInfo.postalCode}
    </div>
    <div>
      {customerInfo.extra}
    </div>
</Section>
);

const GiftCardComponent = ({isSubmitting, orderId}: {isSubmitting: boolean, orderId: string}) => {
  const [ giftCardError, setGiftCardError ] = useState('');
  const { addGiftCard } = useContext(CartContext);
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
    <StyledGiftCard>
      <Label>
      Lahjakortti
      <StyledInput type="text" name="giftCard" value={giftCard} onChange={handleGiftCardChange}></StyledInput>
      </Label>
      <Error>{giftCardError}</Error>
      <GiftCardButton
        disabled={isSubmitting || giftCard.length === 0}
        onClick={submitGiftcard}>
        Lisää Lahjakortti
      </GiftCardButton>
  </StyledGiftCard>
  )
}

const PostalComponent = () => {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const [postalAdded, setPostal] = useState(false);

  const handlePostalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;
    setPostal(checked);
    if (checked) return addItemToCart({
        amount: 1,
        cost: 3,
        id: '60571',
        maxAmount: 0,
        name: 'Postitus'
      });
    removeItemFromCart('60571');
  }
  return(
    <Label>
      Haluan saada liput myös postitettuna (3€)
    <Checkbox type="checkbox" checked={postalAdded} onChange={handlePostalChange}/>
  </Label>
  )
}

const Payment = () => {
  const { customerInfo } = useContext(ContactContext);
  const [ termsAccepted, setTermsAccepted ] = useState(false);
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
      if (error && error.response) {
        switch (error.response.status) {
          case 404:
            return setError('Tilaus on vanhentunut, päivitä sivu');
          case 405:
            return setError('Ennakkomyynnin aikana tarvitset lahjakortin tehdäksesi tilauksen');
        }
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
    <h1>Tilauksesi</h1>
    <OrderInformation>
      <ContactComponent customerInfo={customerInfo}/>
      <Section>
        <Order />
        <PostalComponent/>
        <GiftCardComponent orderId={orderId} isSubmitting={isSubmitting} />
      </Section>
    </OrderInformation>
    <Label>
      Haluan maksaa laskulla
      <Checkbox type="checkbox" checked={paymentByInvoice} onChange={(event) => setPaymentByInvoice(event.target.checked)}/>
    </Label>
    <Label>
      Olen lukenut <StyledLink to={
        {
        pathname: "/ehdot",
        state: {prev: history.location.pathname}
        }}>
        tilausehdot
      </StyledLink>
      <Checkbox type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)}/>
    </Label>
    <Error>{error}</Error>
    <NavigationButtons>
      <NavigationButton disabled={isSubmitting} onClick={() => history.push('/yhteystiedot')}>Takaisin</NavigationButton>
      <form onSubmit={verifyPayment} action="https://payment.paytrail.com/e2" method="post">
        {
          Object.keys(formFields).map((key) => 
              <input name={key} type="hidden" value={formFields[key]} key={key} />
            )
        }
        <NavigationButton disabled={isSubmitting || !termsAccepted} as="input" type="submit" value="Maksa"/>
      </form>
    </NavigationButtons>
    </>
  );
}

const StyledGiftCard = styled.div`
  margin: 8px 0;
  & > label> input {
    width: 200px;
  }
`;

const Checkbox = styled.input`
  height: 1rem;
  width: 1rem;
  background: transparent;
`
const StyledLink = styled(Link)`
  color: ${props => props.theme.neutral};
`;

const Error = styled.div`
  color: ${props => props.theme.error};
  height: 1rem;
  font-size: 1rem;
  margin: 2px 0;
`

const GiftCardButton = styled(Button)`
  font-size: 1rem;
`

const OrderInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  max-width: ${props => props.theme.commonWidth};
`;

const StyledInput = styled(Input)`
  border: solid 2px ${props => props.theme.neutralLight};
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
`

const Section = styled.section`
  width: 100%;
  max-width: 350px;
  font-size: 1.25rem;
  margin: 8px;
`


export default Payment;