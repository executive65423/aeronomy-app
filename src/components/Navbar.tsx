import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  onRequestDemo: () => void;
}

// Navigation items configuration with preview content
const NAV_ITEMS = [
  { 
    label: 'Features', 
    href: '#features', 
    isAnchor: true,
    preview: {
      title: 'Platform Features',
      description: 'Discover comprehensive tools for SAF procurement, compliance, and analytics.',
      highlights: [
        'AI-Driven Price Forecasting',
        'Automated Compliance Reporting',
        'Dynamic Hedging Solutions',
        'Advanced Analytics & Insights'
      ],
      image: '/images/solution.jpg'
    }
  },
  { 
    label: 'View Solutions', 
    href: '/solutions',
    preview: {
      title: 'Comprehensive Solution Modules',
      description: 'Enterprise-ready modules covering onboarding, procurement, compliance, and more.',
      highlights: [
        'Producer Onboarding & Compliance',
        'RFQ and Procurement Marketplace',
        'Contracting & PO Management',
        'Emissions Accounting & Reporting'
      ],
      image: '/images/data.jpg'
    }
  },
  { 
    label: 'About Us', 
    href: '/about',
    preview: {
      title: 'About Aeronomy',
      description: 'Pioneering solutions for sustainable aviation fuel management and procurement.',
      highlights: [
        '15% Average cost reduction',
        '$4.2B SAF transactions facilitated',
        '30+ Global regulatory frameworks',
        'Led by aviation experts'
      ],
      image: '/images/experts.jpeg'
    }
  },
  { 
    label: 'Newsletter', 
    href: '/newsletter',
    preview: {
      title: 'Joint Press Release: Yoki Green Energy & Aeronomy Partnership',
      description: 'Partnership to enable 50,000 metric tons of SAF offtake from 2027. Strategic collaboration combines Yoki\'s committed volumes with Aeronomy\'s compliance-grade procurement infrastructure.',
      highlights: [
        '50,000 metric tons FT-SPK SAF committed',
        'Supply ready for offtake from 2027',
        'Structured supply visibility for buyers',
        'Compliance-grade documentation workflows'
      ],
      image: '/images/pr.png'
    }
  }
];

