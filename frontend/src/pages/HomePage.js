import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import ProductList from '../components/ProductList';
import { getAllProducts } from '../services/product';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === 'super_admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      {user && (
        <Typography variant="h5" component="h2" gutterBottom>
          Hello, {user.email}!
        </Typography>
      )}
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        <ProductList products={products} />
      </Grid>
    </Container>
  );
};

export default HomePage;
