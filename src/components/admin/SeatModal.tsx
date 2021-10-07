import styled from "styled-components"
import { Button } from "../../styles/Styles";
import { Order } from '../../contexts/AdminContext';


type Ticket = {
  id: string;
  name: string;
  seat_number?: number;
  row_number?: number;
  location?: string;
  created: string;
}

type PropType = {
  order: Order,
  ticket: Ticket,
  close: () => void;
}



const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: hsla(0, 0%, 10%, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`

`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 64px;
  top: 32px;
`;

const SeatModal = ({order, ticket, close}: PropType) => {
  return (
    <ModalWrapper>
      <CloseButton onClick={close}> X </CloseButton>
      <Container>
        <p>Aikasempi plassattu</p>
        <div>Nimi: {order.firstname} {order.lastname}</div>
        <div>Lippu: {ticket.name}</div>
        <div>Email: {order.email}</div>
        <div>Lisätiedot: {order.extra}</div>
      </Container>
      <Button onClick={close}>Poistu</Button>
    </ModalWrapper>
  )
}

export default SeatModal;