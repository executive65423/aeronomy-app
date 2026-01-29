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
      modules: [
        { 
          icon: 'FiTrendingUp',
          title: 'AI-Driven Price Forecasting',
          audience: 'Airlines and producers',
          purpose: 'Predict market trends and optimize procurement timing.',
          capabilities: ['Real-time market analysis', 'Historical data modeling', 'Price volatility alerts']
        },
        { 
          icon: 'FiShield',
          title: 'Automated Compliance',
          audience: 'All stakeholders',
          purpose: 'Ensure regulatory adherence across jurisdictions.',
          capabilities: ['30+ framework support', 'Auto-generated reports', 'Audit trail management']
        },
        { 
          icon: 'FiBarChart2',
          title: 'Advanced Analytics',
          audience: 'Decision makers',
          purpose: 'Data-driven insights for strategic planning.',
          capabilities: ['Custom dashboards', 'Emissions tracking', 'Performance metrics']
        },
        {
          icon: 'FiCheck',
          title: 'Quality Assurance',
          audience: 'Producers',
          purpose: 'Maintain high standards with automated checks.',
          capabilities: ['Batch validation', 'Spec verification', 'Digital certificates']
        }
      ]
    }
  },
  { 
    label: 'View Solutions', 
    href: '/solutions',
    preview: {
      title: 'Solution Modules',
      modules: [
        { 
          icon: 'FiCheck',
          title: 'Producer Onboarding and Compliance',
          audience: 'SAF producers',
          purpose: 'Structured onboarding with region and pathway specific checks.',
          capabilities: ['Dynamic forms by pathway', 'Certificate validation', 'Facility registry']
        },
        { 
          icon: 'FiShoppingCart',
          title: 'RFQ and Procurement Marketplace',
          audience: 'Buyers and producers',
          purpose: 'Standardized tendering for SAF supply.',
          capabilities: ['RFQ wizard with CI targets', 'Supplier notification', 'Eligibility gating']
        },
        { 
          icon: 'FiFileText',
          title: 'Contracting and PO Management',
          audience: 'Buyers and producers',
          purpose: 'Generate purchase orders and contract exhibits.',
          capabilities: ['Templated terms', 'Milestones tracking', 'Change order approvals']
        },
        {
          icon: 'FiPackage',
          title: 'Book and Claim Allocation',
          audience: 'Airlines',
          purpose: 'Allocate environmental attributes to flights.',
          capabilities: ['Batch allocations', 'Unit enforcement', 'Real-time balance']
        }
      ]
    }
  },
  { 
    label: 'About Us', 
    href: '/about',
    preview: {
      title: 'Our Mission',
      modules: [
        { 
          icon: 'FiTarget',
          title: 'Accelerate SAF Adoption',
          audience: 'Global aviation industry',
          purpose: 'Making sustainable aviation fuel accessible worldwide.',
          capabilities: ['Market access', 'Price transparency', 'Supply discovery']
        },
        { 
          icon: 'FiShield',
          title: 'Compliance-First Infrastructure',
          audience: 'Airlines and producers',
          purpose: 'Build trust through verified, audit-ready systems.',
          capabilities: ['Regulatory alignment', 'Certificate verification', 'Audit trails']
        },
        { 
          icon: 'FiActivity',
          title: 'Real-Time Intelligence',
          audience: 'All stakeholders',
          purpose: 'Empower decisions with data and analytics.',
          capabilities: ['Live market data', 'Supply tracking', 'Performance insights']
        },
        {
          icon: 'FiUsers',
          title: 'Unified Ecosystem',
          audience: 'Industry wide',
          purpose: 'Connecting all participants in one platform.',
          capabilities: ['Seamless collaboration', 'Standardized flows', 'Network effects']
        }
      ]
    }
  },
  { 
    label: 'Newsletter', 
    href: '/newsletter',
    preview: {
      title: 'Partnership Announcement',
      modules: [
        { 
          icon: 'FiUsers',
          title: 'Yoki Green Energy × Aeronomy',
          audience: 'Strategic Partnership',
          purpose: 'A landmark collaboration to enable scalable SAF procurement.',
          capabilities: ['Joint venture', 'Ecosystem integration', 'Market expansion']
        },
        { 
          icon: 'FiPackage',
          title: '50,000 Metric Tons Committed',
          audience: 'Volume Commitment',
          purpose: 'Secured supply of FT-SPK SAF produced from biomass.',
          capabilities: ['50k MT volume', 'FT-SPK pathway', 'Biomass feedstock']
        },
        { 
          icon: 'FiCalendar',
          title: 'Supply Available From 2027',
          audience: 'Timeline',
          purpose: 'Production and offtake readiness timeline set for 2027.',
          capabilities: ['2027 start date', 'Long-term supply', 'Future readiness']
        },
        {
          icon: 'FiCheckCircle',
          title: 'Verified & Auditable',
          audience: 'Compliance',
          purpose: 'Full traceability and compliance managed via Aeronomy platform.',
          capabilities: ['Audit-ready docs', 'Sustainability proof', 'Digital chain of custody']
        }
      ]
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
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredItem(null);
        }}
      >
        {/* The "Island" / Background - Adaptive Theme */}
        <motion.div
          className={`${isLightPage ? 'bg-navy' : 'bg-navy/95'} backdrop-blur-2xl shadow-2xl relative w-full`}
          style={{ overflow: 'hidden' }}
          initial={false}
          animate={{
            width: isHovered ? '100vw' : (isScrolled ? '96%' : '95%'),
            maxWidth: isHovered ? '100vw' : (isScrolled ? '1100px' : '1400px'),
            height: isHovered ? '85vh' : (isScrolled ? '68px' : '72px'),
            borderRadius: isHovered ? 0 : 9999,
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {/* 
            Collapsed View (Horizontal) - Dark Theme
            - Fades in as navbar collapses
          */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-8"
            animate={{ 
              opacity: isHovered ? 0 : 1, 
              pointerEvents: isHovered ? 'none' : 'auto',
            }}
            transition={{ 
              duration: 0.35,
              delay: isHovered ? 0 : 0.35,
              ease: "easeOut"
            }}
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
            Expanded View (Split Layout) - Clean split
            - Content revealed as navbar expands
          */}
          <motion.div
            className="absolute inset-0 flex bg-white"
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
            transition={{ 
              duration: isHovered ? 0.3 : 0.35,
              delay: isHovered ? 0.1 : 0,
              ease: "easeInOut"
            }}
          >
            {/* LEFT COLUMN: Logo & Vertical Nav - Navy Background */}
            <div className="w-1/3 flex flex-col pt-8 pl-12 pb-8 pr-8 bg-navy">
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
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0
                    }}
                    transition={{ 
                      duration: isHovered ? 0.25 : 0.2,
                      delay: isHovered ? 0.15 + (idx * 0.03) : 0,
                      ease: "easeInOut"
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
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ 
                  duration: isHovered ? 0.25 : 0.2,
                  delay: isHovered ? 0.3 : 0,
                  ease: "easeInOut"
                }}
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

            {/* RIGHT COLUMN: Preview Content - Solutions-Style Cards */}
            <div className="w-2/3 pt-4 pl-8 pb-4 pr-8 bg-white overflow-y-auto">
              <AnimatePresence mode="wait">
                {previewContent ? (
                  <motion.div
                    key={hoveredItem}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="h-full"
                  >
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05, duration: 0.25 }}
                      className="mb-4"
                    >
                      <h3 className="text-xl font-bold text-navy">
                        {previewContent.title}
                      </h3>
                    </motion.div>

                    {/* Solution Cards - Like Solutions Page */}
                    <div className="grid grid-cols-1 gap-4">
                      {previewContent.modules.map((module: any, idx: number) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 0.08 + (idx * 0.05),
                            duration: 0.25
                          }}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-sustainability/40 transition-all duration-300"
                        >
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {module.icon === 'FiCheck' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
                                  {module.icon === 'FiShield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                                  {module.icon === 'FiShoppingCart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />}
                                  {module.icon === 'FiFileText' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                                  {module.icon === 'FiTrendingUp' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                                  {module.icon === 'FiBarChart2' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                                  {module.icon === 'FiTarget' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />}
                                  {module.icon === 'FiActivity' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                                  {module.icon === 'FiUsers' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                                  {module.icon === 'FiPackage' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
                                  {module.icon === 'FiCheckCircle' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                                  {module.icon === 'FiCalendar' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                                </svg>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-bold text-navy mb-1">
                                {module.title}
                              </h4>
                              <p className="text-xs text-sustainability font-semibold mb-2">
                                {module.audience}
                              </p>
                              <p className="text-sm text-gray-700 mb-3">
                                {module.purpose}
                              </p>
                              
                              {/* Key Capabilities */}
                              <div>
                                <p className="text-xs font-bold text-navy uppercase mb-2">Key Capabilities</p>
                                <ul className="space-y-1">
                                  {module.capabilities.map((cap: string, capIdx: number) => (
                                    <li key={capIdx} className="flex items-start gap-2">
                                      <span className="text-sustainability mt-0.5">•</span>
                                      <span className="text-xs text-gray-600">{cap}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
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
                      <p className="text-base text-gray-300 font-medium mb-1">Hover over a menu item</p>
                      <p className="text-sm text-gray-200">to explore details</p>
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
