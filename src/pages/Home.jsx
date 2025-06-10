import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Benefits from '../components/Benefits';
import Services from '../components/Services';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <Hero />
      <About />
      <Benefits />
      <Services />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
