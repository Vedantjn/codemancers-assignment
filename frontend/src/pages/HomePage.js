import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import ProductList from '../components/ProductList';
import ProductManagement from '../components/ProductManagement';
import { getAllProducts } from '../services/product';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const WelcomeMessage = styled.h2`
  margin-bottom: 20px;
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
      {user && (
        <WelcomeMessage>Hello, {user.email}!</WelcomeMessage>
      )}
      {user && user.role === 'super_admin' ? (
        <ProductManagement />
      ) : (
        <>
          <h1>Our Products</h1>
          <ProductList products={products} />
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;