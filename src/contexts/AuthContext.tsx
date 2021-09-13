import { FC, createContext, useState } from "react";
import { proxy } from '../utils/axios';

export interface AuthContextType {
  loggedIn: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const authContextDefault: AuthContextType = {
  loggedIn: false,
  login: () => null,
  logout: () => null,
}

export const AuthContext = createContext<AuthContextType>(authContextDefault);

const ContactProvider: FC = ({ children }) => {
  const storage = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(storage ? true: authContextDefault.loggedIn);
  
  if(storage) {
    proxy.defaults.headers.common.Authorization = `Bearer ${storage}`;
  }
  const login = (username: string, password: string) => {
    proxy.post<string>('/auth/login', {username, password}).then((response) => {
      const token = response.data;
      proxy.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('token', token);
      setLoggedIn(true);
    }).catch((error) => {
      console.error(error);
    })
  }
  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    proxy.defaults.headers.common.Authorization = '';
  }
  return (
    <AuthContext.Provider value={{loggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContactProvider;