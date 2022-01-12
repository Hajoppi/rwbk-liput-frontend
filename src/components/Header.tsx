import styled, { keyframes } from 'styled-components';
import logo from '../assets/rwbk_logo-min.png';
import { useHistory } from 'react-router-dom';
import Timer from './Timer';

const HeaderComponent = () => {
  const history = useHistory();
  return (
    <Header>
      <Logo src={logo} alt="RWBK logo" onClick={() => history.push('/')}></Logo>
      <Timer></Timer>
    </Header> 
  )
};


const Header = styled.header`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  cursor: pointer;
  height: 100px;
  width: 200px;
  animation: ${rotate} 3s;
`;



export default HeaderComponent;