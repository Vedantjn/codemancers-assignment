import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/cart';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const StyledCard = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledCardMedia = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const StyledCardContent = styled.div`
  padding: 16px;
`;

const StyledTypography = styled.h5`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <StyledGrid>
      {products.map((product) => (
        <StyledCard key={product._id}>
          <StyledCardMedia
            src={`http://localhost:5000/${product.image}`}
            alt={product.title}
          />
          <StyledCardContent>
            <StyledTypography>{product.title}</StyledTypography>
            <p>{product.description}</p>
            <h6>₹{product.price}</h6>
            <StyledButton onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </StyledButton>
          </StyledCardContent>
        </StyledCard>
      ))}
    </StyledGrid>
  );
};

export default ProductList;
