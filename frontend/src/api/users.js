import axios from "./axios";


export const userRequest = () => axios.get('/usuarios');

export const userByIdRequest = (id) => axios.get(`/usuario/${id}`);