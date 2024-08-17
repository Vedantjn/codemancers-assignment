// frontend/src/pages/HomePage.js

import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import ProductList from '../components/ProductList';
import ProductManagement from '../components/ProductManagement';
import { getAllProducts } from '../services/product';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  margin-top: 2rem;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

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
    <PageContainer>

    <Container>
      {user && (
        <Typography variant="h5" component="h2" gutterBottom>
          Hello, {user.email}!
        </Typography>
      )}
      {user && user.role === 'super_admin' ? (
        <ProductManagement />
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Our Products
          </Typography>
          <Grid container spacing={3}>
            <ProductList products={products} />
          </Grid>
        </>
      )}
    </Container>
          </PageContainer>
  );
};

export default HomePage;