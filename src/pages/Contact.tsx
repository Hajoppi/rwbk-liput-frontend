import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import styled from "styled-components";
import { Wrapper, NavigationButton, Input, Label  } from '../styles/Styles';
import { ContactContext } from "../contexts/ContactContext";
import { useFormInput } from '../hooks/useFormInput';
import {useHistory} from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const ContactForm = () => {
  const history = useHistory();
  const {customerInfo, updateInfo} = useContext(ContactContext);
  const firstName = useFormInput(customerInfo.firstName)
  const lastName = useFormInput(customerInfo.lastName)
  const email = useFormInput(customerInfo.email)
  const address = useFormInput(customerInfo.address)
  const postalCode = useFormInput(customerInfo.postalCode)
  const phone = useFormInput(customerInfo.phone)
  const city = useFormInput(customerInfo.city);
  const extra = useFormInput(customerInfo.extra);

  const formReady =  firstName.value
                  && lastName.value
                  && email.value
                  && address.value
                  && postalCode.value
                  && phone.value
                  && city.value;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    history.push('/maksu');
  }
  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Etunimi
        <Input {...firstName}   type="text" name="firstname"   placeholder="Etunimi"       required/>
      </Label>
      <Label>
        Sukunimi
        <Input {...lastName}    type="text" name="lastname"   placeholder="Sukunimi"      required/>
      </Label>
      <Label>
        Sähköposti
        <Input {...email}       type="email" name="email"  placeholder="Sähköposti"    required/>
      </Label>
      <Label>
        Postiosoite
        <Input {...address}     type="text"  name="address" placeholder="Postiosoite"   required/>
      </Label>
      <Label>
        Postinumero
        <Input {...postalCode}  type="text"  name="postal_code" placeholder="Postinumero"   required/>
      </Label>
      <Label>
        Postitoimipaikka
        <Input {...city}        type="text"  name="city" placeholder="Postitoimipaikka"required/>
      </Label>
      <Label>
        Puhelinnumero
        <Input {...phone}
              type="tel"
              title="Varmista että puhelinnumerossa ei ole välilyöntejä"
              placeholder="Puhelinnumero"
              pattern="[0-9+\-]*"
              name="phone"
              required/>
      </Label>
      <Label>
        Erityistoiveet
        <TextArea {...extra}    placeholder="Erityistoiveita"/>
      </Label>
      <Select name="country" id="country" defaultValue={0} disabled>
        <option value="finland">Suomi</option>
      </Select>
      <NavigationButtons>
        <NavigationButton onClick={(e: React.FormEvent) => {e.preventDefault(); history.push('/')}}>Takaisin</NavigationButton>
        <NavigationButton disabled={!formReady}>Seuraava</NavigationButton>
      </NavigationButtons>
    </form>
  );
}

const Contact = () => {
  const { cartIsEmpty } = useContext(CartContext);
  if (cartIsEmpty) return <Redirect to="/"/>
  return (
    <Wrapper>
      <h1>Yhteystiedot</h1>
      <ContactForm />
    </Wrapper>
  )
}

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
`

const TextArea = styled.textarea`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  display: block;
  background: ${props => props.theme.backgroundColor};
  border: solid 2px ${props => props.theme.neutralLight};
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  ::placeholder{
    //color: hsl(0, 0%, 60%);
    color: ${props => props.theme.backgroundColor};
  }
  padding: 8px;
  margin-top: 8px;
  resize: none;
  width: 100%;
  height: 200px;
  &:focus {
    outline-width: 0;
    border-color: ${props => props.theme.neutralActive};
  }
`;

const Select = styled.select`
  display: block;
  background: ${props => props.theme.backgroundColor};
  border: solid 2px ${props => props.theme.neutralLight};
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  padding: 8px;
  margin: 8px 0 32px 0;
  width: 100%;
`

export default Contact