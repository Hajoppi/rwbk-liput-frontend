import { Link } from "react-router-dom";
import styled from "styled-components";
const Instructions = () => (
  <Section>
    <div>
    Tässä lyhyet ohjeet siihen, kuinka pääsette mahdollisimman helposti nauttimaan Retuperän WBK:n esittämästä kulttuurinautinnosta.
    </div>
    <div>
      <ol>
        <li>Ilmoita haluamasi lippumäärä luokittain. Yli 30 lipun tilauksissa pyydämme olemaan yhteyksissä Liputsaloon sähköpostitse liputsalo at rwbk piste fi</li>
        <li>Täytä seuraavaksi yhteystietosi. Täytä jokainen kohta.</li>
        <li>Täytä mahdolliset erityistoiveesi lippujen suhteen.</li>
        <li>Siirry maksamaan.</li>
        <li>Valitse, haluatko liput lisämaksusta postitse kotiin vai e-lippuna antamaasi sähköpostiosoitteeseen.</li>
        <li>Liput maksetaan verkkomaksulla. Mikäli tämä ei onnistu voit vaihtaa maksutavaksi sähköpostilaskun.
          Jos haluat paperisen laskun, ilmoita siitä tilauksen lisätiedoissa.</li>
        <li>Lahjakortteja voi lisätä niin monta tilaukseen kuin haluaa. Varmista, että lahjakorttiin liittyvä lippu löytyy ostoskorista.</li>
        <li>Valitse maksutapa.</li>
        <li>Maksa lippuostokset.</li>
        <li>Odota tilausvahvistusta. Toimitamme liput, kun olemme saaneet kaikki tilaukset käsiteltyä.</li>
        <li>Pidä mielessä, että konserttipaikalla on kolmen euron eteispalvelumaksu.</li>
        <li>Saapuessasi konserttiin tai sen väliajalla muista hakea mahdollisesti tilaamasi äänilevyt levynmyyntitiskiltämme.</li>
      </ol>
    </div>
    <p>Ongelmatilanteissa ottakaa yhteyttä liputsalo at rwbk piste fi.</p>
    <StyledLink to="/">Takaisin tilaamaan</StyledLink>
  </Section>
);

const Section = styled.section`
  max-width: ${props => props.theme.commonWidth};
`;
const StyledLink = styled(Link)`
  color: ${props => props.theme.linkColor};
`;

export default Instructions;