// frontend/src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { createProduct, updateProduct } from '../services/product';

const ProductForm = ({ product, onSubmit, onCancel }) => {
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

  console.log('Form data:', {
    title,
    description,
    price,
    image: image ? image.name : 'No image'
  });

  try {
    if (product && product._id) {
      await updateProduct(product._id, formData);
    } else {
      const response = await createProduct(formData);
      console.log('Create product response:', response);
    }
    onSubmit();
  } catch (error) {
    console.error('Error submitting product:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {product && product._id ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <TextField
        label="Price"
        fullWidth
        margin="normal"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        accept="image/*"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', marginRight: '10px' }}>
        {product && product._id ? 'Update Product' : 'Add Product'}
      </Button>
      <Button variant="contained" color="secondary" onClick={onCancel} style={{ marginTop: '20px' }}>
        Cancel
      </Button>
    </form>
  );
};

export default ProductForm;