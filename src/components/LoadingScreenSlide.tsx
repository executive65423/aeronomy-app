import React from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenSlideProps {
  onSlideComplete: () => void;
}

// Airplane SVG – tilted 90° left (nose left) for flying across the screen
const AirplaneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    style={{ transform: 'rotate(-90deg)' }}
  >
    <path
      d="M32 8C29 8 27 11 27 14V26L10 32V36L27 34V50L22 56V58L32 54L42 58V56L37 50V34L54 36V32L37 26V14C37 11 35 8 32 8Z"
      fill="currentColor"
    />
  </svg>
);

const LoadingScreenSlide: React.FC<LoadingScreenSlideProps> = ({ onSlideComplete }) => {
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-full w-full min-w-full"
      style={{ width: '100vw' }}
      initial={{ x: 0 }}
      animate={{ x: '-100%' }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onSlideComplete}
    >
      {/* Full viewport panel: logo screen + airplane on right edge */}
      <div className="w-full h-full bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="text-white">Aero</span>
            <span className="text-sustainability">nomy</span>
          </h1>
          <div className="h-1 bg-sustainability rounded-full w-full max-w-md mx-auto animate-pulse" />
          <p className="text-white/80 text-center mt-4">
            Optimizing the future of SAF
          </p>
        </div>

        {/* Airplane at leading edge – flying across (tilted 90° left, subtle float) */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <AirplaneIcon className="w-14 h-14 md:w-20 md:h-20 text-white/95 drop-shadow-md" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreenSlide
