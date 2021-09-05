import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
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
  const [paymentStatus, setPaymentStatus] = useState('LOADING')
  const [isValid, setValid] = useState<boolean | undefined>(undefined);
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
  },[paymentStatus, resetCart, resetInfo, isValid]);

  const messages: Record<string,string> = {
    PAID: 'Maksu onnistui',
    CANCELLED: 'Maksu epäonnistui',
    LOADING: 'Lataa'
  }
  let message = messages[paymentStatus]

  if(isValid === false) return (
    <Wrapper>
    <h1>Virheellinen pyyntö</h1>
    <p>
      Maksussanne tapathui virhe, emmekä voineet varmistaa tietoja. Olkaa hyvä ja tehkää uusi tilaus.
    </p>
    <p>
      Jos virhe toistuu, ottakaa yhteyttä sähköpostitse osoitteeseen liputsalo at rwbk piste fi.
    </p>
    <Button onClick={() => history.push('/maksu')}>Palaa tilaukseen</Button>
    </Wrapper>
  );
  return (
    <Wrapper>
      <h1>{message}</h1>
      { paymentStatus === 'CANCELLED' ? (
        <>
          <p>
            Maksunne keskeytyi. Olkaa hyvä ja tehkää uusi tilaus.
          </p>
          <p>
            Ongelmatilanteissa ottakaa yhteyttä sähköpostitse osoitteeseen liputsalo at rwbk piste fi.
          </p>
          <Button onClick={() => history.push('/maksu')}>Palaa tilaukseen</Button>
        </>
      ) : null
      }
      {paymentStatus === 'PAID' ?
      <>
        <p>Tilauksenne on valmis! Teille on lähetetty sähköposti, jossa on tilauksenne yhteenveto.</p>
        <p>Käsiteltyämme kaikki tilaukset teille lähetetään lippunne.</p>
      </>
      : null}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  max-width: ${props => props.theme.commonWidth};
`


export default CallbackPage