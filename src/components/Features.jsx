import React, { useState } from 'react';

const features = [
  {
    id: 'trash',
    title: 'Trash Detection',
    description: 'AI-powered trash detection system to identify and classify waste materials for proper disposal.',
    image: '/images/feature-trash-icon.png'
  },
  {
    id: 'weather',
    title: 'Weather Activity Forecast',
    description: 'Predict environmental conditions and their impact on waste management operations.',
    image: '/images/feature-weather-icon.png'
  },
  {
    id: 'challenge',
    title: 'Sustainability Challenges',
    description: 'Engage users with interactive challenges to promote eco-friendly habits.',
    image: '/images/feature-challenge-icon.png'
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary-800 mb-12">Our Main Features</h2>
        
        {/* Feature Selector Buttons */}
        <div className="flex justify-center space-x-6 mb-12">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`px-6 py-3 rounded-full transition-all ${activeFeature === index ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}
            >
              {feature.title}
            </button>
          ))}
        </div>
        
        {/* Horizontal Scrolling Content */}
        <div className="relative h-96">
          <div 
            className="absolute top-0 left-0 flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeFeature * 100}%)`, width: `${features.length * 100}%` }}
          >
            {features.map((feature) => (
              <div key={feature.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-primary-50 rounded-xl p-8 h-full flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-64 h-64 mx-auto object-contain"
                    />
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <h3 className="text-2xl font-bold text-primary-700 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;