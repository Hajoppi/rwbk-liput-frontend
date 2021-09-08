import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TicketSelection from '../../components/TicketSelection';
import { CartContext } from '../../contexts/CartContext';
import { ContactContext } from '../../contexts/ContactContext';
import { useFormInput } from '../../hooks/useFormInput';
import { Wrapper, Label, Input, TextArea, Button, Error } from '../../styles/Styles';
import { proxy } from '../../utils/axios';

const Contacts = () => {
  const { customerInfo, updateInfo } = useContext(ContactContext);
  const firstName = useFormInput(customerInfo.firstName);
  const lastName = useFormInput(customerInfo.lastName);
  const email = useFormInput(customerInfo.email);
  const address = useFormInput(customerInfo.address);
  const postalCode = useFormInput(customerInfo.postalCode);
  const phone = useFormInput(customerInfo.phone);
  const city = useFormInput(customerInfo.city);
  const extra = useFormInput(customerInfo.extra);
  useEffect(() => {
    updateInfo({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      address: address.value,
      city: city.value,
      extra: extra.value,
      phone: phone.value,
      postalCode: postalCode.value,
    });
  },[
    updateInfo, 
    firstName.value,
    lastName.value,
    email.value,
    address.value,
    city.value,
    extra.value,
    phone.value,
    postalCode.value,
  ]);
  return (
    <form>
      <Label>
        Etunimi*
        <Input {...firstName} type="text" name="firstname" required/>
      </Label>
      <Label>
        Sukunimi*
        <Input {...lastName} type="text" name="lastname" required/>
      </Label>
      <Label>
        Sähköposti*
        <Input {...email} type="email" name="email" required/>
      </Label>
      <Label>
        Postiosoite*
        <Input {...address} type="text"  name="address" required/>
      </Label>
      <Label>
        Postinumero*
        <Input {...postalCode}type="text"  name="postal_code" required/>
      </Label>
      <Label>
        Postitoimipaikka*
        <Input {...city} type="text"  name="city" required/>
      </Label>
      <Label>
        Puhelinnumero* (ilman välilöyntejä)
        <Input {...phone}
              type="tel"
              title="Varmista että puhelinnumerossa ei ole välilyöntejä"
              pattern="[0-9+\-]*"
              name="phone"
              required/>
      </Label>
      <Label>
        Erityistoiveet
        <TextArea {...extra}/>
      </Label>
    </form>
  );
}

const RowWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  @media screen and (max-width: ${props => props.theme.commonWidth}) {
    flex-direction: column;
  }
`;

const Element = styled.div`
  flex: 1;
  padding: 0 5px;
`;

const Create = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const { customerInfo, resetInfo } = useContext(ContactContext);
  const { cart, resetCart } = useContext(CartContext);

  const createOrder = () => {
    proxy.post('/admin/order', {customerInfo, cart}).then(() =>{
      resetInfo();
      resetCart();
      window.scrollTo({top: 0});
      setStatus('Tilaus onnistui');
      setError('');
    }).catch(() => {
      setStatus('')
      setError('Tilaus epäonnistui');
    });
  };

  return (
    <Wrapper>
      <p><b>{status}</b></p>
      <RowWrapper>
        <Element>
          <h2>Yhteystiedot</h2>
          <Contacts />
        </Element>
        <Element>
          <h2>Liput</h2>
          <TicketSelection />
          <Error>{error}</Error>
          <Button onClick={createOrder}>Luo tilaus</Button>
        </Element>
      </RowWrapper>
    </Wrapper>

  );
}

export default Create;