import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Order from '../components/Order';
import { Button, Input, Label, NavigationButton, Error, Select } from '../styles/Styles';
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
      switch(result) {
        case 'NOMATCH':
          setGiftCardError('Ostoskorissa ei ole yhteensopivaa lippua');
          break;
        case 'DUPLICATE':
          setGiftCardError('Olet jo lisännyt tämän lahjakortin');
          break;
        default:
          setGiftCardError('');
      }

    }).catch((error) => {
      if (error && error.response) {
        switch(error.response.status){
          case 404:
            return setGiftCardError('Väärä lahjakortin koodi')
          case 429:
            return setGiftCardError('Liian monta yritystä peräkkäin. Odota hetki');
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
      <StyledInput
        type="text"
        name="giftCard"
        value={giftCard}
        onChange={handleGiftCardChange}
        placeholder="Lahjakortin koodi tähän"
      ></StyledInput>
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
  const { cart, cartIsEmpty, cartTotal, giftCards, paymentByInvoice, setPaymentByInvoice } = useContext(CartContext);
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
    if (cartIsEmpty) return history.push('/');
    if (!customerInfo.firstName.length) return history.push('/yhteystiedot');
    const orderNumber = sessionStorage.getItem('order') || '';
    if(cart.length === 0) return;
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
    }).catch(() => {
      const ticketAmountsCorrect = cart.every(item => item.amount <= item.maxAmount);
      if(!ticketAmountsCorrect) return setError('Haluamiasi lippuja ei ole riittävästi saatavilla');
      setError('Ostoskorissa on virhe');
      setSubmitting(true);
    });
  },[cart, cartIsEmpty, cartTotal, customerInfo, history, giftCards]);
  

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
      Maksutapa:
      <StyledSelect onChange={(event) => setPaymentByInvoice(event.target.value === 'invoice')}>
        <option value="web">Verkkomaksu</option>
        <option value="invoice">Lasku</option>
      </StyledSelect>
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
  color: ${props => props.theme.linkColor};
`;

const GiftCardButton = styled(Button)`
  font-size: 1rem;
`

const StyledSelect = styled(Select)`
  font-size: 1rem;
  padding: 8px;
  margin: 0;
  min-width: 200px;
`

const OrderInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  max-width: ${props => props.theme.commonWidth};
`;

const StyledInput = styled(Input)`
  border: solid 1px ${props => props.theme.textColor};
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