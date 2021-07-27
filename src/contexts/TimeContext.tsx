import React, { createContext, useEffect, useState } from "react";
import { proxy } from "../utils/axios";

export type STATE = 'NONE' | 'PRESALE' | 'SALE' | 'ENDED';

export interface TimeContextType {
  state: STATE
}

const timeContextDefault: TimeContextType = {
  state: 'NONE'
}

export const TimeContext = createContext<TimeContextType>(timeContextDefault);

const TimeProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<STATE>(timeContextDefault.state);
  useEffect(() => {
    proxy.get<STATE>('/time').then(response => {
      setState(response.data);
    }).catch();
  },[]);
  return (
    <TimeContext.Provider value={{state}}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeProvider;