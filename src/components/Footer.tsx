import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { TimeContext } from '../contexts/TimeContext';
import { theme } from '../styles/Styles';
import { useContext } from 'react';

const Progress = () => {
  const { pathname } = useLocation();
  const paths = ['/','/yhteystiedot','/maksu'];
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
  const { pathname } = useLocation();
  const {state} = useContext(TimeContext);
  if (state === 'ENDED' || state === 'NONE') return null;
  const includePaths = ['/','/yhteystiedot','/maksu'];
  if(!includePaths.some(path=> path===pathname )) return null;
  return (
    <Footer>
      <Progress></Progress>
      {pathname !== '/maksu' && <StyledLink to={{
        pathname: "/ehdot",
        state: {prev: pathname}
      }}>Tilausehdot</StyledLink>}
    </Footer> 
  )
};

const StyledLink = styled(Link)`
  color: ${theme.linkColor};
`
const Footer = styled.footer`
`;


export default FooterComponent;