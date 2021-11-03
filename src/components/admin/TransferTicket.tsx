import { useContext, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { AdminContext, Ticket } from "../../contexts/AdminContext";
import { Button, Input } from "../../styles/Styles";
import { proxy } from "../../utils/axios";

const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 0.25rem;
  background-color: transparent;
`;


const Orders = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
const Container = styled.div`
  height: 90vh;
`
const TransferTicket = ( {ticket}: {ticket: Ticket}) => {
  const { inCompleteOrders, completeOrders } = useContext(AdminContext);
  const [ success, setSuccess] = useState('');
  const [ searchString, setSearchString] = useState('');
  const orders = [...inCompleteOrders, ...completeOrders].filter(order => {
    const name = `${order.firstname} ${order.lastname}`.toLocaleLowerCase();
    return name.indexOf(searchString) >= 0;
  });
  const transferTicket = (orderId: string) => {
    proxy.put(`/admin/ticket/transfer`, {
      ticketId: ticket.id,
      toOrderId: orderId,
    }).then(() => {
      setSuccess('LIPPU ON SIIRRETTY');
    });
  }
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value.toLocaleLowerCase());
  }

  return (
    <Container>
      <div>
        Lippu: {ticket.name}
      </div>
      <div>
        <b>
          {success}
        </b>
      </div>
      <p>Valitse kohdetilaus alta</p>
      <Input type="text" placeholder="Tilauksen nimi" onChange={handleSearchChange}/>
      <Orders>
        {orders.map(order => 
          <div key={order.id}>
            {order.firstname} {order.lastname}
            <StyledButton onClick={() => transferTicket(order.id)}>Valitse</StyledButton>
          </div>
        )}
      </Orders>
    </Container>
  );
}

export default TransferTicket;