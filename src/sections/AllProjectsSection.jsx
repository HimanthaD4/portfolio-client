import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe, FaLayerGroup, FaCode, FaRobot, FaMobileAlt, FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AllProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        const projectsData = Array.isArray(response.data.data) ? response.data.data : 
                           Array.isArray(response.data) ? response.data : [];
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
  };

  const getImageSource = (project) => {
    if (!project.image) return 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
    if (project.image.url) return project.image.url;
    if (project.image.data) return `data:${project.image.contentType};base64,${project.image.data}`;
    return 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'web': return <FaCode />;
      case 'ai': return <FaRobot />;
      case 'mobile': return <FaMobileAlt />;
      default: return <FaCode />;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  if (loading) return (
    <div style={{ 
      padding: '6rem 1rem', 
      textAlign: 'center', 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <div style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Loading projects...</div>
    </div>
  );

  if (error) return (
    <div style={{ 
      padding: '6rem 1rem', 
      textAlign: 'center', 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <div style={{ color: '#f87171', fontSize: '1.1rem' }}>Error: {error}</div>
    </div>
  );

  return (
    <section id="all-projects" style={{ 
      backgroundColor: '#0f172a', 
      padding: '4rem 1rem', 
      minHeight: '100vh',
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        width: '100%', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 2, 
        padding: '0 1rem' 
      }}>
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center', 
          marginBottom: '-1rem' 
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
            fontWeight: '700', 
            marginBottom: '0.5rem', 
            color: '#f59e0b' 
          }}>
            My <span style={{ color: '#94a3b8' }}>Portfolio</span>
          </h2>
          <p style={{ 
            maxWidth: '700px', 
            marginBottom: '1.5rem', 
            fontSize: '1rem', 
            color: '#7c8a9e', 
            lineHeight: 1.5 
          }}>
            Browse through all my completed projects and works
          </p>
          
          {/* Search and Filter Bar */}
          <div style={{ 
            width: '100%', 
            maxWidth: '800px', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              position: 'relative', 
              marginBottom: '1.5rem' 
            }}>
              <FaSearch style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#64748b' 
              }} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem 1rem 0.8rem 2.5rem', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  color: '#e2e8f0', 
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  style={{ 
                    position: 'absolute', 
                    right: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    color: '#64748b', 
                    cursor: 'pointer' 
                  }}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            {/* Category Filters */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ 
                    padding: '0.5rem 1.2rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: activeCategory === category.id ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: activeCategory === category.id ? '#f97316' : '#e2e8f0',
                    border: activeCategory === category.id ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem', 
            width: '100%' 
          }}>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
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
                  boxShadow: '0 10px 25px rgba(249, 115, 22, 0.1)', 
                  borderColor: 'rgba(249, 115, 22, 0.3)' 
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: '180px', 
                  position: 'relative', 
                  overflow: 'hidden', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)' 
                }}>
                  <img 
                    src={getImageSource(project)} 
                    alt={project.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }} 
                    onError={handleImageError}
                  />
                </div>

                <div style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: 'calc(100% - 180px)' 
                }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.25rem 0.8rem', 
                    borderRadius: '999px', 
                    background: project.category === 'web' ? 'rgba(56, 189, 248, 0.12)' : 
                              project.category === 'ai' ? 'rgba(236, 72, 153, 0.12)' : 
                              'rgba(74, 222, 128, 0.12)', 
                    border: project.category === 'web' ? '1px solid rgba(56, 189, 248, 0.2)' : 
                           project.category === 'ai' ? '1px solid rgba(236, 72, 153, 0.2)' : 
                           '1px solid rgba(74, 222, 128, 0.2)', 
                    color: project.category === 'web' ? '#38bdf8' : 
                          project.category === 'ai' ? '#ec4899' : 
                          '#4ade80', 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    marginBottom: '0.75rem', 
                    alignSelf: 'flex-start' 
                  }}>
                    {getCategoryIcon(project.category)}
                    <span style={{ marginLeft: '0.3rem' }}>
                      {project.category === 'web' ? 'WEB' : 
                       project.category === 'ai' ? 'AI/ML' : 
                       project.category === 'mobile' ? 'MOBILE' : 
                       'PROJECT'}
                    </span>
                  </div>

                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    marginBottom: '0.75rem', 
                    color: '#f8fafc' 
                  }}>
                    {project.title}
                  </h3>

                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: '#94a3b8', 
                    lineHeight: 1.6, 
                    marginBottom: '1rem', 
                    flex: 1 
                  }}>
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.4rem', 
                      marginBottom: '1.25rem' 
                    }}>
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span 
                          key={i} 
                          style={{ 
                            backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                            color: '#e2e8f0', 
                            padding: '0.25rem 0.6rem', 
                            borderRadius: '4px', 
                            fontSize: '0.7rem', 
                            border: '1px solid rgba(255, 255, 255, 0.1)' 
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    gap: '0.6rem', 
                    marginTop: 'auto' 
                  }}>
                    {project.github && (
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '0.4rem', 
                          padding: '0.6rem 0.8rem', 
                          borderRadius: '6px', 
                          fontSize: '0.8rem', 
                          flex: 1, 
                          backgroundColor: 'rgba(56, 189, 248, 0.1)', 
                          border: '1px solid rgba(56, 189, 248, 0.2)', 
                          color: '#38bdf8', 
                          textDecoration: 'none', 
                          transition: 'all 0.2s ease' 
                        }}
                      >
                        <FaCode size={12} /> Code
                      </motion.a>
                    )}
                    <motion.a 
                      href={project.live || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }} 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '0.4rem', 
                        padding: '0.6rem 0.8rem', 
                        borderRadius: '6px', 
                        fontSize: '0.8rem', 
                        flex: 1, 
                        backgroundColor: project.live ? 'rgba(249, 115, 22, 0.1)' : 'rgba(100, 116, 139, 0.1)', 
                        border: project.live ? '1px solid rgba(249, 115, 22, 0.2)' : '1px solid rgba(100, 116, 139, 0.2)', 
                        color: project.live ? '#f97316' : '#64748b', 
                        textDecoration: 'none', 
                        cursor: project.live ? 'pointer' : 'not-allowed', 
                        transition: 'all 0.2s ease' 
                      }}
                    >
                      <FaGlobe size={12} /> {project.live ? 'Live' : 'N/A'}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#94a3b8', 
            backgroundColor: 'rgba(255, 255, 255, 0.03)', 
            borderRadius: '12px', 
            border: '1px dashed rgba(255, 255, 255, 0.1)' 
          }}>
            {searchTerm || activeCategory !== 'all' ? (
              <>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No projects found matching your criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                    color: '#f97316',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    marginTop: '1rem'
                  }}
                >
                  Clear filters
                </button>
              </>
            ) : (
              <p style={{ fontSize: '1.1rem' }}>No projects available yet</p>
            )}
          </div>
        )}

        {/* Back to Top Button (only shows when scrolled) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ 
            position: 'fixed', 
            bottom: '2rem', 
            right: '2rem', 
            zIndex: 100 
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑
          </button>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          #all-projects {
            padding: 4rem 1rem;
          }
        }
        @media (max-width: 768px) {
          #all-projects > div > div:nth-child(2) {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }
        @media (max-width: 480px) {
          #all-projects {
            padding: 3rem 0.5rem;
          }
          #all-projects > div {
            padding: 0 0.5rem;
          }
          #all-projects > div > div:nth-child(2) {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default AllProjectsSection;