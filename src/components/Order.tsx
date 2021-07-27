import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from '../contexts/CartContext';

const Order = () => {
  const { cart, cartTotal, giftCards } = useContext(CartContext);
  return (
    <StyledOrder>
    <Cart>
      <Header>Tuote</Header>
      <Header>Määrä</Header>
      <Header>Hinta</Header>
    </Cart>
    {cart.map( item => {
      if (!item.amount) return null;
      return (
      <Cart key={item.id}>
      <Element>{item.name}</Element>
      <Element>{item.amount}</Element>
      <Element>{(item.amount)*item.cost} €</Element>
      </Cart>
      );
    })}
    {giftCards.map(item => {
      // const associatedTicket = cart.find(ticket => ticket.id === item.type);
      // if (!associatedTicket) return null;
      return (
        <Cart key={item.id}>
        <Element>Lahjakortti</Element>
        <Element>1</Element>
        <Element>-{item.balance} €</Element>
      </Cart>
      );
    })}
    <Total>Yhteensä: {cartTotal} €</Total>
  </StyledOrder>
  )

};
export const Element = styled.div`
  flex: 1;
  font-size: 1.25rem;
`;

const Header = styled(Element)`
  font-weight: bold;
`;
const StyledOrder = styled.div`
  margin-bottom: 1rem;
`;

const Total = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  padding-top: 0.5rem;
`

const Cart = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.25rem;
`

export default Order