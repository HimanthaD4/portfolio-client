import React from 'react';
import { 
  FaReact, FaNodeJs, FaDatabase, FaJava, 
  FaAndroid, FaPhp, FaPython, FaMobile
} from 'react-icons/fa';
import { SiMongodb, SiLaravel, SiJavascript, SiTensorflow } from 'react-icons/si';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Full Stack Development",
      icon: <FaReact />,
      skills: [
        { name: "MERN Stack", icon: <FaReact /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "PHP/Laravel", icon: <FaPhp /> },
        { name: "Python", icon: <FaPython /> }
      ]
    },
    {
      title: "Database & Backend",
      icon: <FaDatabase />,
      skills: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "SQL Databases", icon: <FaDatabase /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "API Development", icon: <FaDatabase /> }
      ]
    },
    {
      title: "Mobile Development",
      icon: <FaMobile />,
      skills: [
        { name: "Android Development", icon: <FaAndroid /> },
        { name: "Cross-Platform", icon: <FaMobile /> },
        { name: "Java/Kotlin", icon: <FaJava /> }
      ]
    },
    {
      title: "Specialized Skills",
      icon: <SiTensorflow />,
      skills: [
        { name: "Machine Learning", icon: <SiTensorflow /> },
        { name: "System Architecture", icon: <FaDatabase /> },
        { name: "DevOps Practices", icon: <FaNodeJs /> }
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      style={{
        position: 'relative',
        backgroundColor: '#0f172a',
        padding: '6rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        boxSizing: 'border-box',
        marginTop: '4rem',
        zIndex: 1,
      }}
    >
      <div style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '-100px auto',
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
            marginBottom: '1rem',
            color: '#94a3b8',
            textAlign: 'center',
            userSelect: 'none',
            letterSpacing: '1px',
          }}>
            <span style={{
              color: '#f59e0b',
              fontWeight: '700',
              userSelect: 'none',
            }}>
              Technologies
            </span>{' '}
            I Master
          </h2>
          
          <p style={{
            maxWidth: 550,
            marginBottom: '1.5rem',
            fontSize: '1rem',
            color: '#7c8a9e',
            textAlign: 'center',
            userSelect: 'none',
            lineHeight: 1.5,
            marginBottom:'-40px',
          }}>
            A versatile toolkit for building robust digital solutions across platforms.
          </p>
        </div>
        
        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          padding: '1rem 1rem',
          
        }}>
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              style={{
                padding: '1.2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f97316',
                  fontSize: '1.5rem',
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#f97316',
                  margin: 0,
                }}>
                  {category.title}
                </h3>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}>
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.8rem',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(249, 115, 22, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f97316',
                      fontSize: '1rem',
                    }}>
                      {skill.icon}
                    </div>
                    <span style={{
                      fontSize: '0.95rem',
                      color: '#e2e8f0',
                      fontWeight: 500,
                    }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          #skills {
            padding: 6rem 1rem;
          }
          
          #skills > div > div:last-child {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          #skills {
            padding: 5rem 1rem;
            margin-top: 0;
          }
          
          #skills > div > div:last-child {
            grid-template-columns: 1fr;
            padding: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;