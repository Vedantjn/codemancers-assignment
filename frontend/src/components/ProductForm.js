import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createProduct, updateProduct } from '../services/product';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 12px;
  font-size: 16px;
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

const ProductForm = ({ product, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (product._id) {
        await updateProduct(product._id, formData);
      } else {
        await createProduct(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <StyledInput
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <StyledInput
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <StyledInput
        accept="image/*"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <StyledButton type="submit">
        {product._id ? 'Update Product' : 'Create Product'}
      </StyledButton>
    </FormContainer>
  );
};

export default ProductForm;
