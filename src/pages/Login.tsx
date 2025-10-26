import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthService, LoginData } from '../lib/api';

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password');
      setIsLoading(false);
      return;
    }
    
    try {
      // Call login API
      await AuthService.login(formData);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 35, 66, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 35, 66, 1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-4xl font-bold">
                <span className="text-navy">Aero</span>
                <span className="text-sustainability">nomy</span>
              </h1>
            </Link>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-navy mb-6">Welcome Back</h2>
            
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
              >
                {errorMessage}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-navy font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy placeholder-gray-400 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-navy font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy placeholder-gray-400 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-sustainability focus:ring-sustainability border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-sustainability hover:text-sustainability/80 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white text-lg font-semibold bg-sustainability hover:bg-sustainability/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sustainability transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </motion.button>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-sustainability hover:text-sustainability/80 transition-colors">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {/* Additional links */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-navy transition-colors">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 