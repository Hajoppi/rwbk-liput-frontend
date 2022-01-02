import { useHistory, useParams } from "react-router";
import { useEffect, useState } from 'react';
import styled from "styled-components";

import { CustomerInfo, contactContextDefault } from "../contexts/ContactContext";
import { proxy } from '../utils/axios';
import ContactForm from "../components/ContactForm";
import { Wrapper } from "../styles/Styles";
import { CartItem } from "../contexts/CartContext";
import Order from "../components/Order";


const Modify = () => {
  const { orderId } = useParams<{orderId: string}>();
  const [ customerInfo, setInfo ] = useState<CustomerInfo>(contactContextDefault.customerInfo);
  const [ items, setItems ] = useState<CartItem[]>([]);
  const [ sending, setSending ] = useState(false);
  const [ message, setMessage ] = useState("")
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
  const history = useHistory();
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