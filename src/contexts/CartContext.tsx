import React, { createContext, useEffect, useState } from "react";
import { proxy } from "../utils/axios";


type Ticket = {
  id: string;
  name: string;
  cost: number;
  amount: number;
}

const MAX_ORDER_LIMIT = 50;

export interface CartContextType {
  cart: Ticket[];
  giftCards: string[];
  saveCart: (ticketId: string, amount: number) => void;
  resetCart: () => void;
  addGiftCard: (giftCardId: string) => void;
  cartTotal: number;
}

const cartContextDefault = {
  cart: [],
  giftCards: [],
  saveCart: () => null,
  resetCart: () => null,
  addGiftCard: () => null,
  cartTotal: 0,
}

export const CartContext = createContext<CartContextType>(cartContextDefault);

const CartProvider: React.FC = ({ children }) => {
  const storage = sessionStorage.getItem('cart')
  const savedCart = storage ? JSON.parse(storage) as Ticket[] : cartContextDefault.cart;
  const [cart, updateCart] = useState<Ticket[]>(savedCart);
  const [giftCards, setGiftCards] = useState<string[]>(cartContextDefault.giftCards);
  useEffect(() => {
    proxy.get<Ticket[]>('/payment/tickets').then(response => {
      const tickets = response.data.map(ticket=> ({...ticket, amount: 0}));
      updateCart(tickets);
    });
  },[])
  const saveCart = (ticketId: string, amount: number): void => {
    const newCart = [...cart]
    const ticket = newCart.find(ticket => ticket.id === ticketId)
    if (!ticket) return;
    ticket.amount = Math.min(Math.max(0,amount),MAX_ORDER_LIMIT);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    updateCart(newCart)
  };
  const addGiftCard = (giftCardId: string) => {
    setGiftCards([...giftCards, giftCardId]);
  }
  const resetCart = () => {
    updateCart(cartContextDefault.cart)
    sessionStorage.removeItem('cart');
  }
  const cartTotal = cart.reduce((a,b) => a + b.amount*b.cost,0)
  return (
    <CartContext.Provider value={{cart, saveCart, cartTotal, resetCart, giftCards, addGiftCard}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;