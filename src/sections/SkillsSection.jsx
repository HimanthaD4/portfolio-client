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
      icon: <FaReact style={{ color: '#f97316', fontSize: '1.8rem' }} />,
      skills: [
        { name: "MERN Stack", icon: <FaReact /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "PHP/Laravel", icon: <FaPhp /> },
        { name: "Python", icon: <FaPython /> }
      ]
    },
    {
      title: "Database & Backend",
      icon: <FaDatabase style={{ color: '#f97316', fontSize: '1.8rem' }} />,
      skills: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "SQL Databases", icon: <FaDatabase /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "API Development", icon: <FaDatabase /> }
      ]
    },
    {
      title: "Mobile Development",
      icon: <FaMobile style={{ color: '#f97316', fontSize: '1.8rem' }} />,
      skills: [
        { name: "Android Development", icon: <FaAndroid /> },
        { name: "Cross-Platform", icon: <FaMobile /> },
        { name: "Java/Kotlin", icon: <FaJava /> }
      ]
    },
    {
      title: "Specialized Skills",
      icon: <SiTensorflow style={{ color: '#f97316', fontSize: '1.8rem' }} />,
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
        padding: '30px 2rem',
        background: 'linear-gradient(to bottom, #0a0f1d, #0f172a)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 1,
      }} />
      
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Section Header */}
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
            TECHNICAL EXPERTISE
          </div>
          
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Technologies</span> I Work With
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            maxWidth: '700px',
            lineHeight: 1.6,
          }}>
            A versatile toolkit for building robust digital solutions across platforms.
          </p>
        </div>
        
        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              style={{
                padding: '2rem',
                background: 'rgba(15, 23, 42, 0.4)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.1)';
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#fff',
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
                      fontSize: '1rem',
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
      <style>
        {`
          @media (max-width: 768px) {
            #skills {
              padding: 80px 1.5rem;
            }
            
            .skills-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }
          
          @media (max-width: 480px) {
            #skills {
              padding: 60px 1rem;
            }
          }
        `}
      </style>
    </section>
  );
};

export default SkillsSection;