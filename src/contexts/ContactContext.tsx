import { FC, createContext, useState, useMemo, useCallback, useContext, useEffect } from "react";
import { proxy } from "../utils/axios";
import { CartContext } from "./CartContext";


export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  extra: string;
}

export interface ContactContextType {
  customerInfo: CustomerInfo;
  updateInfo: (customerInfo: CustomerInfo) => void;
  resetInfo: () => void;
}

export const contactContextDefault: ContactContextType = {
  customerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    extra: '',
  },
  updateInfo: () => null,
  resetInfo: () => null,
}

export const ContactContext = createContext<ContactContextType>(contactContextDefault);

const ContactProvider: FC = ({ children }) => {
  const { orderId } = useContext(CartContext);
  const [ infoFetched, setFetched ] = useState(false);
  const [customerInfo, setInfo] = useState<CustomerInfo>(contactContextDefault.customerInfo);
  
  useEffect(() => {
    if (!orderId || infoFetched) return
    proxy.get(`order2/contact/${orderId}`).then(response => {
      setInfo(response.data);
      setFetched(true);
    }).catch(() => {});
  },[setFetched, infoFetched, orderId]);

  const updateInfo = useCallback((customerInfo: CustomerInfo) => {
    proxy.put('order2/contact', {
      orderId,
      customerInfo,
    });
    setInfo(customerInfo);
  },[orderId]);

  const resetInfo = useCallback(() => {
    setInfo(contactContextDefault.customerInfo);
  },[]);
  const itemSetters = useMemo(() => ({updateInfo, resetInfo}),[updateInfo, resetInfo]);
  return (
    <ContactContext.Provider value={{customerInfo, ...itemSetters}}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;