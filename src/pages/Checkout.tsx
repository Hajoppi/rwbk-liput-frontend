import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { proxy } from '../utils/axios';
import { CartContext } from '../contexts/CartContext';
import { Redirect } from 'react-router';

interface PaymentProvider {
  id: string;
  name: string;
  icon: string;
  svg: string;
  group: string;
  url: string;
  parameters: {
    name: string,
    value: string
  }[];
}

const Provider = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  margin: 16px;
`
const ProviderButton = styled.button`
  background: transparent;
  border: 1px solid black;
  border-radius: 5px;
`;

const ProviderImage = styled.img`
  height: 100%;
  width: 100%;
`

const ProviderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const toQueryString = (params: Record<string,string>) => 
  Object.keys(params).map(key => `${key}=${params[key]}`).join('&');


const PaymentProviders = () => {
  const [paymentProviders, setProviders] = useState<PaymentProvider[]>([]);
  const [skipParams, setSkipParams] = useState<Record<string,string>>({})
  const { orderId } = useContext(CartContext);
  useEffect(() => {
    if (!orderId) return
    proxy.post(
      '/payment/create',
      {
        orderId,
      }
    ).then(response => {
      if(response.data.status === 'skip') {
        return setSkipParams(response.data.params);
      }
      setProviders(response.data.providers)
      })
    .catch(error => {});
  },[orderId]);
  if (skipParams['checkout-reference']===orderId) {
    return <Redirect to={`/success?${toQueryString(skipParams)}`}></Redirect>
  }
  return (
    <ProviderWrapper>
      {paymentProviders.map(provider =>
      <Provider key={provider.name} method="POST" action={provider.url}>
        {provider.parameters && provider.parameters.map(parameter => 
          <input key={parameter.name} type='hidden' name={parameter.name} value={parameter.value} />
        )}
        <ProviderButton><ProviderImage src={provider.svg} alt={`${provider.name}-icon`}/></ProviderButton>
      </Provider>)}
    </ProviderWrapper>
  );
}

const Checkout = () => {
  return <PaymentProviders/>;
}


export default Checkout;