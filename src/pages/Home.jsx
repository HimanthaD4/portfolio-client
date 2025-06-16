// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ServicesSection from '../sections/ServicesSection';
import ExperienceSection from '../sections/ExperienceSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ContactSection from '../sections/ContactSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      
      
      <ServicesSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Home;