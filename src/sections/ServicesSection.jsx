import React from 'react';
import { FaRobot, FaReact, FaMobileAlt, FaGraduationCap, FaFileAlt, FaDollarSign } from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: <FaRobot />,
    title: 'AI / ML Projects',
    description: 'Smart machine learning solutions tailored to your needs.',
  },
  {
    id: 2,
    icon: <FaReact />,
    title: 'MERN / Laravel / PHP Apps',
    description: 'Full-stack apps using popular technologies.',
  },
  {
    id: 3,
    icon: <FaMobileAlt />,
    title: 'Mobile Flutter & Android Apps',
    description: 'Cross-platform and native Android app development.',
  },
  {
    id: 4,
    icon: <FaGraduationCap />,
    title: 'Student Assignment Help',
    description: 'Expert support for your coding assignments.',
  },
  {
    id: 5,
    icon: <FaFileAlt />,
    title: 'Final Year Research Paper',
    description: 'Comprehensive project guidance & coding support.',
  },
  {
    id: 6,
    icon: <FaDollarSign />,
    title: 'Reasonable Pricing',
    description: 'Quality service at budget-friendly rates.',
    highlight: true,
  },
];

const ServicesSection = () => {
  const half = Math.ceil(services.length / 2);
  const firstRow = services.slice(0, half);
  const secondRow = services.slice(half);

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        backgroundColor: '#0f172a',
        clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)',
        padding: '0rem 1rem 5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        minHeight: '70vh',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#94a3b8',
          textAlign: 'center',
          userSelect: 'none',
          letterSpacing: '1px',
        }}
      >
        What I{' '}
        <span
          style={{
            color: '#f59e0b',
            fontWeight: '700',
            userSelect: 'none',
          }}
        >
          Offer
        </span>
      </h2>
      <p
        style={{
          maxWidth: 550,
          marginBottom: '2.5rem',
          fontSize: '1rem',
          color: '#7c8a9e',
          textAlign: 'center',
          userSelect: 'none',
          lineHeight: 1.5,
        }}
      >
        Clear, affordable, and expert solutions for students and businesses alike.
      </p>

      <div
        style={{
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          userSelect: 'text',
        }}
      >
        {[firstRow, secondRow].map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'nowrap',
            }}
          >
            {row.map(({ id, icon, title, description, highlight }) => (
              <div
                key={id}
                style={{
                  flex: '1 1 28%',
                  backgroundColor: highlight ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: highlight
                    ? '1.5px solid #f59e0b'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: highlight ? '#f59e0b' : '#cbd5e1',
                  boxShadow: 'none',
                  cursor: 'default',
                  minWidth: '180px',
                  maxWidth: '270px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = highlight
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = highlight
                    ? 'rgba(245, 158, 11, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <div
                  style={{
                    fontSize: '2.2rem',
                    marginBottom: '0.5rem',
                    color: highlight ? '#f59e0b' : '#f97316',
                    filter: 'none',
                    userSelect: 'none',
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '0.35rem',
                    color: highlight ? '#f59e0b' : '#f97316',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: highlight ? '#d6a84f' : '#9ca3af',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #services > div > div {
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          #services > div > div > div {
            flex: 1 1 40% !important;
            max-width: 260px !important;
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 520px) {
          #services > div > div > div {
            flex: 1 1 85% !important;
            max-width: 320px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
