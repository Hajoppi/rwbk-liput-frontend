import { useParams, useHistory } from "react-router-dom";

import { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { Button } from "../styles/Styles";

import SeatMap from '../components/SeatMap';
import { AdminContext }  from "../contexts/AdminContext";

type Ticket = {
  id: string;
  name: string;
  seat_number?: number;
  row_number?: number;
  location?: string;
  created: string;
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

const Section = styled.div`
  margin: 8px;
`;

const PlaceOrder = () => {
  const { orders, selectedOrder, selectOrder } = useContext(AdminContext);
  const history = useHistory();
  const { orderId } = useParams<{orderId?: string}>();
  const [ selectedTicket, setSelectedTicket ] = useState<Ticket>();
  const unPlacedTickets = selectedOrder.tickets.reduce((a,b) => a + (b.seat_number === null ? 1 : 0), 0)
  const selectTicket = (ticket: Ticket) => {
    let result: Ticket | undefined = ticket;
    if (ticket.id === selectedTicket?.id) result = undefined;
    setSelectedTicket(result);
  };
  useEffect(() => {
      if (orders.length === 0) return;
      const order = orders.find(item => item.id === orderId);
      if (!order) return history.push('/admin');
      selectOrder(order);
  },[orders, orderId, selectOrder, history]);

  return (
    <div>
      <Flex>
      <Section>
        <h2>Asiakkaan tiedot</h2>
        <div>{selectedOrder.id}</div>
        <div>{selectedOrder.firstname} {selectedOrder.lastname}</div>
        <div>{selectedOrder.email}</div>
        <div>{selectedOrder.phone}</div>
        <div>{selectedOrder.address}</div>
        <div>{selectedOrder.postalcode}, {selectedOrder.city}</div>
        <div>{selectedOrder.extra}</div>
        <div>{new Date(selectedOrder.created).toLocaleDateString()}</div>
        <div>Postitus: {selectedOrder.postal ? 'Kyllä' : 'Ei'}</div>
        <div>Laskutus: {selectedOrder.invoice ? 'Kyllä' : 'Ei'}</div>
      </Section>
      <Section>
        <h2>Tilauksen liput</h2>
        {selectedOrder.tickets.map(ticket => (
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
      </Section>
      </Flex>
      <Section>
      {selectedTicket !== undefined ? (
          <SeatMap ticket={selectedTicket} />
        ): null}
      </Section>
      <Section>
        <h2>Toiminnot</h2>
        <Button disabled={unPlacedTickets > 0}>Lähetä liput</Button>
        <Button disabled={unPlacedTickets > 0}>Lataa liput</Button>
        <br></br>
        <Button disabled={selectedOrder.invoice}>Lähetä lasku</Button>
        <Button disabled={selectedOrder.invoice}>Lataa lasku</Button>
      </Section>
    </div>
  );
}

const Flex = styled.section`
  display: flex;
  justify-content: center;
`;

export default PlaceOrder;