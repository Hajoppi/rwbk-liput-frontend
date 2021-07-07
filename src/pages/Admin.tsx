import { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { AdminContext } from '../contexts/AdminContext';
import { Button } from '../styles/Styles';

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
  const { orders } = useContext(AdminContext);
  const history = useHistory();
  return (
    <>
    <Orders>
      <Flex>
        <Item><b>Päivämäärä</b></Item>
        <Item><b>Lippuja</b></Item>
        <Item><b>status</b></Item>
        <Item></Item>
      </Flex>
      {orders.map((order) => {
        return (
        <Flex key={order.id}>
          <Item>{new Date(order.created).toLocaleDateString()}</Item>
          <Item>{order.tickets.reduce((a,b) => a + (b.seat_number === null ? 1 : 0), 0)}</Item>
          <Item>{order.status}</Item>
          <Item><Button onClick={() => history.push(`/admin/order/${order.id}`)}>Place</Button></Item>
        </Flex>
        );
      })}
    </Orders>
    </>
  )
}

export default Admin;