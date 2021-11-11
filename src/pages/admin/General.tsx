import { useContext } from 'react';
import TicketDigest from '../../components/admin/TicketDigest';
import { AdminContext } from '../../contexts/AdminContext';
import { Button, Wrapper } from '../../styles/Styles';
import { proxy } from '../../utils/axios';

const GeneralAdmin = () => {
  const { inCompleteOrders, completeOrders } = useContext(AdminContext);
  const totalOrders = inCompleteOrders.length + completeOrders.length;
  const downloadInvoiceRows = () => {
    proxy.get('/admin/invoices', {responseType: 'blob'}).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoices.csv');
      document.body.appendChild(link);
      link.click();
    });
  }
  return (
    <Wrapper>
      <h2>Tilauksien määrä: {totalOrders}</h2>
      <TicketDigest />
      <div>
        <Button onClick={downloadInvoiceRows}>Lataa laskurivit</Button>
      </div>
    </Wrapper>
  )
}

export default GeneralAdmin