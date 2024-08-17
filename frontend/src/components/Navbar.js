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

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  margin-left: 16px;
  &:hover {
    text-decoration: underline;
  }
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
            {user.role === 'super_admin' ? (
              <StyledLink to="/admin">Admin Dashboard</StyledLink>
            ) : (
              <StyledLink to="/cart">Cart</StyledLink>
            )}
            <LogoutButton onClick={logoutUser}>Logout</LogoutButton>


          </>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;