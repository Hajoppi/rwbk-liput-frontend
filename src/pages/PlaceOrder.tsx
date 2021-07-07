import { useParams, Redirect } from "react-router-dom";

import { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { Button } from "../styles/Styles";

import SeatMap from '../components/SeatMap';
import { AdminContext}  from "../contexts/AdminContext";

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

type StyleProps = {
  selected: boolean;
}

const StyledButton = styled(Button)<StyleProps>`
  font-size: 1rem;
  padding: 0.25rem;
  background-color:
    ${props => props.selected ?
    props.theme.neutralActive : props.theme.backgroundColor};
`;

const CustomerInfo = styled.div``;
const Tickets = styled.div``;

const PlaceOrder = () => {
  const { orders } = useContext(AdminContext);
  const { orderId } = useParams<{orderId?: string}>();
  const [order, setOrder] = useState<Order>();
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const selectTicket = (ticket: Ticket) => {
    let result: Ticket | undefined = ticket;
    if (ticket.id === selectedTicket?.id) result = undefined;
    setSelectedTicket(result);
  };
  useEffect(() => {
      setOrder(orders.find(item => item.id === orderId));
  },[orders, orderId]);

  if (!orderId) return <Redirect to="/admin"/>;
  if (!order) return null;
  return (
    <div>
      <CustomerInfo>
        <div>{order.id}</div>
        <div>{order.firstname} {order.lastname}</div>
        <div>{order.email}</div>
        <div>{order.phone}</div>
        <div>{order.address}</div>
        <div>{order.postalcode}, {order.city}</div>
        <div>{order.extra}</div>
        <div>{new Date(order.created).toLocaleDateString()}</div>
      </CustomerInfo>
      <Tickets>
        {order.tickets.map(ticket => (
          <div key={ticket.id}>
            <span>{ticket.name}</span>&nbsp;
            <span>{ticket.seat_number !== null ? 
              `${ticket.location}, Rivi:${ticket.row_number}, Paikka:${ticket.seat_number}`: 'plassaamaton'}</span>&nbsp;
            <StyledButton
              selected={selectedTicket?.id === ticket.id}
              onClick={() => selectTicket(ticket)}>Valitse
            </StyledButton>
          </div>
        ))}
      </Tickets>
      {selectedTicket !== undefined ? (
        <SeatMap ticket={selectedTicket} />
      ): null}
    </div>
  );
}

export default PlaceOrder;