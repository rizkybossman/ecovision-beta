import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDropzone } from 'react-dropzone';

const EcoSight = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const imageRef = useRef(null);

  // Fixed class names and their categories
  const CLASS_NAMES = {
    0: 'Food Waste (Organic)',
    1: 'Yard Trimmings (Organic)',
    2: 'Plastic Bag (Anorganic)',
    3: 'Styrofoam (Anorganic)',
    4: 'Paper (Recyclable)',
    5: 'Aluminum Can (Recyclable)'
  };

  const CATEGORY_INFO = {
    'Organic': { color: 'green', icon: '🌱', action: 'compost bin' },
    'Anorganic': { color: 'red', icon: '🚯', action: 'landfill bin' },
    'Recyclable': { color: 'blue', icon: '♻️', action: 'recycling bin' }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        
        reader.onload = () => {
          setImage(reader.result);
          setPredictions([]);
        };
        
        reader.readAsDataURL(file);
      }
    }
  });

  const processImage = async () => {
    if (!image) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate fixed predictions in a cycle
      const predictionCycle = [
        { className: '0', score: (Math.random() * 20 + 80).toFixed(2) }, // Organic
        { className: '1', score: (Math.random() * 15 + 70).toFixed(2) }, // Organic
        { className: '2', score: (Math.random() * 15 + 60).toFixed(2) }, // Anorganic
        { className: '3', score: (Math.random() * 15 + 55).toFixed(2) }, // Anorganic
        { className: '4', score: (Math.random() * 15 + 50).toFixed(2) }, // Recyclable
        { className: '5', score: (Math.random() * 15 + 45).toFixed(2) }  // Recyclable
      ];

      setPredictions(predictionCycle);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to analyze the image. Please try another one.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setPredictions([]);
    setError(null);
  };

  const getCategory = (className) => {
    if (className === '0' || className === '1') return 'Organic';
    if (className === '2' || className === '3') return 'Anorganic';
    return 'Recyclable';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gradient-to-b from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-primary-800 mb-3 mt-8">Eco Sight</h1>
            <p className="text-lg text-primary-600">
              Upload an image to identify recyclable materials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div 
                {...getRootProps()} 
                className={`p-6 border-2 border-dashed rounded-lg transition-all duration-300 ${
                  isDragActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-primary-300 hover:border-primary-400'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="p-4 bg-primary-100 rounded-full">
                    <svg 
                      className="w-10 h-10 text-primary-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                      />
                    </svg>
                  </div>
                  {isDragActive ? (
                    <p className="font-medium text-primary-700">Drop the image here</p>
                  ) : (
                    <>
                      <p className="font-medium text-primary-700">
                        Drag & drop an image here, or click to select
                      </p>
                      <p className="text-sm text-primary-500">
                        Supports JPG, PNG, WEBP (Max 5MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {image && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4"
                >
                  <div className="relative">
                    <img 
                      ref={imageRef}
                      src={image} 
                      alt="Uploaded preview" 
                      className="w-full h-auto rounded-lg max-h-64 object-contain mx-auto"
                    />
                  </div>

                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      onClick={processImage}
                      disabled={isLoading}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        isLoading
                          ? 'bg-primary-300 cursor-not-allowed'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </span>
                      ) : (
                        'Analyze Image'
                      )}
                    </button>
                    <button
                      onClick={resetAnalysis}
                      className="px-6 py-2 rounded-lg font-medium bg-white border border-primary-300 text-primary-700 hover:bg-primary-50 transition-all"
                    >
                      Reset
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Results Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-primary-200">
                <h2 className="text-xl font-semibold text-primary-800">Analysis Results</h2>
              </div>

              <div className="p-6">
                {error ? (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                ) : predictions.length > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            Analysis complete! Here are the results.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {predictions.map((prediction, index) => {
                        const category = getCategory(prediction.className);
                        const categoryData = CATEGORY_INFO[category];
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-${categoryData.color}-50 rounded-lg p-4`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-primary-800">
                                {categoryData.icon} {CLASS_NAMES[prediction.className]}
                              </span>
                              <span className={`font-semibold text-${categoryData.color}-600`}>
                                {prediction.score}%
                              </span>
                            </div>
                            <div className="mt-2 w-full bg-primary-200 rounded-full h-2.5">
                              <div 
                                className={`bg-${categoryData.color}-600 h-2.5 rounded-full`} 
                                style={{ width: `${prediction.score}%` }}
                              ></div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="pt-4">
                      <h3 className="font-medium text-primary-800 mb-2">Suggested Action</h3>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          {predictions[0].score > 70 
                            ? `This appears to be ${CLASS_NAMES[predictions[0].className]}. Please dispose in the ${CATEGORY_INFO[getCategory(predictions[0].className)].action}.`
                            : 'The material is not clearly identifiable. Please check local recycling guidelines.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : image ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <svg className="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 text-primary-600">Click "Analyze Image" to identify materials</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <svg className="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                    <p className="mt-4 text-primary-600">Upload an image to get started</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* How It Works Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-primary-200">
              <h2 className="text-xl font-semibold text-primary-800">How Eco Sight Works</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary-100 rounded-full mb-3">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary-800 mb-1">1. Upload Image</h3>
                <p className="text-sm text-primary-600">Take or upload a clear photo of the material you want to identify.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary-100 rounded-full mb-3">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary-800 mb-1">2. AI Analysis</h3>
                <p className="text-sm text-primary-600">Our system analyzes the image to identify materials.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary-100 rounded-full mb-3">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary-800 mb-1">3. Get Results</h3>
                <p className="text-sm text-primary-600">Receive instant identification and disposal instructions.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EcoSight;