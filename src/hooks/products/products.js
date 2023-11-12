import axios from '../axios';

export const getProductsList = async () => axios.get(`/categories-top`);

export const getProductById = async (id) => axios.get(`/products/${id}`);
