import {
  FC,
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext }
from "react";
import { proxy } from "../utils/axios";
import { AuthContext } from "./AuthContext";
import { TimeContext } from "./TimeContext";
import { maxSharedAmount } from "../utils/sharedTicketQuotas";

export type CartItem = {
  id: string;
  name: string;
  cost: number;
  amount: number;
  maxAmount: number;
}

type GiftCardsAddResult = 'OK' | 'NOMATCH' | 'DUPLICATE';

export type GiftCard = {
  id: string;
  code: string;
  balance: number;
  order?: string;
  type: string;
}


export interface CartContextType {
  cart: CartItem[];
  giftCards: GiftCard[];
  paymentByInvoice: boolean;
  saveCart: (ticketId: string, amount: number) => void;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: string) => void;
  addGiftCard: (giftCard: GiftCard) => GiftCardsAddResult;
  removeGiftCard: (itemId: string) => boolean;
  setPaymentByInvoice: (status: boolean) => void;
  cartIsEmpty: boolean;
  resetCart: () => void;
  cartTotal: number;
}

const cartContextDefault: CartContextType = {
  cart: [],
  giftCards: [],
  paymentByInvoice: false,
  saveCart: () => null,
  resetCart: () => null,
  cartIsEmpty: true,
  setPaymentByInvoice: () => null,
  addGiftCard: () => 'OK',
  removeGiftCard: () => false,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  cartTotal: 0,
}

export const CartContext = createContext<CartContextType>(cartContextDefault);

const CartProvider: FC = ({ children }) => {
  const { state } = useContext(TimeContext);
  const { loggedIn } = useContext(AuthContext);
  const [cart, updateCart] = useState<CartItem[]>(cartContextDefault.cart);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [ paymentByInvoice, setPaymentByInvoice ] = useState(cartContextDefault.paymentByInvoice);
  const [orderLimit, setOrderLimit] = useState(30);

  useEffect(() => {
    setOrderLimit(loggedIn ? 999 : 30);
  },[loggedIn]);

  useEffect(() => {
    // if(state === 'ENDED' || state === 'NONE') return;
    const storage = sessionStorage.getItem('cart');
    const savedCart = storage ? JSON.parse(storage) as CartItem[] : cartContextDefault.cart;
    fetchTicketsAndUpdate(savedCart);
  },[state]);

  const fetchTicketsAndUpdate = (savedCart: CartItem[]) => {
    proxy.get<CartItem[]>('/order/tickets').then(response => {
      const tickets = response.data.map(ticket=> ({...ticket, amount: 0, maxAmount: ticket.amount}));
      const updatedAmounts = tickets.map(ticket => {
        const savedAmount = savedCart.find(item => item.id === ticket.id)?.amount || 0;
        return {
          ...ticket,
          amount: savedAmount,
        }
      })
      updateCart(updatedAmounts);
    }).catch(() => {
    });
  }

  const saveCart = (ticketId: string, amount: number): void => {
    const newCart = [...cart];
    const ticket = newCart.find(ticket => ticket.id === ticketId);
    if (!ticket) return;
    const amountOfOtherTickets = newCart
      .filter(item=>item.id !== ticket.id)
      .reduce((a,b) => a + b.amount, 0);
    if(amount + amountOfOtherTickets > orderLimit) return;

    // 0 < newAmount < maximum amount left
    ticket.amount = Math.min(Math.max(0, amount), maxSharedAmount(ticket, cart));
    if (ticket.amount === 0) {
      const giftCardsFiltered = giftCards.filter( card => card.type !== ticket.id);
      setGiftCards(giftCardsFiltered);
    }
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    updateCart(newCart);
  };

  const addGiftCard = (giftCard: GiftCard) => {
    const itemAlreadyExists = giftCards.some(card => card.id === giftCard.id);
    const cartCount = cart.find(item => item.id === giftCard.type)?.amount || 0;
    const existingCount = giftCards.filter(card => card.type === giftCard.type).length;
    const result = 
      itemAlreadyExists ? 'DUPLICATE' :
      (cartCount === 0 || existingCount >= cartCount) ? 'NOMATCH' : 'OK'
    if(result === 'OK'){
      const newCards = [...giftCards, giftCard];
      setGiftCards(newCards);
    }
    return result;
  }

  const addItemToCart = (item: CartItem) => {
    const newCart = [...cart, item]
    updateCart(newCart);
  }

  const removeItemFromCart = (itemId: string) => {
    const index = cart.findIndex(card => card.id === itemId);
    const newCart = [...cart];
    const result = newCart.splice(index, 1);
    updateCart(newCart);
    return result.length > 0;
  }

  const removeGiftCard = (giftCardId: string) => {
    const index = giftCards.findIndex(card => card.id === giftCardId);
    const newCards = [...giftCards];
    const result = newCards.splice(index, 1);
    setGiftCards(newCards);
    return result.length > 0;
  }

  const cartIsEmpty = cart.length > 0 && cart.every(item => item.amount === 0);

  const resetCart = useCallback(() => {
    if(cart.some(item => item.amount > 0)) {
      let newCart = [...cart].filter(item => item.id !== '60571');
      newCart.forEach(item => item.amount = 0);
      updateCart(newCart);
    }
    setGiftCards([]);
    setPaymentByInvoice(false);
    sessionStorage.removeItem('cart');
  },[cart]);
  
  const itemsSetters = useMemo(() => ({ resetCart }), [resetCart])
  const cartTotal = 
    cart.reduce((a,b) => a + b.amount*b.cost,0)
    - giftCards.reduce((a,b) => a + b.balance,0);
  return (
    <CartContext.Provider value={
      {
        cart,
        giftCards,
        paymentByInvoice,
        setPaymentByInvoice,
        saveCart,
        cartTotal,
        ...itemsSetters,
        addGiftCard,
        removeGiftCard,
        addItemToCart,
        removeItemFromCart,
        cartIsEmpty,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;