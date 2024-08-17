import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/cart';
import styled from 'styled-components';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ProductTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.1em;
`;

const ProductDescription = styled.p`
  margin: 0 0 10px 0;
  font-size: 0.9em;
  color: #666;
`;

const ProductPrice = styled.p`
  margin: 0 0 10px 0;
  font-weight: bold;
  font-size: 1.2em;
`;

const AddToCartButton = styled.button`
  background-color: #f0c14b;
  border: 1px solid #a88734;
  border-radius: 3px;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 0.9em;
  &:hover {
    background-color: #ddb347;
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
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product._id}>
          <ProductImage src={`http://localhost:5000/${product.image}`} alt={product.title} />
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>₹{product.price}</ProductPrice>
          <AddToCartButton onClick={() => handleAddToCart(product._id)}>
            Add to Cart
          </AddToCartButton>
        </ProductCard>
      ))}
    </ProductGrid>
  );
};

export default ProductList;