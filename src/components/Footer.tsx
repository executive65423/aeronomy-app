import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Aeronomy</h3>
            <p className="text-gray-300 mb-4">
              Where Aviation's Net-Zero Future Gets Funded.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-sustainability">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-sustainability">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/analytica" className="text-gray-300 hover:text-sustainability">
                  Aeronomics Analytica
                </Link>
              </li>
              <li>
                <Link to="/products/safpro" className="text-gray-300 hover:text-sustainability">
                  SAF-PRO Platform
                </Link>
              </li>
              <li>
                <Link to="/products/safsuite" className="text-gray-300 hover:text-sustainability">
                  SAF-Suite Enterprise
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-sustainability">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-sustainability">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-sustainability">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sustainability">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-sustainability">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-sustainability">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-sustainability">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="mb-4 md:mb-0">
            <div className="bg-gray-800 px-6 py-3 rounded-full text-sm text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>CORSIA-Certified</span>
              <span className="mx-2">•</span>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>EU Taxonomy-Aligned</span>
              <span className="mx-2">•</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>IRA Compliant</span>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            © {currentYear} Aeronomy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 