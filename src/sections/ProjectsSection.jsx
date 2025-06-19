import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe, FaLayerGroup, FaStar } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        const projectsData = Array.isArray(response.data.data) ? 
          response.data.data : 
          Array.isArray(response.data) ? 
            response.data : 
            [];
        const featuredProjects = projectsData.filter(project => project.featured);
        setProjects(featuredProjects);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();

    const handleScroll = () => {
      const element = document.getElementById('projects');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/1000x800?text=No+Image';
  };

  const getImageSource = (project) => {
    if (!project.image) return 'https://via.placeholder.com/1000x800?text=No+Image';
    if (project.image.url) return project.image.url;
    if (project.image.data) return `data:${project.image.contentType};base64,${project.image.data}`;
    return 'https://via.placeholder.com/1000x800?text=No+Image';
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div style={{ 
      padding: '4rem 1rem', 
      textAlign: 'center',
      backgroundColor: '#0f172a',
      minHeight: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ color: '#e2e8f0' }}>Loading projects...</div>
    </div>
  );

  if (error) return (
    <div style={{ 
      padding: '4rem 1rem', 
      textAlign: 'center',
      backgroundColor: '#0f172a',
      minHeight: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ color: '#f87171' }}>Error: {error}</div>
    </div>
  );

  return (
    <section id="projects" style={{
      backgroundColor: '#0f172a',
      padding: '1rem 1rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          maxWidth: '800px',
          padding: '0 1rem'
        }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.4rem 1.2rem',
              borderRadius: '999px',
              background: 'rgba(249, 115, 22, 0.12)',
              border: '1px solid rgba(249, 115, 22, 0.2)',
              color: '#f97316',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '1px',
              marginBottom: '1.5rem',
            }}
          >
            FEATURED PROJECTS
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#f8fafc'
          }}>
            My <span style={{ color: '#f59e0b' }}>Best Work</span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#94a3b8',
            lineHeight: 1.6
          }}>
            Highlighted professional projects
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          padding: '0 1rem'
        }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  position: 'relative'
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 2,
                  color: '#f59e0b',
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <FaStar /> Featured
                </div>

                <div style={{
                  width: '100%',
                  height: '180px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={getImageSource(project)}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={handleImageError}
                  />
                </div>

                <div style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '999px',
                      background: project.category === 'web' 
                        ? 'rgba(56, 189, 248, 0.12)' 
                        : project.category === 'ai' 
                          ? 'rgba(236, 72, 153, 0.12)'
                          : 'rgba(74, 222, 128, 0.12)',
                      border: project.category === 'web' 
                        ? '1px solid rgba(56, 189, 248, 0.2)' 
                        : project.category === 'ai'
                          ? '1px solid rgba(236, 72, 153, 0.2)'
                          : '1px solid rgba(74, 222, 128, 0.2)',
                      color: project.category === 'web' 
                        ? '#38bdf8' 
                        : project.category === 'ai'
                          ? '#ec4899'
                          : '#4ade80',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '0.8rem',
                      alignSelf: 'flex-start'
                    }}
                  >
                    {project.category === 'web' ? 'WEB DEVELOPMENT' : 
                     project.category === 'ai' ? 'AI/ML PROJECT' : 
                     project.category === 'mobile' ? 'MOBILE APP' :
                     'OTHER PROJECT'}
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#f8fafc'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {project.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {project.tags && project.tags.map((tag, i) => (
                      <span key={i} style={{
                        backgroundColor: 'rgba(30, 41, 59, 0.7)',
                        color: '#e2e8f0',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '0.8rem'
                  }}>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          flex: 1,
                          backgroundColor: 'rgba(56, 189, 248, 0.1)',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          color: '#38bdf8',
                          textDecoration: 'none'
                        }}
                      >
                        <FaGithub size={14} /> Code
                      </motion.a>
                    )}
                    <motion.a
                      href={project.live || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        flex: 1,
                        backgroundColor: project.live 
                          ? 'rgba(249, 115, 22, 0.1)' 
                          : 'rgba(100, 116, 139, 0.1)',
                        border: project.live 
                          ? '1px solid rgba(249, 115, 22, 0.2)' 
                          : '1px solid rgba(100, 116, 139, 0.2)',
                        color: project.live ? '#f97316' : '#64748b',
                        textDecoration: 'none',
                        cursor: project.live ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <FaGlobe size={14} /> {project.live ? 'Live' : 'N/A'}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '2rem',
              color: '#94a3b8'
            }}>
              No featured projects available. Check back later.
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: '2rem',
            textAlign: 'center'
          }}
        >
          <Link
            to="/projects"
            style={{
              display: 'inline-block',
              padding: '0.8rem 1.8rem',
              borderRadius: '6px',
              color: '#fff',
              background: 'rgba(56, 189, 248, 0.2)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              fontSize: '0.95rem'
            }}
            onClick={(e) => {
              if (window.location.pathname === '/projects') {
                e.preventDefault();
                scrollToProjects();
              }
            }}
          >
            <FaLayerGroup style={{ marginRight: '0.5rem' }} />
            View Full Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;