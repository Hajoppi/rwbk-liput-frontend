import styled from 'styled-components';
import { Button } from '../styles/Styles'
import { useContext } from 'react';
import Ticket from '../components/Ticket';
import { CartContext } from '../contexts/CartContext';
import { useHistory, Link} from 'react-router-dom'
import { TimeContext } from '../contexts/TimeContext';

const Home = () => {
  const { cart, cartTotal } = useContext(CartContext);
  const history = useHistory();
  const { state } = useContext(TimeContext)
  if (state === 'NONE') return(
    <>
      <Paragraph>Ennakkomyynti alkaa 1.8.2021</Paragraph>
      <Paragraph>Lipunmyynti alkaa 1.9.2021</Paragraph>
    </>
    );
  if(state === 'ENDED') return(
    <Paragraph>
    Sähköinen lipunmyynti konserttiin on nyt sulkeutunut.
    Lippuja voi ostaa vielä rajatuissa määrissä konserttipaikalta konserttipäivänä klo 18:30 alkaen. 
    Voit myös varata liput itsellesi ja seuralaisillesi sähköpostitse osoitteesta liput@rwbk.fi.
    </Paragraph>
  );

  return (
    <>
    <Wrapper>
      <Heading>Retuperän WBK:n konserttilipputilaus</Heading>
      <Paragraph>
      Tervetuloa tilaamaan lippuja Retuperän WBK:n konserttiin 5.11.2021 klo 19:33 Finlandia-talossa!
      Tilaus tapahtuu allaolevalla lomakkeella, jonka jälkeen käsittelemme kaikki tilaukset ja lähetämme liput valitsemallanne toimitustavalla.
      </Paragraph>
      <Paragraph>
        Jos olet epävarma kuinka toimia, ole hyvä ja <Link to="/ohjeet">katso tarkemmat ohjeet.</Link>
      </Paragraph>
      {state === 'PRESALE' && <Paragraph>Ennakkolipunmyynti on alkanut. Jos sinulla on lahjakortti, niin voit tilata lipun</Paragraph>}
    </Wrapper>
    <Tickets>
      <h2>Konserttiliput</h2>
      {cart.map( (ticket) => (
        <Ticket item={ticket} key={ticket.id}></Ticket>
      ))}
    </Tickets>
    <Total>Yhteensä: {cartTotal} €</Total>
    <Button disabled={cartTotal === 0} onClick={() => history.push("/yhteystiedot")}>Seuraava</Button>
    </>
  );
}

const Total = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  padding: 2rem;
`

const Wrapper = styled.div`
  max-width: ${props => props.theme.commonWidth};
  width: 100%;
`;
const Heading = styled.h1`
  text-align: left;
  font-size: 2rem;
  width: 100%;
  margin-top: 0rem;
`;

const Paragraph = styled.p`
  font-weight: 500;
`;

const Tickets = styled.div`
  max-width: ${props => props.theme.commonWidth};
  width:100%;
`;


export default Home;