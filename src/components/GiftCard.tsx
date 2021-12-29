import { ChangeEvent, useState, useContext } from 'react';
import styled from 'styled-components';
import { proxy } from '../utils/axios';
import { CartContext, GiftCard } from "../contexts/CartContext";
import { Label, Error, Input, Button } from '../styles/Styles';


const GiftCardComponent = () => {
  const [ giftCardError, setGiftCardError ] = useState('');
  const { orderId, getCart } = useContext(CartContext);
  const [ giftCard, setGiftCard ] = useState('');
  const submitGiftcard = () => {
    proxy.post<GiftCard>('/giftcard', {
      code: giftCard,
      orderId,
    }).then(() => {
      getCart();
      setGiftCardError('');
    }).catch((error) => {
      if (error && error.response) {
        const { status } = error.response.data;
        if (error.response.status === 429) 
          return setGiftCardError('Liian monta yritystä peräkkäin. Odota hetki');
        switch(status){
          case 'NOMATCH':
            return setGiftCardError('Ostoskorissa ei ole yhteensopivaa lippua');
          case 'DUPLICATE':
            return setGiftCardError('Olet jo lisännyt tämän lahjakortin');
          case 'NOTFOUND':
            return setGiftCardError('Väärä lahjakortin koodi')
          
        }
      }
      setGiftCardError('Tapahtui virhe');
    }).finally(() => {
      setGiftCard('')
    })
  }
  const handleGiftCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGiftCard(e.target.value);
  }
  return(
    <StyledGiftCard>
      <Label>
      Lahjakortti
      <StyledInput
        type="text"
        name="giftCard"
        value={giftCard}
        onChange={handleGiftCardChange}
        placeholder="Lahjakortin koodi tähän"
      ></StyledInput>
      </Label>
      <Error>{giftCardError}</Error>
      <GiftCardButton
        disabled={false || giftCard.length === 0}
        onClick={submitGiftcard}>
        Lisää Lahjakortti
      </GiftCardButton>
  </StyledGiftCard>
  )
}


const StyledGiftCard = styled.div`
  margin: 8px 0;
  & > label> input {
    width: 200px;
  }
`;

const StyledInput = styled(Input)`
  border: solid 1px ${props => props.theme.textColor};
  margin: 0;
`;


const GiftCardButton = styled(Button)`
  font-size: 1rem;
`

export default GiftCardComponent;