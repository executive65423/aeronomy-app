import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface NavbarProps {
  onRequestDemo: () => void;
}

const Navbar = ({ onRequestDemo }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check logged in status when component mounts
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
    
    // Check immediately
    checkLoginStatus();
    
    // Also recheck on storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    }
  }, []);

  // Smooth scroll to features section
  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // If not on home page, navigate to home then scroll
    if (!isHomePage) {
      window.location.href = '/#features';
      return;
    }
    
    // If on home page, scroll to features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Use transparent navbar only on homepage, use semi-transparent background on other pages
  const navbarBackground = 
    isScrolled 
      ? 'bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm shadow-sm'
      : isHomePage 
        ? 'bg-transparent' 
        : 'bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm shadow-sm';

  // Determine text color based on page and scroll state  
  const textStyle = (isHomePage && !isScrolled) ? 'text-white' : 'text-navy dark:text-white';
  // Always use text-white for "Aero" by setting logo style to a custom class
  const logoStyle = 'custom-logo';
  const linkStyle = (isHomePage && !isScrolled) ? 'nav-transparent' : 'nav-scrolled';
  const buttonStyle = (isHomePage && !isScrolled) ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30' : '';

  // Handle login/dashboard click
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBackground}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold navbar-logo ${logoStyle}`}>
              <span className="text-white">Aero</span>
              <span className="text-sustainability">nomy</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div 
              className="relative group" 
              ref={dropdownRef}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => {
                // Add delay before closing dropdown
                setTimeout(() => {
                  setProductsDropdownOpen(false);
                }, 300);
              }}
            >
              <button className={`flex items-center ${linkStyle}`}>
                Products
                <svg 
                  className={`ml-2 w-4 h-4 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`absolute left-0 mt-2 w-80 bg-white/95 dark:bg-dark-surface/95 rounded-lg shadow-xl py-3 z-50 transition-all duration-300 ease-in-out backdrop-blur-md border border-gray-200 dark:border-gray-700 ${productsDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
                <Link 
                  to="/products/analytica" 
                  className="block px-6 py-3 hover:bg-gray-100/80 dark:hover:bg-dark-bg/80 transition-colors rounded-md mx-2"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-navy dark:text-white">Aeronomics Analytica</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">AI-powered price forecasting & analytics</div>
                    </div>
                  </div>
                </Link>
                <Link 
                  to="/products/safpro" 
                  className="block px-6 py-3 hover:bg-gray-100/80 dark:hover:bg-dark-bg/80 transition-colors rounded-md mx-2 mt-1"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-navy dark:text-white">SAF-PRO Platform</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Procurement & risk management solutions</div>
                    </div>
                  </div>
                </Link>
                <Link 
                  to="/products/safsuite" 
                  className="block px-6 py-3 hover:bg-gray-100/80 dark:hover:bg-dark-bg/80 transition-colors rounded-md mx-2 mt-1"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-navy dark:text-white">SAF-Suite Enterprise</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">End-to-end decarbonization infrastructure</div>
                    </div>
                  </div>
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link 
                  to="/products" 
                  className="block px-6 py-3 hover:bg-gray-100/80 dark:hover:bg-dark-bg/80 transition-colors rounded-md mx-2"
                >
                  <div className="font-medium text-sustainability flex items-center">
                    View All Products
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            
            <a href="#features" onClick={scrollToFeatures} className={linkStyle}>
              Features
            </a>
            <Link to="/about" className={linkStyle}>
              About Us
            </Link>
            <Link to="/resources" className={linkStyle}>
              Resources
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" onClick={handleLoginClick} className={linkStyle}>
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={onRequestDemo} 
                className={`btn-primary ${buttonStyle}`}
              >
                Request Demo
              </button>
            </motion.div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${textStyle}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm pb-4 px-4">
          <div className="flex flex-col space-y-4 pt-2 pb-3">
            {/* Products submenu for mobile */}
            <div className="border-l-4 border-sustainability pl-3">
              <div className="text-navy dark:text-dark-text font-medium mb-2">Products</div>
              <Link to="/products/analytica" 
                className="block text-sm text-navy hover:text-sustainability py-1 dark:text-dark-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                Aeronomics Analytica
              </Link>
              <Link to="/products/safpro" 
                className="block text-sm text-navy hover:text-sustainability py-1 dark:text-dark-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                SAF-PRO Platform
              </Link>
              <Link to="/products/safsuite" 
                className="block text-sm text-navy hover:text-sustainability py-1 dark:text-dark-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                SAF-Suite Enterprise
              </Link>
              <Link to="/products" 
                className="block text-sm text-sustainability font-medium py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                View All Products →
              </Link>
            </div>
            
            <a 
              href="#features" 
              onClick={(e) => {
                scrollToFeatures(e);
                setMobileMenuOpen(false);
              }}
              className="block text-navy hover:text-sustainability py-2 border-b border-gray-200 dark:text-dark-text dark:border-gray-700"
            >
              Features
            </a>
            <Link 
              to="/about" 
              className="block text-navy hover:text-sustainability py-2 border-b border-gray-200 dark:text-dark-text dark:border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/resources" 
              className="block text-navy hover:text-sustainability py-2 border-b border-gray-200 dark:text-dark-text dark:border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            
            <div className="pt-2">
              <div className="flex flex-col space-y-3">
                <a 
                  href="#" 
                  onClick={(e) => {
                    handleLoginClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="block text-navy hover:text-sustainability py-2 text-center border border-gray-200 rounded-lg dark:text-dark-text dark:border-gray-700"
                >
                  {isLoggedIn ? 'Dashboard' : 'Login'}
                </a>
                <button 
                  onClick={() => {
                    onRequestDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-primary w-full"
                >
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 