const Navbar = ({ onRequestDemo }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Check if current page has light theme (needs dark navbar)
  const lightThemedPages = ['/solutions', '/newsletter', '/about', '/privacy', '/terms', '/cookies'];
  const isLightPage = lightThemedPages.some(page => location.pathname.startsWith(page));

  // Styles - Adaptive based on page theme
  const logoStyle = 'dynamic-island-logo';
  const logoSize = isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl';
  const linkStyle = 'nav-island text-navy/90 hover:text-navy px-2 whitespace-nowrap';
  const linkSize = isScrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base';
  const buttonStyle = 'bg-navy hover:bg-navy-dark text-white border border-navy';
  const buttonSize = isScrolled ? 'px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm' : 'px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (!isHomePage) {
      window.location.href = '/#features';
      return;
    }
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'https://app.aeronomy.co';
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Get preview content for hovered item
  const previewContent = hoveredItem 
    ? NAV_ITEMS.find(item => item.label === hoveredItem)?.preview 
    : null;

  return (
    <>
      {/* 
        Main Container 
        - Dark themed navbar for logo consistency
        - Smooth expansion with careful timing
      */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 sm:pt-4 px-2 sm:px-4"
        initial={false}
        animate={{
          paddingTop: isHovered ? 0 : (isScrolled ? 8 : 16),
          paddingLeft: isHovered ? 0 : 8,
          paddingRight: isHovered ? 0 : 8,
        }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredItem(null);
        }}
      >
        {/* The "Island" / Background - Adaptive Theme */}
        <motion.div
          className={`${isLightPage ? 'bg-navy' : 'bg-navy/95'} backdrop-blur-2xl shadow-2xl border border-navy-dark/50 overflow-hidden relative w-full`}
          initial={false}
          animate={{
            width: isHovered ? '100vw' : (isScrolled ? '96%' : '95%'),
            maxWidth: isHovered ? '100vw' : (isScrolled ? '1100px' : '1400px'),
            height: isHovered ? '85vh' : (isScrolled ? '68px' : '72px'),
            borderRadius: isHovered ? 0 : 9999,
          }}
          transition={{ 
            duration: 1,
            ease: [0.19, 1, 0.22, 1] // Very smooth ease-out
          }}
        >
          {/* 
            Collapsed View (Horizontal) - Dark Theme
            - Smooth fade out with careful timing
          */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-8"
            animate={{ 
              opacity: isHovered ? 0 : 1, 
              pointerEvents: isHovered ? 'none' : 'auto',
            }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 z-50">
              <span className={`${logoSize} font-bold navbar-logo ${logoStyle}`}>
                <span className="text-white">Aero</span>
                <span className="text-sustainability">nomy</span>
              </span>
            </Link>

            {/* Desktop Horizontal Links */}
            <div className={`hidden lg:flex items-center ${isScrolled ? 'gap-x-4' : 'gap-x-6'}`}>
              {NAV_ITEMS.map((item) => (
                item.isAnchor ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={scrollToFeatures}
                    className={`${linkSize} text-white/90 hover:text-white px-1.5 whitespace-nowrap transition-colors duration-200`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`${linkSize} text-white/90 hover:text-white px-1.5 whitespace-nowrap transition-colors duration-200`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* Right Actions - Desktop & Tablet */}
            <div className={`hidden lg:flex items-center ${isScrolled ? 'gap-x-3' : 'gap-x-4'} lg:ml-3 lg:pl-3 lg:border-l lg:border-white/20 flex-shrink-0`}>
              <a href="#" onClick={handleLoginClick} className={`${linkSize} text-white/90 hover:text-white px-2 transition-colors duration-200 whitespace-nowrap`}>
                {isLoggedIn ? 'Dashboard' : 'Login'}
              </a>
              <motion.a 
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${buttonSize} bg-sustainability hover:bg-sustainability/90 text-white border-0 rounded-full font-semibold transition-all shadow-md hover:shadow-lg inline-block text-center whitespace-nowrap min-w-[120px]`}
              >
                Request Demo
              </motion.a>
            </div>

            {/* Tablet Request Demo Button */}
            <div className="hidden md:flex lg:hidden items-center ml-auto">
              <motion.a 
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-xs sm:text-sm bg-sustainability hover:bg-sustainability/90 text-white border-0 rounded-full font-semibold transition-all shadow-md hover:shadow-lg inline-block text-center whitespace-nowrap"
              >
                Request Demo
              </motion.a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center z-50 ml-3">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md focus:outline-none text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </motion.div>

          {/* 
            Expanded View (Split Layout) - Dark Theme
            - Smooth fade in with careful timing
          */}
          <motion.div
            className="w-full h-full flex pt-8 px-12 pb-8 bg-gradient-to-br from-navy via-navy to-navy-dark"
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* LEFT COLUMN: Logo & Vertical Nav */}
            <div className="w-1/3 flex flex-col border-r border-white/10 pr-8">
              {/* Logo in Expanded View - Consistent styling */}
              <div className="mb-10 pl-2">
                <Link to="/" className="flex items-center">
                  <span className="text-3xl font-bold navbar-logo">
                    <span className="text-white">Aero</span>
                    <span className="text-sustainability">nomy</span>
                  </span>
                </Link>
              </div>

              {/* Vertical Menu */}
              <div className="flex-1 flex flex-col gap-2">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0, 
                      x: isHovered ? 0 : -20 
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: isHovered ? 0.6 + (idx * 0.1) : 0,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    className={`
                      px-6 py-4 rounded-xl text-lg font-medium cursor-pointer
                      transition-all duration-300 ease-out
                      ${hoveredItem === item.label 
                        ? 'bg-sustainability text-white shadow-lg shadow-sustainability/20 translate-x-2' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {item.isAnchor ? (
                      <a href={item.href} onClick={scrollToFeatures} className="block w-full h-full">
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} className="block w-full h-full">
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Actions */}
              <motion.div 
                className="mt-auto space-y-3 pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? 0 : 20 
                }}
                transition={{ duration: 0.6, delay: 1, ease: [0.19, 1, 0.22, 1] }}
              >
                <a 
                  href="#" 
                  onClick={handleLoginClick} 
                  className="flex items-center justify-between px-6 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white font-medium transition-all duration-200"
                >
                  <span>Log In / Dashboard</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </a>
                <a 
                  href="https://calendly.com/manthan-sharma-aeronomy/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-6 py-4 rounded-xl bg-sustainability hover:bg-sustainability/90 text-white font-bold shadow-lg shadow-sustainability/20 hover:shadow-xl hover:shadow-sustainability/30 hover:scale-[1.02] transition-all duration-200"
                >
                  <span>Request Demo</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Preview Content - Dark Theme */}
            <div className="w-2/3 pl-12 pt-4">
              <AnimatePresence mode="wait">
                {previewContent ? (
                  <motion.div
                    key={hoveredItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="h-full flex flex-col"
                  >
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl mb-8 group border border-white/10">
                      <img 
                        src={previewContent.image} 
                        alt={previewContent.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/50 to-transparent flex items-end p-8">
                        <h3 className="text-3xl font-bold text-white">{previewContent.title}</h3>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-2xl">
                        {previewContent.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {previewContent.highlights.map((highlight, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              delay: 0.2 + (idx * 0.08),
                              duration: 0.4,
                              ease: [0.19, 1, 0.22, 1]
                            }}
                            className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sustainability/30 transition-all duration-300"
                          >
                            <div className="w-2 h-2 rounded-full bg-sustainability mr-3" />
                            <span className="text-white/90 font-medium">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center">
                      <svg className="w-20 h-20 mx-auto mb-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      <p className="text-lg text-white/50 font-medium">Hover over a navigation item</p>
                      <p className="text-sm text-white/30 mt-2">to preview details</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay - Dark Theme */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy pt-20 sm:pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6 max-w-md mx-auto">
              {NAV_ITEMS.map((item) => (
                item.isAnchor ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      scrollToFeatures(e);
                      setMobileMenuOpen(false);
                    }}
                    className="text-2xl font-bold text-white hover:text-sustainability transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-sustainability transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="h-px bg-white/20 my-4" />
              <a 
                href="#" 
                onClick={handleLoginClick} 
                className="text-xl font-medium text-white/90 hover:text-white transition-colors"
              >
                {isLoggedIn ? 'Dashboard' : 'Login'}
              </a>
              <a 
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-sustainability hover:bg-sustainability/90 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg transition-colors"
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
