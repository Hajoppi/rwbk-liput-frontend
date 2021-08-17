import styled from 'styled-components';
import permantoSeats from '../assets/permanto.json';
import parvekeSeats from '../assets/parveke.json';
import React, { useContext, useEffect, useState } from 'react';
import { proxy } from '../utils/axios';
import { AdminContext } from '../contexts/AdminContext';

const generateSeats = (row: number[]) => {
  const [end, start] = row;
  const nums = Array.from(
    {length: Math.abs(end-start) + 1},
    (_, i) => i + Math.min(start,end)
  );
  if (end > start) nums.reverse();
  return nums;
}

type Ticket = {
  id: string;
  name: string;
  seat_number?: number;
  row_number?: number;
  location?: string;
  created: string;
}


type SeatProp = {
  taken: boolean;
  reserved: boolean;
}

const Seat = styled.span<SeatProp>`
  font-size: 0.75rem;
  height: 24px;
  width: 28px;
  margin: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  background-color: ${props => props.reserved ? 'yellow' : props.taken ? 'red' : props.theme.backgroundColor};
`
const Row = styled.span`
`

const Label = styled.label`
  margin-left: 8px;
  margin-right: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const All = styled.div`
`;
const Select = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const sections = [
  'permantoA',
  'permantoBVasen',
  'permantoBOikea',
  'permantoCVasen',
  'permantoCOikea',
  'permantoD',
  'parvekeA',
  'parvekeBVasen',
  'parvekeBKeski',
  'parvekeBOikea',
  'parvekeCVasen',
  'parvekeCKeski',
  'parvekeCOikea',
  'parvekeDVasen',
  'parvekeDOikea',
] as const;

type Sections = typeof sections[number];

const sectionPairs: Sections[][]  = [
  ['permantoA', 'permantoBVasen'],
  ['permantoBOikea', 'permantoCVasen'],
  ['permantoCOikea', 'permantoD'],
  ['parvekeA'],
  ['parvekeBVasen'],
  ['parvekeBKeski'],
  ['parvekeBOikea', 'parvekeCVasen'],
  ['parvekeCKeski'],
  ['parvekeCOikea','parvekeDVasen'],
  ['parvekeDOikea'],
];

type Locations = 'permanto' | 'parveke';


type SectionPropType = {
  setTicketPlace: (seat: number, row: number, location: string) => void;
  sections: Sections[];
  tickets: Ticket[];
  takenSeats: Ticket[];
}
const SelectedSection = ({ sections, takenSeats, tickets, setTicketPlace }: SectionPropType) => {
  const combinedSeats = {...parvekeSeats, ...permantoSeats};
  const takenSeatNumbers = takenSeats.map(seat => seat.seat_number);
  const reservedSeatNumbers = tickets.map(seat => seat.seat_number);
  const seats2 = [...combinedSeats[sections[0]]].map((_,index) =>(
    <div key={`${sections[0]}-${index+1}`}>
      <b>{index+1}</b>
      <Row>
        {sections.map(s => {
          return(
            generateSeats(combinedSeats[s][index]).map(seat => 
              <Seat
                taken={takenSeatNumbers.indexOf(seat) > -1}
                reserved={reservedSeatNumbers.indexOf(seat) > -1}
                key={`${s}-${seat}`}
                onClick={() => setTicketPlace(seat, index+1, s)}>
                  {seat}
              </Seat>)
            )
        }).reverse()}
      </Row>
    </div>
    )
 );
  return (
    <Section>
    {seats2.reverse()}
  </Section>
  )
}

type PropType = {
  ticket: Ticket;
}

const SeatMap = ({ticket}: PropType) => {
  const {selectedOrder, selectOrder} = useContext(AdminContext);
  const [section, setSection] = useState<Sections[]>(sectionPairs[0]);
  const [location, setLocation] = useState<Locations>('permanto');
  const [takenSeats, setTakenSeats] = useState<Ticket[]>([]);
  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSection = e.target.value as Sections;
    const sectionPair = sectionPairs.find(pair => pair.indexOf(newSection) > -1);
    if (!sectionPair) return;
    setSection(sectionPair);
  }
  const setTicketPlace = (seat: number, row: number, location: string) => {
    proxy.post(`/admin/tickets`, {
      id: ticket.id,
      seat_number: seat,
      row_number: row,
      location,
    }).then(() => {
      const updatedOrder = {...selectedOrder};
      const t = selectedOrder.tickets.find(nt => nt.id === ticket.id);
      if(!t) return;
      t.seat_number = seat;
      t.row_number = row;
      t.location = location;
      selectOrder(updatedOrder);
    }).catch(() => {});
  }
  useEffect(() => {
    const promises = section.map(s => proxy.get<Ticket[]>(`/admin/tickets/${s}`).then(response => {
      return response.data;
    }));
    Promise.all(promises).then(data => {
      setTakenSeats(data.flat());
    });
  },[section]);
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value as Locations
    setLocation(location);
    setSection(location === 'permanto' ? sectionPairs[0] : sectionPairs[3]);
  }
  const commonRadioParams = {
    onChange: handleSectionChange,
    name: 'section',
    type: 'checkbox',
  }
  return (
    <All>
      <Select>
        <input onChange={handleLocationChange} type="radio" value="permanto"  name="location" checked={location==='permanto'}/>Permanto
        <input onChange={handleLocationChange} type="radio" value="parveke"  name="location" checked={location==='parveke'}/>Parveke
      </Select>
      <Select>
        {
        sections
          .filter(s => s.indexOf(location) >= 0).reverse()
          .map(s =>(
            <Label key={s}>
              {s}<br></br>
              <input {...commonRadioParams} value={s} checked={section.indexOf(s) > -1} />
            </Label>
          )
          )
        }
      </Select>
      <SelectedSection
        takenSeats={takenSeats}
        tickets={selectedOrder.tickets}
        setTicketPlace={setTicketPlace}
        sections={section}
        />
    </All>

  )
}


export default SeatMap;