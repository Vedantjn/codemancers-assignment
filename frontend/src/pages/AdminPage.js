import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import ProductManagement from '../components/ProductManagement';
import { AuthContext } from '../contexts/AuthContext';

const AdminPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      {user && user.role === 'super_admin' && <ProductManagement />}
    </Container>
  );
};

export default AdminPage;