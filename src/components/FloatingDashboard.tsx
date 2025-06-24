import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingDashboardProps {
  className?: string;
}

const FloatingDashboard: React.FC<FloatingDashboardProps> = ({ className = "" }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  // Dashboard elements that will light up on hover
  const dashboardSections = [
    { id: 'volume', title: 'Total SAF Volume', value: '400,000', subtitle: 'gallons contracted', color: 'blue' },
    { id: 'price', title: 'Average Price', value: '$14.49', subtitle: '/gallon', color: 'green' },
    { id: 'na-price', title: 'North America HEFA', value: '$14.35', trend: '+0.25', trendType: 'up', color: 'blue' },
    { id: 'eu-price', title: 'Europe ATJ', value: '$15.20', trend: '-0.10', trendType: 'down', color: 'red' },
    { id: 'ap-price', title: 'Asia Pacific FT-SPK', value: '$15.85', trend: '+0.45', trendType: 'up', color: 'green' },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* 3D floating effect container */}
      <motion.div
        className="relative perspective-1000 w-full max-w-3xl mx-auto"
        initial={{ y: 20, rotateX: 5, rotateY: -5 }}
        animate={{ 
          y: [20, 0, 20],
          rotateX: [5, 2, 5],
          rotateY: [-5, 5, -5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      >
        {/* Main dashboard panel with glassmorphism effect */}
        <div 
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6 transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: `0 10px 25px rgba(14, 30, 82, 0.15), 
                        0 5px 12px rgba(14, 30, 82, 0.1),
                        0 0 30px rgba(0, 160, 220, 0.1)`,
          }}
        >
          {/* Dashboard header with glow effect */}
          <div className="mb-6 text-center">
            <h2 
              className={`text-2xl font-bold text-white mb-1
                ${hovered ? 'opacity-80' : 'opacity-100'} transition-opacity duration-300`}
              style={{ 
                textShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
              }}
            >
              For Airlines, By Aviation Experts
            </h2>
            <p className="text-white/80">Real-time SAF market insights dashboard</p>
          </div>

          {/* Main stats display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Volume display */}
            <motion.div
              className={`flex flex-col rounded-lg p-4 bg-gradient-to-br ${hovered === 'volume' ? 
                'from-blue-500/30 to-blue-700/30' : 'from-blue-500/10 to-blue-700/10'} 
                backdrop-blur-sm border border-white/20 transition-all duration-300`}
              whileHover={{ scale: 1.03, y: -5 }}
              onHoverStart={() => setHovered('volume')}
              onHoverEnd={() => setHovered(null)}
              style={{ 
                boxShadow: hovered === 'volume' ? 
                  '0 0 25px rgba(59, 130, 246, 0.6), 0 0 15px rgba(59, 130, 246, 0.4)' : 
                  '0 0 15px rgba(59, 130, 246, 0.2)'
              }}
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 mr-3 text-blue-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg text-white">Total SAF Volume</h3>
              </div>
              <div className="text-4xl font-bold text-white mb-1">400,000</div>
              <div className="text-white/70">gallons contracted</div>
            </motion.div>

            {/* Price display */}
            <motion.div
              className={`flex flex-col rounded-lg p-4 bg-gradient-to-br ${hovered === 'price' ? 
                'from-green-500/30 to-green-700/30' : 'from-green-500/10 to-green-700/10'} 
                backdrop-blur-sm border border-white/20 transition-all duration-300`}
              whileHover={{ scale: 1.03, y: -5 }}
              onHoverStart={() => setHovered('price')}
              onHoverEnd={() => setHovered(null)}
              style={{ 
                boxShadow: hovered === 'price' ? 
                  '0 0 25px rgba(34, 197, 94, 0.6), 0 0 15px rgba(34, 197, 94, 0.4)' : 
                  '0 0 15px rgba(34, 197, 94, 0.2)'
              }}
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 mr-3 text-green-400">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg text-white">Average Price</h3>
              </div>
              <div className="text-4xl font-bold text-white mb-1">$14.49</div>
              <div className="text-white/70">per gallon</div>
            </motion.div>
          </div>

          {/* Regional price cards grid */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-2">Regional Price Insights</h3>
            
            {/* North America price card */}
            <motion.div
              className={`flex items-center justify-between rounded-lg px-4 py-3 ${hovered === 'na-price' ? 
                'bg-blue-600/30' : 'bg-white/5'} backdrop-blur-sm border border-white/20 transition-all duration-300`}
              whileHover={{ scale: 1.02, x: 5 }}
              onHoverStart={() => setHovered('na-price')}
              onHoverEnd={() => setHovered(null)}
              style={{ 
                boxShadow: hovered === 'na-price' ? 
                  '0 0 20px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)' : 
                  'none'
              }}
            >
              <div>
                <div className="text-white/80 mb-1">North America HEFA</div>
                <div className="text-2xl font-semibold text-white">$14.35</div>
              </div>
              <div className="flex items-center text-green-400">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>+0.25</span>
              </div>
            </motion.div>
            
            {/* Europe price card */}
            <motion.div
              className={`flex items-center justify-between rounded-lg px-4 py-3 ${hovered === 'eu-price' ? 
                'bg-red-600/30' : 'bg-white/5'} backdrop-blur-sm border border-white/20 transition-all duration-300`}
              whileHover={{ scale: 1.02, x: 5 }}
              onHoverStart={() => setHovered('eu-price')}
              onHoverEnd={() => setHovered(null)}
              style={{ 
                boxShadow: hovered === 'eu-price' ? 
                  '0 0 20px rgba(239, 68, 68, 0.5), 0 0 10px rgba(239, 68, 68, 0.3)' : 
                  'none'
              }}
            >
              <div>
                <div className="text-white/80 mb-1">Europe ATJ</div>
                <div className="text-2xl font-semibold text-white">$15.20</div>
              </div>
              <div className="flex items-center text-red-400">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                <span>-0.10</span>
              </div>
            </motion.div>
            
            {/* Asia Pacific price card */}
            <motion.div
              className={`flex items-center justify-between rounded-lg px-4 py-3 ${hovered === 'ap-price' ? 
                'bg-green-600/30' : 'bg-white/5'} backdrop-blur-sm border border-white/20 transition-all duration-300`}
              whileHover={{ scale: 1.02, x: 5 }}
              onHoverStart={() => setHovered('ap-price')}
              onHoverEnd={() => setHovered(null)}
              style={{ 
                boxShadow: hovered === 'ap-price' ? 
                  '0 0 20px rgba(34, 197, 94, 0.5), 0 0 10px rgba(34, 197, 94, 0.3)' : 
                  'none'
              }}
            >
              <div>
                <div className="text-white/80 mb-1">Asia Pacific FT-SPK</div>
                <div className="text-2xl font-semibold text-white">$15.85</div>
              </div>
              <div className="flex items-center text-green-400">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>+0.45</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive CTA button */}
          <motion.button
            className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium"
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 0 25px rgba(59, 130, 246, 0.7), 0 0 15px rgba(59, 130, 246, 0.5)' 
            }}
            whileTap={{ scale: 0.98 }}
          >
            View Full Dashboard
          </motion.button>
        </div>

        {/* Decorative floating elements for 3D effect */}
        <motion.div
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-70"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.7, 0.9, 0.7],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          style={{
            filter: 'blur(3px)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
          }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-70"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.7, 0.9, 0.7],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            delay: 1,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          style={{
            filter: 'blur(4px)',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)'
          }}
        />
      </motion.div>
    </div>
  );
};

export default FloatingDashboard; 