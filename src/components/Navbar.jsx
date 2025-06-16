// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaFileDownload } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0
  });
  
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const resizeObserver = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', target: 'hero' },
    { name: 'Projects', target: 'projects' },
    { name: 'Services', target: 'services' },
    { name: 'Skills', target: 'skills' },
    { name: 'Process', target: 'process' },
    { name: 'About', target: 'about' },
    { name: 'Contact', target: 'contact' },
  ];

  // Update underline position
  const updateUnderline = (linkName) => {
    const normalizedLink = linkName.toLowerCase();
    const linkElement = linkRefs.current[normalizedLink];
    if (!linkElement || !navRef.current) return;
    
    const linkRect = linkElement.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    setUnderlineStyle({
      width: linkRect.width,
      left: linkRect.left - navRect.left,
      opacity: 1,
      transition: 'all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)'
    });
  };

  // Initialize underline and set up resize observer
  useEffect(() => {
    if (navItems.length > 0) {
      updateUnderline(activeLink);
    }
    
    // Set up resize observer
    const handleResize = () => updateUnderline(activeLink);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeLink]);

  const handleMouseEnter = (linkName) => {
    if (linkName.toLowerCase() !== activeLink) {
      updateUnderline(linkName);
    }
  };

  const handleMouseLeave = () => {
    updateUnderline(activeLink);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.98)' : 'rgba(15, 23, 42, 0.95)',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      padding: '0.5rem 0',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div ref={navRef} style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Premium Logo */}
        <Link 
          to="hero" 
          smooth={true} 
          duration={600} 
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          onClick={() => setActiveLink('home')}
        >
          <div style={{
            position: 'relative',
          }}>
            <div style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'white',
              letterSpacing: '-0.5px',
              position: 'relative',
            }}>
              Byte<span style={{ 
                color: '#f97316',
                fontWeight: 800 
              }}>Muse</span>
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: 0,
              height: '2px',
              width: '100%',
              background: 'linear-gradient(90deg, #f97316, #f59e0b)',
              borderRadius: '1px',
            }}></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '1.2rem',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{
            display: 'flex',
            gap: '1.8rem',
            marginRight: '1.8rem',
            position: 'relative',
          }}>
            {/* Active link underline */}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              height: '2px',
              background: 'linear-gradient(90deg, #f97316, #f59e0b)',
              borderRadius: '1px',
              ...underlineStyle
            }}></div>
            
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.target}
                spy={true}
                smooth={true}
                offset={-80}
                duration={600}
                innerRef={(el) => (linkRefs.current[item.name.toLowerCase()] = el)}
                className={`nav-link ${activeLink === item.name.toLowerCase() ? 'active' : ''}`}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  color: activeLink === item.name.toLowerCase() ? '#f97316' : '#cbd5e1',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  padding: '0.3rem 0',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.3px',
                  whiteSpace: 'nowrap'
                }}
                onSetActive={() => setActiveLink(item.name.toLowerCase())}
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* CV Download Button */}
          <button style={{
            background: 'rgba(249, 115, 22, 0.15)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            color: '#f97316',
            padding: '0.5rem 1.2rem',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontSize: '0.9rem',
            fontWeight: '500',
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(249, 115, 22, 0.25)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(249, 115, 22, 0.15)';
            e.target.style.transform = 'translateY(0)';
          }}
          >
            <FaFileDownload style={{ fontSize: '0.9rem' }} />
            <span>Download CV</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#cbd5e1',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '5px',
          }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes style={{ color: '#f97316' }} /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(12px)',
          zIndex: 999,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.target}
              spy={true}
              smooth={true}
              offset={-80}
              duration={600}
              style={{
                padding: '0.9rem 1.2rem',
                color: activeLink === item.name.toLowerCase() ? '#f97316' : '#cbd5e1',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                borderRadius: '5px',
                background: activeLink === item.name.toLowerCase() ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                transition: 'all 0.2s ease',
                fontFamily: "'Inter', sans-serif",
              }}
              onClick={() => {
                setActiveLink(item.name.toLowerCase());
                toggleMenu();
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(249, 115, 22, 0.1)'}
              onMouseLeave={e => e.target.style.background = activeLink === item.name.toLowerCase() ? 'rgba(249, 115, 22, 0.1)' : 'transparent'}
            >
              {item.name}
            </Link>
          ))}
          
          <button style={{
            padding: '0.9rem 1.2rem',
            background: 'rgba(249, 115, 22, 0.15)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            color: '#f97316',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '1rem',
            fontWeight: '500',
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            fontFamily: "'Inter', sans-serif",
          }}>
            <FaFileDownload style={{ fontSize: '0.9rem' }} />
            <span>Download CV</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;