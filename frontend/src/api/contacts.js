import axios from "./axios";

export const getContactsRequest = () => axios.get('/contactos');

export const createContactRequest = (contact) => axios.post(`/contactos`, contact);

export const getContactsByUserRequest = (id) => axios.get(`/contactos/usuario/${id}`);
