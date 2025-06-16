import React, { useState } from 'react';
import {
  FaPaperPlane,
  FaLightbulb,
  FaHandshake,
  FaRocket,
  FaUserCheck
} from 'react-icons/fa';

const cards = [
  {
    icon: <FaLightbulb />,
    title: 'Got Ideas?',
    description: 'Let’s build them together.',
  },
  {
    icon: <FaHandshake />,
    title: 'Need Help?',
    description: 'I code, you relax.',
  },
  {
    icon: <FaRocket />,
    title: 'Launch Time?',
    description: 'Let’s ship your dream.',
  }
];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <>
      <style>{`
        #contact {
          height: 100vh;
          width: 100%;
          background: linear-gradient(to bottom, #0a0f1d, #0f172a);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 1rem;
        }

        .contact-wrapper {
          max-width: 960px;
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .section-header {
          text-align: center;
          margin-bottom: 1rem;
        }

        .section-header h2 {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.3rem;
        }

        .section-header h2 span {
          background: linear-gradient(135deg, #f97316, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-header p {
          color: #cbd5e1;
          font-size: 0.95rem;
          margin: 0;
        }

        .card-grid {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .card {
          width: 110px;
          height: 110px;
          perspective: 1000px;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
          position: relative;
        }

        .card:hover .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0.5rem;
          text-align: center;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .card-front {
          font-size: 1.7rem;
          color: #f97316;
          background: rgba(15,23,42,0.6);
        }

        .card-back {
          transform: rotateY(180deg);
          color: #e2e8f0;
          font-size: 0.75rem;
          background: rgba(249, 115, 22, 0.1);
          line-height: 1.2;
        }

        form {
          margin-top: 1.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
        }

        input, textarea {
          width: 100%;
          max-width: 400px;
          padding: 0.7rem;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #0f172a;
          color: #fff;
          font-size: 0.95rem;
        }

        textarea {
          resize: none;
        }

        button {
          margin-top: 0.4rem;
          padding: 0.7rem 1.3rem;
          background: linear-gradient(to right, #f97316, #f59e0b);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        button:hover {
          background: #f59e0b;
          color: #fff;
        }

        .feedback {
          color: #22c55e;
          font-weight: 600;
          margin-top: 0.5rem;
          font-size: 0.95rem;
        }

        @media (max-width: 480px) {
          .card {
            width: 90px;
            height: 90px;
          }

          .card-back {
            font-size: 0.68rem;
            line-height: 1.1;
          }

          .section-header h2 {
            font-size: 1.5rem;
          }

          input, textarea {
            max-width: 90vw;
          }
        }
      `}</style>

      <section id="contact">
        <div className="contact-wrapper">
          <div className="section-header">
            <h2><span>Let’s Talk</span> Ideas</h2>
            <p>Flip a card, share a thought.</p>
          </div>

          <div className="card-grid">
            {cards.map((card, index) => (
              <div className="card" key={index}>
                <div className="card-inner">
                  <div className="card-front">{card.icon}</div>
                  <div className="card-back">
                    {card.title}
                    <div style={{ marginTop: '4px', opacity: 0.9 }}>
                      {card.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="you@example.com" required />
            <textarea name="message" rows="3" placeholder="Let’s create something..." required />
            <button type="submit">
              {submitted ? <>Sent <FaUserCheck /></> : <>Send <FaPaperPlane /></>}
            </button>
            {submitted && <div className="feedback">Message sent successfully!</div>}
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
