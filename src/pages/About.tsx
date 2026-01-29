import { motion } from 'framer-motion';

const About = () => {
  const missionValues = [
    {
      title: 'Accelerate Adoption',
      description: 'Making sustainable aviation fuel accessible to airlines, producers, and stakeholders worldwide through innovative technology and transparent processes.'
    },
    {
      title: 'Compliance First',
      description: 'Building trust through verified, audit-ready infrastructure that ensures regulatory adherence across 30+ global frameworks.'
    },
    {
      title: 'Real-Time Intelligence',
      description: 'Empowering stakeholders with data-driven insights, advanced analytics, and real-time market intelligence for informed decision making.'
    },
    {
      title: 'Simplify Complexity',
      description: 'Streamlining intricate regulatory processes, certification workflows, and multi-party transactions into intuitive, efficient systems.'
    },
    {
      title: 'Unified Ecosystem',
      description: 'Creating a single platform that connects the entire SAF value chain—from producers to airlines to regulators.'
    },
    {
      title: 'Carbon Neutral Future',
      description: 'Driving the aviation industry toward environmental sustainability through measurable impact and transparent accountability.'
    }
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(10, 35, 66, 1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(10, 35, 66, 1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-sustainability/10 rounded-full">
                <div className="w-2 h-2 bg-sustainability rounded-full animate-pulse" />
                <span className="text-sustainability text-sm font-semibold uppercase tracking-wider">About Aeronomy</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy mb-6 leading-tight">
                Building the Future of<br />Sustainable Aviation
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                We're creating the infrastructure for transparent, efficient, and compliant sustainable aviation fuel markets—connecting producers, airlines, and regulators on a single platform.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://calendly.com/manthan-sharma-aeronomy/30min" target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-4 bg-sustainability text-white font-semibold rounded-lg hover:bg-sustainability-dark transition-colors shadow-lg hover:shadow-xl">
                    Schedule a Call
                  </button>
                </a>
                <a href="#mission">
                  <button className="px-8 py-4 bg-white text-navy font-semibold rounded-lg border-2 border-gray-200 hover:border-sustainability transition-colors">
                    Our Mission
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Our Mission</h2>
              <div className="w-20 h-1 bg-sustainability mx-auto mb-6" />
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transforming sustainable aviation fuel procurement through technology, transparency, and trust
              </p>
            </motion.div>

            {/* Mission Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {missionValues.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="h-full p-6 bg-white border border-gray-200 rounded-xl hover:border-sustainability/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sustainability/10 to-sky-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-2 h-2 bg-sustainability rounded-full" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-navy mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Team</h2>
            <div className="w-20 h-1 bg-sustainability mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guided by expertise in aviation, technology, and sustainability
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="max-w-md w-full">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <img
                      className="w-full h-full object-cover object-top"
                      src="/images/manny.png"
                      alt="Manthan Sharma"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Info Container */}
                  <div className="p-8">
                    <div className="mb-4">
                      <div className="text-sustainability text-sm font-semibold uppercase tracking-wider mb-2">
                        Founder
                      </div>
                      <h3 className="text-3xl font-bold text-navy mb-3">
                        Manthan Sharma
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Leading Aeronomy's mission to revolutionize sustainable aviation fuel procurement through innovative technology, transparent processes, and industry-first compliance infrastructure.
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                      <a 
                        href="https://www.linkedin.com/in/manthan-sharma-958372213/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-sustainability transition-colors duration-200"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-sustainability transition-colors duration-200"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        <span className="text-sm font-medium">Twitter</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(white 1px, transparent 1px),
              linear-gradient(90deg, white 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <div className="w-20 h-1 bg-sustainability mx-auto mb-6" />
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Partner with us to build the future of sustainable aviation. Explore collaboration opportunities, career openings, or schedule a platform demo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://calendly.com/manthan-sharma-aeronomy/30min" target="_blank" rel="noopener noreferrer">
                <button className="w-full sm:w-auto px-8 py-4 bg-sustainability text-white font-semibold rounded-lg hover:bg-sustainability-dark transition-colors shadow-lg hover:shadow-xl">
                  Schedule a Call
                </button>
              </a>
              <a href="https://calendly.com/manthan-sharma-aeronomy/30min" target="_blank" rel="noopener noreferrer">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Explore Careers
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
