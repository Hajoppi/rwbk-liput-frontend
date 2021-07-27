import React, { createContext, useEffect, useState } from "react";

import { proxy } from '../utils/axios';

export interface AdminContextType {
  orders: Order[],
  getOrders: () => void;
}

const adminContextDefault: AdminContextType = {
  orders: [],
  getOrders: () => null,
}

type Ticket = {
  id: string;
  name: string;
  seat_number?: number;
  row_number?: number;
  location?: string;
  created: string;
}

type Order = {
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
}

export const AdminContext = createContext<AdminContextType>(adminContextDefault);

const AdminProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  
  const getOrders = () => {
    proxy.get<Order[]>('/admin/orders').then((response) => {
      setOrders(response.data);
    });
  }
  useEffect(() => {
    getOrders();
  },[])
  return (
    <AdminContext.Provider value={{orders, getOrders}}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;