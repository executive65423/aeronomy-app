import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const Dashboard = () => {
  const [user, setUser] = useState({ email: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock account data
  const accountData = {
    airline: "Skyway Airlines",
    contactName: "John Doe",
    contactEmail: "john.doe@skywayair.com",
    contactPhone: "+1 (555) 123-4567",
    accountType: "Enterprise"
  };

  // Mock subscription data
  const subscriptionData = {
    plan: "SAF-Suite Enterprise",
    status: "Active",
    startDate: "January 15, 2023",
    nextBillingDate: "January 15, 2024",
    seats: 25,
    features: ["Price Forecasting", "Risk Management", "Regulatory Compliance", "Analytics Dashboard"]
  };

  // Salesforce links
  const salesforceLinks = [
    { id: 1, name: "SAF Procurement Platform", url: "https://aeronomy.my.salesforce.com/procurement", description: "Access your procurement dashboard" },
    { id: 2, name: "Analytics Suite", url: "https://aeronomy.my.salesforce.com/analytics", description: "View market trends and forecast data" },
    { id: 3, name: "Compliance Management", url: "https://aeronomy.my.salesforce.com/compliance", description: "Manage regulatory compliance" }
  ];

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isLoggedIn) {
        // Not authenticated, redirect to login
        navigate('/login');
        return;
      }
      
      // User is authenticated, get user info
      const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
      setUser({ email: userEmail });
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sustainability"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-navy dark:text-dark-text">Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Icon icon="heroicons:logout-20-solid" className="mr-2" />
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-white dark:bg-dark-card rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-navy dark:text-dark-text mb-4">Access Your Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Product Cards */}
              <ProductCard 
                icon="material-symbols:flight" 
                title="Flight Planning" 
                description="Create and manage flight plans with our intuitive interface."
                link="/flight-planning"
              />
              <ProductCard 
                icon="mdi:weather-partly-cloudy" 
                title="Weather Analysis" 
                description="Real-time weather updates and forecasting for your routes."
                link="/weather"
              />
              <ProductCard 
                icon="carbon:data-vis-4" 
                title="Aircraft Performance" 
                description="Analyze and optimize your aircraft's performance metrics."
                link="/performance"
              />
              <ProductCard 
                icon="fluent:document-20-regular" 
                title="Documentation" 
                description="Access technical manuals and regulatory documents."
                link="/documents"
              />
              <ProductCard 
                icon="mdi:chart-line" 
                title="Analytics" 
                description="Comprehensive data analysis and reporting tools."
                link="/analytics"
              />
              <ProductCard 
                icon="material-symbols:settings-outline" 
                title="Settings" 
                description="Configure your account preferences and integrations."
                link="/settings"
              />
            </div>
          </motion.div>
          
          {/* Company Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-navy dark:text-dark-text mb-4">Company Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-dark-text/70">Company Name</p>
                  <p className="font-medium text-navy dark:text-dark-text">{accountData.airline}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-dark-text/70">Account Type</p>
                  <p className="font-medium text-navy dark:text-dark-text">{accountData.accountType}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-dark-text/70">Account Manager</p>
                  <p className="font-medium text-navy dark:text-dark-text">{accountData.contactName}</p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-dark-text/70">Support Level</p>
                  <p className="font-medium text-navy dark:text-dark-text">Premium 24/7</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Subscription Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-navy dark:text-dark-text mb-4">Subscription Details</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-dark-text/70">Plan</p>
                <p className="font-medium text-navy dark:text-dark-text">{subscriptionData.plan}</p>
              </div>
              <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-dark-text/70">Status</p>
                <p className="font-medium text-green-600 dark:text-green-400">{subscriptionData.status}</p>
              </div>
              <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-dark-text/70">Next Billing Date</p>
                <p className="font-medium text-navy dark:text-dark-text">{subscriptionData.nextBillingDate}</p>
              </div>
              <div className="bg-gray-50 dark:bg-dark-card-hover rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-dark-text/70">User Licenses</p>
                <p className="font-medium text-navy dark:text-dark-text">{subscriptionData.seats} / 50 used</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ProductCard = ({ icon, title, description, link }: ProductCardProps) => {
  return (
    <motion.a
      href={link}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="block bg-gray-50 hover:bg-gray-100 dark:bg-dark-card-hover dark:hover:bg-dark-card-hover/80 rounded-xl p-5 transition duration-300 ease-in-out border border-gray-100 dark:border-dark-border"
    >
      <div className="flex items-center mb-3">
        <div className="bg-sustainability/10 p-2 rounded-lg mr-3">
          <Icon icon={icon} className="h-6 w-6 text-sustainability" />
        </div>
        <h3 className="font-semibold text-navy dark:text-dark-text">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-dark-text/70">{description}</p>
    </motion.a>
  );
};

export default Dashboard; 