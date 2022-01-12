import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router";
import { CartContext } from "../contexts/CartContext";
import { ItemContext, Item } from "../contexts/ItemContext";
import { Button } from "../styles/Styles";

const Buttons = styled.div`
  &> div:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Signup = () => {
  const { availableItems } = useContext(ItemContext);
  const { addItemToCart, removeItemFromCart, cartIsEmpty, cart } = useContext(CartContext);
  const history = useHistory();

  const handleClick = async (item: Item) => {
    if(!cartIsEmpty && cart.some(cartItem => cartItem.type_id !== item.id)) {
      const previousItem: Item = {
        cost: cart[0].cost,
        id: cart[0].type_id,
        left: 0,
        limit: 0,
        name: cart[0].name,
        quantity: 0
      } 
      await removeItemFromCart(previousItem);
      await addItemToCart(item);
    }
    else if (cartIsEmpty) {
      await addItemToCart(item);
    }
    history.push('/yhteystiedot');
  }

  return (
    <Buttons>
      {availableItems.map(item =>
      <div key={item.id}>
        <Button onClick={() => handleClick(item)}>{item.name} ilmoittautuminen</Button>
      </div>
      )}
    </Buttons>
  );
}

export default Signup;