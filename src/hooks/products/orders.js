import axios from '../axios';

export const getOrders = async () => axios.get('/my-orders');

export const createOrder = async (order) => axios.post('/order-checkout', order);