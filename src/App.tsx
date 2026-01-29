import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomScrollbar from './components/CustomScrollbar'
import Footer from './components/Footer'
// Temporarily comment out LoadingAnimation to test if it's causing the issue
// import LoadingAnimation from './components/LoadingAnimation'
//testing
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
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show content after a shorter delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRequestDemo = () => {
    // Redirect to Calendly
    window.open('https://calendly.com/manthan-sharma-aeronomy/30min', '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="text-white">Aero</span>
            <span className="text-sustainability">nomy</span>
          </h1>
          <div className="h-1 bg-sustainability rounded-full w-full animate-pulse" />
          <p className="text-white/80 text-center mt-4">
            Optimizing the future of SAF
          </p>
        </div>
      </div>
    );
  }

  return (
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
      {/* Custom Scrollbar */}
      <CustomScrollbar />
    </div>
  );
}

export default App 