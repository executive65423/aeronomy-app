import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SAFPRO = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-navy relative"
        style={{
          backgroundImage: "url('/images/plane.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-navy/70 backdrop-blur-[1px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              <span className="text-sustainability">SAF-PRO</span> Platform
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              Our comprehensive SAF procurement and risk management platform with dynamic hedging capabilities.
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
                Request Demo
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

      {/* Key Features */}
      <section className="py-16 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-navy dark:text-white">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card hover:translate-y-[-5px]"
            >
              <div className="flex items-center justify-center mb-4 text-sustainability">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-navy dark:text-white">Dynamic Hedging</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">Lock in prices with SAF swaps, sharing risk with producers.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card hover:translate-y-[-5px]"
            >
              <div className="flex items-center justify-center mb-4 text-sustainability">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-navy dark:text-white">ABS Financing</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">Transform future SAF purchases into immediate working capital.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card hover:translate-y-[-5px]"
            >
              <div className="flex items-center justify-center mb-4 text-sustainability">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-navy dark:text-white">Supply Chain Optimization</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">Connect with vetted SAF suppliers for streamlined procurement.</p>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/products/safpro/features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                See All Features
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-navy dark:text-white">
            Benefits of SAF-PRO
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-md p-6 dark:bg-dark-card"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-sustainability/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">Cost Reduction</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Lower SAF procurement costs by 15-20% through strategic timing and dynamic hedging.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 dark:bg-dark-card"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-sustainability/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">Risk Mitigation</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Protect against SAF price volatility and ensure stable, predictable fuel costs.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6 dark:bg-dark-card"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-sustainability/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">Working Capital Release</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Unlock capital through innovative ABS financing tied to future SAF purchases.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-lg shadow-md p-6 dark:bg-dark-card"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-sustainability/20 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">ESG Compliance</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Streamline regulatory compliance and ESG reporting with built-in documentation.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Transform Your SAF Procurement Strategy
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Schedule a demo to see how SAF-PRO can optimize your sustainable fuel procurement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="https://calendly.com/manthan-sharma-aeronomy/30min" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Schedule a Demo
                </motion.button>
              </a>
              <a href="mailto:sales@aeronomy.com" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Contact Sales
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SAFPRO 