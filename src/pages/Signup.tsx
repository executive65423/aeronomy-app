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
    <div className="relative min-h-screen flex items-center justify-center py-12">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/evening.jpg" 
          alt="Evening sky" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 dark:bg-dark-card/30 backdrop-blur-lg rounded-xl p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Your Account</h2>
          
          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {serverError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border ${
                    errors.fullName ? 'border-red-500' : 'border-white/20'
                  } focus:border-sustainability focus:ring-1 focus:ring-sustainability text-white placeholder-white/70`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-red-300 text-sm">{errors.fullName}</p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email ID
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } focus:border-sustainability focus:ring-1 focus:ring-sustainability text-white placeholder-white/70`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-300 text-sm">{errors.email}</p>
                )}
              </div>
              
              {/* Organization Name */}
              <div>
                <label htmlFor="organizationName" className="block text-white font-medium mb-2">
                  Organization Name
                </label>
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border ${
                    errors.organizationName ? 'border-red-500' : 'border-white/20'
                  } focus:border-sustainability focus:ring-1 focus:ring-sustainability text-white placeholder-white/70`}
                  placeholder="Enter your organization name"
                />
                {errors.organizationName && (
                  <p className="mt-1 text-red-300 text-sm">{errors.organizationName}</p>
                )}
              </div>
              
              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-white font-medium mb-2">
                  Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border ${
                    errors.role ? 'border-red-500' : 'border-white/20'
                  } focus:border-sustainability focus:ring-1 focus:ring-sustainability text-white appearance-none`}
                >
                  <option value="" className="bg-navy text-white">Select your role</option>
                  <option value="Procurement Manager" className="bg-navy text-white">Procurement Manager</option>
                  <option value="Investor" className="bg-navy text-white">Investor</option>
                  <option value="Producer" className="bg-navy text-white">Producer</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-red-300 text-sm">{errors.role}</p>
                )}
              </div>
              
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  } focus:border-sustainability focus:ring-1 focus:ring-sustainability text-white placeholder-white/70`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-red-300 text-sm">{errors.password}</p>
                )}
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                  } focus:border-sustainability focus:ring-1 focus:ring-sustainability text-white placeholder-white/70`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-red-300 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-sustainability hover:bg-sustainability/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sustainability"
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
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-white hover:text-sustainability">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup; 