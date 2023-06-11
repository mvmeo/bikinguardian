import axios from "./axios";

export const getEventsRequest = () => axios.get('/eventos');

export const getEventRequest = (id) => axios.get(`/evento/${id}`);

export const createEventRequest = (event) => axios.post('/eventos', event);

export const updateEventRequest = (event) => axios.put(`/evento/${event.id}`, event);

export const deleteEventRequest = (id) => axios.delete(`/eventos/${id}`);

export const getEventsByUserRequest = (id) => axios.get(`/eventos/usuario/${id}`);

