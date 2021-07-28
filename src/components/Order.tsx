import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from '../contexts/CartContext';

const Order = () => {
  const { cart, cartTotal, giftCards } = useContext(CartContext);
  return (
    <div>
      <Cart>
        <Header flex={2}>Tuote</Header>
        <Header flex={1}>Määrä</Header>
        <Header flex={1}>Hinta</Header>
      </Cart>
      {cart.map( item => {
        if (!item.amount) return null;
        return (
        <Cart key={item.id}>
        <Element flex={2}>{item.name}</Element>
        <Element flex={1}>{item.amount}</Element>
        <Element flex={1}>{(item.amount)*item.cost} €</Element>
        </Cart>
        );
      })}
      {giftCards.map(item => {
        return (
          <Cart key={item.id}>
          <Element flex={2}>Lahjakortti</Element>
          <Element flex={1}>1</Element>
          <Element flex={1}>-{item.balance} €</Element>
        </Cart>
        );
      })}
      <div><b>Yhteensä: {cartTotal} €</b></div>
  </div>
  )
};

export const Element = styled.div<{flex: number}>`
  flex: ${props => props.flex};
`;

const Header = styled(Element)`
  font-weight: bold;
`;

const Cart = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 4px;
`

export default Order