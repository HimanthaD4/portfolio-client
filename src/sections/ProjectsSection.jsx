import React, { useState, useEffect } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Full-featured online shopping system with payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80',
    github: 'https://github.com/yourusername/ecommerce-platform'
  },
  {
    id: 2,
    title: 'AI Plant Identification',
    description: 'Mobile app that identifies plant species using machine learning.',
    tags: ['Python', 'TensorFlow', 'React Native', 'Firebase'],
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80',
    github: 'https://github.com/yourusername/plant-id-app'
  },
  {
    id: 3,
    title: 'Enterprise Resource Planning',
    description: 'Custom ERP solution for manufacturing company.',
    tags: ['Laravel', 'Vue.js', 'MySQL', 'Docker'],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80',
    github: 'https://github.com/yourusername/erp-system'
  },
  {
    id: 4,
    title: 'Predictive Analytics Dashboard',
    description: 'Business intelligence tool with predictive capabilities.',
    tags: ['Python', 'D3.js', 'Flask', 'PostgreSQL'],
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80',
    github: 'https://github.com/yourusername/analytics-dashboard'
  },
  {
    id: 5,
    title: 'Real-time Chat Application',
    description: 'Web-based messaging platform with real-time updates.',
    tags: ['React', 'Socket.io', 'Express', 'MongoDB'],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80',
    github: 'https://github.com/yourusername/realtime-chat'
  },
  {
    id: 6,
    title: 'Customer Behavior Prediction',
    description: 'ML model to predict customer purchasing patterns.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80',
    github: 'https://github.com/yourusername/customer-prediction'
  },
];

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Smooth scroll to projects section when navigating
    if (window.location.hash === '#projects') {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <section
      id="projects"
      style={{
        padding: '80px 2rem',
        background: 'linear-gradient(to bottom, #0a0f1d, #0f172a)',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      {/* Subtle orange glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
        filter: 'blur(30px)',
        zIndex: 1,
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            background: 'rgba(249, 115, 22, 0.12)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            marginBottom: '1.5rem',
            color: '#f97316',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '1px',
            justifyContent: 'center',
          }}>
            FEATURED PROJECTS
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}>
            A Selection of <span style={{
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>My Work</span>
          </h2>

          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Recent projects showcasing my web development and AI/ML capabilities.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}>
          {['all', 'web', 'ai'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                cursor: 'pointer',
                padding: '0.6rem 1.5rem',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                color: activeTab === tab ? '#fff' : '#94a3b8',
                backgroundColor: activeTab === tab ? 'rgba(249, 115, 22, 0.3)' : 'rgba(15, 23, 42, 0.6)',
                boxShadow: activeTab === tab ? '0 4px 15px rgba(249,115,22,0.2)' : 'none',
                transition: 'all 0.3s ease',
                userSelect: 'none',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              aria-label={`Filter projects by ${tab}`}
            >
              {tab === 'all' ? 'All Projects' : tab === 'web' ? 'Web Development' : 'AI / ML'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {filteredProjects.map(project => (
            <div
              key={project.id}
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(4px)',
              }}
              className="project-card"
            >
              {/* Image */}
              <div style={{
                width: '100%',
                height: '180px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="project-image"
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }} className="project-overlay" />
              </div>

              {/* Content */}
              <div style={{ 
                padding: '1.6rem', 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                zIndex: 2,
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '0.7rem',
                  gap: '0.5rem',
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '1.25rem',
                    margin: 0,
                    flexGrow: 1,
                    lineHeight: 1.2,
                  }}>
                    {project.title}
                  </h3>
                  {project.category === 'ai' && (
                    <span style={{
                      padding: '0.25rem 0.7rem',
                      backgroundColor: 'rgba(249, 115, 22, 0.15)',
                      color: '#f97316',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      AI Project
                    </span>
                  )}
                </div>

                <p style={{
                  color: '#cbd5e1',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  flexGrow: 1,
                  lineHeight: 1.5,
                }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#94a3b8',
                      padding: '0.25rem 0.8rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      userSelect: 'none',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  gap: '1rem',
                }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#f97316',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    aria-label={`GitHub repository of ${project.title}`}
                  >
                    <FaGithub /> Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: '#f97316',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <FaLink /> Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for hover effects */}
      <style jsx>{`
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(249, 115, 22, 0.2);
          border-color: rgba(249, 115, 22, 0.3);
          background: rgba(15, 23, 42, 0.7);
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
        
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          #projects {
            padding: 60px 1.5rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          #projects {
            padding: 40px 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;