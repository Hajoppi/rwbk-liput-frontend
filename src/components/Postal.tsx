import { useContext, useState, ChangeEvent } from "react";
import { CartContext } from "../contexts/CartContext";
import { Item } from "../contexts/ItemContext";
import { Label, Checkbox } from "../styles/Styles";


const basePostalItem: Item = {
  cost: 3,
  id: '60571',
  name: 'Postitus',
  limit: 0,
  quantity: 1,
  left: 1
}

const PostalComponent = () => {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const [postalAdded, setPostal] = useState(false);

  const handlePostalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;
    setPostal(checked);
    if (checked) return addItemToCart(basePostalItem);
    removeItemFromCart(basePostalItem);
  }
  return(
    <Label>
      Haluan saada liput myös postitettuna (3€)
    <Checkbox type="checkbox" checked={postalAdded} onChange={handlePostalChange}/>
  </Label>
  )
}

export default PostalComponent;