import {
  FC,
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { proxy } from "../utils/axios";
import { Item } from "./ItemContext";

export type CartItem = {
  type_id: string;
  name: string;
  cost: number;
  quantity: number;
  limit: number;
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
  orderId: string | undefined;
  cart: CartItem[];
  created: Date | undefined;
  giftCards: GiftCard[];
  paymentByInvoice: boolean;
  addItemToCart: (item: Item) => void;
  removeItemFromCart: (itemId: string) => void;
  addGiftCard: (giftCard: GiftCard) => GiftCardsAddResult;
  removeGiftCard: (itemId: string) => boolean;
  setPaymentByInvoice: (status: boolean) => void;
  cartIsEmpty: boolean;
  resetCart: () => void;
  cartTotal: number;
}

const cartContextDefault: CartContextType = {
  orderId: undefined,
  created: undefined,
  cart: [],
  giftCards: [],
  paymentByInvoice: false,
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
  const [ orderId, setOrderId] = useState<undefined | string>(cartContextDefault.orderId);
  const [ created, setCreated ] = useState<undefined | Date>(undefined);
  const [ itemsFetched, setItemsFetched] = useState(false);
  const [ cart, setCart ] = useState<CartItem[]>(cartContextDefault.cart);
  const [ giftCards, setGiftCards ] = useState<GiftCard[]>([]);
  const [ paymentByInvoice, setPaymentByInvoice ] = useState(cartContextDefault.paymentByInvoice);

  const addGiftCard = (giftCard: GiftCard) => {
    const itemAlreadyExists = giftCards.some(card => card.id === giftCard.id);
    const cartCount = cart.find(item => item.type_id === giftCard.type)?.quantity || 0;
    const existingCount = giftCards.filter(card => card.type === giftCard.type).length;
    const result = 
      itemAlreadyExists ? 'DUPLICATE' :
      (cartCount === 0 || existingCount >= cartCount) ? 'NOMATCH' : 'OK'
    if (result === 'OK'){
      const newCards = [...giftCards, giftCard];
      setGiftCards(newCards);
    }
    return result;
  }
  const removeGiftCard = (giftCardId: string) => {
    const index = giftCards.findIndex(card => card.id === giftCardId);
    const newCards = [...giftCards];
    const result = newCards.splice(index, 1);
    setGiftCards(newCards);
    return result.length > 0;
  }

  const removeItemFromCart = (itemId: string) => {
    setCart(prevCart => 
      prevCart.reduce((ack, item) => {
        if (item.type_id === itemId) {
          if(item.quantity === 1) return ack;
          return [...ack, {...item, quantity: item.quantity -1}];
        } else {
          return [...ack, item]
        }
      },[] as CartItem[]),
    );
  };

  const addItemToCart = (item: Item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.type_id === item.id);
      if(existingItem) {
        return prevCart.map(prevItem => 
          prevItem.type_id === item.id ?
          {...prevItem, quantity: prevItem.quantity + 1}
          : prevItem
        );
      }
      return [...prevCart, {...item, type_id: item.id, quantity: 1}];
    });
  };
  

  const resetCart = useCallback(() => {
    setCart([]);
    setGiftCards([]);
    setPaymentByInvoice(false);
    setCreated(undefined);
    sessionStorage.removeItem('orderId');
    setOrderId('');
  },[]);

  const itemsSetters = useMemo(() => (
    { resetCart}),
    [resetCart]
  );
  proxy.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 418) {
        return itemsSetters.resetCart();
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (created !== undefined || !orderId) return
    proxy.get(`/order2/${orderId}/created`).then((response) => {
      const { time } = response.data;
      setCreated(new Date(time));
      const timeLeft = Math.max(new Date(time).getTime() + 15*60*1000 - Date.now(),0);
      setTimeout(() => itemsSetters.resetCart(), timeLeft);
    }).catch(() => {
      itemsSetters.resetCart();
    });
  },[created, itemsSetters, orderId])

  // Check on load, if we have an active cart for this order
  useEffect(() => {
    if(orderId === undefined) return;
    if(orderId && !itemsFetched) {
        proxy.get<CartItem[]>(`/order2/cart/${orderId}`, {
        }).then(response => {
          setCart(response.data);
          setItemsFetched(true);
        });
    }
  },[orderId, itemsFetched, setItemsFetched]);
  
  // Update the cart to server on each mutation to the cart
  useEffect(() => {
    if(!itemsFetched || !orderId) return;
    proxy.put('/order2/cart', {
      orderId,
      cart,
    });
  },[orderId, cart, itemsFetched]);

  // If there is no cart, create one to server
  useEffect(() => {
    if (cart.length > 0 && orderId === '') {
      proxy.post('/order2/create', {
        orderId,
        cart,
      }).then(response => {
        sessionStorage.setItem('orderId', response.data.orderId);
        setOrderId(response.data.orderId);
      });
    }
  },[cart, orderId]);

  useEffect(() => {
    setOrderId(previousId => {
      if (previousId) return previousId;
      return sessionStorage.getItem('orderId') || '';
    })
  }, [setOrderId]);

  const cartIsEmpty = itemsFetched && cart.length === 0;

  const cartTotal = 
    cart.reduce((a,b) => a + b.quantity*b.cost,0)
    - giftCards.reduce((a,b) => a + b.balance,0);

  return (
    <CartContext.Provider value={
      {
        orderId,
        cart,
        giftCards,
        created,
        paymentByInvoice,
        setPaymentByInvoice,
        cartTotal,
        ...itemsSetters,
        addItemToCart,
        removeItemFromCart,
        addGiftCard,
        removeGiftCard,
        cartIsEmpty,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;