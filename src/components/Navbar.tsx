import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  onRequestDemo: () => void;
}

// Navigation items configuration
const NAV_ITEMS = [
  { label: 'Features', href: '#features', isAnchor: true },
  { label: 'View Solutions', href: '/solutions' },
  { label: 'About Us', href: '/about' },
  { label: 'Resources', href: '/resources' }
];

// Product dropdown items
const PRODUCTS = [
  {
    id: 'analytica',
    name: 'Aeronomics Analytica',
    description: 'AI-powered analytics',
    href: '/products/analytica',
    icon: 'chart'
  },
  {
    id: 'safpro',
    name: 'SAF-PRO',
    description: 'Procurement & risk management',
    href: '/products/safpro',
    icon: 'shield'
  },
  {
    id: 'safsuite',
    name: 'SAF Enterprise',
    description: 'Enterprise solutions',
    href: '/products/safsuite',
    icon: 'building'
  }
];

// Icon component for products
const ProductIcon = ({ type }: { type: string }) => {
  const icons = {
    chart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    shield: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    building: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  };
  return icons[type] || icons.chart;
};

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

  // Dynamic island styling - shrinks horizontally when scrolled
  const navbarWidth = isScrolled ? 'max-w-6xl' : 'w-[90%] max-w-[1400px]';
  const navbarPadding = isScrolled ? 'px-8 py-2.5' : 'px-12 py-4';
  const navbarRounded = 'rounded-full';
  const navbarShadow = isScrolled ? 'shadow-lg' : 'shadow-2xl';
  const navbarBackground = 'bg-white/90 backdrop-blur-2xl border border-slate-200';
  
  // Unified dark blue scheme + white text
  const textStyle = 'text-navy';
  const logoStyle = 'dynamic-island-logo';
  const linkStyle = 'nav-island text-navy/90 hover:text-navy px-2 whitespace-nowrap';
  const buttonStyle = 'bg-navy hover:bg-navy-dark text-white border border-navy';
  
  // Font size adjustments for logo when scrolled
  const logoSize = isScrolled ? 'text-xl' : 'text-2xl';
  
  // Button size adjustments when scrolled
  const buttonSize = isScrolled ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base';
  
  // Link size adjustments when scrolled
  const linkSize = isScrolled ? 'text-sm' : 'text-base';

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
    <nav className="fixed w-full z-50 flex justify-center pt-4 px-4 transition-all duration-500">
      <div className={`${navbarWidth} ${navbarPadding} ${navbarRounded} ${navbarShadow} ${navbarBackground} transition-all duration-500 ease-in-out`}>
        <div className="flex justify-between items-center gap-x-4 md:gap-x-6">
          <Link to="/" className="flex items-center">
            <span className={`${logoSize} font-bold navbar-logo ${logoStyle} transition-all duration-500`}>
              <span className="text-navy">Aero</span>
              <span className="text-sustainability">nomy</span>
            </span>
          </Link>
          
          <div className={`hidden md:flex items-center transition-all duration-500 ${isScrolled ? 'gap-x-6' : 'gap-x-10'} whitespace-nowrap`}>
            {NAV_ITEMS.map((item) => (
              item.isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={scrollToFeatures}
                  className={`${linkStyle} ${linkSize} transition-all duration-500`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`${linkStyle} ${linkSize} transition-all duration-300`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          <div className={`hidden md:flex items-center transition-all duration-500 ${isScrolled ? 'gap-x-5' : 'gap-x-7'} md:ml-4 md:pl-4 md:border-l md:border-slate-200`}>
            <a href="#" onClick={handleLoginClick} className={`${linkStyle} ${linkSize} transition-all duration-500`}>
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={onRequestDemo} 
                className={`${buttonSize} ${buttonStyle} rounded-full font-semibold transition-all duration-500 shadow-md hover:shadow-lg`}
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
        <div className="md:hidden bg-gradient-to-br from-sky-100/95 to-blue-50/95 backdrop-blur-xl rounded-3xl mt-4 mx-4 shadow-2xl border border-sky-200 pb-4 px-4">
          <div className="flex flex-col space-y-4 pt-2 pb-3">
            {NAV_ITEMS.map((item) => (
              item.isAnchor ? (
                <a 
                  key={item.label}
                  href={item.href} 
                  onClick={(e) => {
                    scrollToFeatures(e);
                    setMobileMenuOpen(false);
                  }}
                  className="block text-navy hover:text-sky-600 py-2 border-b border-sky-100"
                >
                  {item.label}
                </a>
              ) : (
                <Link 
                  key={item.label}
                  to={item.href} 
                  className="block text-navy hover:text-sky-600 py-2 border-b border-sky-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            
            <div className="pt-2">
              <div className="flex flex-col space-y-3">
                <a 
                  href="#" 
                  onClick={(e) => {
                    handleLoginClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="block text-navy hover:text-sky-600 py-2 text-center border border-sky-200 rounded-xl"
                >
                  {isLoggedIn ? 'Dashboard' : 'Login'}
                </a>
                <button 
                  onClick={() => {
                    onRequestDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-all w-full"
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