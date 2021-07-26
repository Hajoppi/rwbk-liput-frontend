import { useContext, useEffect, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { proxy } from '../utils/axios';
import { ContactContext } from "../contexts/ContactContext";
import { CartContext } from "../contexts/CartContext";
import { Button } from '../styles/Styles';

const parseQueryString = (queryString: string): Record<string,string> =>
  queryString.slice(1).split('&').map((string) => string.split('=')).reduce((a,b) => {
  const temp: Record<string, string> = {}
  temp[decodeURIComponent(b[0])] = decodeURIComponent(b[1])
  return {...a, ...temp}
},{});

const CallbackPage = () => {
  const queryString = useLocation().search;
  const history = useHistory();
  const [paymentStatus, setPaymentStatus] = useState('')
  const [isValid, setValid] = useState(true);
  const { resetInfo } = useContext(ContactContext);
  const { resetCart } = useContext(CartContext);

  useEffect(() =>{
    if (!queryString) {
      history.push('/');
    }
    const parsed = parseQueryString(queryString);
    if (parsed.STATUS === 'skip') {
      proxy.post('/order/verifySkip', { orderId: parsed.ORDER_NUMBER }).then(() => {
        setValid(true);
      }).catch(() => {
        setValid(false);
      }).finally(() => {
        setPaymentStatus('PAID');
      });
    }
    else {
      proxy.post('/order/verify', { data: parsed }).then(() => {
        setValid(true)
      }).catch(() => {
        setValid(false);
      }).finally(() => {
        setPaymentStatus(parsed.STATUS);
      });
    }
  },[queryString, history]);

  useEffect(() => {
    if(paymentStatus === 'PAID' && isValid) {
      resetCart();
      resetInfo();
      sessionStorage.removeItem('order');
    }
  },[paymentStatus, resetCart, resetInfo, isValid])
  let message = paymentStatus === 'PAID' ? "Maksu onnistui" : "Maksu epäonnistui";
  message = isValid ? message : "Virheellinen pyyntö";

  return (
    <div>
      <h1>{message}</h1>
      { paymentStatus === 'CANCELLED' ? 
        <Button onClick={() => history.push('/maksu')}>Palaa maksuun</Button> : null
      }
      {paymentStatus === 'PAID' && isValid ? 
      <p>Lippunne lähetetään teille sähköpostilla 1-4 arkipäivän kuluessa</p>
      : null}
    </div>
  );
}

export default CallbackPage