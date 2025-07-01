import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(username, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      padding: '16px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: 'rgba(15,23,42,0.85)',
          backdropFilter: 'blur(15px)',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <div style={{
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <FiLock color="#fff" size={28} />
        </div>

        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '16px' }}>Admin Login</h2>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239,68,68,0.15)',
            color: '#fecaca',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#94a3b8', marginBottom: '4px', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
