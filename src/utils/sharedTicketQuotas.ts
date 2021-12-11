import { CartItem } from "../contexts/CartContext";


const pairs = [
  ['0123', '0132'],
  ['0213', '0312'],
];

export const maxSharedAmount = (ticket: CartItem, cart: CartItem[]) => {
  const pair = pairs.find(pair => pair.includes(ticket.type_id))?.filter(id => id !== ticket.type_id);
  if (!pair || pair.length === 0) return ticket.limit;
  const pairItem = cart.find(item => item.type_id === pair[0]);
  if (!pairItem) return ticket.limit;
  return pairItem.limit + ticket.limit - pairItem.quantity;  
}