import { useContext } from 'react';
import styled from 'styled-components';

import { CartContext } from '../contexts/CartContext';
import { Wrapper } from '../styles/Styles';
import Ticket from '../components/Ticket';
import { ItemContext } from '../contexts/ItemContext';


const Total = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  padding: 2rem;
  text-align: center;
`;

const TicketSelection = () => {
  const { cartTotal } = useContext(CartContext);
  const { availableItems } = useContext(ItemContext);
  return (
    <Wrapper>
      {availableItems.map( (ticket) => (
        <Ticket item={ticket} key={ticket.id}></Ticket>
      ))}
    <Total>Yhteensä: {cartTotal} €</Total>
    </Wrapper>
  )
}

export default TicketSelection;