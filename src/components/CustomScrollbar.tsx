import { useEffect, useState, useRef } from 'react'

// Extend Window interface to include custom properties
declare global {
  interface Window {
    scrollbarTimeout?: number;
    prevScrollY?: number;
  }
}

const CustomScrollbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<number>()

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (position / height) * 100
      setScrollPosition(scrollPercentage)
      
      // Show scrollbar only when scrolling
      setIsVisible(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize position

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutRef.current)
    }
  }, [])
  
  // Handle click on scrollbar - jump to position
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = e.currentTarget
    const trackRect = track.getBoundingClientRect()
    const clickPosition = (e.clientY - trackRect.top) / trackRect.height
    
    const targetPosition = clickPosition * (document.documentElement.scrollHeight - window.innerHeight)
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div 
      className={`fixed right-5 top-1/2 transform -translate-y-1/2 z-50 h-[300px] w-8 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
    >
      {/* Track */}
      <div 
        className="h-full w-[2px] bg-black/30 dark:bg-white/30 rounded-full relative cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Progress Bar */}
        <div 
          className="w-[2px] bg-black dark:bg-white rounded-full absolute bottom-0 left-0"
          style={{ height: `${scrollPosition}%` }}
        ></div>
        
        {/* Logo Scrollbar icon */}
        <div 
          className="absolute -left-[13px] transform -translate-y-1/2 transition-all duration-200 ease-out cursor-pointer hover:scale-110"
          style={{ 
            top: `${scrollPosition}%`,
          }}
        >
          <div className="relative">
            <img 
              src="/images/logoscroll.png" 
              alt="Scroll" 
              className="w-[26px] h-[26px] object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomScrollbar 