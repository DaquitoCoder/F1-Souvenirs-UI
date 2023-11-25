import axios from '../axios';

export const getProductsList = async () => axios.get(`/categories-top`);

export const getProductById = async (id) => axios.get(`/products/${id}`);

export const getAllProducts = async () => axios.get(`/products`);

export const getAllProductsBySeller = async () =>
  axios.get(`/products-by-seller`);

export const deleteProductById = async (id) => axios.delete(`/products/${id}`);

export const getAllCategories = async () => axios.get(`/categories`);

export const getCategoryById = async (id) => axios.get(`/categories/${id}`);

export const addProduct = async (product) => axios.post(`/products`, product);

export const editProduct = async (product) =>
  axios.put(`/products/${product.id}`, product);
