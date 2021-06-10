import React, { createContext, useState } from "react";


type TicketType = {
  name: string;
  cost: number;
  id: string;
  amount: number
}

const MAX_ORDER_LIMIT = 50;

export interface CartContextType {
  cart: TicketType[];
  saveCart: (ticketId: string, amount: number) => void;
  resetCart: () => void;
  cartTotal: number;
}

const cartContextDefault = {
  cart: [{
    name: 'Deluxe',
    id: '0132',
    cost: 65,
    amount: 0
  },
  {
    name: '1. Luokka',
    id: '0232',
    cost: 45,
    amount: 0
  },
  {
    name: '2. Luokka',
    id: '0332',
    cost: 30,
    amount: 0
  },
  {
    name: 'Opiskelija',
    id: '0432',
    cost: 15,
    amount: 0
  }],
  saveCart: () => null,
  resetCart: () => null,
  cartTotal: 0,
}

export const CartContext = createContext<CartContextType>(cartContextDefault);

const CartProvider: React.FC = ({ children }) => {
  const storage = sessionStorage.getItem('cart')
  const savedCart = storage ? JSON.parse(storage) as TicketType[] : cartContextDefault.cart
  const [cart, updateCart] = useState<TicketType[]>(savedCart);
  
  const saveCart = (ticketId: string, amount: number): void => {
    const newCart = [...cart]
    const ticket = newCart.find(ticket => ticket.id === ticketId)
    if (!ticket) return;
    ticket.amount = Math.min(Math.max(0,amount),MAX_ORDER_LIMIT);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    updateCart(newCart)
  };
  const resetCart = () => {
    updateCart(cartContextDefault.cart)
    sessionStorage.removeItem('cart');
  }
  const cartTotal = cart.reduce((a,b) => a + b.amount*b.cost,0)
  return (
    <CartContext.Provider value={{cart, saveCart, cartTotal, resetCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;