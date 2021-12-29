import { useContext } from "react";
import styled from "styled-components";
import { Element } from "../styles/Styles";
import { CartContext } from '../contexts/CartContext';

const Order = () => {
  const { cart, cartTotal} = useContext(CartContext);
  return (
    <div>
      <Cart>
        <Header flex={4}>Tuote</Header>
        <Header flex={2}>Määrä</Header>
        <Header flex={2}>Hinta</Header>
        <Header flex={1}></Header>
      </Cart>
      {cart.map( item => {
        if (!item.quantity) return null;
        return (
        <Cart key={item.type_id}>
        <Element flex={4}>{item.name}</Element>
        <Element flex={2}>{item.quantity}</Element>
        <Element flex={2}>{(item.quantity)*item.cost} €</Element>
        <Element flex={1}></Element>
        </Cart>
        );
      })}
      <div><b>Yhteensä: {cartTotal} €</b></div>
  </div>
  )
};



const Header = styled(Element)`
  font-weight: bold;
`;

const Cart = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 4px;
`

export default Order