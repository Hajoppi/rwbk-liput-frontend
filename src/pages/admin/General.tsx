import { useContext } from 'react';
import TicketDigest from '../../components/admin/TicketDigest';
import { AdminContext } from '../../contexts/AdminContext';
import { Wrapper } from '../../styles/Styles';

const GeneralAdmin = () => {
  const { inCompleteOrders, completeOrders } = useContext(AdminContext);
  const totalOrders = inCompleteOrders.length + completeOrders.length;
  return (
    <Wrapper>
      <h2>Tilauksien määrä: {totalOrders}</h2>
      <TicketDigest />
    </Wrapper>
  )
}

export default GeneralAdmin