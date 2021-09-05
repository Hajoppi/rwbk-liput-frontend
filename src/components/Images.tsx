import styled from 'styled-components';
import tanko from '../assets/tanko.svg';
import palomies from '../assets/palomies.svg';
import cello from '../assets/cello.svg';

const Images = () =>  (
  <Wrapper>
    <Element>
      <Image alt="palomies" src={palomies}></Image>
    </Element>
    <Element>
      <Image alt="cello" src={cello}></Image>
    </Element>
    <Element>
      <Image alt="tanko" src={tanko}></Image>
    </Element>
  </Wrapper>
)


const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const Element = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  overflow: hidden;
  @media only screen and (max-width: ${props => props.theme.commonWidth}) {
    height: 30%;
  }
`;


const Wrapper = styled.div`
  z-index: -1;
  position: fixed;
  height: 80%;
  width: 100%;
  left: 0;
  right: 0;
  top: 110px;
  bottom: 0;
  opacity: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  @media only screen and (max-width: ${props => props.theme.commonWidth}) {
    flex-direction: column;
  }
`

export default Images;