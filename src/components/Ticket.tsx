import { useContext } from 'react';
import styled from 'styled-components';
import {Button, Label} from '../styles/Styles';
import { CartContext } from '../contexts/CartContext';
import { Item } from '../contexts/ItemContext';

type PropsType = {
  item: Item;
}

const TicketInfoText = ({item}: {item: Item}) => {
  const maxAmount = item.limit;
  if (maxAmount === 0)
    return <div><Label>lipputyyppi on loppunut</Label></div>
  if (maxAmount < 30 )
    return <div><Label>lipputyyppi on vähissä</Label></div>
  return null;
}


const Ticket = (props: PropsType) => {
  const { item } = props;
  const { cart, addItemToCart, removeItemFromCart } = useContext(CartContext);
  const quantity = cart.find(cartItem => cartItem.type_id === item.id)?.quantity || 0;
  return (
    <Wrapper>
      <InfoWrapper>
        <Element>
          {item.name}
          <TicketInfoText item={item}/>
        </Element>
        <Element>{item.cost} €</Element>
      </InfoWrapper>
      <AmountWrapper>
        <LeftAmountButton aria-label="lisää" onClick={() => removeItemFromCart(item)}><Minus/></LeftAmountButton>
        <Quantity>{quantity}</Quantity>
        <RightAmountButton aria-label="vähennä" onClick={() =>addItemToCart(item)}>+</RightAmountButton>
      </AmountWrapper>
    </Wrapper>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  flex: 2;
  @media only screen and (max-width: ${props => props.theme.commonWidth}) {
    flex-direction: column;
    flex: 1;
  }
`;

export const Element = styled.div`
  position: relative;
  flex: 1;
  font-size: 1.25rem;
`;

const Minus = styled.span`
  display: block;
  height: 0rem;
  width: 1rem;
  margin: auto;
  border-top: 3px solid ${props => props.theme.textColor};
`
const AmountWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  max-width: 240px;
  width: 100%;
  height: 3rem;
  align-self: flex-end;
  @media only screen and (max-width: 400px) {
    max-width: 128px;
  }
`;

const RightAmountButton = styled(Button)`
  position: relative;
  display: block;
  float: left;
  padding: 0;
  height: 100%;
  width: 33%;
  font-size: 2rem;
  border-left: none;
  border-radius: 0 5px 5px 0;
`;

const Quantity = styled.div`
  color: ${props => props.theme.textColor};
  position: relative;
  border: 2px solid ${props => props.theme.neutralLight};
  width: 33%;
  font-size: 1.5rem;
  height: 100%;
  text-align: center;
  background: transparent;
  &:focus {
    outline-width: 0;
  }
`

const LeftAmountButton = styled(RightAmountButton)`
  border: 2px solid ${props => props.theme.neutralLight};
  border-right: none;
  border-radius: 5px 0 0 5px;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.neutralLight};
  &:last-child {
    border-bottom: none;
  }

`;

export default Ticket