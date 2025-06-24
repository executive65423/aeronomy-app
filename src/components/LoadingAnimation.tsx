import React, { useState, useEffect } from 'react'

// Define interface for component props
interface LoadingAnimationProps {
  children: React.ReactNode;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ children }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Set animation to complete after a delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);
    
    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);
  
  if (animationComplete) {
    return <>{children}</>;
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-navy-dark to-navy">
      <div className="text-center">
        <div className="mb-6 relative">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            <span className="text-white">Aero</span>
            <span className="text-sustainability">nomy</span>
          </h1>
          <div className="h-1 bg-sustainability rounded-full w-full animate-pulse mt-2" />
        </div>
        <p className="text-white/80 text-xl">
          Optimizing the future of SAF
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation; 