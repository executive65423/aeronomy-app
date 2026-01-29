import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  onRequestDemo: () => void;
}

const NAV_ITEMS = [
  { label: 'Features', href: '#features', isAnchor: true },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About Us', href: '/about' },
  { label: 'Newsletter', href: '/newsletter' }
];

const Navbar = ({ onRequestDemo }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Check if current page has light theme (needs dark navbar)
  const lightThemedPages = ['/solutions', '/newsletter', '/about', '/privacy', '/terms', '/cookies'];
  const isLightPage = lightThemedPages.some(page => location.pathname.startsWith(page));

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

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        initial={false}
        animate={{
          paddingTop: isScrolled ? 8 : 16,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          className={`${isLightPage ? 'bg-navy' : 'bg-navy/95'} backdrop-blur-xl shadow-xl flex items-center justify-between`}
          initial={false}
          animate={{
            width: isScrolled ? '95%' : '92%',
            maxWidth: isScrolled ? '1000px' : '1200px',
            height: isScrolled ? 56 : 64,
            borderRadius: 9999,
            paddingLeft: isScrolled ? 20 : 28,
            paddingRight: isScrolled ? 20 : 28,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <motion.span 
              className="font-bold"
              animate={{ fontSize: isScrolled ? '1.25rem' : '1.5rem' }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white">Aero</span>
              <span className="text-sustainability">nomy</span>
            </motion.span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-x-6">
            {NAV_ITEMS.map((item) => (
              item.isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={scrollToFeatures}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-x-4 border-l border-white/20 pl-6 ml-6">
            <a 
              href="#" 
              onClick={handleLoginClick} 
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
            >
              {isLoggedIn ? 'Dashboard' : 'Login'}
            </a>
            <motion.a 
              href="https://calendly.com/manthan-sharma-aeronomy/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 bg-sustainability hover:bg-sustainability/90 text-white text-sm rounded-full font-semibold transition-colors shadow-md"
            >
              Request Demo
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy pt-24 px-6 lg:hidden overflow-y-auto"
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
