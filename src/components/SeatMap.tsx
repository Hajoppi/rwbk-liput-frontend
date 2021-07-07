import styled from 'styled-components';
import permantoSeats from '../assets/permanto.json';
import parvekeSeats from '../assets/parveke.json';
import React, { useEffect, useState } from 'react';
import { proxy } from '../utils/axios';

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
}

const Seat = styled.span<SeatProp>`
  font-size: 1rem;
  height: 24px;
  width: 40px;
  margin: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  background-color: ${props => props.taken ? 'red' : props.theme.backgroundColor};
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
type Locations = 'permanto' | 'parveke';

type SectionPropType = {
  setTicketPlace: (seat: number, row: number, location: string) => void;
  section: Sections;
  takenSeats: Ticket[];
}
const SelectedSection = ({ section, takenSeats, setTicketPlace }: SectionPropType) => {
  const allSeats = {...parvekeSeats, ...permantoSeats};
  const seatNumbers = takenSeats.map(seat => seat.seat_number);
  const seats = [...allSeats[section]].map((row,index) => (
    <div key={`${section}-${index+1}`}>
      <b>{index+1}</b>
      <Row >
        {generateSeats(row).map(seat => 
          <Seat
            taken={seatNumbers.indexOf(seat) > -1}
            key={`${section}-${seat}`}
            onClick={() => setTicketPlace(seat, index+1, section)}>
              {seat}
          </Seat>)}
      </Row>
    </div>
  ));
  return (
    <Section>
    {seats.reverse()}
  </Section>
  )
}

type PropType = {
  ticket: Ticket;
}

const SeatMap = ({ticket}: PropType) => {
  const [section, setSection] = useState<Sections>('permantoBVasen');
  const [location, setLocation] = useState<Locations>('permanto');
  const [takenSeats, setTakenSeats] = useState<Ticket[]>([]);
  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSection = e.target.value as Sections;
    setSection(newSection);
  }
  const setTicketPlace = (seat: number, row: number, location: string) => {
    proxy.post(`/admin/tickets`, {
      id: ticket.id,
      seat_number: seat,
      row_number: row,
      location,
    }).then(() => {
      proxy.get<Ticket[]>(`/admin/tickets/${section}`).then((response) => {
        setTakenSeats(response.data);
      });
    }).catch();
  }
  useEffect(() => {
    proxy.get<Ticket[]>(`/admin/tickets/${section}`).then((response) => {
      setTakenSeats(response.data);
    });
  },[section]);
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value as Locations
    setLocation(location);
    setSection(location === 'permanto' ? 'permantoBVasen' : 'parvekeA');
  }
  const commonRadioParams = {
    onChange: handleSectionChange,
    name: 'section',
    type: 'radio',
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
          .filter(s => s.indexOf(location) >= 0)
          .map(s =>(
            <Label key={s}>
              {s}<br></br>
              <input {...commonRadioParams} value={s} checked={s===section} />
            </Label>
          )
          )
        }
      </Select>
      <SelectedSection
        takenSeats={takenSeats}
        setTicketPlace={setTicketPlace}
        section={section}
        />
    </All>

  )
}


export default SeatMap;