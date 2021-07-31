import React, { useContext } from 'react';
import styled from 'styled-components';
import {Button} from '../styles/Styles';
import { CartContext } from '../contexts/CartContext';

type CartItem = {
  id: string;
  name: string;
  cost: number;
  amount: number;
}

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
      <Element>{item.name}</Element>
      <Element>{item.cost}€</Element>
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

const Minus = styled.span`
  display: block;
  height: 0rem;
  width: 1rem;
  margin: auto;
  border-top: 3px solid black;
`

const RightAmountButton = styled(Button)`
  padding: 0;
  height: 100%;
  width: 100%;
  flex: 1;
  font-size: 2rem;
  border-left: none;
  border-radius: 0 5px 5px 0;
`;

const LeftAmountButton = styled(RightAmountButton)`
  border: 2px solid ${props => props.theme.neutralLight};
  border-right: none;
  border-radius: 5px 0 0 5px;
`

export const Element = styled.div`
  position: relative;
  flex: 1;
  font-size: 1.25rem;
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
  @media only screen and (max-width: ${props => props.theme.commonWidth}) {
    flex-direction: column;
    flex-wrap: wrap;
    height: 3rem;
    padding: 8px 16px;
    align-items: initial;
  }
`;

const AmountWrapper = styled(Element)`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  max-width: 240px;
  width: 100%;
  height: 3rem;
  align-self: flex-end;
  @media only screen and (max-width: 500px) {
    max-width: 128px;
  }
`;

const Amount = styled.input`
  position: relative;
  border: 2px solid ${props => props.theme.neutralLight};
  flex: 1;
  width: 100%;
  font-size: 1.5rem;
  height: 100%;
  text-align: center;
  background: transparent;
  &:focus {
    outline-width: 0;
  }
`

export default Ticket