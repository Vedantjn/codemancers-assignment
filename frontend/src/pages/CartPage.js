import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { getCart, removeFromCart } from '../services/cart';

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      {cart.items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.items.map((item) => (
              <ListItem key={item.product._id}>
                <ListItemText
                  primary={item.product.title}
                  secondary={`Quantity: ${item.quantity} - Price: ₹${item.product.price * item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" gutterBottom>
            Total: ${cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
