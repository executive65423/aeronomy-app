import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AirplaneBackToTop from './components/AirplaneBackToTop'
// Lazy load page components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Products = lazy(() => import('./pages/products'))
const Analytica = lazy(() => import('./pages/products/Analytica'))
const SAFPRO = lazy(() => import('./pages/products/SAFPRO'))
const SAFSuite = lazy(() => import('./pages/products/SAFSuite'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Cookies = lazy(() => import('./pages/Cookies'))
const Newsletter = lazy(() => import('./pages/Newsletter'))

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sustainability"></div>
  </div>
)

function App() {
  const location = useLocation();
  
  const [theme, setTheme] = useState(() => {
    // Get the theme from localStorage, or default to 'light'
    return localStorage.getItem('theme') || 'light'
  })
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Set the theme when it changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])
  
  type LoadingPhase = 'logo' | 'done';
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('logo');
  const [showFadingOverlay, setShowFadingOverlay] = useState(false);

  useEffect(() => {
    // 1 second pause (loading), then fade to main content
    const timer = setTimeout(() => {
      setLoadingPhase('done');
      setShowFadingOverlay(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRequestDemo = () => {
    window.open('https://calendly.com/manthan-sharma-aeronomy/30min', '_blank', 'noopener,noreferrer');
  };

  const mainContent = (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-surface text-gray-900 dark:text-white">
      <Navbar onRequestDemo={handleRequestDemo} />
      <div className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/analytica" element={<Analytica />} />
            <Route path="/products/safpro" element={<SAFPRO />} />
            <Route path="/products/safsuite" element={<SAFSuite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="*" element={<div className="p-10 text-center">Page Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      {/* Airplane: back-to-top, persistent across all pages */}
      <AirplaneBackToTop playFlyIn={false} />
    </div>
  );

  // Logo + airplane loading bar – 5 second pause
  if (loadingPhase === 'logo') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="text-white">Aero</span>
            <span className="text-sustainability">nomy</span>
          </h1>
          {/* Loading bar = airplane flying across (nose right = forward) */}
          <div className="w-full max-w-md mx-auto h-12 mt-2 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2"
              animate={{ left: ['0%', '100%'] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg
                className="w-10 h-10 text-white/95"
                style={{ transform: 'rotate(90deg)' }}
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
            </motion.div>
          </div>
          <p className="text-white/80 text-center mt-6">
            Optimizing the future of SAF
          </p>
        </div>
      </div>
    );
  }

  // Fading overlay (same logo screen) – fades away when transitioning to main content
  const fadingOverlay = showFadingOverlay && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={() => setShowFadingOverlay(false)}
    >
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          <span className="text-white">Aero</span>
          <span className="text-sustainability">nomy</span>
        </h1>
        <div className="w-full max-w-md mx-auto h-10 mt-2" />
        <p className="text-white/80 text-center mt-6">
          Optimizing the future of SAF
        </p>
      </div>
    </motion.div>
  );

  return (
    <>
      {mainContent}
      {fadingOverlay}
    </>
  );
}

export default App 