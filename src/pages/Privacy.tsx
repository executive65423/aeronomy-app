import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Privacy = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-white/90 mb-8">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <div className="text-sm text-white/70">
              <p>Effective Date: January 1, 2024</p>
              <p>Last Updated: January 1, 2024</p>
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
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aeronomy ("we", "our", "us") operates a digital platform that facilitates Sustainable Aviation Fuel (SAF) procurement, financing, and compliance management. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and disclose information when you use our platform or services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">2. Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect information to provide and improve our services, including:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Account Information:</strong> Name, email address, phone number, company, and role.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Usage Data:</strong> Log data, IP addresses, browser type, device identifiers, and cookies.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Transactional Data:</strong> Payment details (processed securely via third-party gateways like Stripe or Razorpay), purchase history, and activity logs.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Documents and Uploads:</strong> Files or data uploaded for compliance or verification purposes.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">3. How We Use Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use your information to:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Deliver and maintain Aeronomy's services.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Verify identity and ensure compliance.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Process payments and manage subscriptions.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Improve platform functionality and user experience.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Communicate updates, product changes, or support responses.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Comply with legal and regulatory obligations (e.g., SAF certification requirements).</div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Sharing and Disclosure */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">4. Data Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell your data. We may share limited data with:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Service Providers:</strong> For hosting, analytics, and payment processing.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Regulatory Authorities:</strong> When required by law.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Business Transfers:</strong> In case of mergers or acquisitions, data may be transferred under confidentiality obligations.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Retention */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">5. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We retain information as long as necessary to provide services or comply with legal obligations. Users can request deletion of their data by contacting{" "}
                  <a href="mailto:privacy@aeronomy.co" className="text-sustainability hover:text-sustainability/80 underline">
                    privacy@aeronomy.co
                  </a>
                  .
                </p>
              </div>

              {/* Security */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">6. Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement encryption, role-based access, and regular audits to protect your data. However, no method of transmission over the Internet is entirely secure.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">7. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your jurisdiction (UK GDPR, Indian DPDP Act, etc.), you may have rights to:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Access, correct, or delete your data.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Withdraw consent at any time.</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Request data portability.</div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* International Data Transfers */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">8. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Data may be stored or processed in other jurisdictions where our servers or service providers are located. We ensure appropriate safeguards in compliance with applicable law.
                </p>
              </div>

              {/* Updates */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">9. Updates</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Privacy Policy periodically. Continued use of Aeronomy constitutes acceptance of the revised policy.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">10. Contact Us</h2>
                <div className="bg-gradient-to-r from-sustainability/10 to-sky-100 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> <a href="mailto:privacy@aeronomy.co" className="text-sustainability hover:text-sustainability/80 underline">privacy@aeronomy.co</a></p>
                    <p><strong>Support:</strong> <a href="mailto:support@aeronomy.co" className="text-sustainability hover:text-sustainability/80 underline">support@aeronomy.co</a></p>
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
            <h2 className="text-3xl font-bold text-navy mb-6">Questions About Your Privacy?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our privacy team is here to help you understand how we protect your data and respect your privacy rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sustainability hover:bg-sustainability/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block text-center"
              >
                Contact Privacy Team
              </a>
              <Link
                to="/terms"
                className="bg-white hover:bg-gray-50 text-navy border border-navy px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Read Terms of Service
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

export default Privacy;
