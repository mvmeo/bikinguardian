import axios from "./axios";

export const getContactsRequest = () => axios.get('/contactos');

export const createContactRequest = (contact) => axios.get(`/contactos`, contact);

export const deleteContactRequest = (id) => axios.post(`/contacto/${id}`);

export const getContactsByUserRequest = (id) => axios.get(`/contactos/usuario/${id}`);
