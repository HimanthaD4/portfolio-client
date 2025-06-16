// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ProcessSection from './sections/ProcessSection';
import ContactSection from './sections/ContactSection';
import ServicesSection from './sections/ServicesSection';
import Footer from './components/Footer';


function App() {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection /> 
        <SkillsSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;