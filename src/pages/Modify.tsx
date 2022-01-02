import { useHistory, useParams } from "react-router";
import { useEffect, useState } from 'react';
import styled from "styled-components";

import { CustomerInfo, contactContextDefault } from "../contexts/ContactContext";
import { proxy } from '../utils/axios';
import ContactForm from "../components/ContactForm";
import { Wrapper, NavigationButton } from "../styles/Styles";
import { CartItem } from "../contexts/CartContext";
import Order from "../components/Order";


const Modify = () => {
  const { orderId } = useParams<{orderId: string}>();
  const [ customerInfo, setInfo ] = useState<CustomerInfo>(contactContextDefault.customerInfo);
  const [ items, setItems ] = useState<CartItem[]>([]);
  const [ cart, setCart ] = useState<CartItem[]>([]);
  const [ sending, setSending ] = useState(false);
  const [ message, setMessage ] = useState("");
  const history = useHistory();
  const updateInfo = (customerInfo: CustomerInfo) => {
    setSending(true);
    proxy.put('order2/contact', {
      orderId,
      customerInfo,
    }).then(() => {
      setSending(false);
      setMessage('Tiedot päivitetty');
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth',
      });
    });
  }
  useEffect(() => {
    if (!orderId) return
    proxy.get(`order2/contact/${orderId}`).then(response => {
      setInfo(response.data);
    }).catch(() => {
      history.push('/');
    });
    proxy.get(`order2/item/${orderId}`).then(response => {
      setItems(response.data);
    }).catch(() => {
      history.push('/');
    });
    proxy.get(`order2/cart/${orderId}`).then(response => {
      setCart(response.data);
    }).catch(() => {
      history.push('/');
    });
  },[orderId, history]);
  const cartTotal = items.reduce((acc, item) => acc + item.cost * item.quantity, 0)
  return (
    <StyledWrapper>
      <p>{message}</p>
      <Element>
        <ContactForm 
          customerInfo={customerInfo}
          updateInfo={updateInfo}
          sending={sending}
        />
      </Element>
      <Element>
        <Order cart={items} cartTotal={cartTotal} />
      </Element>
      {cart.length > 0 && <NavigationButton
        onClick={() => history.push(`/maksu/${orderId}`)}>
          Maksa
      </NavigationButton>}
    </StyledWrapper>
  )
}

const StyledWrapper = styled(Wrapper)`
  display: flex;
  gap: 16px;
`;

const Element = styled.div`
  flex: 1;
`;


export default Modify;