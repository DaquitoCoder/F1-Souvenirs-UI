import axios from '../axios';

export const getProductsList = async () => axios.get(`/categories-top`);

export const getProductById = async (id) => axios.get(`/products/${id}`);

export const getAllProducts = async () => axios.get(`/products`);