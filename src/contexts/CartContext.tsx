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

export type GiftCard = {
  id: string;
  code: string;
  balance: number;
  order?: string;
  type: string;
}

export interface CartContextType {
  orderId: string | undefined;
  status: string;
  cart: CartItem[];
  created: Date | undefined;
  giftCards: GiftCard[];
  paymentByInvoice: boolean;
  addItemToCart: (item: Item) => void;
  getCart: () => void;
  removeItemFromCart: (item: Item) => void;
  setPaymentByInvoice: (status: boolean) => void;
  cartIsEmpty: boolean;
  resetCart: () => void;
  cartTotal: number;
}

const cartContextDefault: CartContextType = {
  orderId: undefined,
  created: undefined,
  status: '',
  cart: [],
  giftCards: [],
  paymentByInvoice: false,
  resetCart: () => null,
  getCart: () => null,
  cartIsEmpty: true,
  setPaymentByInvoice: () => null,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  cartTotal: 0,
}

export const CartContext = createContext<CartContextType>(cartContextDefault);

const CartProvider: FC = ({ children }) => {
  const [ orderId, setOrderId] = useState<undefined | string>(cartContextDefault.orderId);
  const [ created, setCreated ] = useState<undefined | Date>(undefined);
  const [ status, setStatus ] = useState('new');
  const [ itemsFetched, setItemsFetched] = useState(false);
  const [ cart, setCart ] = useState<CartItem[]>(cartContextDefault.cart);
  const [ giftCards, setGiftCards ] = useState<GiftCard[]>([]);
  const [ paymentByInvoice, setPaymentByInvoice ] = useState(cartContextDefault.paymentByInvoice);

  const createOrder = async () => {
    const response = await proxy.post('/order2/create', {
      orderId,
    });
    sessionStorage.setItem('orderId', response.data.orderId);
    setOrderId(response.data.orderId);
    return response.data.orderId;
  };

  const getCart = async () => {
    if(orderId === undefined) return;
    proxy.get<CartItem[]>(`/order2/cart/${orderId}`).then(response => {
      setCart(response.data);
    });
  }

  const updateCart = async (item: Item, quantity: number) => {
    let currentOrderId = orderId
    try {
      if (!currentOrderId) currentOrderId = await createOrder();
      const { data } = await proxy.put<CartItem[]>('/order2/cart', {
        item: {
          name: item.name,
          cost: item.cost,
          type_id: item.id,
          quantity,
        },
        orderId: currentOrderId,
      });
      setCart(data);
    } catch(error) {
    }
  }

  const removeItemFromCart = (item: Item) => {
    const previousQuantity = cart.find(cartItem => cartItem.type_id === item.id)?.quantity || 0;
    updateCart(item, previousQuantity - 1);
  };

  const addItemToCart = (item: Item) => {
    const previousQuantity = cart.find(cartItem => cartItem.type_id === item.id)?.quantity || 0;
    updateCart(item, previousQuantity + 1);
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

  // If we have a cart, get the creation time. Then show and start timer
  useEffect(() => {
    if (created !== undefined || !orderId) return
    proxy.get(`/order2/${orderId}/created`).then((response) => {
      const { time, status } = response.data;
      setCreated(new Date(time));
      setStatus(status);
      const totalAmountOfMinutes = status === 'new' ? 15 : 30;
      const timeLeft = Math.max(new Date(time).getTime() + totalAmountOfMinutes * 60 * 1000 - Date.now(), 0);
      setTimeout(() => itemsSetters.resetCart(), timeLeft);
    }).catch(() => {
      itemsSetters.resetCart();
    });
  },[created, itemsSetters, orderId])

  // Check on load, if we have an active cart for this order
  useEffect(() => {
    if(orderId === undefined) return;
    if(orderId && !itemsFetched) {
        proxy.get<CartItem[]>(`/order2/cart/${orderId}`)
          .then(response => {
            setCart(response.data);
            setItemsFetched(true);
        });
    }
  },[orderId, itemsFetched, setItemsFetched]);
  
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
        status,
        paymentByInvoice,
        setPaymentByInvoice,
        cartTotal,
        ...itemsSetters,
        addItemToCart,
        removeItemFromCart,
        getCart,
        cartIsEmpty,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;