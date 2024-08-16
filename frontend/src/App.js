import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage'
import PrivateRoute from './components/PrivateRoute'
import AdminRegisterPage from './pages/AdminRegisterPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            } 
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin-register" element={<AdminRegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
