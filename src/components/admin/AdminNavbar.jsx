import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut, FiHome, FiBriefcase, FiUsers, FiBarChart2 } from 'react-icons/fi';

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={{
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
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/admin/dashboard" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '20px',
          fontWeight: '600',
          textDecoration: 'none',
          color: 'white'
        }}>
          <span style={{
            background: 'linear-gradient(90deg, #f59e0b, #f97316)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            ByteMuse
          </span>
          <span style={{ color: '#6B7280' }}>Admin</span>
        </Link>

        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          <Link 
            to="/admin/dashboard" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: isActive('/admin/dashboard') ? 'white' : '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              backgroundColor: isActive('/admin/dashboard') ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
            }}
          >
            <FiHome size={16} />
            Dashboard
          </Link>
          <Link 
            to="/admin/projects" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: isActive('/admin/projects') ? 'white' : '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              backgroundColor: isActive('/admin/projects') ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
            }}
          >
            <FiBriefcase size={16} />
            Projects
          </Link>
          <Link 
            to="/admin/users" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: isActive('/admin/users') ? 'white' : '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              backgroundColor: isActive('/admin/users') ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
            }}
          >
            <FiUsers size={16} />
            Users
          </Link>
          <Link 
            to="/admin/contacts" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: isActive('/admin/analytics') ? 'white' : '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              backgroundColor: isActive('/admin/contacts') ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
            }}
          >
            <FiBarChart2 size={16} />
            contact
          </Link>

          <button 
            style={{
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
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(249, 115, 22, 0.2)';
              e.target.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(31, 41, 55, 0.6)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onClick={handleLogout}
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;