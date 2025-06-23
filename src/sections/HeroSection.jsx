import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaFacebook, FaChevronDown,
  FaReact, FaNodeJs, FaPython, FaJava, FaPhp,
  FaCode, FaHandshake
} from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa6';
import { SiLaravel, SiMongodb, SiMysql, SiJavascript, SiTypescript, SiDocker, SiGraphql } from 'react-icons/si';

import HeroImage from '../images/main.png';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef();
  const socialControls = useAnimation();
  const techControls = useAnimation();
  const imageControls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const animationTimeoutRef = useRef(null);

  const roles = [
    "Himantha Hirushan",
    "Full Stack Developer",
    "Software Engineer",
    "ML Specialist",
  ];

  // Tech icons configuration - adjusted positions for mobile
  const techIcons = [
    { icon: <FaReact color="#61DAFB" />, name: "React", pos: { top: '5%', left: '10%' }, size: 42, mobilePos: { top: '5%', left: '5%' } },
    { icon: <FaNodeJs color="#68A063" />, name: "Node.js", pos: { top: '20%', right: '5%' }, size: 40, mobilePos: { top: '15%', right: '5%' } },
    { icon: <SiJavascript color="#F7DF1E" />, name: "JavaScript", pos: { bottom: '25%', left: '5%' }, size: 38, mobilePos: { bottom: '25%', left: '5%' } },
    { icon: <SiTypescript color="#3178C6" />, name: "TypeScript", pos: { bottom: '15%', right: '15%' }, size: 38, mobilePos: { bottom: '15%', right: '5%' } },
    { icon: <FaPython color="#3776AB" />, name: "Python", pos: { top: '30%', right: '3%' }, size: 42, mobilePos: { top: '25%', right: '3%' } },
    { icon: <FaJava color="#007396" />, name: "Java", pos: { top: '10%', right: '20%' }, size: 38, mobilePos: { top: '10%', right: '5%' } },
    { icon: <FaPhp color="#777BB4" />, name: "PHP", pos: { bottom: '30%', right: '5%' }, size: 36, mobilePos: { bottom: '30%', right: '5%' } },
    { icon: <SiLaravel color="#FF2D20" />, name: "Laravel", pos: { top: '35%', left: '5%' }, size: 40, mobilePos: { top: '35%', left: '5%' } },
    { icon: <SiMongodb color="#47A248" />, name: "MongoDB", pos: { bottom: '10%', left: '15%' }, size: 38, mobilePos: { bottom: '10%', left: '5%' } },
    { icon: <SiMysql color="#4479A1" />, name: "MySQL", pos: { bottom: '5%', right: '10%' }, size: 36, mobilePos: { bottom: '5%', right: '5%' } },
    { icon: <SiDocker color="#2496ED" />, name: "Docker", pos: { top: '40%', right: '12%' }, size: 42, mobilePos: { top: '40%', right: '5%' } },
    { icon: <SiGraphql color="#E535AB" />, name: "GraphQL", pos: { bottom: '35%', left: '20%' }, size: 38, mobilePos: { bottom: '35%', left: '5%' } },
  ];

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];
      
      setTypedText(isDeleting 
        ? fullText.substring(0, typedText.length - 1)
        : fullText.substring(0, typedText.length + 1)
      );
      
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 80 : 150);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  // Animation sequence
  useEffect(() => {
    if (!mounted) return;

    const sequence = async () => {
      try {
        // 1. Animate text content
        await controls.start("visible");
        
        // 2. Animate image sliding in from right
        await imageControls.start({
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
        });
        
        // 3. Animate tech icons one by one with delay
        for (let i = 0; i < techIcons.length; i++) {
          if (!mounted) return;
          
          techControls.start(idx => {
            if (idx === i) {
              return {
                opacity: [0, 1],
                scale: [0, 1.2, 1],
                transition: {
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "backOut"
                }
              };
            }
            return {};
          });
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        
        // 4. Start random popping after initial animation
        startRandomPopAnimation();
        
        // 5. Animate social buttons
        socialControls.start(i => ({
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            delay: 0.5 + i * 0.2,
            type: "spring",
            damping: 10,
            stiffness: 100
          }
        }));
      } catch (error) {
        console.error("Animation error:", error);
      }
    };
    
    sequence();

    return () => {
      // Clean up animations if component unmounts
      controls.stop();
      imageControls.stop();
      techControls.stop();
      socialControls.stop();
    };
  }, [mounted]);

  // Initialize image off-screen
  useEffect(() => {
    if (mounted) {
      imageControls.start({
        x: 100,
        opacity: 0
      });
    }
  }, [mounted]);

  // Random popping animation for tech icons
  const startRandomPopAnimation = () => {
    if (!mounted) return;

    const animateRandomIcons = () => {
      if (!mounted) return;

      const visibleIcons = techIcons.map((_, index) => index);
      const iconsToAnimate = [];
      const count = 2 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < count; i++) {
        if (visibleIcons.length === 0) break;
        const randomIndex = Math.floor(Math.random() * visibleIcons.length);
        iconsToAnimate.push(visibleIcons.splice(randomIndex, 1)[0]);
      }
      
      iconsToAnimate.forEach(index => {
        techControls.start(i => {
          if (i === index) {
            return {
              scale: [1, 1.4, 1],
              transition: {
                duration: 0.6,
                ease: "backOut"
              }
            };
          }
          return {};
        });
      });
      
      const nextDelay = 1000 + Math.random() * 2000;
      animationTimeoutRef.current = setTimeout(animateRandomIcons, nextDelay);
    };
    
    animateRandomIcons();
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 5%',
        background: 'radial-gradient(ellipse at top right, #1e293b, #0f172a)',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.6, -0.05, 0.01, 0.99] 
              }
            }
          }}
          style={{
            flex: 1,
            minWidth: '300px',
            maxWidth: '600px',
            padding: '0 20px',
          }}
        >
          <motion.h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            fontFamily: "'Inter', sans-serif",
          }}>
            Hi, I'm <span style={{
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}> 
            {typedText}
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '2.8rem',
              marginLeft: '4px',
              background: '#f97316',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s infinite',
            }}></span>
          </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: '1.3rem',
              color: '#cbd5e1',
              maxWidth: '500px',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
            }}
          >
             I build high-performance web applications with clean code and intuitive experiences.
          </motion.p>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="projects"
                smooth={true}
                duration={700}
                style={{
                  padding: '0.9rem 1.8rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <FaCode style={{ transition: 'all 0.3s ease' }} /> View My Work
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="contact"
                smooth={true}
                duration={700}
                style={{
                  padding: '0.9rem 1.8rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #f97316',
                  color: '#f97316',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  position: 'relative',
                }}
              >
                <FaHandshake style={{ transition: 'all 0.3s ease' }} /> Let's Collaborate
              </Link>
            </motion.div>
          </div>
          
          {/* Social Links */}
          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: <FaGithub />, url: 'https://github.com/HimanthaD4', label: 'GitHub', initialPos: { y: 50, x: -20 } },
              { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/himantha-hirushan-390122212/', label: 'LinkedIn', initialPos: { y: 30, x: 20 } },
              { icon: <FaFacebook />, url: 'https://web.facebook.com/himantha.hirushan.71', label: 'Facebook', initialPos: { y: 40, x: -10 } },
              { icon: <FaWhatsapp />, url: 'https://wa.me/94768840107', label: 'WhatsApp', initialPos: { y: 60, x: 10 } }
            ].map((social, index) => (
              <motion.a
                key={index}
                custom={index}
                initial={{ opacity: 0, y: social.initialPos.y, x: social.initialPos.x }}
                animate={socialControls}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#94a3b8',
                  transition: 'all 0.3s ease',
                  fontSize: '1.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={{ 
                  color: '#f97316',
                  backgroundColor: '#1e293b',
                  borderColor: '#1e293b',
                  y: -5,
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Image Container with Tech Icons */}
        <motion.div 
          style={{
            flex: 1,
            minWidth: '300px',
            maxWidth: '380px',
            position: 'relative',
            height: '380px',
            margin: '0 auto',
          }}
        >
          <motion.div 
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItem: 'center',
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={imageControls}
          >
            <motion.img 
              src={HeroImage} 
              alt="Himantha Hirushan" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 2,
              }}
            />
            
            {/* Animated Tech Icons */}
            <motion.div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}>
              {techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={techControls}
                  style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    width: `${tech.size}px`,
                    height: `${tech.size}px`,
                    ...(window.innerWidth < 768 ? tech.mobilePos : tech.pos),
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: '0 0 20px rgba(249, 115, 22, 0.6)',
                    zIndex: 10,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}>
                    {tech.icon}
                  </div>
                  <motion.span style={{
                    position: 'absolute',
                    fontSize: '0.7rem',
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    background: 'rgba(15,23,42,0.9)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(249,115,22,0.3)',
                    pointerEvents: 'none',
                    bottom: '-25px',
                  }}>
                    {tech.name}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced glow effect under the image */}
            <motion.div 
              style={{
                position: 'absolute',
                width: '140%',
                height: '140%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(249,115,22,0.2) 0%, transparent 60%)',
                filter: 'blur(30px)',
                zIndex: 1,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          color: '#f97316',
          fontSize: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Link
          to="projects"
          smooth={true}
          duration={400}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
          aria-label="Scroll down"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <FaChevronDown />
          </motion.div>
          <motion.span
            style={{
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              color: '#94a3b8',
              fontWeight: 500,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Explore My Work
          </motion.span>
        </Link>
      </motion.div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @media (max-width: 1024px) {
          section {
            padding: 80px 5%;
          }
          
          h1 {
            font-size: 2.5rem;
          }
          
          p {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 768px) {
          section {
            padding: 80px 5% 60px;
            text-align: center;
          }
          
          div {
            flex-direction: column;
          }
          
          div:first-child {
            order: 2;
            margin-top: 2rem;
            max-width: 100%;
            padding: 0;
          }
          
          div:nth-child(2) {
            order: 1;
            height: 320px;
            max-width: 320px;
          }
          
          div > div {
            justify-content: center;
          }
          
          h1 {
            font-size: 2.3rem;
          }
        }
        
        @media (max-width: 480px) {
          section {
            padding: 60px 5% 40px;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          p {
            font-size: 1.1rem;
          }
          
          div:nth-child(2) {
            height: 280px;
            max-width: 280px;
          }
          
          a {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
        }
        
        @media (max-width: 400px) {
          h1 {
            font-size: 1.8rem;
          }
          
          p {
            font-size: 1rem;
          }
          
          div:nth-child(2) {
            height: 250px;
            max-width: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;