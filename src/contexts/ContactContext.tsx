import React, { createContext, useState } from "react";


type CustomerInfo = {
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

const contactContextDefault: ContactContextType = {
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

const ContactProvider: React.FC = ({ children }) => {
  const storage = sessionStorage.getItem('info')
  const savedInfo = storage ? JSON.parse(storage) as CustomerInfo : contactContextDefault.customerInfo
  const [customerInfo, setInfo] = useState<CustomerInfo>(savedInfo);
  
  const updateInfo = (customerInfo: CustomerInfo) => {
    sessionStorage.setItem('info', JSON.stringify(customerInfo))
    setInfo(customerInfo);
  }

  const resetInfo = () => {
    setInfo(contactContextDefault.customerInfo);
    sessionStorage.removeItem('info');
    sessionStorage.removeItem('order');
  }
  return (
    <ContactContext.Provider value={{customerInfo, updateInfo, resetInfo}}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;