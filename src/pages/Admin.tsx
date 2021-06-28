import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SeatMap from '../components/SeatMap';
import { proxy } from '../utils/axios';

type Ticket = {
  id: string;
  seat?: string;
  name: string;
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

const Orders = styled.div`
  position: relative;
  display: block;
  width: 100%;
  max-width: 768px;
`;
const Item = styled.div`
  flex: 1;
`
const Flex = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    proxy.get<Order[]>('/admin/orders').then((response) => {
      setOrders(response.data);
    });
  },[])
  return (
    <>
    <SeatMap/>
    <Orders>
      <Flex>
        <Item><b>Päivämäärä</b></Item>
        <Item><b>Lippuja</b></Item>
        <Item><b>status</b></Item>
      </Flex>
      {orders.map((order, index) => {
        return (
        <Flex key={order.id}>
          <Item>{new Date(order.created).toLocaleDateString()}</Item>
          <Item>{order.tickets.reduce((a,b) => a + (b.seat === null ? 1 : 0), 0)}</Item>
          <Item>{order.status}</Item>
        </Flex>
        );
      })}
    </Orders>
    </>
  )
}

export default Admin;