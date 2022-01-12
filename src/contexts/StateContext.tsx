import { FC, createContext, useEffect, useState } from "react";
import { proxy } from "../utils/axios";

export type State = 'NONE' | 'PRESALE' | 'SALE' | 'ENDED';
export type Mode = 'SIGNUP' | 'ITEM';

export interface StateContextType {
  state: State,
  mode: Mode
}

const StateContextDefault: StateContextType = {
  state: 'NONE',
  mode: 'ITEM',
}

export const StateContext = createContext<StateContextType>(StateContextDefault);

const StateProvider: FC = ({ children }) => {
  const [state, setState] = useState<State>(StateContextDefault.state);
  const [mode, setMode] = useState<Mode>(StateContextDefault.mode);
  useEffect(() => {
    proxy.get<{timeState: State, mode: Mode }>('/state').then(response => {
      const {timeState, mode} = response.data;
      setState(timeState);
      setMode(mode);
    }).catch(() => {});
  },[]);
  return (
    <StateContext.Provider value={
      {
      state,
      mode,
      }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;