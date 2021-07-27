import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { TimeContext } from '../contexts/TimeContext';
import { theme } from '../styles/Styles';
import { useContext } from 'react';

const Progress = () => {
  const { pathname } = useLocation();
  const paths = ['/','/yhteystiedot','/maksu'];
  if(!paths.some(path=>pathname.indexOf(path)>=0)) return null;
  return(
    <Wrapper>
      {paths.map(path => (
        <Ball selected={pathname===path} key={path}/>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 8px 0;
`

const Ball = styled.span<{selected: boolean}>`
  display: inline-block;
  color: ${theme.neutral};
  height: 8px;
  width: 8px;
  border: 1px solid ${theme.neutral};
  background-color: ${props => props.selected ? theme.neutral : 'none'};
  border-radius: 5px;
  margin: 8px;
`;


const FooterComponent = () => {
  const location = useLocation();
  const {state} = useContext(TimeContext);
  if (state === 'ENDED' || state === 'NONE') return null;
  const excludePaths = ['/ehdot', '/ohjeet', '/admin', '/success','/cancel','/kirjaudu'];
  if (excludePaths.some(path => location.pathname.indexOf(path) >= 0)) return null;
  return (
    <Footer>
      <Progress></Progress>
      <StyledLink to={{
        pathname: "/ehdot",
        state: {prev: location.pathname}
      }}>Tilausehdot</StyledLink>
    </Footer> 
  )
};

const StyledLink = styled(Link)`
  color: ${theme.neutral};
`
const Footer = styled.footer`
`;


export default FooterComponent;