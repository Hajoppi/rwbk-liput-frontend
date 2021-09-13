import { useEffect, useState } from "react";
import styled from "styled-components";
import { proxy } from "../../utils/axios";

type Tickets = {
  name: string,
  amount: number,
  max: number,
  left: number
}[];

const TicketDigest = () => {
  const [tickets, setTickets] = useState<Tickets>([]);
  const [amount, setAmount] = useState(0);
  const [left, setLeft] = useState(0);
  const [max, setMax] = useState(0);
  useEffect(() => {
    proxy.get<Tickets>('/admin/tickets/numbers').then((response) => {
      const {data} = response;
      let totalAmount = 0;
      let totalLeft = 0;
      let totalMax = 0;
      data.forEach(item => {
        totalAmount += item.amount;
        totalLeft += item.left;
        totalMax += item.max;
      });
      setAmount(totalAmount);
      setLeft(totalLeft);
      setMax(totalMax);
      setTickets(data);
    });
  },[]);
  return (
    <Wrapper>
      <Flex>
        <Element><b>Nimi</b></Element>
        <Element><b>Nykymäärä</b></Element>
        <Element><b>Jäljellä</b></Element>
        <Element><b>Maksimimäärä</b></Element>
      </Flex>
      {tickets.map((ticket) => 
        <Flex key={ticket.name}>
          <Element>{ticket.name}</Element>
          <Element>{ticket.amount}</Element>
          <Element>{ticket.left}</Element>
          <Element>{ticket.max}</Element>
        </Flex>
      )}
      <Flex>
        <Element><b>Yhteensä</b></Element>
        <Element><b>{amount}</b></Element>
        <Element><b>{left}</b></Element>
        <Element><b>{max}</b></Element>
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
  max-width: 450px;
`;

const Element = styled.div`
  flex: 1;
`;

export default TicketDigest;