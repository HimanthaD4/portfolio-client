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
        const projectsData = Array.isArray(response.data.data) ? response.data.data : [];
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch projects');
        setLoading(false);
        console.error('Fetch error:', err);
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
    e.target.onerror = null; // Prevent infinite loop
  };

  const getImageUrl = (project) => {
    if (!project.image) {
      return 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
    }
    
    // If image URL is provided by backend
    if (project.image.url) {
      // Handle both absolute and relative URLs
      if (project.image.url.startsWith('http')) {
        return project.image.url;
      }
      return `${API_URL}${project.image.url}`;
    }
    
    // If image data is embedded (for backward compatibility)
    if (project.image.data) {
      return `data:${project.image.contentType || 'image/jpeg'};base64,${project.image.data}`;
    }
    
    return 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'web': return <FaCode />;
      case 'ai': return <FaRobot />;
      case 'mobile': return <FaMobileAlt />;
      case 'desktop': return <FaCode />;
      case 'game': return <FaCode />;
      case 'embedded': return <FaCode />;
      default: return <FaCode />;
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-text">Loading projects...</div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-text">Error: {error}</div>
    </div>
  );

  return (
    <section id="projects" className="projects-section">
      {/* Background overlay */}
      <div className="background-overlay"></div>

      {/* Decorative elements */}
      <div className="decorative-circle top-left"></div>
      <div className="decorative-circle bottom-right"></div>

      <div className="projects-container">
        {/* Section Header */}
        <div className="section-header">
          <h2>
            <span className="gradient-text">My</span>{' '}
            <span className="normal-text">Work</span>
          </h2>
          <p className="section-subtitle">Professional work showcasing my expertise</p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project._id}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  y: -5, 
                  borderColor: getCategoryColor(project.category, 0.3),
                  boxShadow: `0 15px 30px ${getCategoryColor(project.category, 0.1)}`
                }}
              >
                {/* Project Image */}
                <div className="project-image-container">
                  <img 
                    src={getImageUrl(project)} 
                    alt={project.title} 
                    className="project-image"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>

                {/* Project Content */}
                <div className="project-content">
                  {/* Category Badge */}
                  <div className={`category-badge ${project.category}`}>
                    {getCategoryIcon(project.category)}
                    <span>{formatCategoryName(project.category)}</span>
                  </div>

                  {/* Project Title */}
                  <h3>{project.title}</h3>

                  {/* Project Description */}
                  <p className="project-description">{project.description}</p>

                  {/* Project Tags */}
                  {project.tags?.length > 0 && (
                    <div className="tags-container">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="project-links">
                    {project.github && (
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="github-link"
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCode size={12} /> Code
                      </motion.a>
                    )}
                    <motion.a 
                      href={project.live || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`live-link ${!project.live ? 'disabled' : ''}`}
                      whileHover={{ scale: project.live ? 1.05 : 1 }} 
                      whileTap={{ scale: project.live ? 0.95 : 1 }}
                    >
                      <FaGlobe size={12} /> {project.live ? 'Live' : 'N/A'}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-projects-message">
              No projects available
            </div>
          )}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0 }} 
          animate={isVisible ? { opacity: 1 } : {}} 
          transition={{ duration: 0.6, delay: 0.4 }} 
        >
          <Link 
            to="/projects" 
            className="cta-button"
          >
            <FaLayerGroup className="cta-icon" /> View Full Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}></div>
        ))}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .loading-container, .error-container {
          padding: 6rem 1rem;
          text-align: center;
          background-color: #1e293b;
          min-height: 50vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .loading-text {
          color: #e2e8f0;
          font-size: 1.1rem;
        }
        
        .error-text {
          color: #f87171;
          font-size: 1.1rem;
        }
        
        .projects-section {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #cbd5e1;
          user-select: none;
          box-sizing: border-box;
          overflow: hidden;
          border-top: 1px solid rgba(235, 40, 40, 0.1);
          z-index: 1;
        }
        
        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          z-index: -2;
        }
        
        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(15px);
          z-index: -1;
        }
        
        .decorative-circle.top-left {
          top: 20%;
          left: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0) 70%);
        }
        
        .decorative-circle.bottom-right {
          bottom: 10%;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0) 70%);
          filter: blur(20px);
        }
        
        .projects-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 3.5rem;
        }
        
        .section-header h2 {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: -0.5rem;
          text-align: center;
          user-select: none;
          letter-spacing: 1px;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #f97316, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .normal-text {
          color: #9ba7b2;
          display: inline-block;
        }
        
        .section-subtitle {
          max-width: 700px;
          margin-bottom: -2.5rem;
          font-size: 1rem;
          color: #94a3b8;
          text-align: center;
          user-select: none;
          line-height: 1.5;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }
        
        .project-card {
          background-color: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          position: relative;
          backdrop-filter: blur(5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .project-image-container {
          width: 100%;
          height: 180px;
          position: relative;
          overflow: hidden;
        }
        
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .project-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: calc(100% - 180px);
        }
        
        .category-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          align-self: flex-start;
        }
        
        .category-badge.web {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }
        
        .category-badge.ai {
          background: rgba(236, 72, 153, 0.12);
          border: 1px solid rgba(236, 72, 153, 0.2);
          color: #ec4899;
        }
        
        .category-badge.mobile {
          background: rgba(74, 222, 128, 0.12);
          border: 1px solid rgba(74, 222, 128, 0.2);
          color: #4ade80;
        }
        
        .category-badge span {
          margin-left: 0.3rem;
        }
        
        .project-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #f8fafc;
        }
        
        .project-description {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex: 1;
        }
        
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        
        .project-tag {
          background-color: rgba(30, 41, 59, 0.7);
          color: #e2e8f0;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-size: 0.65rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .project-links {
          display: flex;
          gap: 0.6rem;
          margin-top: auto;
        }
        
        .github-link, .live-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          font-size: 0.75rem;
          flex: 1;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .github-link {
          background-color: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }
        
        .live-link {
          background-color: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.2);
          color: #f97316;
        }
        
        .live-link.disabled {
          background-color: rgba(100, 116, 139, 0.1);
          border: 1px solid rgba(100, 116, 139, 0.2);
          color: #64748b;
          cursor: not-allowed;
        }
        
        .no-projects-message {
          grid-column: 1 / -1;
          text-align: center;
          padding: 2rem;
          color: #94a3b8;
          background-color: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
        }
        
        .cta-container {
          margin-top: 3rem;
          text-align: center;
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 2.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(249, 115, 22, 0.35);
          border: none;
          font-size: 1.05rem;
          text-decoration: none;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(249, 115, 22, 0.5);
        }
        
        .cta-icon {
          margin-right: 8px;
        }
        
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #f97316;
          animation: float linear infinite;
        }
        
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
          .projects-section {
            padding: 6rem 1rem;
          }
          
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 600px) {
          .projects-section {
            padding: 5rem 1rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );

  // Helper functions
  function getCategoryColor(category, opacity = 1) {
    switch(category) {
      case 'web': return `rgba(56, 189, 248, ${opacity})`;
      case 'ai': return `rgba(236, 72, 153, ${opacity})`;
      case 'mobile': return `rgba(74, 222, 128, ${opacity})`;
      default: return `rgba(156, 163, 175, ${opacity})`;
    }
  }

  function formatCategoryName(category) {
    switch(category) {
      case 'web': return 'WEB';
      case 'ai': return 'AI/ML';
      case 'mobile': return 'MOBILE';
      case 'desktop': return 'DESKTOP';
      case 'game': return 'GAME';
      case 'embedded': return 'EMBEDDED';
      default: return 'PROJECT';
    }
  }
};

export default ProjectsSection;