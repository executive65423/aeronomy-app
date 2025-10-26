import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cookies = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-xl text-white/90 mb-8">
              Learn about how we use cookies and similar technologies on our platform.
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
                <h2 className="text-3xl font-bold text-navy mb-6">1. What Are Cookies?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device when you visit our website. They allow us to recognize your device and store some information about your preferences or past actions.
                </p>
              </div>

              {/* How We Use Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">2. How We Use Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Provide essential functionality and maintain your session</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Remember your preferences and settings</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Analyze how you use our platform to improve user experience</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Deliver targeted advertisements and measure campaign effectiveness</div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>Protect against fraud and ensure security</div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Types of Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">3. Types of Cookies We Use</h2>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-navy mb-4">Essential Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Examples:</strong> Authentication cookies, session cookies, security cookies
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-navy mb-4">Analytical/Performance Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are most popular and see how visitors move around the site.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Examples:</strong> Google Analytics, tracking user behavior, performance monitoring
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-navy mb-4">Functionality Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Examples:</strong> Language preferences, region settings, accessibility features
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-navy mb-4">Targeting/Advertising Cookies</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant content on other sites.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Examples:</strong> Social media tracking, retargeting, interest-based advertising
                    </p>
                  </div>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">4. Third-Party Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Google Analytics:</strong> Helps us understand how visitors interact with our website. Learn more at{" "}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sustainability hover:text-sustainability/80 underline">
                          Google's Privacy Policy
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Stripe:</strong> Processes secure payments on our platform. Learn more at{" "}
                        <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sustainability hover:text-sustainability/80 underline">
                          Stripe's Privacy Policy
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Vercel Analytics:</strong> Provides performance insights for our platform.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Managing Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">5. Managing Your Cookie Preferences</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right to choose whether to accept or reject cookies. You can control cookies through:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Cookie Preference Center:</strong> Manage your preferences through our cookie consent banner when you first visit our site.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Opt-Out Tools:</strong> You can opt out of certain cookies by visiting industry opt-out pages such as{" "}
                        <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-sustainability hover:text-sustainability/80 underline">
                          Your Online Choices
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Blocking cookies may affect your ability to use certain features of our platform and may impact your user experience.
                  </p>
                </div>
              </div>

              {/* Do Not Track */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">6. Do Not Track Signals</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some browsers have a "Do Not Track" feature that sends a signal to websites informing them that you do not want to be tracked. Currently, there is no standard for how companies respond to "Do Not Track" signals. We do not respond to these signals. However, you can control cookie settings through your browser preferences as described above.
                </p>
              </div>

              {/* Cookie Duration */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">7. How Long Do Cookies Last?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies can be either "persistent" or "session" cookies:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser. They allow our platform to link your actions during a browsing session.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them. We use these to remember your preferences and improve your experience.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Updates to Policy */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">8. Updates to This Cookie Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-6">9. Contact Us</h2>
                <div className="bg-gradient-to-r from-sustainability/10 to-sky-100 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

      {/* Cookie Settings CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-navy mb-4">Cookie Settings</h2>
              <p className="text-gray-600 mb-6">
                Manage your cookie preferences and control how we use cookies on our platform.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-navy">Essential Cookies</h3>
                    <p className="text-sm text-gray-600">Required for the platform to function</p>
                  </div>
                  <div className="text-green-600 font-semibold">Always Active</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-navy">Analytical Cookies</h3>
                    <p className="text-sm text-gray-600">Help us improve our services</p>
                  </div>
                  <button className="bg-sustainability hover:bg-sustainability/90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Configure
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-navy">Functional Cookies</h3>
                    <p className="text-sm text-gray-600">Remember your preferences</p>
                  </div>
                  <button className="bg-sustainability hover:bg-sustainability/90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Related Legal Documents</h2>
            <p className="text-lg text-white/80 mb-8">
              Review our other important legal documents
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/privacy"
                className="bg-white hover:bg-gray-100 text-navy px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="bg-sustainability hover:bg-sustainability/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
