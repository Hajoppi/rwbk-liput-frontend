import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { proxy } from "../utils/axios";


type CartItem = {
  id: string;
  name: string;
  cost: number;
  amount: number;
}

export type GiftCard = {
  id: string;
  code: string;
  balance: number;
  order?: string;
  type: string;
}

const MAX_ORDER_LIMIT = 50;

export interface CartContextType {
  cart: CartItem[];
  giftCards: GiftCard[];
  saveCart: (ticketId: string, amount: number) => void;
  addGiftCard: (giftCard: GiftCard) => boolean;
  removeGiftCard: (itemId: string) => boolean;
  resetCart: () => void;
  cartTotal: number;
}

const cartContextDefault: CartContextType = {
  cart: [],
  giftCards: [],
  saveCart: () => null,
  resetCart: () => null,
  addGiftCard: () => false,
  removeGiftCard: () => false,
  cartTotal: 0,
}

export const CartContext = createContext<CartContextType>(cartContextDefault);

const CartProvider: React.FC = ({ children }) => {
  const storage = sessionStorage.getItem('cart');
  const savedCart = storage ? JSON.parse(storage) as CartItem[] : cartContextDefault.cart;
  const [cart, updateCart] = useState<CartItem[]>(savedCart);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);

  useEffect(() => {
    if(cart.length === 0) {
      proxy.get<CartItem[]>('/order/tickets').then(response => {
        const tickets = response.data.map(ticket=> ({...ticket, amount: 0}));
        updateCart(tickets);
      });
    }
  },[cart.length]);

  const saveCart = (ticketId: string, amount: number): void => {
    const newCart = [...cart]
    const ticket = newCart.find(ticket => ticket.id === ticketId)
    if (!ticket) return;
    ticket.amount = Math.min(Math.max(0,amount), MAX_ORDER_LIMIT);
    if (ticket.amount === 0) {
      const giftCardsFiltered = giftCards.filter( card => card.type !== ticket.id);
      setGiftCards(giftCardsFiltered);
    }
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    updateCart(newCart)
  };

  const addGiftCard = (giftCard: GiftCard) => {
    const itemAlreadyExists = giftCards.some(card => card.id === giftCard.id);
    const cartCount = cart.find(item => item.id === giftCard.type)?.amount || 0;
    if (itemAlreadyExists || cartCount === 0) return false;
    const existingCount =  giftCards.reduce((a,b) => a + b.type === giftCard.type ? 1 : 0, 0);
    if(existingCount >= cartCount) return false; // Trying to add too many giftCards of same type
    const newCards = [...giftCards, giftCard];
    setGiftCards(newCards);
    return true;
  }

  const removeGiftCard = (giftCardId: string) => {
    const index = cart.findIndex(card => card.id === giftCardId);
    const newCards = [...giftCards];
    const result = newCards.splice(index, 1);
    setGiftCards(newCards);
    return result.length > 0;
  }

  const resetCart = useCallback(() => {
    let newCart = cartContextDefault.cart
    updateCart(newCart)
    sessionStorage.removeItem('cart');
  },[]);
  
  const itemsSetters = useMemo(() => ({ resetCart }), [resetCart])
  const cartTotal = 
    cart.reduce((a,b) => a + b.amount*b.cost,0)
    - giftCards.reduce((a,b) => a + b.balance,0);
  return (
    <CartContext.Provider value={
      {
        cart,
        giftCards,
        saveCart,
        cartTotal,
        ...itemsSetters,
        addGiftCard,
        removeGiftCard,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;