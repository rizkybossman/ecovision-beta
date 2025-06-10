import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const benefitsData = [
  {
    image: "/images/clean-air.jpg",
    text: "Reducing waste helps decrease air pollution from landfills and incinerators."
  },
  {
    image: "/images/healthier.jpg",
    text: "Eco-friendly habits lead to 23% lower risk of chronic diseases."
  },
  {
    image: "/images/money.jpg",
    text: "Reusing and recycling can save households up to $1,000 annually."
  },
  {
    image: "/images/biodiversity.jpg",
    text: "Proper waste management protects wildlife and preserves ecosystems."
  },
  {
    image: "/images/community.jpg",
    text: "Sustainable practices build stronger, more resilient communities."
  },
  {
    image: "/images/future.jpg",
    text: "Every small action today ensures a livable planet for future generations."
  }
];

const Benefits = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const progress = useTransform(x, val => {
    const container = containerRef.current;
    if (!container) return 0;
    const scrollWidth = container.scrollWidth / 2; // Since we duplicate items
    return (-val % scrollWidth) / scrollWidth * benefitsData.length;
  });

  // Auto-scroll animation
  useEffect(() => {
    if (isDragging || isHovered) return;

    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.scrollWidth / 2; // Half because we duplicate items
    const animation = animate(x, -containerWidth, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      onUpdate: (latest) => {
        x.set(latest);
      }
    });

    return () => animation.stop();
  }, [isHovered, isDragging, x]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="benefits" className="py-20 bg-primary-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center text-primary-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Benefits of Eco Lifestyle
        </motion.h2>

        <motion.p 
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Small daily actions create big environmental impacts. Here's how your eco-friendly choices make a difference.
        </motion.p>

        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            drag="x"
            style={{ x }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            dragConstraints={{
              right: 0,
              left: -(containerRef.current?.scrollWidth - containerRef.current?.clientWidth) || 0
            }}
            dragElastic={0.05}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex py-4 cursor-grab active:cursor-grabbing"
          >
            {[...benefitsData, ...benefitsData].map((benefit, index) => (
              <motion.div
                key={`item-${index}`}
                className="flex-shrink-0 w-80 mx-4 h-64 rounded-xl overflow-hidden relative group"
                whileHover={{ scale: isDragging ? 1 : 1.03 }}
              >
                <div className="absolute inset-0 bg-primary-800 bg-opacity-30 z-10 transition-opacity duration-300 group-hover:bg-opacity-10" />
                <img 
                  src={benefit.image} 
                  alt="Eco benefit"
                  className="w-full h-full object-cover grayscale-[20%] brightness-90 contrast-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                  <p className="text-white font-medium text-center">{benefit.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade effects on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary-50 to-transparent pointer-events-none" />
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-600 mb-6">
            {isDragging ? "Drag to scroll" : "Hover or drag to explore"}
          </p>
          <div className="flex justify-center space-x-2">
            {benefitsData.map((_, i) => (
              <motion.div 
                key={i}
                className="w-2 h-2 rounded-full bg-gray-300"
                animate={{
                  backgroundColor: progress.get() % benefitsData.length >= i && 
                                 progress.get() % benefitsData.length < i + 1 
                    ? "#1e40af"  // primary-600
                    : "#d1d5db"   // gray-300
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;