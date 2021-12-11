import {
  FC,
  createContext,
  useEffect,
  useState,
} from "react";
import { proxy } from "../utils/axios";


export type Item = {
  id: string;
  name: string;
  cost: number;
  limit: number;
}

export interface ItemContextType {
  availableItems: Item[];
}

const itemContextDefault: ItemContextType = {
  availableItems: [],
}

export const ItemContext = createContext<ItemContextType>(itemContextDefault);

const ItemProvider: FC = ({ children }) => {
  const [availableItems, setItems] = useState<Item[]>(itemContextDefault.availableItems);
  const fetchAvailableItems = () => {
    proxy.get('/order/tickets').then(response => {
      setItems(response.data);
    })
  }
  useEffect(() => {
    fetchAvailableItems()
  },[]);

  return (
    <ItemContext.Provider value={
      {
        availableItems
      }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;