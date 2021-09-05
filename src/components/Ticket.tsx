import React, { useContext } from 'react';
import styled from 'styled-components';
import {Button, Label} from '../styles/Styles';
import { CartContext, CartItem } from '../contexts/CartContext';

type PropsType = {
  item: CartItem;
}


const Ticket = (props: PropsType) => {
  const { item } = props;
  const {cart, saveCart} = useContext(CartContext);

  const updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    event.target.value = String(number);
    saveCart(item.id, number);
  };

  const amount = cart.find(ticket => ticket.id === item.id)?.amount || 0;
  return (
    <Wrapper>
      <InfoWrapper>
        <Element>
          {item.name}
          {item.maxAmount < 30 && <div>
            <Label>lipputyyppi on vähissä</Label>
          </div>}
        </Element>
        <Element>{item.cost} €</Element>
      </InfoWrapper>
      <AmountWrapper>
        <LeftAmountButton aria-label="lisää" onClick={() =>saveCart(item.id, amount - 1)}><Minus/></LeftAmountButton>
        <Amount
          type="number"
          max="50"
          min="0"
          onChange={updateAmount}
          aria-label="määrä"
          value={amount} />
        <RightAmountButton aria-label="vähennä" onClick={() =>saveCart(item.id, amount + 1)}>+</RightAmountButton>
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

const Amount = styled.input`
  color: ${props => props.theme.textColor};
  position: relative;
  border: 2px solid ${props => props.theme.neutralLight};
  width: 33%;
  float: left;
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