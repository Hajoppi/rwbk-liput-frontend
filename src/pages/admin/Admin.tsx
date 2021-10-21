import { useContext, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AdminContext } from '../../contexts/AdminContext';
import { CartContext } from '../../contexts/CartContext';
import { Element, Wrapper, Label, Select } from '../../styles/Styles';


const Flex = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: flex-start;
  border-bottom: 1px solid;
  padding: 8px 0;
  &:last-child {
    border: none;
  }
`;

const StyledSelect = styled(Select)`
  display: inline-block;
  font-size: 1rem;
  padding: 8px;
  margin: 0;
  margin-left: 8px;
  margin-bottom: 12px;
  max-width: 200px;
`
const StyledLink = styled(Link)`
  color: ${props => props.theme.linkColor};
`;


const FilteredOrders = () => {
  const { inCompleteOrders, completeOrders } = useContext(AdminContext);
  const { cart } = useContext(CartContext);
  const [invoice, setInvoice] = useState(false);
  const [ticketType, setTicketType] = useState('all');
  const [postal, setPostal] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [complete, setComplete] = useState(false);
  const handleInvoice = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setInvoice(checked);
  }
  const handlePostal = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setPostal(checked);
  }
  const handleAdmin = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAdmin(checked);
  }
  const handleComplete = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setComplete(checked);
  }
  const handleTicketTypes = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setTicketType(value);
  }
  const filterOrders = () => {
    let result = complete ? [...completeOrders] : [...inCompleteOrders];
    if(invoice) result = result.filter(item => item.invoice);
    if(postal) result = result.filter(item => item.postal);
    if(admin) result = result.filter(item => item.admin_created);
    if(ticketType !== 'all') result = result.filter(item => 
      item.tickets.some(ticket => ticket.name === ticketType));
    return result;
  }
  return (
    <Wrapper>
      <Label>
        Postitus
        <input 
          type="checkbox"
          checked={postal}
          onChange={handlePostal} />
      </Label>
      <Label>
        Laskutus
        <input 
          type="checkbox"
          checked={invoice}
          onChange={handleInvoice} />
      </Label>
      <Label>
        Itse luodut
        <input 
          type="checkbox"
          checked={admin}
          onChange={handleAdmin} />
      </Label>
      <Label>
        Valmiit
        <input 
          type="checkbox"
          checked={complete}
          onChange={handleComplete} />
      </Label>
      <Label>
      Lippuluokka
      <StyledSelect onChange={handleTicketTypes}>
        <option value="all">Kaikki</option>
        {cart.map(item => (
        <option key={item.id} value={item.name}>{item.name}</option>
        ))}
      </StyledSelect>
    </Label>
      <Flex>
        <Element flex={1}><b>Päivämäärä</b></Element>
        <Element flex={2}><b>Nimi</b></Element>
        <Element flex={1}><b>Postitus</b></Element>
        <Element flex={1}><b>Laskutus</b></Element>
        <Element flex={1}><b>Laskutettu</b></Element>
        <Element flex={1}><b>Liputettu</b></Element>
        <Element flex={1}><b>Admin</b></Element>
        <Element flex={1}><b>Lippuja ilman paikkoja</b></Element>
        <Element flex={1}></Element>
      </Flex>
      {filterOrders().map(order => {
        return (
        <Flex key={order.id}>
          <Element flex={1}>{new Date(order.created).toLocaleDateString()}</Element>
          <Element flex={2}>{order.firstname} {order.lastname}</Element>
          <Element flex={1}>{order.postal ? 'Kyllä' : 'Ei'}</Element>
          <Element flex={1}>{order.invoice ? 'Kyllä' : 'Ei'}</Element>
          <Element flex={1}>{order.invoice_sent ? 'Kyllä' : 'Ei'}</Element>
          <Element flex={1}>{order.tickets_sent ? 'Kyllä' : 'Ei'}</Element>
          <Element flex={1}>{order.admin_created ? 'Kyllä' : 'Ei'}</Element>
          <Element flex={1}>{order.tickets.reduce((a,b) => a + (b.seat_number === null ? 1 : 0), 0)}/{order.tickets.length}</Element>
          <Element flex={1}><StyledLink to={`/admin/order/${order.id}`}>Avaa</StyledLink></Element>
        </Flex>
        );
      })}
    </Wrapper>

  )
}

const Admin = () => {
  return (
    <Wrapper>
      <FilteredOrders />
    </Wrapper>
  )
}

export default Admin;