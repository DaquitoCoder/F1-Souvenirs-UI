import axios from '../axios';

export const getProductsList = async () => axios.get(`/categories-top`);
