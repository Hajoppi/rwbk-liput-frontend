import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from '../contexts/CartContext';

const Order = () => {
  const { cart, cartTotal } = useContext(CartContext);
  return (
    <StyledOrder>
    <h2>Tilauksesi</h2>
    <Cart>
      <Header>Lippu</Header>
      <Header>Lkm</Header>
      <Header>Hinta</Header>
    </Cart>
    {cart.map( ticket => {
      if (!ticket.amount) return null;
      return (
      <Cart key={ticket.id}>
      <Element>{ticket.name}</Element>
      <Element>{ticket.amount}</Element>
      <Element>{ticket.amount*ticket.cost} €</Element>
      </Cart>
      );
    })}
    <Total>Yhteensä: {cartTotal} €</Total>
  </StyledOrder>
  )

};
export const Element = styled.div`
  flex: 1;
  font-size: 1.5rem;
`;

const Header = styled(Element)`
  font-weight: bold;
`;
const StyledOrder = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 0 1rem;
`;

const Total = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  padding-top: 0.5rem;
`

const Cart = styled.div`
  display: flex;
  justify-content: space-around;
`

export default Order