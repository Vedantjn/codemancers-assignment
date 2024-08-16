import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Snackbar } from '@mui/material';
import { createOrder } from '../services/order';

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(shippingAddress);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Shipping Address"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Place Order
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Order placed successfully! Redirecting to home page..."
      />
    </Container>
  );
};

export default CheckoutPage;