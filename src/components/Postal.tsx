import { useContext, useState, ChangeEvent } from "react";
import { CartContext } from "../contexts/CartContext";
import { Label, Checkbox } from "../styles/Styles";

const PostalComponent = () => {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const [postalAdded, setPostal] = useState(false);

  const handlePostalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;
    setPostal(checked);
    if (checked) return addItemToCart({
        amount: 1,
        cost: 3,
        id: '60571',
        maxAmount: 0,
        name: 'Postitus'
      });
    removeItemFromCart('60571');
  }
  return(
    <Label>
      Haluan saada liput myös postitettuna (3€)
    <Checkbox type="checkbox" checked={postalAdded} onChange={handlePostalChange}/>
  </Label>
  )
}

export default PostalComponent;