import axios from "./axios";

export const getNotificationsRequest = () => axios.get('/notificaciones');

export const createNotificationRequest = (notification) => axios.post(`/notificaciones`, notification);

export const deleteNotificationRequest = (id) => axios.post(`/notificacion/${id}`);

export const deleteNotificationsRequest = () => axios.delete(`/notificaciones`);
