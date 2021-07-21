import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from '../contexts/CartContext';

const Order = () => {
  const { cart, cartTotal, giftCards } = useContext(CartContext);
  return (
    <StyledOrder>
    <h2>Tilauksesi</h2>
    <Cart>
      <Header>Lippu</Header>
      <Header>Lkm</Header>
      <Header>Hinta</Header>
    </Cart>
    {cart.map( item => {
      if (!item.amount) return null;
      const discountAmount = giftCards.filter(card => card.type === item.id).length;
      return (
      <Cart key={item.id}>
      <Element>{item.name}</Element>
      <Element>{item.amount} {discountAmount > 0 && `- ${discountAmount}`}</Element>
      <Element>{(item.amount-discountAmount)*item.cost} €</Element>
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