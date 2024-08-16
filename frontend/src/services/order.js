import api from './api';

export const createOrder = (shippingAddress) => {
  return api.post('/orders', { shippingAddress });
};

export const getOrders = () => {
  return api.get('/orders');
};