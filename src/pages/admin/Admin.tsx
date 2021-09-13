import { useContext, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { AdminContext } from '../../contexts/AdminContext';
import { Button, Element, Wrapper, Label } from '../../styles/Styles';


const Flex = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: flex-start;
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
`

const FilteredOrders = () => {
  const history = useHistory();
  const { inCompleteOrders, completeOrders } = useContext(AdminContext);
  const [invoice, setInvoice] = useState(false);
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
  const filterOrders = () => {
    let result = complete ? [...completeOrders] : [...inCompleteOrders];
    if(invoice) result = result.filter(item => item.invoice);
    if(postal) result = result.filter(item => item.postal);
    if(admin) result = result.filter(item => item.admin_created);
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
      <Flex>
        <Element flex={1}><b>Päivämäärä</b></Element>
        <Element flex={2}><b>Nimi</b></Element>
        <Element flex={1}><b>Postitus</b></Element>
        <Element flex={1}><b>Laskutus</b></Element>
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
          <Element flex={1}>{order.tickets.reduce((a,b) => a + (b.seat_number === null ? 1 : 0), 0)}/{order.tickets.length}</Element>
          <Element flex={1}><StyledButton onClick={() => history.push(`/admin/order/${order.id}`)}>Avaa</StyledButton></Element>
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