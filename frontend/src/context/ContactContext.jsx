import { createContext, useState, useContext } from "react";
import { getContactsRequest, createContactRequest } from "../api/contacts";
const ContactContext = createContext();

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error(
      "useNotification debe estar dentro del proveedor EventProvider"
    );
  }
  return context;
};

export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const res = await getContactsRequest();
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createContact = async (contact) => {
    const res = await createContactRequest(contact);
  };


  return (
    <ContactContext.Provider
      value={{
        createContact,
        getContacts,
        contacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}
