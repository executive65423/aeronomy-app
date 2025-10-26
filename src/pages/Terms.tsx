import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Terms = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-white/90 mb-8">
              Please read these terms carefully before using our platform and services.
            </p>
            <div className="text-sm text-white/70">
              <p>Effective Date: January 1, 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg max-w-none"
            >
              {/* Acceptance of Terms */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By using Aeronomy ("the Platform"), you agree to these Terms of Service ("Terms"). If you disagree, do not use the Platform.
                </p>
              </div>

              {/* Services */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">2. Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aeronomy provides a digital platform for SAF procurement, financing, certification, and compliance tracking. We may modify, suspend, or discontinue parts of the service at any time.
                </p>
              </div>

              {/* Accounts */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">3. Accounts</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You must be 18 years or older and provide accurate information to create an account. You are responsible for maintaining confidentiality of your credentials and all activities under your account.
                </p>
              </div>

              {/* Payments */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">4. Payments</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Access to certain features may require payment. All payments are processed via secure third-party gateways. Aeronomy is not liable for transaction failures or fees charged by payment processors.
                </p>
              </div>

              {/* Use Restrictions */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">5. Use Restrictions</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Use the platform for unlawful purposes.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Attempt to hack, reverse engineer, or disrupt the system.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Share login credentials or access tokens.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Upload content that violates intellectual property rights or data protection laws.</div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">6. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All platform content, including the Aeronomy logo, software, design, and documentation, is owned or licensed by Aeronomy. You may not copy, distribute, or modify our intellectual property without permission.
                </p>
              </div>

              {/* Compliance & Data Responsibility */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">7. Compliance & Data Responsibility</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You are responsible for ensuring your organization's compliance with applicable SAF regulations when using Aeronomy. We provide tools to facilitate compliance but do not assume legal liability for data accuracy or submission.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">8. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aeronomy is not liable for indirect, incidental, or consequential damages arising from use of the platform. Our total liability shall not exceed the amount paid by you in the preceding 12 months.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">9. Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may suspend or terminate your account if you breach these Terms or misuse the platform. Upon termination, your access and license rights will cease immediately.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">10. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms are governed by and construed in accordance with the laws of India and the United Kingdom. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, India.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">11. Contact</h2>
                <div className="bg-gradient-to-r from-sustainability/10 to-sky-100 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For questions or complaints, contact:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> <a href="mailto:support@aeronomy.co" className="text-sustainability hover:text-sustainability/80 underline">support@aeronomy.co</a></p>
                    <p><strong>Address:</strong> [Insert Company Registered Address]</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-navy mb-6">Have Questions?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our legal team is available to help clarify any terms or answer questions about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-sustainability hover:bg-sustainability/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Legal Team
              </Link>
              <Link
                to="/privacy"
                className="bg-white hover:bg-gray-50 text-navy border border-navy px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Read Privacy Policy
              </Link>
              <Link
                to="/cookies"
                className="bg-white hover:bg-gray-50 text-navy border border-navy px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
