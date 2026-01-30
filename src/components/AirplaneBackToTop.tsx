import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

// Airplane SVG – nose up when landed (back-to-top)
const AirplaneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M32 8C29 8 27 11 27 14V26L10 32V36L27 34V50L22 56V58L32 54L42 58V56L37 50V34L54 36V32L37 26V14C37 11 35 8 32 8Z"
      fill="currentColor"
    />
  </svg>
)

interface AirplaneBackToTopProps {
  /** Run fly-in from center to bottom-right on first mount (after loading) */
  playFlyIn?: boolean;
  onFlyInComplete?: () => void;
}

const AirplaneBackToTop: React.FC<AirplaneBackToTopProps> = ({
  playFlyIn = true,
  onFlyInComplete,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!playFlyIn) return
    const t = setTimeout(() => {
      onFlyInComplete?.()
    }, 1600) // after fly-in animation ends
    return () => clearTimeout(t)
  }, [playFlyIn, onFlyInComplete])

  const landedPosition = {
    left: 'auto' as const,
    top: 'auto' as const,
    right: '1.5rem',
    bottom: '1.5rem',
    x: 0,
    y: 0,
    rotate: 0,
  }

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      className="fixed z-40 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-navy/90 hover:bg-navy text-white shadow-lg hover:shadow-xl transition-shadow border border-white/10 focus:outline-none focus:ring-2 focus:ring-sustainability cursor-pointer"
      initial={playFlyIn ? {
        left: '50%',
        top: '50%',
        right: 'auto',
        bottom: 'auto',
        x: '-50%',
        y: '-50%',
        rotate: -90,
      } : landedPosition}
      animate={landedPosition}
      transition={{
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll back to top"
    >
      <AirplaneIcon className="w-8 h-8 md:w-9 md:h-9" />
    </motion.button>
  )
}

export default AirplaneBackToTop
