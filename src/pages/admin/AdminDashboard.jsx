import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut, FiSettings, FiHome, FiBriefcase, FiUsers, FiFileText, FiBarChart2 } from 'react-icons/fi';

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  // Navbar container styles
  const navbarStyles = {
    backgroundColor: '#111827',
    color: 'white',
    height: '64px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center'
  };

  // Inner container styles
  const containerStyles = {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  // Logo styles
  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
    color: 'white'
  };

  // Gradient text for logo
  const gradientText = {
    background: 'linear-gradient(90deg, #f59e0b, #f97316)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };

  // Navigation links container
  const navLinksStyles = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  };

  // Individual nav link styles
  const navLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#9CA3AF',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s ease'
  };

  // Active nav link styles
  const activeNavLinkStyles = {
    ...navLinkStyles,
    color: 'white',
    backgroundColor: 'rgba(249, 115, 22, 0.1)'
  };

  // Button styles
  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(31, 41, 55, 0.6)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  // Hover effect for buttons
  const buttonHover = {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderColor: 'rgba(249, 115, 22, 0.3)'
  };

  return (
<div></div>
  );
};

export default AdminNavbar;