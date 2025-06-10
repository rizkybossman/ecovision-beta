import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: "Eco Sight",
    description: "Use your camera to scan and identify different types of waste in real time. Powered by machine learning, EcoSight detects whether trash is organic, recyclable, or hazardous, and instantly provides helpful information on how to dispose of it properly. It's like having a smart eco-companion in your pocket.",
    image: "/images/EcoSight.png",
    path: "/EcoSight"
  },
  {
    title: "Eco Active",
    description: "Discover personalized eco-friendly activities based on your current weather and location. EcoActive analyzes your environment to recommend meaningful actions you can take right now from going for a sustainable walk to planting something green. Let nature guide your next move.",
    image: "/images/EcoActive.png",
    path: "/EcoActive"
  },
  {
    title: "Eco Quest",
    description: "Turn your sustainable lifestyle into a fun challenge. Upload your real-world eco-actions, earn points, and rise through the leaderboard. EcoQuest keeps you engaged with rewarding missions, achievements, and a community of like-minded changemakers all while making a real impact.",
    image: "/images/EcoQuest.png",
    path: "/EcoQuest"
  },
];

const Services = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-primary-100">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center text-primary-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={itemVariants}
        >
          Our Features
        </motion.h2>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-50 my-4 mx-4">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="h-40 w-auto object-contain"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <div className="px-6 pt-2 pb-3">
                  <h3 className="text-xl font-semibold text-primary-700 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-justify">{service.description}</p>
                </div>
              </div>
              
              <div className="px-6 pb-4">
                <button 
                  onClick={() => navigate(service.path)}
                  className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center gap-1"
                >
                  Try it out
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;