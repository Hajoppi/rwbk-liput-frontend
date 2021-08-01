import { Link } from "react-router-dom";
import styled from "styled-components";
const Instructions = () => (
  <Section>
    <div>
    Tässä lyhyet ohjeet siihen, kuinka pääsette mahdollisimman helposti nauttimaan Retuperän WBK:n esittämästä kulttuurinautinnosta.
    </div>
    <div>
      <ol>
        <li>Ilmoita haluamasi lippumäärä luokittain. Yhteensä yli 30 lipun tilaaminen ei ole mahdollista yhteen osoitteeseen.</li>
        <li>Täytä seuraavaksi yhteystietosi. Täytä jokainen kohta.</li>
        <li>Täytä mahdolliset erityistoiveesi lippujen suhteen.</li>
        <li>Siirry maksamaan.</li>
        <li>Valitse, haluatko liput lisämaksusta postitse kotiin vai e-lippuna antamaasi sähköpostiosoitteeseen.</li>
        <li>Liput maksetaan verkkomaksulla. Mikäli tämä ei onnistu voit vaihtaa maksutavaksi sähköpostilaskun.
          Jos sinulla on erityistoiveita paperi laskulle, ilmoita siitä tilauksen lisätiedoissa.</li>
        <li>Lahjakortteja voi lisätä niin monta tilaukseen kuin haluaa. Varmista, että lahjakorttiin liittyvä lippu löytyy ostoskorista</li>
        <li>Valitse maksutapa</li>
        <li>Maksa lippuostokset</li>
        <li>Odota tilaus vahvistusta. Toimitamme liput, kun olemme saaneet kaikki tilaukset käsiteltyä.</li>
        <li>Pidä mielessä, että konserttipaikalla on kolmen euron eteispalvelumaksu.</li>
        <li>Saapuessasi konserttiin tai sen väliajalla muista hakea mahdollisesti tilaamasi äänilevyt levynmyyntitiskiltämme.</li>
      </ol>
    </div>
    <p>Ongelma tilanteissa ottakaa yhteyttä liputsalo at rwbk piste fi</p>
    <Link to="/">Takaisin tilaamaan</Link>
  </Section>
);

const Section = styled.section`
  max-width: ${props => props.theme.commonWidth};
`;

export default Instructions;