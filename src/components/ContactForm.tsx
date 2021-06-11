import React, { useContext, useState } from "react";
import {useHistory} from 'react-router-dom';
import styled from "styled-components";
import { ContactContext } from "../contexts/ContactContext";
import { Button, BackButton } from "../styles/Styles";

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
    <Form onSubmit={handleSubmit}>
      <Label>
        Etunimi
        <Input {...firstName}   type="text" name="fname"   placeholder="Etunimi"       required/>
      </Label>
      <Label>
        Sukunimi
        <Input {...lastName}    type="text" name="lname"   placeholder="Sukunimi"      required/>
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
      <Wrapper>
        <BackButton onClick={(e: React.FormEvent) => {e.preventDefault(); history.push('/')}}>Takaisin</BackButton>
        <Button>Seuraava</Button>
      </Wrapper>
    </Form>
  );
}

const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }
  const handleReset = () => {
    setValue("");
  }
  return {
    value,
    onChange: handleChange,
    onReset: handleReset
  };
}

const Wrapper = styled.div`
  display: flex;
`

const Form = styled.form`
  width: 100%;
`

const Label = styled.label`
  color: ${props => props.theme.neutralActive};
`;

const Input = styled.input`
  display: block;
  background: ${props => props.theme.backgroundColor};
  border: none;
  border-bottom: solid 2px ${props => props.theme.neutralLight};
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  width: 100%;
  margin-bottom: 2rem;
  ::placeholder{
    //color: hsl(0, 0%, 60%);
    color: ${props => props.theme.backgroundColor};
  }
  &:focus {
    outline-width: 0;
    border-color: ${props => props.theme.neutralActive};
  }
`;

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
  padding: 0.5rem;
  margin-top: 0.5rem;
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
  padding: 0.5rem;
  margin: 0.5rem 0 2rem 0;
  width: 100%;
`

export default ContactForm