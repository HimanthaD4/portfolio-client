import React, { useState, useContext } from 'react';
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

  // Redirect if already logged in
  React.useEffect(() => {
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
      setError(result.message);
    }
  };

  // Inline styles
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(ellipse at top right, #1e293b, #0f172a)',
      padding: '20px',
      overflow: 'hidden',
      position: 'relative'
    },
    backgroundElements: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden'
    },
    backgroundElement: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      opacity: 0.1
    },
    loginContainer: {
      position: 'relative',
      zIndex: 10,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(20px)',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      width: '100%',
      maxWidth: '450px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    logoContainer: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      borderRadius: '12px',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '14px'
    },
    errorBox: {
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#fecaca',
      borderRadius: '8px',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      color: '#94a3b8',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: 500
    },
    inputContainer: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      top: '50%',
      left: '12px',
      transform: 'translateY(-50%)',
      color: '#64748b'
    },
    input: {
      width: '100%',
      padding: '12px 16px 12px 40px',
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
    },
    submitButton: {
      width: '100%',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: 600,
      color: '#ffffff',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    submitButtonHover: {
      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    submitButtonDisabled: {
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      cursor: 'not-allowed'
    },
    footerText: {
      marginTop: '32px',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '12px'
    },
    spinner: {
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Animated background elements */}
      <div style={styles.backgroundElements}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              ...styles.backgroundElement,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              transition: {
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.loginContainer}
      >
        <div style={styles.header}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'mirror',
              repeatDelay: 2
            }}
            style={styles.logoContainer}
          >
            <FiLock style={{ color: '#ffffff', fontSize: '28px' }} />
          </motion.div>
          <h2 style={styles.title}>Admin Portal</h2>
          <p style={styles.subtitle}>Enter your credentials to continue</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.errorBox}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputIcon}>
                <FiUser />
              </div>
              <input
                type="text"
                style={{
                  ...styles.input,
                  ':focus': styles.inputFocus
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <div style={styles.inputIcon}>
                <FiLock />
              </div>
              <input
                type="password"
                style={{
                  ...styles.input,
                  ':focus': styles.inputFocus
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              ...(isLoading ? styles.submitButtonDisabled : {}),
              ':hover': !isLoading ? styles.submitButtonHover : {}
            }}
          >
            {isLoading ? (
              <>
                <svg 
                  style={styles.spinner}
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                  <path 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    opacity="0.75"
                  />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <FiArrowRight style={{ marginLeft: '8px' }} />
              </>
            )}
          </motion.button>
        </form>

        <div style={styles.footerText}>
          <p>Secure access to administration panel</p>
        </div>
      </motion.div>

      {/* Global styles */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          input:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
          }
          
          button:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;