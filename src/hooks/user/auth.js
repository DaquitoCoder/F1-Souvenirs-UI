import axios from '../axios';

export const registerRequest = async (user) => axios.post(`/signup`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async (token) =>
  axios.get(`/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
