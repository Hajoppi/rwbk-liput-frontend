import styled from 'styled-components';
import { Wrapper, NavigationButton } from '../styles/Styles'
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useHistory, Link} from 'react-router-dom'
import { TimeContext } from '../contexts/TimeContext';
import TicketSelection from '../components/TicketSelection';

const Home = () => {
  const { cartIsEmpty } = useContext(CartContext);
  const history = useHistory();
  const { state } = useContext(TimeContext)
  if (state === 'NONE') return(
    <CenterWrapper>
      <h1>Retuperän WBK:n konserttilipputilaus</h1>
      <p>
        Retuperän WBK laittaa Finlandia-talon remonttikuntoon suurkonsertissa 5. marraskuuta 2021.
        Talon akkusatiivisten ominaisuuksien (epä)selvitystyöryhmän pääkonsulttina toimii Retuperän WBK:n
        taiteellinen harhaanjohtaja Audio Dubbado, eräs aikamme johtavista kapellimestareista.
      </p>
      <br></br>
      <p>Lahjakorttien lunastus alkaa 6.9.2021</p>
      <p>Lipunmyynti alkaa 13.9.2021</p>
    </CenterWrapper>
    );
  if(state === 'ENDED') return(
    <CenterWrapper>
      <h1>Retuperän WBK:n konserttilipputilaus</h1>
      <p>
      Konsertti on loppuunmyyty.
      Peruutus paikkoja voitte tiedustella osoitteesta liputsalo (at) rwbk.fi.
      Olemme tällöin yhteydessä teihin, mikäli lippuja vapautuu vielä myyntiin.
      </p>
    </CenterWrapper>
  );

  return (
    <Wrapper>
      <Wrapper>
        <h1>Retuperän WBK:n konserttilipputilaus</h1>
        {state === 'PRESALE' && <p><b>
          Konserttilahjakorttien lunastus on alkanut, joten tarvitset lahjakortin tehdäksesi tilauksen.
          Yleinen lipunmyynti aukeaa 13.9. klo 01:32
        </b></p>}
        <p>
        Tervetuloa tilaamaan lippuja Retuperän WBK:n konserttiin! Konsertti järjestetään Finlandia-talossa 5.11.2021 klo 19:33.
        Tilaus tapahtuu allaolevalla lomakkeella, minkä jälkeen käsittelemme kaikki tilaukset ja lähetämme liput valitsemallanne toimitustavalla.
        </p>
        <p>Tilaamalla liput yhdellä tilauksella seurueesi kanssa varmistatte, että saatte parhaimmat paikat toistenne vierestä</p>
        <p>Valitkaa haluamanne lippujen määrä kustakin lippuluokasta.
          Mikäli ostatte eri lippuluokan lippuja, huomatkaa, että eri lippuluokan liput
          plaseerataan katsomossa eri paikkoille lukuunottamatta opiskelija ja II-luokan lippuja, jotka voidaan plaseerata yhteen.
        </p>
        <p>
          Jos olet epävarma kuinka toimia, ole hyvä ja <StyledLink to="/ohjeet">katso tarkemmat ohjeet.</StyledLink>
        </p>
      </Wrapper>
      <h2>Konserttiliput</h2>
      <TicketSelection></TicketSelection>
      <CenterWrapper>
        <NavigationButton disabled={cartIsEmpty} onClick={() => history.push("/yhteystiedot")}>Seuraava</NavigationButton>
      </CenterWrapper>
    </Wrapper>
  );
}
const CenterWrapper = styled(Wrapper)`
  text-align: center;
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.linkColor};
`
export default Home;