import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SAFSuite = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-navy-dark relative"
        style={{
          backgroundImage: "url('/images/aviation.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-[1px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              <span className="text-sustainability">SAF-Suite</span> Enterprise
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              End-to-End Decarbonization for Aviation Enterprises. Our most comprehensive solution combining Analytica and SAF-PRO with advanced enterprise capabilities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Request Enterprise Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Explore Features
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-navy dark:text-white">
            Comprehensive SAF Management
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-2/5">
                  <div className="bg-sustainability/10 p-6 rounded-full inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <h3 className="text-2xl font-bold mb-4 text-navy dark:text-white">Unified Dashboard</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Streamline your operations with our comprehensive dashboard that brings together procurement, compliance, and bond performance in a single integrated view.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Real-time monitoring of all SAF metrics</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">C-suite ready reporting with one click</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row-reverse gap-8 items-center"
              >
                <div className="md:w-2/5">
                  <div className="bg-sustainability/10 p-6 rounded-full inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <h3 className="text-2xl font-bold mb-4 text-navy dark:text-white">Scenario Planning</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Make informed decisions with our advanced simulation tools that let you model SAF adoption, fleet upgrades, and regulatory policy impacts.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Forecast ROI across multiple scenarios</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Adaptive risk modeling for changing regulations</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-2/5">
                  <div className="bg-sustainability/10 p-6 rounded-full inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <h3 className="text-2xl font-bold mb-4 text-navy dark:text-white">Cross-Product Synergy</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Leverage the power of combined products with intelligent automation that uses Analytica data to structure SAF-PRO bonds and swaps.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">AI-driven timing for financial instruments</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Automated optimization across all SAF activities</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Integration */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-navy dark:text-white">
            Complete Product Integration
          </h2>
          
          <div className="max-w-5xl mx-auto relative">
            {/* Center connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-sustainability/30 -translate-x-1/2 z-0"></div>
            
            <div className="relative z-10">
              {/* SAF-Suite */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-12"
              >
                <div className="bg-navy w-64 h-64 rounded-full flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="bg-sustainability/20 p-3 rounded-full inline-block mb-2">
                      <svg className="w-8 h-8 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">SAF-Suite</h3>
                    <p className="text-white/80 text-sm">Enterprise Integration Platform</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Product Connections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Analytica */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-lg shadow-md p-6 dark:bg-dark-card"
                >
                  <div className="mb-4 flex items-center">
                    <div className="bg-sustainability/10 p-2 rounded-lg mr-3">
                      <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-navy dark:text-white">Aeronomics Analytica</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Advanced AI price forecasting and market intelligence, now with enhanced enterprise capabilities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Fleet-wide emissions tracking</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Custom AI models for your routes</span>
                    </li>
                  </ul>
                </motion.div>
                
                {/* SAF-PRO */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6 dark:bg-dark-card"
                >
                  <div className="mb-4 flex items-center">
                    <div className="bg-sustainability/10 p-2 rounded-lg mr-3">
                      <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-navy dark:text-white">SAF-PRO Platform</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Financial solutions enhanced with enterprise-grade structuring tools and expanded investor access.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Larger-scale bond structuring</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-sustainability mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">Multi-year hedging programs</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enterprise Features */}
      <section className="py-16 bg-navy relative"
        style={{
          backgroundImage: "url('/images/plane.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-navy/80 backdrop-blur-[1px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">
            Enterprise-Grade Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
            >
              <div className="text-sustainability mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Advanced Security</h3>
              <p className="text-white/80">Enterprise-grade security with single sign-on and role-based access controls.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
            >
              <div className="text-sustainability mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Regulatory Reporting</h3>
              <p className="text-white/80">Automated compliance reports for CORSIA, EU ETS, and other global frameworks.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
            >
              <div className="text-sustainability mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Custom Integrations</h3>
              <p className="text-white/80">Connect with your existing ERP, finance, and fleet management systems.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
            >
              <div className="text-sustainability mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">24/7 Support</h3>
              <p className="text-white/80">Dedicated technical account managers and round-the-clock enterprise support.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy dark:text-white">
              Ready for Enterprise-Grade SAF Management?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Schedule a consultation with our enterprise team to discover how SAF-Suite can transform your airline's approach to sustainable aviation fuel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://calendly.com/aeronomy/enterprise-demo" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Schedule Enterprise Demo
                </motion.button>
              </a>
              <a href="mailto:enterprise@aeronomy.com" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Contact Enterprise Sales
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SAFSuite 