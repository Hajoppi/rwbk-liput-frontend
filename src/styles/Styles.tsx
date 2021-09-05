import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  backgroundColor: "hsl(0,0%,10%);",
  linkColor: "hsl(0, 100%, 60%)",
  textColor: "hsl(0,0%,100%)",
  neutral: "hsl(0,0%,40%)",
  error: "hsl(0,40%,50%)",
  neutralLight: "hsl(0,0%,70%)",
  neutralActive: "hsl(0,0%, 65%)",
  bgGradient: "hsla(0, 0%, 10%, 0.5)",
  commonWidth: "768px",
};
 
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.textColor};
    background-color: ${theme.backgroundColor};
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

export const Element = styled.div<{flex: number}>`
  flex: ${props => props.flex};
  position: relative;
`;

export const Button = styled.button`
  position: relative;
  font-size: 1.5rem;
  background: transparent;
  border: 2px solid ${theme.neutralLight};
  border-radius: 5px;
  padding: 0.5rem;
  color: ${theme.textColor};
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
    color: ${theme.neutralLight};
  }
`
export const NavigationButton = styled(Button)`
  width: 120px;
  margin: 0 4px;
`

export const Label = styled.label`
  color: ${props => props.theme.neutral};
  color: ${props => props.theme.textColor};
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
    color: ${theme.neutralLight};
    font-size: 1rem;
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