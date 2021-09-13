import { FC, createContext, useEffect, useState, useMemo, useCallback } from "react";

import { proxy } from '../utils/axios';

export interface AdminContextType {
  orders: Order[],
  completeOrders: Order[],
  inCompleteOrders: Order[],
  selectedOrder: Order,
  getOrders: () => void;
  selectOrder: (order: Order) => void;
}

const adminContextDefault: AdminContextType = {
  orders: [],
  completeOrders: [],
  inCompleteOrders: [],
  selectedOrder: {
    id: '',
    status: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalcode: '',
    extra: '',
    created: '',
    tickets: [],
    invoice: false,
    postal: false,
    invoice_sent: false,
    post_sent: false,
    tickets_sent: false,
    admin_created: false,
  },
  getOrders: () => null,
  selectOrder: () => null,
}

type Ticket = {
  id: string;
  name: string;
  seat_number?: number;
  row_number?: number;
  location?: string;
  created: string;
}

export type Order = {
  id: string;
  status: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalcode: string;
  extra: string;
  created: string;
  tickets: Ticket[];
  invoice: boolean;
  postal: boolean;
  invoice_sent: boolean;
  post_sent: boolean;
  tickets_sent: boolean;
  admin_created: boolean;
}

export const orderComplete = (order: Order) =>
  order.invoice === order.invoice_sent
  && order.postal === order.post_sent
  && order.tickets_sent;

export const AdminContext = createContext<AdminContextType>(adminContextDefault);

const AdminProvider: FC = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [completeOrders, setCompleteOrders] = useState<Order[]>([]);
  const [inCompleteOrders, setInCompleteOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order>(adminContextDefault.selectedOrder);
  const getOrders = () => {
    proxy.get<Order[]>('/admin/orders').then((response) => {
      const filteredOrders = response.data;
      const inCompleteFiltered = response.data.filter(order => !orderComplete(order));
      const completeFiltered = response.data.filter(orderComplete);
      setCompleteOrders(completeFiltered);
      setInCompleteOrders(inCompleteFiltered);
      setOrders(filteredOrders);
    });
  }
  const selectOrder = useCallback((order: Order) => {
    setSelectedOrder(order);
  },[]);
  useEffect(() => {
    getOrders();
  },[])
  const itemsSetters = useMemo(() => ({ selectOrder }), [selectOrder])
  return (
    <AdminContext.Provider value={{
      orders,
      completeOrders,
      inCompleteOrders,
      getOrders,
      selectedOrder,
      ...itemsSetters}}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;