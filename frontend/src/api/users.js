import axios from "./axios";


export const userRequest = () => axios.get('/usuario/');

export const editProfileRequest = (profile) => axios.patch(`/profile`, profile);

export const userByIdRequest = (id) => axios.get(`/usuario/${id}`);