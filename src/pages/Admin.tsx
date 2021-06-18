import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from "../contexts/AuthContext";
import { Input, Label, Button } from '../styles/Styles';
import { useFormInput } from '../hooks/useFormInput';
import { proxy } from '../utils/axios';


const Wrapper = styled.div``;
const Login = () => {
  const { login } = useContext(AuthContext);
  const username = useFormInput('')
  const password = useFormInput('')
  return (
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

const Admin = () => {
  const { loggedIn, logout } = useContext(AuthContext);
  useEffect(() => {
    if(loggedIn) proxy.get('/admin/test').then(console.log)
  })
  if(!loggedIn) return <Login/>;
  return (
    <>
    <div>Kirjautunut</div>
    <Button onClick={logout}>Kirjaudu ulos</Button>
    </>
  )
}

export default Admin;