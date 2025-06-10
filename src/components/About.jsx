import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

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
        staggerChildren: 0.3,
      }
    }
  };

  const logoVariants = {
    hidden: { 
      rotate: -180,
      opacity: 0,
      scale: 0.5
    },
    visible: {
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary-800 mb-12">About Us</h2>
        
        <div ref={ref} className="flex flex-col md:flex-row items-center">
          {/* Logo with roll-up animation */}
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0 md:pr-8 flex justify-center"
            initial="hidden"
            animate={controls}
            variants={logoVariants}
          >
            <div className="rounded-full overflow-hidden w-64 h-64 border-4 border-primary-100">
              <img 
                src="/images/EcoLogo.png" 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text content with staggered animation */}
          <motion.div 
            className="md:w-1/2 md:pr-8"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* <motion.h3 
              className="text-2xl font-semibold text-primary-700 mb-4"
              variants={textVariants}
            >
              Our Mission
            </motion.h3> */}
            
            <motion.p 
              className="text-gray-700 mb-4 text-justify"
              variants={textVariants}
            >
              Ecovision is an interactive web platform designed to help users make smarter, eco-conscious choices in their daily lives. By combining real-time weather and location data, Ecovision recommends meaningful outdoor activities that align with the current environment encouraging users to connect with nature while staying mindful of their surroundings.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 mb-4 text-justify"
              variants={textVariants}
            >
              At the core of Ecovision is advanced machine learning. Through our EcoSight feature, users can scan waste using their camera, and the system instantly identifies the type of trash—whether it's organic, recyclable, or hazardous. The platform then provides tailored guidance on how to properly dispose of or manage the waste, helping users act responsibly and learn as they go.
            </motion.p>
            
            <motion.p 
              className="text-gray-700 text-justify"
              variants={textVariants}
            >
              To promote long-term engagement, Ecovision introduces EcoQuest, a gamified challenge system where users can upload their sustainable actions, earn points, and climb the leaderboard. This feature encourages real-world impact through fun, trackable progress. While the web platform ensures smooth interaction and accessibility, machine learning powers core features like Ecosight—enabling smart trash detection and eco-guidance.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;