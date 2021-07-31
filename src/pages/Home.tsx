import styled from 'styled-components';
import { Wrapper, NavigationButton } from '../styles/Styles'
import { useContext } from 'react';
import Ticket from '../components/Ticket';
import { CartContext } from '../contexts/CartContext';
import { useHistory, Link} from 'react-router-dom'
import { TimeContext } from '../contexts/TimeContext';

const Home = () => {
  const { cart, cartTotal, cartIsEmpty } = useContext(CartContext);
  const history = useHistory();
  const { state } = useContext(TimeContext)
  if (state === 'NONE') return(
    <>
      <p>Lahjakorttien lunastus alkaa 2.8.2021</p>
      <p>Lipunmyynti alkaa 13.9.2021</p>
    </>
    );
  if(state === 'ENDED') return(
    <p>
    Sähköinen lipunmyynti konserttiin on nyt sulkeutunut.
    Lippuja voi ostaa vielä rajatuissa määrissä konserttipaikalta konserttipäivänä klo 18:30 alkaen. 
    Voit myös varata liput itsellesi ja seuralaisillesi sähköpostitse osoitteesta liput@rwbk.fi.
    </p>
  );

  return (
    <>
    <Wrapper>
      <h1>Retuperän WBK:n konserttilipputilaus</h1>
      <p>
      Tervetuloa tilaamaan lippuja Retuperän WBK:n konserttiin. Konsertti järjestetään Finlandia-talossa 5.11.2021 klo 19:33!
      Tilaus tapahtuu allaolevalla lomakkeella, jonka jälkeen käsittelemme kaikki tilaukset ja lähetämme liput valitsemallanne toimitustavalla.
      </p>
      <p>
        Jos olet epävarma kuinka toimia, ole hyvä ja <Link to="/ohjeet">katso tarkemmat ohjeet.</Link>
      </p>
      {state === 'PRESALE' && <p>Lahjakorttien lunastus on alkanut. Jos sinulla on lahjakortti, voit tilata lippuja.</p>}
    </Wrapper>
    <Wrapper>
      <h2>Konserttiliput</h2>
      {cart.map( (ticket) => (
        <Ticket item={ticket} key={ticket.id}></Ticket>
      ))}
    </Wrapper>
    <Total>Yhteensä: {cartTotal} €</Total>
    <NavigationButton disabled={cartIsEmpty} onClick={() => history.push("/yhteystiedot")}>Seuraava</NavigationButton>
    </>
  );
}

const Total = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  padding: 2rem;
`

export default Home;