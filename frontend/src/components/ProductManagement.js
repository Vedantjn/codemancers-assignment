// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import ProductForm from './ProductForm';
import { getAllProducts, deleteProduct } from '../services/product';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleProductSubmit = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setEditingProduct({})}>
        Add New Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(product)}>Edit</Button>
                  <Button onClick={() => handleDelete(product._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editingProduct && (
        <ProductForm product={editingProduct} onSubmit={handleProductSubmit} />
      )}
    </div>
  );
};

export default ProductManagement;