import axios from "./axios";


export const registerRequest = (user) => axios.post('/register', user);

export const loginRequest = (user) => axios.post('/login', user);

export const verifyTokenRequest = () => axios.get('/verifyToken');

export const deleteAccountRequest = (id) => axios.delete(`/delete/user/${id}`);

export const recoveryPasswordRequest = (email) => axios.post('/recovery-password', email);

export const changePasswordRequest = (data) => axios.patch('/change-password', data);