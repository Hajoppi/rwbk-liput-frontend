import { useEffect, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Input, Button } from "../../styles/Styles";
import { proxy } from "../../utils/axios";

type Ticket = {
  name: string,
  id: string,
  quantity: number,
  limit: number,
  left: number
};

const StyledInput = styled(Input)`
  max-width: 50px;
  font-size: 1rem;
`
const StyledButton = styled(Button)`
  font-size: 1rem;
`;
const IndividualTicket = ({ ticket, updateTicketNumbers }: 
  { ticket: Ticket, updateTicketNumbers: () => void  }) => {
  const [limit, setLimit] = useState(ticket.limit);

  const updateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    event.target.value = String(number);
    setLimit(number);
  };

  const updateTicketLimit = () => {
    proxy.put(`admin/tickets/types`,
    {
      ticketType: ticket.id,
      amount: limit,
    }
    ).then(() => {
      updateTicketNumbers();
    });
  }
  return (
    <Flex key={ticket.name}>
      <Element>{ticket.name}</Element>
      <Element>{ticket.quantity}</Element>
      <Element>{ticket.left}</Element>
      <Element>
        <StyledInput
            type="number"
            max="900"
            min="0"
            onChange={updateAmount}
            aria-label="määrä"
            value={limit} />
        </Element>
        <Element>
          <StyledButton onClick={updateTicketLimit}>Muokkaa</StyledButton>
        </Element>
    </Flex>
  )
}

const TicketDigest = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [amount, setAmount] = useState(0);
  const [left, setLeft] = useState(0);
  const [max, setMax] = useState(0);
  const updateTicketNumbers = () => {
    proxy.get<Ticket[]>('/admin/tickets/numbers').then((response) => {
      const { data } = response;
      let totalAmount = 0;
      let totalLeft = 0;
      let totalMax = 0;
      data.forEach(item => {
        totalAmount += item.quantity;
        totalLeft += item.left;
        totalMax += item.limit;
      });
      setAmount(totalAmount);
      setLeft(totalLeft);
      setMax(totalMax);
      setTickets(data);
    });
  }
  useEffect(() => {
    updateTicketNumbers();
  },[]);
  return (
    <Wrapper>
      <Flex>
        <Element><b>Nimi</b></Element>
        <Element><b>Nykymäärä</b></Element>
        <Element><b>Jäljellä</b></Element>
        <Element><b>Maksimimäärä</b></Element>
        <Element></Element>
      </Flex>
      {tickets.map((ticket) => 
        <IndividualTicket key={ticket.name} updateTicketNumbers={updateTicketNumbers} ticket={ticket}/>
      )}
      <Flex>
        <Element><b>Yhteensä</b></Element>
        <Element><b>{amount}</b></Element>
        <Element><b>{left}</b></Element>
        <Element><b>{max}</b></Element>
        <Element></Element>
      </Flex>
    </Wrapper>

  )
}

const Wrapper = styled.div`
  width: 100%;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 700px;
`;

const Element = styled.div`
  flex: 1;
`;

export default TicketDigest;