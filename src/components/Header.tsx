import styled from 'styled-components';
import logo from '../assets/rwbk_logo.svg';
import { useHistory } from 'react-router-dom';

const HeaderComponent = () => {
  const history = useHistory();
  return (
    <Header>
      <Logo src={logo} alt="RWBK logo" onClick={() => history.push('/')}></Logo>
    </Header> 
  )
}


const Header = styled.header`
  height: 4rem;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 1rem;
`;

const Logo = styled.img`
  height: 4rem;
  cursor: pointer;
`;

export default HeaderComponent;