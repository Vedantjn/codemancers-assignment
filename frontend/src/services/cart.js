import api from './api';

export const getCart = () => {
  return api.get('/cart');
};

export const addToCart = (productId, quantity) => {
  return api.post('/cart', { productId, quantity });
};

export const updateCartItem = (productId, quantity) => {
  return api.put('/cart', { productId, quantity });
};

export const removeFromCart = (productId) => {
  return api.delete(`/cart/${productId}`);
};