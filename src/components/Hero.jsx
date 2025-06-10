import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textState, setTextState] = useState({
    scan: 0, // 0 = hidden, 1 = revealing, 2 = visible, 3 = hiding
    sync: 0,
    cleaner: 0,
  });

  // Image paths
  const backgroundImages = [
    "/images/hero-bg-1.jpg",
    "/images/hero-bg-2.jpg",
    "/images/hero-bg-3.jpg",
    "/images/hero-bg-4.jpg",
    "/images/hero-bg-5.jpg",
  ];

  // Text animation sequence with rolling effect
  useEffect(() => {
    const sequence = [
      // Reveal "Scan the world."
      () => setTextState({ scan: 1, sync: 0, cleaner: 0 }),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            setTextState((s) => ({ ...s, scan: 2 }));
            resolve();
          }, 800)
        ),

      // Reveal "Sync with nature."
      () => setTextState((s) => ({ ...s, sync: 1 })),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            setTextState((s) => ({ ...s, sync: 2 }));
            resolve();
          }, 800)
        ),

      // Reveal "Cleaner world."
      () => setTextState((s) => ({ ...s, cleaner: 1 })),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            setTextState((s) => ({ ...s, cleaner: 2 }));
            resolve();
          }, 800)
        ),

      // Pause with all visible
      () => new Promise((resolve) => setTimeout(resolve, 3000)),

      // Hide "Scan the world."
      () => setTextState((s) => ({ ...s, scan: 3 })),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            setTextState((s) => ({ ...s, scan: 0 }));
            resolve();
          }, 800)
        ),

      // Hide "Sync with nature."
      () => setTextState((s) => ({ ...s, sync: 3 })),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            setTextState((s) => ({ ...s, sync: 0 }));
            resolve();
          }, 800)
        ),

      // Hide "Cleaner world."
      () => setTextState((s) => ({ ...s, cleaner: 3 })),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            setTextState((s) => ({ ...s, cleaner: 0 }));
            resolve();
          }, 800)
        ),

      // Brief pause before restart
      () => new Promise((resolve) => setTimeout(resolve, 500)),
    ];

    let running = true;

    const runSequence = async () => {
      while (running) {
        for (const step of sequence) {
          if (running) await step();
        }
      }
    };

    runSequence();

    return () => {
      running = false;
    };
  }, []);

  // Auto-advance images every 5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [backgroundImages.length]);

  // Helper function to calculate rolling animation styles
  const getRollingStyle = (state) => {
    switch (state) {
      case 1: // Revealing
        return {
          transform: "rotateX(90deg) translateY(20px)",
          opacity: 0,
          animation: "rollIn 0.8s forwards",
        };
      case 3: // Hiding
        return {
          transform: "rotateX(0deg) translateY(0)",
          opacity: 1,
          animation: "rollOut 0.8s forwards",
        };
      case 0: // Hidden
        return { opacity: 0, transform: "rotateX(90deg) translateY(-20px)" };
      case 2: // Visible
        return { opacity: 1, transform: "rotateX(0deg) translateY(0)" };
      default:
        return {};
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-white relative overflow-hidden">
      {/* Background images with filters and transition */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
            filter: "brightness(0.7) contrast(1.1) saturate(0.8) blur(0.5px)",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/10"></div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-left pl-8 md:pl-16 lg:pl-24">
        {/* EcoVision Text */}
        <div className="mb-2">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none">
            <span className="text-green-500 block">Eco</span>
            <span
              className="block text-transparent mt-1"
              style={{
                WebkitTextStroke: "3px white",
                textStroke: "3px white",
                lineHeight: "0.9",
              }}
            >
              Vision
            </span>
          </h1>
        </div>

        {/* Animated Text */}
        <div className="h-16 md:h-20 mb-4 flex items-center">
          <div className="flex space-x-4">
            <span
              className="inline-block text-2xl md:text-4xl origin-bottom"
              style={getRollingStyle(textState.scan)}
            >
              Scan the World.
            </span>
            <span
              className="inline-block text-2xl md:text-4xl origin-bottom"
              style={getRollingStyle(textState.sync)}
            >
              Sync with Nature.
            </span>
            <span
              className="inline-block text-2xl md:text-4xl origin-bottom"
              style={getRollingStyle(textState.cleaner)}
            >
              Cleaner World.
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              const servicesSection = document.getElementById("services");
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="relative inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 
                shadow-lg hover:shadow-xl transform hover:-translate-y-1
                focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50
                before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-primary-400 before:to-primary-600 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10
                overflow-hidden"
            style={{
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span className="relative z-10">Discover Our Services</span>
          </button>
        </div>
      </div>

      {/* Animation keyframes */}
      
    </section>
  );
};

export default Hero;
