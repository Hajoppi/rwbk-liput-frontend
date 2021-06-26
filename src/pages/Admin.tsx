import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { proxy } from '../utils/axios';

type TicketType = {
  name: string;
  cost: number;
  id: string;
  amount: number;
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
  tickets: TicketType[];
}

const Orders = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    proxy.get<Order[]>('/admin/orders').then((response) => {
      setOrders(response.data);
    });
  },[])
  return (
    <>
    <Orders>
      {orders.map(order => {
        return <div key={order.id}>{order.id}</div>
      })}
    </Orders>
    </>
  )
}

export default Admin;