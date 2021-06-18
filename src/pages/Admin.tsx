import { useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { Button } from '../styles/Styles';
import { proxy } from '../utils/axios';

const Admin = () => {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    proxy.get('/admin/test').then(console.log);
  })
  return (
    <>
    <div>Kirjautunut</div>
    <Button onClick={logout}>Kirjaudu ulos</Button>
    </>
  )
}

export default Admin;