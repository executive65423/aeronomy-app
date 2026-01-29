import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">About Aeronomy</h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
              Pioneering solutions for sustainable aviation fuel management and procurement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-white" style={{ 
        backgroundImage: 'url(/images/new.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="absolute inset-0 bg-white/75"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-navy">Our Mission</h2>
              <p className="text-lg text-gray-700">
                At Aeronomy, we're dedicated to accelerating the aviation industry's transition to sustainable fuels through innovative financial and analytics solutions. Our platform bridges the gap between airlines, producers, and investors to make sustainable aviation fuel accessible, affordable, and financially viable for all stakeholders.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 p-4 sm:p-6 rounded-xl"
              >
                <div className="text-sustainability text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">15%</div>
                <p className="text-gray-700 text-sm sm:text-base">Average procurement cost reduction for our airline partners</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="text-sustainability text-4xl font-bold mb-3">$4.2B</div>
                <p className="text-gray-700">SAF transactions facilitated through our platform</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="text-sustainability text-4xl font-bold mb-3">30+</div>
                <p className="text-gray-700">Global regulatory frameworks supported</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-navy">Our Team</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Led by aviation and technology experts, our team combines decades of industry experience with cutting-edge data science and financial engineering.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-md overflow-hidden relative w-80"
              >
                <div className="relative h-96">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/manthan.jpg"
                    alt="Manthan Sharma"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="uppercase tracking-wide text-sm text-white font-semibold">
                      Founder
                    </div>
                    <h3 className="mt-1 text-xl font-medium leading-tight text-white">
                      Manthan Sharma
                    </h3>
                    <div className="mt-3 flex space-x-3">
                      <a 
                        href="https://www.linkedin.com/in/manthan-sharma-958372213/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-sustainability"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-sustainability"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-sustainability text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Join the Sustainable Aviation Revolution</h2>
            <p className="text-lg mb-8">
              We're always looking for talented individuals who are passionate about transforming the aviation industry. Check out our open positions or contact us to learn more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <a href="https://calendly.com/manthan-sharma-aeronomy/30min" target="_blank" rel="noopener noreferrer">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-sustainability font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors text-sm sm:text-base">
                  View Careers
                </button>
              </a>
              <a href="https://calendly.com/manthan-sharma-aeronomy/30min" target="_blank" rel="noopener noreferrer">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-sustainability-dark text-white font-semibold rounded-lg shadow-md hover:bg-sustainability-dark/90 transition-colors text-sm sm:text-base">
                  Contact Us
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 