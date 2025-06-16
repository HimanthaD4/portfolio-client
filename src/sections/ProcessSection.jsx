// src/sections/ProcessSection.jsx
import React from 'react';
import { Link } from 'react-scroll';
import { FaSearch, FaSketch, FaCode, FaRocket, FaHandshake } from 'react-icons/fa';

const ProcessSection = () => {
  const steps = [
    { 
      icon: <FaSearch style={{ fontSize: '2rem', color: '#f97316' }} />,
      title: 'Discovery',
      description: 'Understanding your requirements, goals, and target audience through detailed discussions.',
    },
    { 
      icon: <FaSketch style={{ fontSize: '2rem', color: '#f97316' }} />,
      title: 'Planning',
      description: 'Creating detailed specifications, wireframes, and architecture diagrams for your project.',
    },
    { 
      icon: <FaCode style={{ fontSize: '2rem', color: '#f97316' }} />,
      title: 'Development',
      description: 'Building your solution with clean, efficient code following industry best practices.',
    },
    { 
      icon: <FaRocket style={{ fontSize: '2rem', color: '#f97316' }} />,
      title: 'Testing & Launch',
      description: 'Rigorous testing across devices and environments before deployment.',
    },
    { 
      icon: <FaHandshake style={{ fontSize: '2rem', color: '#f97316' }} />,
      title: 'Maintenance',
      description: 'Ongoing support, updates, and optimization to keep your solution running smoothly.',
    },
  ];

  return (
    <section 
      id="process" 
      style={{
        padding: '30px 2rem',
        background: 'linear-gradient(to bottom, #0a0f1d, #0f172a)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '60px',
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
          }}>
            DEVELOPMENT PROCESS
          </div>
          
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            maxWidth: '700px',
          }}>
            My <span style={{
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Structured Approach</span> to Success
          </h2>
          
          <p style={{
            fontSize: '1.15rem',
            color: '#cbd5e1',
            maxWidth: '800px',
            lineHeight: 1.7,
          }}>
            A proven methodology that ensures quality, efficiency, and client satisfaction at every stage.
          </p>
        </div>
        
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
                }}
              >
                <div style={{
                  flex: 1,
                  textAlign: index % 2 === 0 ? 'right' : 'left',
                  padding: index % 2 === 0 ? '0 3rem 0 0' : '0 0 0 3rem',
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.8rem',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                  }}>
                    {step.description}
                  </p>
                </div>
                
                <div style={{
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
                }}>
                  {step.icon}
                </div>
                
                <div style={{ flex: 1 }}></div>
              </div>
            ))}
          </div>
        </div>
        



        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
        }}>


           <Link
              to="contact"
              smooth={true}
              duration={700}
                      >
       
          <button style={{
            padding: '0.9rem 2.5rem',
            borderRadius: '8px',
            fontWeight: 600,
            textAlign: 'center',
            transition: 'all 0.3s',
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
    </section>
  );
};

export default ProcessSection;