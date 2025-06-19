import React from 'react';
import { Link } from 'react-scroll';
import { FaSearch, FaSketch, FaCode, FaRocket, FaHandshake } from 'react-icons/fa';

const ProcessSection = () => {
  const steps = [
    { 
      icon: <FaSearch />,
      title: 'Discovery',
      description: 'Understanding your requirements, goals, and target audience through detailed discussions.',
    },
    { 
      icon: <FaSketch />,
      title: 'Planning',
      description: 'Creating detailed specifications, wireframes, and architecture diagrams for your project.',
    },
    { 
      icon: <FaCode />,
      title: 'Development',
      description: 'Building your solution with clean, efficient code following industry best practices.',
    },
    { 
      icon: <FaRocket />,
      title: 'Testing & Launch',
      description: 'Rigorous testing across devices and environments before deployment.',
    },
    { 
      icon: <FaHandshake />,
      title: 'Maintenance',
      description: 'Ongoing support, updates, and optimization to keep your solution running smoothly.',
    },
  ];

  return (
    <section 
      id="process" 
      style={{
        position: 'relative',
        backgroundColor: '#0f172a',
        padding: '8rem 1rem 10rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        boxSizing: 'border-box',
        clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0% 100%)',
        marginTop: '-5rem',
      }}
    >
      <div style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '5rem',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#94a3b8',
            textAlign: 'center',
            userSelect: 'none',
            letterSpacing: '1px',
          }}>
            My <span style={{
              color: '#f59e0b',
              fontWeight: '700',
              userSelect: 'none',
            }}>
              Process
            </span>{' '}
        
          </h2>
          
          <p style={{
            maxWidth: 700,
            marginBottom: '1.5rem',
            fontSize: '1rem',
            color: '#7c8a9e',
            textAlign: 'center',
            userSelect: 'none',
            lineHeight: 1.5,
          }}>
            A proven methodology that ensures quality, efficiency, and client satisfaction at every stage.
          </p>
        </div>
        
        {/* Process Timeline */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          margin: '0 auto',
          maxWidth: '900px',
        }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: 'calc(100% - 80px)',
            background: 'linear-gradient(to bottom, #f97316, #f59e0b)',
            borderRadius: '2px',
            zIndex: 1,
          }}></div>
          
          {/* Process steps */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
          }}>
            {steps.map((step, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginBottom: '3rem',
                  width: '100%',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  const content = e.currentTarget.querySelector('.process-content');
                  const icon = e.currentTarget.querySelector('.process-icon');
                  if (content) {
                    content.style.transform = 'scale(1.02)';
                    content.style.opacity = '1';
                  }
                  if (icon) {
                    icon.style.transform = 'scale(1.1)';
                    icon.style.boxShadow = '0 0 25px rgba(249, 115, 22, 0.3)';
                    icon.style.backgroundColor = 'rgba(249, 115, 22, 0.15)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const content = e.currentTarget.querySelector('.process-content');
                  const icon = e.currentTarget.querySelector('.process-icon');
                  if (content) {
                    content.style.transform = 'scale(1)';
                  }
                  if (icon) {
                    icon.style.transform = 'scale(1)';
                    icon.style.boxShadow = '0 0 0 8px rgba(249, 115, 22, 0.1)';
                    icon.style.backgroundColor = '#0f172a';
                  }
                }}
              >
                <div 
                  className="process-content"
                  style={{
                    flex: 1,
                    textAlign: index % 2 === 0 ? 'right' : 'left',
                    padding: index % 2 === 0 ? '0 3rem 0 0' : '0 0 0 3rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#f97316',
                    marginBottom: '0.8rem',
                    transition: 'all 0.3s ease',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    transition: 'all 0.3s ease',
                  }}>
                    {step.description}
                  </p>
                </div>
                
                <div 
                  className="process-icon"
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#0f172a',
                    border: '2px solid #f97316',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 0 8px rgba(249, 115, 22, 0.1)',
                    color: '#f97316',
                    fontSize: '2rem',
                    transition: 'all 0.3s ease',
                    zIndex: 3, // Higher than timeline line
                  }}
                >
                  {step.icon}
                </div>
                
                <div style={{ flex: 1 }}></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Button - Centered */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
          width: '100%',
        }}>
          <Link
            to="contact"
            smooth={true}
            duration={700}
            style={{
              display: 'inline-block',
            }}
          >
            <button style={{
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
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.35)';
            }}
            >
              Start Your Project
            </button>
          </Link>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          #process {
            padding: 8rem 1rem;
            clip-path: polygon(0 0, 100% 2%, 100% 100%, 0% 100%);
          }
          
          #process > div > div:nth-child(2) > div {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 0 1rem !important;
            margin-bottom: 4rem !important;
          }
          
          .process-content {
            padding: 0 !important;
            margin-bottom: 1.5rem !important;
            text-align: center !important;
          }
          
          .process-icon {
            margin-bottom: 1.5rem !important;
          }
        }

        @media (max-width: 600px) {
          #process {
            padding: 6rem 1rem;
            clip-path: none;
            margin-top: -3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;