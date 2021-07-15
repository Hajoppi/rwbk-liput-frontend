import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { proxy } from "../utils/axios";


type CartItem = {
  id: string;
  name: string;
  cost: number;
  amount: number;
}

const MAX_ORDER_LIMIT = 50;

export interface CartContextType {
  cart: CartItem[];
  saveCart: (ticketId: string, amount: number) => void;
  addItemToCart: (item: CartItem) => boolean;
  removeItemFromCart: (itemId: string) => boolean;
  resetCart: () => void;
  cartTotal: number;
}

const cartContextDefault: CartContextType = {
  cart: [],
  saveCart: () => null,
  resetCart: () => null,
  addItemToCart: () => false,
  removeItemFromCart: () => false,
  cartTotal: 0,
}

export const CartContext = createContext<CartContextType>(cartContextDefault);

const CartProvider: React.FC = ({ children }) => {
  const storage = sessionStorage.getItem('cart');
  const savedCart = storage ? JSON.parse(storage) as CartItem[] : cartContextDefault.cart;
  const [cart, updateCart] = useState<CartItem[]>(savedCart);

  useEffect(() => {
    if(cart.length === 0) {
      proxy.get<CartItem[]>('/payment/tickets').then(response => {
        const tickets = response.data.map(ticket=> ({...ticket, amount: 0}));
        updateCart(tickets);
      });
    }
  },[cart]);

  const saveCart = (ticketId: string, amount: number): void => {
    const newCart = [...cart]
    const ticket = newCart.find(ticket => ticket.id === ticketId)
    if (!ticket) return;
    ticket.amount = Math.min(Math.max(0,amount),MAX_ORDER_LIMIT);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    updateCart(newCart)
  };

  const addItemToCart = (newItem: CartItem) => {
    const itemAlreadyExists = cart.some(cartItem => cartItem.id === newItem.id);
    if (itemAlreadyExists) return false;
    const newCart = [...cart, newItem];
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    updateCart(newCart);
    return true;
  }

  const removeItemFromCart = (itemId: string) => {
    const index = cart.findIndex(cartItem => cartItem.id === itemId);
    const newCart = [...cart];
    const result = newCart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    updateCart(newCart);
    return result.length > 0;
  }

  const resetCart = useCallback(() => {
    let newCart = cartContextDefault.cart
    updateCart(newCart)
    sessionStorage.removeItem('cart');
  },[]);
  
  const itemsSetters = useMemo(() => ({ resetCart }), [resetCart])
  const cartTotal = cart.reduce((a,b) => a + b.amount*b.cost,0)
  return (
    <CartContext.Provider value={
      {
        cart,
        saveCart,
        cartTotal,
        ...itemsSetters,
        addItemToCart,
        removeItemFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;