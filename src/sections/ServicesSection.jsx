import React, { useState } from 'react';
import { FaRobot, FaCode, FaMobile, FaGraduationCap, FaCheckCircle, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-scroll';

const ServicesSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      id: 1,
      icon: <FaRobot />,
      title: "AI/ML Solutions",
      color: "#f59e0b", // Updated to match other sections
      points: [
        "Custom ML models",
        "Data analysis",
        "Academic projects help"
      ],
      benefits: [
        "Automate tasks",
        "Better decisions"
      ]
    },
    {
      id: 2,
      icon: <FaCode />,
      title: "Web Development",
      color: "#60a5fa",
      points: [
        "Website design",
        "E-commerce solutions",
        "Web apps"
      ],
      benefits: [
        "Mobile-friendly",
        "Fast performance"
      ]
    },
    {
      id: 3,
      icon: <FaMobile />,
      title: "Mobile Apps",
      color: "#34d399",
      points: [
        "Cross-platform apps",
        "UI/UX design",
        "App store ready"
      ],
      benefits: [
        "Works offline",
        "Secure data"
      ]
    },
    {
      id: 4,
      icon: <FaGraduationCap />,
      title: "Student Help",
      color: "#a78bfa",
      points: [
        "Coding assignments",
        "Final year projects",
        "Debugging help"
      ],
      benefits: [
        "Clear explanations",
        "Affordable pricing"
      ],
      featured: true
    }
  ];

  return (
    <section 
      id="services"
      style={{
        backgroundColor: '#0f172a',
        padding: '1rem 1rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        boxSizing: 'border-box',
        marginTop: '4rem',
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
          marginBottom: '3.5rem',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#f59e0b',
            textAlign: 'center',
            userSelect: 'none',
            letterSpacing: '1px',
          }}>
            <span style={{
              
              fontWeight: '700',
              userSelect: 'none',
              color: '#94a3b8',
            }}>
              Services
            </span>{' '}
            I Offer
          </h2>
          
          <p style={{
            maxWidth: 700,
            marginBottom: '-2.5rem',
            fontSize: '1rem',
            color: '#7c8a9e',
            textAlign: 'center',
            userSelect: 'none',
            lineHeight: 1.5,
          }}>
            Solutions for businesses and students
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          padding: '1rem',
        }}>
          {services.map(service => (
            <div 
              key={service.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                transform: activeCard === service.id ? 'translateY(-5px)' : 'none',
                boxShadow: activeCard === service.id ? `0 10px 25px -5px ${service.color}20` : 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...(service.featured && {
                  border: `1px solid ${service.color}50`,
                  boxShadow: `0 0 0 2px ${service.color}20`
                })
              }}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {service.featured && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: service.color,
                  color: '#0f172a',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  Popular
                </div>
              )}
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: service.color,
                  fontSize: '1.5rem',
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: service.color,
                  margin: 0,
                }}>
                  {service.title}
                </h3>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '1rem',
                flex: 1,
              }}>
                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    color: '#f8fafc',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FaCheckCircle style={{ color: service.color, fontSize: '0.9rem' }} />
                    What I Offer
                  </h4>
                  <ul style={{
                    paddingLeft: '1rem',
                    margin: 0,
                    listStyleType: 'none'
                  }}>
                    {service.points.map((point, i) => (
                      <li key={i} style={{
                        color: '#e2e8f0',
                        fontSize: '0.9rem',
                        marginBottom: '0.4rem',
                        position: 'relative',
                        lineHeight: 1.5
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-1rem',
                          color: service.color
                        }}>•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    color: '#f8fafc',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FaShieldAlt style={{ color: service.color, fontSize: '0.9rem' }} />
                    Your Benefits
                  </h4>
                  <ul style={{
                    paddingLeft: '1rem',
                    margin: 0,
                    listStyleType: 'none'
                  }}>
                    {service.benefits.map((benefit, i) => (
                      <li key={i} style={{
                        color: '#e2e8f0',
                        fontSize: '0.9rem',
                        marginBottom: '0.4rem',
                        position: 'relative',
                        lineHeight: 1.5
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-1rem',
                          color: service.color
                        }}>•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.85rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '0.8rem',
                marginTop: 'auto'
              }}>
                <FaHandshake style={{ color: service.color, fontSize: '0.9rem' }} />
                <span>Trusted service</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
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
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.35)';
            }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          #services {
            padding: 6rem 1rem;
          }
          
          #services > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          #services {
            padding: 5rem 1rem;
            margin-top: 0;
          }
          
          #services > div > div:nth-child(2) {
            grid-template-columns: 1fr;
            padding: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;