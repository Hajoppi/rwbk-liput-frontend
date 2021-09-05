import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import { Wrapper as Section } from "../styles/Styles";
import styled from "styled-components";

const GDPR = () => (
  <Section>
    <h2>Rekisteri- ja tietosuoja seloste</h2>
    <p>
      Tässä tietosuojaselosteessa kerromme, miten Retuperän WBK ry (“RWBK”)
      käsittelee sivustollamme (liput.rwbk.fi) asioivien käyttäjien henkilötietoja.
    </p>
    <p>
      Retuperän WBK ry noudattaa kaikessa henkilötietojen käsittelyssä EU:n yleistä tietosuoja-asetusta (GDPR),
      tietosuojalakia sekä muuta soveltuvaa lainsäädäntöä.
    </p>
    <h3>1. Rekisterinpitäjä</h3>
    <p>
    Rekisterinpitäjänä toimii Retuperän WBK ry (Y-tunnus: 0200764-4),
    ja yhdistykseen voi milloin tahansa ottaa yhteyttä seuraavia yhteystietoja käyttäen:
    </p>
    <div>Retuperän WBK ry</div>
    <div>rwbk@rwbk.fi</div>
    <div>PL 69</div>
    <div>02151</div>
    <div>Espoo</div>

    <p>Rekisteristä vastaavan henkilön yhteystiedot:</p>

    <div>Leevi Letkutsalo</div>
    <div>+358 505252191</div>
    <div>leevi.letkutsalo@rwbk.fi</div>

    <h3>2. Kerättävät henkilötiedot</h3>
    Keräämme seuraavat henkilötiedot tämän tietosuojaselosteen kohdassa 4 kerrottuihin tarkoituksiin.
    <ul>
      <li>Tilaajan nimi</li>
      <li>Tilaajan asettama postitusosoite</li>
      <li>Tilaajan sähköpostiosoite</li>
      <li>Tilaajan puhelinnumero</li>
      <li>Lisätietoja (tilaajan asettamana)</li>
    </ul>

    <h3>3. Mistä henkilötietoja kerätään</h3>
    <p>
      Keräämme henkilötietoja käyttäjältä itseltään, kun hän tekee konserttilipputilauksen.
    </p>

    <h3>4. Mihin henkilötietoja käytetään</h3>
    <p>
      Henkilötietojen käyttöperusteena on käyttäjän antama suostumus, kun hän tilaa konserttilippuja sivustomme kautta.
      Emme käytä tilauksien yhteydessä kerättyjä henkilötietoja muihin tarkoituksiin kuin tilausten toimittamiseen.
      Tilaukseen liittyvän konsertin jälkeen henkilötiedot poistetaan.
    </p>
    <h3>5. Henkilötietojen säilyttäminen</h3>
    <p>
      Henkilötietoja säilytetään tilaukseen liittyvään konserttiin asti.
    </p>
    <h3>6. Miten henkilötietoja suojataan</h3>
    <p>
      Henkilötietoja käsittelevät vain nimetyt henkilöt, joista jokainen on salassapitovelvollinen.
    </p>
    <p>
      Yhteyksissä sivustollemme käytetään nykypäiväisiä salausmenetelmiä, joiden tehtävänä on varmistaa siirretyn tiedon luottamuksellisuus.
      Sivustoa ylläpidetään palvelimella, joka on suojattu tavanomaisin teknisin menetelmin ja vahvalla pääsynhallinnalla.
    </p>
    <p>
    Ilmoitamme mahdollisista tietoturvaloukkauksista viipymättä suoraan
    viranomaisille ja käyttäjille, joita loukkaus koskee, soveltuvan lainsäädännön mukaisesti.
    </p>
    <h3>7. Evästeet ja seurantatekniikat sivustollamme ja kolmannen osapuolen tuottamat palvelut</h3>
    <p>
      Sivustomme ei aseta evästeitä, eikä Retuperän WBK ry kerää yksityiskohtaista tietoa sivulla käyneistä käyttäjistä.
      Sivustolla vierailevasta käyttäjästä tallennetaan yleisen käytännön mukaisesti haettu URL-osoite,
      käyttäjän IP-osoite ja käyttäjän selaimen tunniste (User-Agent), jolla ei tyypillisesti voida yksilöidä käyttäjää.
      Sivustollamme ei ole käytössä kolmannen osapuolen analytiikkapalveluja.
    </p>
    <p>
      Lipunmyyntisivustoa ylläpidetään palvelimella, jonka tarjoajana toimii Hetzner Oy.
      Lisätietoja palvelininfrastruktuurin ylläpitokäytännöistä löydätte Hetzner Oy:n verkkosivuilta (https://www.hetzner.com/).
    </p>
    <p>
      Kaikki käyttämämme kolmannen osapuolen palveluntarjoajat
      ovat peräisin Euroopan Unioniin kuuluvista maista, joissa noudatetaan EU:n tietosuoja-asetuksia.
    </p>
    <h2>8. Kenelle henkilötietoja voidaan luovuttaa</h2>
    <p>Henkilötietoja ei luovuteta ulkopuolisille tahoille.</p>
    <p>Henkilötietoja ei siirretä EU:n tai ETA:n ulkopuolelle.</p>
    <h2>9. Millaisia oikeuksia käyttäjällä on hänestä kerättyihin tietoihin liittyen</h2>
    <p>
      Käyttäjällä on oikeus tarkastaa käyttäjästä tallennetut tiedot. Käyttäjä voi ottaa yhteyttä rekisterinpitäjään
      ja pyytää saada tietää kaikki hänestä kerätyt tiedot.
    </p>
    <p>
      Käyttäjällä on oikeus pyytää tietojensa korjaamista tai poistamista.
      Käyttäjällä on oikeus pyytää rekisterinpitäjää korjaamaan ja täydentämään hänestä kerätyt virheelliset tiedot.
      Käyttäjällä on myös oikeus pyytää rekisterinpitäjää poistamaan käyttäjästä kerätyt tiedot.
      Rekisterinpitäjä poistaa käyttäjän tiedot pyynnöstä kohtuullisessa ajassa.
    </p>
    <p>
    Tilanteessa, jossa virheelliseksi epäiltyä henkilötietoa ei voida korjata tai poistaa, taikka poistopyynnöstä
    on epäselvyyttä, rekisterinpitäjä rajoittaa tietoihin pääsyä.
    </p>
    <h2>10. Retuperän WBK ry:n oikeus muuttaa tätä tietosuojaselostetta</h2>
    <p>
      Retuperän WBK ry voi muuttaa tätä tietosuojaselostetta.
      Olennaisista muutoksista ilmoitamme käyttäjän antamaan sähköpostiosoitteeseen.
    </p>
    <h2>11. Miten otan yhteyttä</h2>
    <p>
      Käyttäjä voi tehdä valituksen tietosuojaviranomaisille, mikäli käyttäjä kokee,
      että hänen tietojaan ei ole käsitelty voimassa olevan lainsäädännön mukaisesti.
    </p>
    <p>
      Tietosuojaviranomaisen yhteystiedot: Tietosuojavaltuutetun toimisto PL 800 00521 Helsinki tietosuoja@om.fi 029 566 6700
    </p>
  </Section>
);


const Terms = () => (
  <Section>
  <h2>Lipputilaus - ehdot</h2>
  <p>
    Liput maksetaan Paytrail Oyj:n tarjoamalla verkkomaksulla tai, mikäli tämä ei ole mahdollista, laskulla.
    Lipuilla ei ole palautusoikeutta, mutta sairas- ja muissa poikkeustapauksissa tarjoamme siihen mahdollisuuden
    välttääksemme tyhjät paikat salissa, jos lippujonossa on vielä kulttuurinnälkäisiä ihmisiä ilman lippua.
    Palautamme lipuista saamamme hinnan vain, jos saamme liput myytyä eteenpäin.
  </p>
  <p>
    Mikäli tapahtuman osallistujamäärää joudutaan rajoittamaan terveyssyistä johtuen,
    pidätämme oikeuden palauttaa tai muuttaa lippuja satunnaisesti valituilta ostajilta.
  </p>
  <p>
    Yhden tilauksen maksimilippumäärä on kolmekymmentä (30) lippua.
    Toimitamme maksimissaan 30 lippua yhteen osoitteeseen, vaikka tilaus tehtäisiin useammassa erässä.
    Tämän lisäksi tilauksen yhteydessä voi ostaa jatkolippuja konsertin karonkkaillalliselle, sekä Retuperän WBK:n äänilevyjä.
    Tilatut äänilevyt ovat noudettavissa konsertin yhteydessä Finlandia-talosta levynmyyntitiskiltämme.
  </p>
  <p>
    Tietojen täyttämisen jälkeen on 15 minuuttia aikaa maksaa tilaus verkkopankissa.
    Tämän jälkeen maksamatta jääneet liput palautetaan lipunmyyntiin.
    Mikäli selain suljetaan ennen maksua, väliaikainen varaus raukeaa.
  </p>
  <h2>Maksut Visa, Visa Electron tai MasterCard-korteilla</h2>
  <p>
  Mikäli haluat maksaa Visa, Visa Electron tai MasterCard-korteilla,
  Retuperän WBK toimii ainoastaan tuotteiden ja palveluiden markkinoijana ja lisäksi toimittaa tuotteet ostajalle.
  Reklamaatioista vastaa Paytrail Oyj.
  </p>
  <p>
  Paytrail Oyj toimii Visa, Visa Electron tai MasterCard-korteilla tehtävissä maksuissa tuotteen myyjänä
  ja kauppa syntyy asiakkaan ja Paytrail Oyj:n välille. Myyjän vastuulla ovat kaikki kauppaan liittyvät velvoitteet. 
  Paytrail Oyj on myös maksun saaja.
  </p>
  <p>
  Paytrail Oyj, y-tunnus: 2122839-7<br/>
  Innova 2  <br/>
  Lutakonaukio 7<br/>
  40100 Jyväskylä<br/>
  Puhelin: 0207 181830
  </p>
  <h2>Verkkopankit</h2>
  <p>
  Maksunvälityspalvelun toteuttajana ja maksupalveluntarjoajana toimii Paytrail Oyj (2122839-7)
  yhteistyössä suomalaisten pankkien ja luottolaitosten kanssa. Paytrail Oyj näkyy maksun saajana tiliotteella
  tai korttilaskulla ja välittää maksun kauppiaalle.
  </p>
  
  </Section>
)

const TermsAndConditions = () => {
  const history = useHistory<{ prev?: string }>();
  const route = history.location.state?.prev || '/';
  const [showTerms, setShowTerms] = useState(true);
  return (
    <Section>
      <Buttons>
        <Button underline={showTerms}  onClick={() => setShowTerms(true)}>Tilausehdot</Button>
        <Button underline={!showTerms} onClick={() => setShowTerms(false)}>Tietosuojaseloste</Button>
      </Buttons>
      {showTerms ? <Terms /> : <GDPR />}
      <StyledLink to={route}>Takaisin tilaamaan</StyledLink>
    </Section>
  );
};

const Buttons = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.linkColor};
`;
const Button = styled.button<{underline?: boolean}>`
  font-size: 1rem;
  margin: 0.5rem;
  background: transparent;
  color: ${props => props.theme.textColor};
  border: none;
  cursor: pointer;
  transition: all .1s ease-in-out;
  border-bottom: 1px solid ${props => props.underline ? props.theme.textColor : 'transparent'};
`;

export default TermsAndConditions;