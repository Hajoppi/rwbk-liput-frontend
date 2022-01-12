import { FormEvent } from 'react';
import { NavigationButton, Input, Label, TextArea, Select } from '../styles/Styles';
import { CustomerInfo } from "../contexts/ContactContext";
import { useFormInput } from '../hooks/useFormInput';

type PropType = {
  customerInfo: CustomerInfo;
  updateInfo: (customerInfo: CustomerInfo) => void;
  sending?: boolean;
  submitButtonText?: string;
}

const ContactForm = ({ customerInfo, updateInfo, sending = false, submitButtonText = 'Päivitä' }: PropType) => {
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
  const handleSubmit = (e: FormEvent) => {
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
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
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
      <br/>
      <Label>
        Maa
        <Select name="country" id="country" defaultValue={0} disabled>
          <option value="finland">Suomi</option>
        </Select>
      </Label>
      <NavigationButton type="submit" disabled={!formReady || sending}>{submitButtonText}</NavigationButton>
    </form>
  </>
  );
}

export default ContactForm;