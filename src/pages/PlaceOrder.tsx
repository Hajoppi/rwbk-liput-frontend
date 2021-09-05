import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import styled from "styled-components";
import { Button, Label } from "../styles/Styles";

import SeatMap from '../components/SeatMap';
import { AdminContext, orderComplete } from "../contexts/AdminContext";
import { proxy } from "../utils/axios";

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
    props.theme.neutralActive : 'transparent'};
`;

const Section = styled.div`
  margin: 8px;
`;

const PlaceOrder = () => {
  const { orders, selectedOrder, selectOrder } = useContext(AdminContext);
  const history = useHistory();
  const { orderId } = useParams<{orderId?: string}>();
  const [ selectedTicket, setSelectedTicket ] = useState<Ticket>();
  const [sending, setSending] = useState(false);
  const unPlacedTickets = selectedOrder.tickets.reduce((a,b) => a + (b.seat_number === null ? 1 : 0), 0)
  const selectTicket = (ticket: Ticket) => {
    let result: Ticket | undefined = ticket;
    if (ticket.id === selectedTicket?.id) result = undefined;
    setSelectedTicket(result);
  };

  const sendOrderTickets = () => {
    setSending(true);
    proxy.post('/admin/order/tickets', { orderId }).then(() => {
      const newOrder = { ...selectedOrder };
      newOrder.tickets_sent = true;
      selectOrder(newOrder);
    }).catch(() => {
    }).finally(() => {
      setSending(false);
    });
  }

  const sendOrderInvoice = () => {
    setSending(true);
    proxy.post('/admin/order/invoice', { orderId }).then(() => {
      const newOrder = { ...selectedOrder };
      newOrder.invoice_sent = true;
      selectOrder(newOrder);
    }).catch(() => {
    }).finally(() => {
      setSending(false);
    });
  }

  const downloadTickets = () => {
    setSending(true);
    proxy.get(`/admin/order/tickets/${orderId}`,{responseType: 'blob'}).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'liput.pdf');
      document.body.appendChild(link);
      link.click();
    }).finally(() => {
      setSending(false);
    });
  }
  const downloadInvoice = () => {
    setSending(true);
    proxy.get(`/admin/order/invoice/${orderId}`, {responseType: 'blob'}).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'lasku.pdf');
      document.body.appendChild(link);
      link.click();
    }).finally(() => {
      setSending(false);
    });
  };

  const updatePostSent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setSending(true);
    proxy.post(`/admin/order/postal`, { orderId, postalStatus: checked }).then(() => {
      const newOrder = { ...selectedOrder };
      newOrder.post_sent = checked;
      selectOrder(newOrder);
    }).catch(() => {
    }).finally(() => {
      setSending(false);
    });
  }

  useEffect(() => {
      if (orders.length === 0) return;
      const order = orders.find(item => item.id === orderId);
      if (!order) return history.push('/admin');
      selectOrder(order);
  },[orders, selectOrder, orderId, history]);

  return (
    <div>
        {orderComplete(selectedOrder) && <h2><b>Tilaus on valmis</b></h2>}
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
            {!selectedOrder.tickets_sent && <StyledButton
              selected={selectedTicket?.id === ticket.id}
              onClick={() => selectTicket(ticket)}>Valitse
            </StyledButton>}
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
        {selectedOrder.postal && (
          <div>
            <Label>
              Postitettu
              <input type="checkbox" checked={selectedOrder.post_sent} onChange={updatePostSent}/>
            </Label>
          </div>
        )}
        <Button onClick={sendOrderTickets} disabled={unPlacedTickets > 0 || selectedOrder.tickets_sent || sending}>Lähetä liput</Button>
        <Button onClick={downloadTickets} disabled={unPlacedTickets > 0 || sending}>Lataa liput</Button>
        <br></br>
        {selectedOrder.invoice && (
          <div>
            <Button onClick={sendOrderInvoice} disabled={selectedOrder.invoice_sent || sending}>Lähetä lasku</Button>
            <Button onClick={downloadInvoice} disabled={!selectedOrder.invoice || sending}>Lataa lasku</Button>
          </div>
        )}
      </Section>
    </div>
  );
}

const Flex = styled.section`
  display: flex;
  justify-content: center;
`;

export default PlaceOrder;