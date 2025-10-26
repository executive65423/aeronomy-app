import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthService, SignupData } from '../lib/api';

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    fullName: '',
    email: '',
    organizationName: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate organization name
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }
    
    // Validate role
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call signup API
      await AuthService.signup(formData);
      
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setServerError(error.message || 'An error occurred during signup. Please try again.');
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
      <div className="relative z-10 w-full max-w-2xl">
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
            <p className="mt-2 text-gray-600">Create your account to get started</p>
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-navy mb-6">Create Your Account</h2>
          
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {serverError}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-navy font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-200'
                  } focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy placeholder-gray-400 transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-red-600 text-sm">{errors.fullName}</p>
                )}
              </div>
              
              {/* Email */}
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
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy placeholder-gray-400 transition-colors`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
              
              {/* Organization Name */}
              <div>
                <label htmlFor="organizationName" className="block text-navy font-medium mb-2">
                  Organization Name
                </label>
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.organizationName ? 'border-red-500' : 'border-gray-200'
                  } focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy placeholder-gray-400 transition-colors`}
                  placeholder="Enter your organization name"
                />
                {errors.organizationName && (
                  <p className="mt-1 text-red-600 text-sm">{errors.organizationName}</p>
                )}
              </div>
              
              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-navy font-medium mb-2">
                  Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.role ? 'border-red-500' : 'border-gray-200'
                  } focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy appearance-none transition-colors`}
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '1.5rem auto' }}
                >
                  <option value="">Select your role</option>
                  <option value="Procurement Manager">Procurement Manager</option>
                  <option value="Investor">Investor</option>
                  <option value="Producer">Producer</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-red-600 text-sm">{errors.role}</p>
                )}
              </div>
              
              {/* Password */}
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
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy placeholder-gray-400 transition-colors`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-red-600 text-sm">{errors.password}</p>
                )}
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-navy font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  } focus:border-sustainability focus:ring-2 focus:ring-sustainability/20 text-navy placeholder-gray-400 transition-colors`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-red-600 text-sm">{errors.confirmPassword}</p>
                )}
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
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-sustainability hover:text-sustainability/80 transition-colors">
                Sign in here
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

export default Signup; 