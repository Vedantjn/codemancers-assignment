// frontend/src/services/auth.js

import api from './api';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (email, password) => {
  return api.post('/auth/register', { email, password });
};

export const getCurrentUser = () => {
  return api.get('/auth/me');
};

export const logout = () => {
  localStorage.removeItem('token');
};