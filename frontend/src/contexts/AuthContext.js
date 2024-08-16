// frontend/src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { register, login as apiLogin, getCurrentUser } from '../services/auth';
import api from '../services/api'; // Import the api instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching current user:', error);
      localStorage.removeItem('token');
    }
  };

  const registerUser = async (email, password) => {
    try {
      const response = await register(email, password);
      localStorage.setItem('token', response.data.token);
      await fetchCurrentUser();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      const { token, email: userEmail, role } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.defaults.headers.common['x-auth-token'] = token;
      setUser({ email: userEmail, role }); // Set the user object with email and role
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = ''; // Clear the token from axios headers
    api.defaults.headers.common['x-auth-token'] = '';
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
