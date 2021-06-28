import styled from 'styled-components';
import permantoSeats from '../assets/permanto.json';
import React, { useState } from 'react';

const generateSeats = (row: number[]) => {
  const [end, start] = row;
  const nums = Array.from({length: end-start + 1}, (_, i) => i + start).reverse();
  return nums;
}

const Seat = styled.span`
  font-size: 0.75rem;
  height: 1rem;
  width: 2rem;
  display: inline-block;
  text-align: center;
  border: 1px solid black;

`
const Row = styled.span`
  overflow-wrap: none;
`

const Section = styled.div`
  display: inline-flex;
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

type sectionTypes = "left" | "center" | "right";

const SelectedSection = ({ section }: {section: sectionTypes}) => {
  const seats = [...permantoSeats[section]].map((row,index) => (
    <div>
      <b>{index+1}</b>
      <Row key={`right-${index+1}`}>
        {generateSeats(row).map(seat => <Seat key={seat}>{seat}</Seat>)}
      </Row>
    </div>
  ))
  return (
    <Section>
    {seats.reverse()}
  </Section>
  )
}
const SeatMap = () => {
  const [section, setSection] = useState<sectionTypes>('center');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSection(e.target.value as sectionTypes);
  }
  return (
    <All>
      <Select onChange={handleChange}>
        <input type="radio" value="left"   name="section" checked={section==='left'} />Vasen
        <input type="radio" value="center" name="section" checked={section==='center'} />Keski
        <input type="radio" value="right"  name="section" checked={section==='right'}/>Oikea
      </Select>
      <SelectedSection section={section}></SelectedSection>
    </All>

  )
}

export default SeatMap;