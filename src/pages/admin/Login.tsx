import { useContext } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from "../../contexts/AuthContext";
import { Input, Label, Button, Wrapper } from '../../styles/Styles';
import { useFormInput } from '../../hooks/useFormInput';

const Login = () => {
  const { loggedIn, login } = useContext(AuthContext);
  const username = useFormInput('')
  const password = useFormInput('')
  return loggedIn ? <Redirect to="/admin"/> : (
    <Wrapper>
      <Label>
        Käyttäjänimi
        <Input {...username} type="text" name="username"></Input>
      </Label>
      <Label>
        Salasana
        <Input {...password} type="password" name="password"></Input>
      </Label>
      <Button onClick={() => login(username.value, password.value)}>Kirjaudu</Button>
    </Wrapper>
  )
}

export default Login;