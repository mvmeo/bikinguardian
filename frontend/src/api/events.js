import axios from "./axios";

export const getEventsRequest = () => axios.get('/eventos');

export const getEventRequest = (id) => axios.get(`/evento/${id}`);

export const createEventRequest = (event) => axios.post('/eventos', event);

export const updateEventRequest = (id, event) => axios.put(`/evento/${id}`, event);

export const editEventRequest = (id, event) => axios.patch(`/evento/${id}`, event);

export const deleteEventRequest = (id) => axios.delete(`/evento/${id}`);

export const getEventsByUserRequest = (id) => axios.get(`/eventos/usuario/${id}`);

