import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #007bff;
  color: white;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Nav>
      <StyledLink to="/">E-Commerce Store</StyledLink>
      <div>
        {user ? (
          <>
            {user.role === 'super_admin' && (
              <StyledLink to="/admin">Admin Dashboard</StyledLink>
            )}
            <StyledLink to="/cart">CART</StyledLink>
            <StyledLink as="button" onClick={logoutUser}>
              LOGOUT
            </StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/login">LOGIN</StyledLink>
            <StyledLink to="/register">REGISTER</StyledLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
