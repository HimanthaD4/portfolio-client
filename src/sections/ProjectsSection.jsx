import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe, FaLayerGroup, FaCode, FaRobot, FaMobileAlt } from 'react-icons/fa';
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
        const projectsData = Array.isArray(response.data.data) ? response.data.data : Array.isArray(response.data) ? response.data : [];
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

  if (loading) return (
    <div style={{ padding: '6rem 1rem', textAlign: 'center', backgroundColor: '#1e293b', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Loading projects...</div>
    </div>
  );

  if (error) return (
    <div style={{ padding: '6rem 1rem', textAlign: 'center', backgroundColor: '#1e293b', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: '#f87171', fontSize: '1.1rem' }}>Error: {error}</div>
    </div>
  );

  return (
    <section id="projects" style={{ 
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
      padding: '1rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#cbd5e1',
      userSelect: 'none',
      boxSizing: 'border-box',
      overflow: 'hidden',
      borderTop: '1px solid rgba(235, 40, 40, 0.1)',
      zIndex: 1,
    }}>
      {/* Background overlay for consistent color */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        zIndex: -2,
      }}></div>

      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0) 70%)',
        filter: 'blur(15px)',
        zIndex: -1,
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0) 70%)',
        filter: 'blur(20px)',
        zIndex: -1,
      }}></div>

      <div style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3.5rem',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '-0.5rem',
            textAlign: 'center',
            userSelect: 'none',
            letterSpacing: '1px',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              My
            </span>{' '}
            <span style={{ 
              color: '#9ba7b2',
              display: 'inline-block'
            }}>
              Work
            </span>
          </h2>
          
          <p style={{
            maxWidth: 700,
            marginBottom: '-2.5rem',
            fontSize: '1rem',
            color: '#94a3b8',
            textAlign: 'center',
            userSelect: 'none',
            lineHeight: 1.5,
          }}>
            Professional work showcasing my expertise
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          padding: '1rem',
        }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  position: 'relative',
                  backdropFilter: 'blur(5px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                }}
                whileHover={{ 
                  y: -5, 
                  borderColor: `${project.category === 'web' ? 'rgba(56, 189, 248, 0.3)' : project.category === 'ai' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`,
                  boxShadow: `0 15px 30px ${project.category === 'web' ? 'rgba(56, 189, 248, 0.1)' : project.category === 'ai' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(74, 222, 128, 0.1)'}`
                }}
              >
                {/* Project Image */}
                <div style={{ width: '100%', height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={getImageSource(project)} 
                    alt={project.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }} 
                    onError={handleImageError}
                  />
                </div>

                {/* Project Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100% - 180px)' }}>
                  {/* Category Badge */}
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.25rem 0.7rem', 
                    borderRadius: '999px', 
                    background: project.category === 'web' ? 'rgba(56, 189, 248, 0.12)' : project.category === 'ai' ? 'rgba(236, 72, 153, 0.12)' : 'rgba(74, 222, 128, 0.12)', 
                    border: project.category === 'web' ? '1px solid rgba(56, 189, 248, 0.2)' : project.category === 'ai' ? '1px solid rgba(236, 72, 153, 0.2)' : '1px solid rgba(74, 222, 128, 0.2)', 
                    color: project.category === 'web' ? '#38bdf8' : project.category === 'ai' ? '#ec4899' : '#4ade80', 
                    fontSize: '0.7rem', 
                    fontWeight: '600', 
                    marginBottom: '0.75rem', 
                    alignSelf: 'flex-start' 
                  }}>
                    {getCategoryIcon(project.category)}
                    <span style={{ marginLeft: '0.3rem' }}>{project.category === 'web' ? 'WEB' : project.category === 'ai' ? 'AI/ML' : project.category === 'mobile' ? 'MOBILE' : 'PROJECT'}</span>
                  </div>

                  {/* Project Title */}
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#f8fafc' }}>{project.title}</h3>

                  {/* Project Description */}
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>{project.description}</p>

                  {/* Project Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} style={{ 
                          backgroundColor: 'rgba(30, 41, 59, 0.7)', 
                          color: '#e2e8f0', 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '4px', 
                          fontSize: '0.65rem', 
                          border: '1px solid rgba(255, 255, 255, 0.1)' 
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project Links */}
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
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
                          padding: '0.5rem 0.8rem', 
                          borderRadius: '6px', 
                          fontSize: '0.75rem', 
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
                        padding: '0.5rem 0.8rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
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
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '2rem', 
              color: '#94a3b8', 
              backgroundColor: 'rgba(255, 255, 255, 0.03)', 
              borderRadius: '12px', 
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)'
            }}>
              No featured projects available
            </div>
          )}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={isVisible ? { opacity: 1 } : {}} 
          transition={{ duration: 0.6, delay: 0.4 }} 
          style={{ 
            marginTop: '3rem', 
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <Link 
            to="/projects" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '0.9rem 2.5rem', 
              borderRadius: '8px', 
              fontWeight: 600,
              textAlign: 'center', 
              transition: 'all 0.3s ease', 
              cursor: 'pointer', 
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)', 
              color: 'white', 
              boxShadow: '0 6px 20px rgba(249, 115, 22, 0.35)', 
              border: 'none', 
              fontSize: '1.05rem', 
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.35)';
            }}
          >
            <FaLayerGroup style={{ marginRight: '8px' }} /> View Full Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: '#f97316',
            opacity: Math.random() * 0.5 + 0.1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}></div>
        ))}
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-200px) translateX(0);
            opacity: 0.1;
          }
        }

        @media (max-width: 900px) {
          #projects {
            padding: 6rem 1rem;
          }
          
          #projects > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          #projects {
            padding: 5rem 1rem;
          }
          
          #projects > div > div:nth-child(2) {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;