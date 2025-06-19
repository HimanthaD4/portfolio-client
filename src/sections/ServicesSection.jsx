import React from 'react';
import { FaRobot, FaReact, FaMobileAlt, FaGraduationCap, FaFileAlt, FaDollarSign } from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: <FaRobot size={24} />,
    title: 'AI/ML Projects',
    description: 'Smart machine learning solutions tailored to your needs',
  },
  {
    id: 2,
    icon: <FaReact size={24} />,
    title: 'Web Applications',
    description: 'Full-stack apps using MERN, Laravel & PHP',
  },
  {
    id: 3,
    icon: <FaMobileAlt size={24} />,
    title: 'Mobile Apps',
    description: 'Cross-platform and native Android development',
  },
  {
    id: 4,
    icon: <FaGraduationCap size={24} />,
    title: 'Assignment Help',
    description: 'Expert support for coding assignments',
  },
  {
    id: 5,
    icon: <FaFileAlt size={24} />,
    title: 'Research Papers',
    description: 'Project guidance & coding support',
  },
  {
    id: 6,
    icon: <FaDollarSign size={24} />,
    title: 'Fair Pricing',
    description: 'Quality service at budget-friendly rates',
    highlight: true,
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        backgroundColor: '#0f172a',
        padding: '10px 20px 40px 50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        boxSizing: 'border-box',
        minHeight: '100vh',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          maxWidth: '700px',
          padding: '0 1rem',
          marginTop: '0.5rem',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#94a3b8',
            letterSpacing: '0.5px',
          }}>
            What I{' '}
            <span style={{
              color: '#f59e0b',
              fontWeight: '700',
            }}>
              Offer
            </span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#7c8a9e',
            lineHeight: 1.6,
          }}>
            Clear, affordable, and expert solutions for students and businesses alike
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '1000px',
          padding: '0 1rem',
        }}>
          {services.map(({ id, icon, title, description, highlight }) => (
            <div
              key={id}
              style={{
                backgroundColor: highlight ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${highlight ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '12px',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                height: '100%',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = highlight 
                  ? '0 10px 25px rgba(245, 158, 11, 0.15)'
                  : '0 10px 25px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = highlight 
                  ? 'rgba(245, 158, 11, 0.5)' 
                  : 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = highlight 
                  ? 'rgba(245, 158, 11, 0.3)' 
                  : 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: highlight 
                  ? 'rgba(245, 158, 11, 0.15)' 
                  : 'rgba(249, 115, 22, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: highlight ? '#f59e0b' : '#f97316',
                fontSize: '1.5rem',
              }}>
                {icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: highlight ? '#f59e0b' : '#f8fafc',
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: highlight ? '#d6a84f' : '#94a3b8',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          #services {
            padding: 1.5rem 1rem 3rem;
            min-height: auto;
          }
          
          #services > div > div:first-child {
            margin-bottom: 1.5rem;
            margin-top: 0;
          }
          
          #services > div > div:last-child {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          #services > div > div:last-child {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
          
          #services > div > div:last-child > div {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;