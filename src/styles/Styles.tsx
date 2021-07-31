import styled, { createGlobalStyle } from 'styled-components';
import background from '../assets/bg.png'
export const theme = {
  backgroundColor: "hsl(0,0%,100%)",
  light: "hsl(120,100%,100%)",
  textColor: "hsl(0,0%,10%)",
  neutral: "hsl(0,0%,40%)",
  error: "hsl(0,30%,50%)",
  neutralLight: "hsl(0,0%,70%)",
  neutralActive: "hsl(0,0%, 65%)",
  neutralDisabled: "hsla(0, 0%, 70%, 0)",
  bgGradient: "hsla(0, 100%, 50%, 0)",
  commonWidth: "768px",
}
 
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.textColor};
    background-image:
      linear-gradient(to bottom, 
      ${theme.bgGradient}, 
      ${theme.bgGradient}),
      url(${background});
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  select, input, textarea{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem
  }
`;


export const Button = styled.button`
  position: relative;
  font-size: 1.5rem;
  background: transparent;
  border: 2px solid ${theme.neutralLight};
  border-radius: 5px;
  padding: 0.5rem;
  @media (hover: hover) {
    &:hover:enabled {
      background: ${theme.neutralLight};
      cursor: pointer;
    }
    &:active:enabled {
      background: ${theme.neutralActive};
    }
  }
  @media (hover: none) {
    &:active:enabled {
      background: ${theme.neutralLight};
      cursor: pointer;
    }
  }
  &:disabled {
    border-color: ${theme.neutralDisabled};
    color: ${theme.neutralDisabled};
  }
`
export const NavigationButton = styled(Button)`
  width: 120px;
  margin: 0 4px;
`

export const Label = styled.label`
  color: ${props => props.theme.neutral};
  font-size: 1rem;
`;

export const Input = styled.input`
  display: block;
  background: transparent;
  border: none;
  border-bottom: solid 2px ${props => props.theme.neutralLight};
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  width: 100%;
  margin-bottom: 32px;
  ::placeholder{
    color: transparent;
  }
  &:focus {
    outline-width: 0;
    border-color: ${props => props.theme.neutralActive};
  }
`;

export const Wrapper = styled.div`
  max-width: ${props => props.theme.commonWidth};
  width: 100%;
`;