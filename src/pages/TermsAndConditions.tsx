import { Link, useHistory, } from "react-router-dom";
import styled from "styled-components";
const TermsAndConditions = () => {
  const history = useHistory<{ prev?: string }>();
  const route = history.location.state?.prev || '/'
  return(
    <Section>
      <h2>Lipputilaus - ehdot</h2>
      <p>
        Liput maksetaan Paytrail Oyj:n tarjoamalla verkkomaksulla tai, mikäli tämä ei ole mahdollista, laskulla.
        Lipuilla ei ole palautusoikeutta, mutta sairas- ja muissa poikkeustapauksissa tarjoamme siihen mahdollisuuden
        välttääksemme tyhjät paikat salissa, jos lippujonossa on vielä kulttuurinnälkäisiä ihmisiä ilman lippua.
        Palautamme lipuista saamamme hinnan vain, jos saamme liput myytyä eteenpäin.
      </p>
      <p>
        Yhden tilauksen maksimilippumäärä on kaksikymmentä (20) lippua.
        Toimitamme maksimissaan 20 lippua yhteen osoitteeseen, vaikka tilaus tehtäisiin useammassa erässä.
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
      Verkkopankkimaksamiseen liittyvän maksunvälityspalvelun toteuttaa Paytrail Oyj (2122839-7) yhteistyössä
      suomalaisten pankkien ja luottolaitosten kanssa. Käyttäjän kannalta palvelu toimii aivan kuten perinteinen verkkomaksaminenkin.
      </p>
      <Link to={route}>Takaisin tilaamaan</Link>
    </Section>
  );
};

const Section = styled.section`
  max-width: ${props => props.theme.commonWidth};
`;

export default TermsAndConditions;