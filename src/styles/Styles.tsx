import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  backgroundColor: "hsl(0,0%,100%)",
  light: "hsl(120,100%,100%)",
  textColor: "hsl(0,0%,10%)",
  neutral: "hsl(0,0%,50%)",
  neutralLight: "hsl(0,0%,80%)",
  neutralHover: "hsl(0,0%, 80%)",
  neutralActive: "hsl(0,0%, 65%)",
  neutralDisabled: "hsla(0,0%, 20%,0.2)",
  disabledColor: "#AAAAAA",
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
    background-color: ${theme.backgroundColor};
    color: ${theme.textColor};
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
  flex: 1;
  font-size: 1.5rem;
  border: none;
  background: ${theme.backgroundColor};
  border: 2px solid ${theme.neutralLight};
  border-radius: 5px;
  padding: 1rem;
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

export const BackButton = styled(Button)`
  padding: 0 0.1rem;
`

export const Base = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: ${theme.commonWidth};
  width: 100%;
`;

export const Label = styled.label`
  color: ${props => props.theme.neutral};
  font-size: 1rem;
`;

export const Input = styled.input`
  display: block;
  background: ${props => props.theme.backgroundColor};
  border: none;
  border-bottom: solid 2px ${props => props.theme.neutralLight};
  color: ${props => props.theme.textColor};
  font-size: 1.5rem;
  width: 100%;
  margin-bottom: 2rem;
  ::placeholder{
    //color: hsl(0, 0%, 60%);
    color: ${props => props.theme.backgroundColor};
  }
  &:focus {
    outline-width: 0;
    border-color: ${props => props.theme.neutralActive};
  }
`;