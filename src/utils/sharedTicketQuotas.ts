import { CartItem } from "../contexts/CartContext";


const pairs = [
  ['0123', '0132'],
  ['0213', '0312'],
];

export const maxSharedAmount = (ticket: CartItem, cart: CartItem[]) => {
  const pair = pairs.find(pair => pair.includes(ticket.id))?.filter(id => id !== ticket.id);
  if (!pair || pair.length === 0) return ticket.maxAmount;
  const pairItem = cart.find(item => item.id === pair[0]);
  if (!pairItem) return ticket.maxAmount;
  return pairItem.maxAmount + ticket.maxAmount - pairItem.amount;  
}