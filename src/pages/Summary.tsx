import styled from 'styled-components';
import { useContext, useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import Order from '../components/Order';
import { Label, NavigationButton, Select, Checkbox } from '../styles/Styles';
import { ContactContext, CustomerInfo } from "../contexts/ContactContext";
import { CartContext } from "../contexts/CartContext";
import GiftCardComponent from '../components/GiftCard';

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


const Payment = () => {
  const { customerInfo } = useContext(ContactContext);
  const { cart, cartTotal } = useContext(CartContext);
  const [ termsAccepted, setTermsAccepted ] = useState(false);
  const { cartIsEmpty, setPaymentByInvoice } = useContext(CartContext);
  const history = useHistory();

  if (cartIsEmpty) return <Redirect to="/"/>
  return (
    <>
    <h1>Tilauksesi</h1>
    <OrderInformation>
      <ContactComponent customerInfo={customerInfo}/>
      <Section>
        <Order cart={cart} cartTotal={cartTotal}/>
        <GiftCardComponent/>
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
    <NavigationButtons>
      <NavigationButton onClick={() => history.push('/yhteystiedot')}>Takaisin</NavigationButton>
      <NavigationButton
        disabled={!termsAccepted}
        onClick={() => history.push('/maksu')}>
          Maksa
      </NavigationButton>
    </NavigationButtons>
    </>
  );
}

const StyledLink = styled(Link)`
  color: ${props => props.theme.linkColor};
`;


const StyledSelect = styled(Select)`
  font-size: 1rem;
  padding: 8px;
  margin: 0;
  margin-bottom: 12px;
  min-width: 200px;
`

const OrderInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  max-width: ${props => props.theme.commonWidth};
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