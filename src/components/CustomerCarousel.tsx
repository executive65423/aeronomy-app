import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Customer logos configuration
const CUSTOMER_LOGOS = [
  {
    name: 'Yoki Green Energy',
    logo: '/images/yoki.png',
    alt: 'Yoki Green Energy - CIST Technologies'
  },
  // Add more customer logos here as they become available
];

const CustomerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (CUSTOMER_LOGOS.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CUSTOMER_LOGOS.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Grid pattern background - same as other sections */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 35, 66, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 35, 66, 1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Simple Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-wider text-gray-400 font-medium">
              Trusted by Industry Leaders
            </p>
          </motion.div>

          {/* Minimalist Logo Display */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center min-h-[180px]"
          >
            {CUSTOMER_LOGOS.map((customer, index) => (
              <motion.div
                key={customer.name}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  display: currentIndex === index ? 'flex' : 'none'
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute flex flex-col items-center justify-center gap-6"
              >
                <img
                  src={customer.logo}
                  alt={customer.alt}
                  className="max-w-[200px] sm:max-w-[240px] w-auto h-auto object-contain opacity-60"
                />
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  {customer.name}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Simple Navigation Dots (only show if more than 1 customer) */}
          {CUSTOMER_LOGOS.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {CUSTOMER_LOGOS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-navy w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to customer ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerCarousel;
