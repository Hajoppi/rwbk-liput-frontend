import React, { useContext } from 'react';
import styled from 'styled-components';
import {Button} from '../styles/Styles';
import { CartContext } from '../contexts/CartContext';

type TicketType = {
  name: string;
  cost: number;
  id: string;
  amount: number;
}

type PropsType = {
  ticket: TicketType;
  isLast: boolean;
}


const Ticket = (props: PropsType) => {
  const {ticket, isLast} = props;
  const {cart, saveCart} = useContext(CartContext);

  const updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    event.target.value = String(number);
    saveCart(ticket.id, number);
  };

  const amount = cart.find(cartTicket => cartTicket.id === ticket.id)?.amount || 0;
  return (
    <Wrapper isLast={isLast}>
      <Element>{ticket.name}</Element>
      <Element>{ticket.cost}€</Element>
      <Amount>
        <LeftAmountButton onClick={() =>saveCart(ticket.id, amount - 1)}><Minus/></LeftAmountButton>
        <AmountStyle 
          type="number"
          max="50"
          min="0"
          onChange={updateAmount} 
          value={amount} />
        <RightAmountButton onClick={() =>saveCart(ticket.id, amount + 1)}>+</RightAmountButton>
      </Amount>
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
  font-size: 2rem;
  border-left: none;
  border-radius: 0 5px 5px 0;
`;

const LeftAmountButton = styled(RightAmountButton)`
  border: 2px solid hsla(0,0%,80%);
  border-right: none;
  border-radius: 5px 0 0 5px;
`

export const Element = styled.div`
  position: relative;
  flex: 1;
  font-size: 1.25rem;
`;

const Wrapper = styled.div<{isLast: boolean}>`
  position: relative;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 3rem;
  border-bottom: ${({isLast}) => isLast ? 'none' : '2px solid hsla(0,0%,80%)'};
  @media only screen and (max-width: ${props => props.theme.commonWidth}) {
    padding: 1.5rem 1rem;
  }
`;

const Amount = styled(Element)`
  position: relative;
  min-width: 8rem;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
`;

const AmountStyle = styled.input`
  position: relative;
  border: 2px solid hsla(0,0%,80%);
  flex: 1;
  font-size: 1.5rem;
  height: 100%;
  text-align: center;
  &:focus {
    outline-width: 0;
  }
`

export default Ticket