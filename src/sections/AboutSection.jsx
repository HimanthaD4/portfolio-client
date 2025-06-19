// src/sections/AboutSection.jsx
import React from 'react';
import { FaReact, FaPython, FaLightbulb, FaCogs, FaBrain } from 'react-icons/fa';

const skills = [
  { icon: <FaReact />, label: 'Frontend' },
  { icon: <FaPython />, label: 'Backend' },
  { icon: <FaBrain />, label: 'AI/ML' },
  { icon: <FaLightbulb />, label: 'Creative' },
  { icon: <FaCogs />, label: 'Tools' },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
          transform: 'translateY(-45%)',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            borderRadius: '999px',
            background: 'rgba(249, 115, 22, 0.12)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            color: '#f97316',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '2rem',
          }}
        >
          WHO I AM
        </div>

        {/* Icon Grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '20px',
                background: '#1e293b',
                border: '2px solid #f97316',
                color: '#f97316',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(249, 115, 22, 0.12)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(249, 115, 22, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.12)';
              }}
            >
              {skill.icon}
              <span
                style={{
                  fontSize: '0.85rem',
                  marginTop: '0.6rem',
                  color: '#fff',
                  fontWeight: 500,
                }}
              >
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
