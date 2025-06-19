// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ServicesSection from '../sections/ServicesSection';
import ProcessSection from '../sections/ProcessSection';
import ContactSection from '../sections/ContactSection';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <ServicesSection />
      <SkillsSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Home;