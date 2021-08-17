import React, { createContext, useEffect, useState } from "react";

import { proxy } from '../utils/axios';

export interface AdminContextType {
  orders: Order[],
  selectedOrder: Order,
  getOrders: () => void;
  selectOrder: (order: Order) => void;
}

const adminContextDefault: AdminContextType = {
  orders: [],
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
}

export const AdminContext = createContext<AdminContextType>(adminContextDefault);

const AdminProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order>(adminContextDefault.selectedOrder);
  const getOrders = () => {
    proxy.get<Order[]>('/admin/orders').then((response) => {
      const filteredOrders = response.data.filter(item => item.status === 'PAID');
      setOrders(filteredOrders);
    });
  }
  const selectOrder = (order: Order) => {
    setSelectedOrder(order);
  }
  useEffect(() => {
    getOrders();
  },[])

  return (
    <AdminContext.Provider value={{orders, getOrders, selectedOrder, selectOrder}}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;