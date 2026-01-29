import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  FiBarChart2, 
  FiCreditCard, 
  FiGrid, 
  FiArrowRight, 
  FiBox,
  FiCheckCircle,
  FiLayers,
  FiShield,
  FiChevronRight
} from 'react-icons/fi'

// Product Icon Component with consistent sizing
const ProductIcon = ({ type }: { type: string }) => {
  const iconClass = "w-7 h-7";
  
  switch (type) {
    case 'graph':
      return <FiBarChart2 className={iconClass} />;
    case 'exchange':
      return <FiCreditCard className={iconClass} />;
    case 'building':
      return <FiBox className={iconClass} />;
    default:
      return <FiGrid className={iconClass} />;
  }
};

// Background component
const CategoryBackground = ({ category }: { category: string }) => {
  // Lighter gradient overlay
  const background = "bg-gradient-to-br from-navy/80 to-navy-dark/80 backdrop-blur-sm";
  
  const bgImages = {
    all: "url('/images/hanger.jpg')",
    analytics: "url('/images/window.jpeg')",
    finance: "url('/images/evening.jpg')",
    enterprise: "url('/images/plane.jpg')"
  };
  
  return (
    <div 
      className="absolute inset-0 transition-all duration-700 z-0"
      style={{
        backgroundImage: bgImages[category as keyof typeof bgImages],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className={`absolute inset-0 ${background}`}></div>
    </div>
  );
};

// Category introduction component
const CategoryIntro = ({ category, products }: { category: string, products: any[] }) => {
  const introContent = {
    all: {
      title: "Complete Product Suite",
      subtitle: "Integrated solutions for the entire sustainable aviation ecosystem",
      description: "Our comprehensive platform offers end-to-end solutions for sustainable aviation fuel procurement, compliance automation, and innovative financing. From real-time analytics to enterprise-grade infrastructure, we provide the tools needed for the aviation industry's transition to net-zero emissions.",
      image: "/images/product-all.png",
      bgGradient: "from-blue-500/20 via-purple-500/20 to-emerald-500/20"
    },
    analytics: {
      title: "Aeronomics Analytica",
      subtitle: "AI-powered insights for informed procurement decisions",
      description: "Leverage advanced analytics to optimize SAF procurement with real-time price forecasting, automated workflow management, and one-click regulatory compliance reporting. Aeronomics Analytica delivers the operational intelligence needed to navigate the complex sustainable aviation fuel market.",
      image: "/images/Analytica.jpeg",
      bgGradient: "from-blue-500/20 to-blue-600/20"
    },
    finance: {
      title: "SAF-PRO",
      subtitle: "Innovative financial solutions for sustainable aviation",
      description: "Transform how you finance and manage SAF with our comprehensive platform that bridges procurement and financial innovation. From asset-backed securities to dynamic hedging tools, SAF-PRO delivers the financial infrastructure needed to scale sustainable aviation initiatives.",
      image: "/images/SAFPRO.jpeg",
      bgGradient: "from-purple-500/20 to-indigo-600/20"
    },
    enterprise: {
      title: "SAF Enterprise",
      subtitle: "Enterprise-grade solutions for industry leaders",
      description: "Built for scale and customization, our enterprise platform provides unlimited user access, dedicated advisory services, and seamless integration with your existing systems. SAF Enterprise delivers the robust infrastructure needed for global airlines and producers committed to aviation's sustainable future.",
      image: "/images/experts.jpeg",
      bgGradient: "from-emerald-500/20 to-teal-600/20"
    }
  };
  
  const content = introContent[category as keyof typeof introContent];
  const product = products.find(p => 
    (category === 'analytics' && p.id === 'analytica') ||
    (category === 'finance' && p.id === 'safpro') ||
    (category === 'enterprise' && p.id === 'safsuite')
  );
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
              <p className="text-xl font-medium text-white/90 mb-6">{content.subtitle}</p>
              <p className="text-white/80 mb-8 leading-relaxed">{content.description}</p>
              
              {category !== 'all' && product && (
                <Link to={product.path}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white text-navy font-semibold rounded-xl shadow-lg inline-flex items-center"
                  >
                    Explore {content.title} <FiChevronRight className="ml-2" />
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`bg-gradient-to-br ${content.bgGradient} p-1 rounded-2xl shadow-2xl`}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ProductGrid component
const ProductGrid = ({ products }: { products: any[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 relative z-10"
    >
      <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 overflow-hidden group relative h-full flex flex-col"
          >
            {/* Featured Tag */}
            {product.featured && (
              <div className="absolute top-0 right-0">
                <div className="bg-sustainability text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              </div>
            )}
            
            {/* Product Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-navy/10 rounded-xl text-navy">
                  <ProductIcon type={product.icon} />
                </div>
                <div className="bg-sustainability/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-navy font-medium shadow-sm">
                  {product.categories.map(cat => {
                    const category = cat === 'analytics' ? 'Analytics' : 
                                    cat === 'finance' ? 'Financial Solutions' :
                                    cat === 'enterprise' ? 'Enterprise Solutions' : '';
                    return category;
                  }).join(' • ')}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-3">
                {product.name}
              </h3>
              <p className="text-sustainability font-medium text-sm mb-4">
                {product.tagline}
              </p>
              <p className="text-gray-600 text-sm">
                {product.description}
              </p>
            </div>
            
            {/* Key Features */}
            <div className="p-8 flex-grow bg-gray-50/80">
              <h4 className="text-sm font-semibold text-navy uppercase tracking-wider mb-4">
                Key Features
              </h4>
              <ul className="space-y-3 mb-8">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="text-sustainability mr-3 mt-1 flex-shrink-0">
                      <FiCheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-600">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* CTA */}
            <div className="p-8 pt-4 mt-auto border-t border-gray-200">
              <Link to={product.path}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center w-full py-3 px-4 bg-sustainability hover:bg-sustainability/90 text-white font-medium rounded-xl transition-colors"
                >
                  {product.cta}
                  <FiArrowRight className="ml-2" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  
  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      // If clicking the already selected category, reset to default view
      setSelectedCategory('all');
      setExpandedItem(null);
      setShowGrid(true);
    } else {
      // If selecting a new category, expand that item
      setSelectedCategory(categoryId);
      setExpandedItem(categoryId);
      setShowGrid(categoryId === 'all');
    }
  };
  
  // Reset when navigating away and back
  useEffect(() => {
    return () => {
      setSelectedCategory('all');
      setExpandedItem(null);
      setShowGrid(true);
    };
  }, []);
  
  const categories = [
    { id: 'all', name: 'All Products', icon: <FiLayers className="mr-2" /> },
    { id: 'analytics', name: 'Analytics', icon: <FiBarChart2 className="mr-2" /> },
    { id: 'finance', name: 'Financial Solutions', icon: <FiCreditCard className="mr-2" /> },
    { id: 'enterprise', name: 'Enterprise Solutions', icon: <FiShield className="mr-2" /> }
  ];
  
  // Product data with category tags
  const products = [
    {
      id: 'analytica',
      name: 'Aeronomics Analytica',
      tagline: 'Essential Analytics & Procurement Platform',
      description: 'Designed for airlines and producers seeking operational insights, procurement optimization, and streamlined compliance without complex financial tools.',
      price: '$10,000/month',
      icon: 'graph',
      categories: ['analytics'],
      features: [
        'Real-time SAF Price Forecasting',
        'Automated SAF Procurement',
        'Bulk Buying Consortium Access',
        'Dynamic Risk & Hedging Recommendations',
        'One-click Regulatory Compliance (CORSIA, EU ETS)',
        'Real-time ESG Analytics Dashboard',
        'Predictive Alerts & Workflow Automation',
        'SAF Supplier Marketplace Integration'
      ],
      cta: 'Explore Analytica',
      path: '/products/analytica',
      bgGradient: 'from-blue-500/10 to-blue-600/10',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200 dark:border-blue-900/30'
    },
    {
      id: 'safpro',
      name: 'SAF-PRO',
      tagline: 'Complete Aviation Decarbonization & Finance Platform',
      description: 'Tailored for airlines, SAF producers, and investors needing advanced procurement capabilities, comprehensive compliance automation, and integrated financial innovation.',
      price: '$25,000/month',
      priceNote: 'Financial Tools Transaction Fees: Contact Sales',
      icon: 'exchange',
      categories: ['finance'],
      features: [
        'All Aeronomics Analytica Features',
        'Advanced AI-Driven Procurement & Blending Optimization',
        'Integrated Supply Chain Orchestration',
        'Automated Global Regulatory Compliance',
        'Blockchain-based SAF Certification & Carbon Credit Tracking',
        'Jurisdictional Financial Incentive Optimization',
        'SAF Asset-Backed Securities (ABS)',
        'Dynamic Hedging Swaps'
      ],
      cta: 'Discover SAF-PRO',
      path: '/products/safpro',
      bgGradient: 'from-purple-500/10 to-indigo-600/10',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200 dark:border-purple-900/30',
      featured: true
    },
    {
      id: 'safsuite',
      name: 'SAF Enterprise',
      tagline: 'Fully Customizable Enterprise Decarbonization Suite',
      description: 'Built exclusively for large airlines, global SAF producers, and institutional investors demanding unlimited scalability, dedicated support, tailored integrations, and enterprise-grade financial solutions.',
      price: 'Custom Quote',
      priceNote: 'Unlimited Users & Integrations',
      icon: 'building',
      categories: ['enterprise'],
      features: [
        'All SAF-PRO Features',
        'Unlimited Users and Custom Roles',
        'Customized ERP & Proprietary Data Integrations',
        'Dedicated Financial Advisory & ABS Structuring Services',
        'Premium AI Predictive Modeling & Custom Analytics',
        'Dedicated ESG & Regulatory Advisory Team',
        'Enterprise-Grade Security & Compliance (SOC 2, ISO 27001)',
        '24/7 Premium Enterprise Support & Account Management'
      ],
      cta: 'Request Enterprise Quote',
      path: '/products/safsuite',
      bgGradient: 'from-emerald-500/10 to-teal-600/10',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200 dark:border-emerald-900/30'
    }
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categories.includes(selectedCategory));

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Dynamic background based on selected category */}
      <CategoryBackground category={selectedCategory} />
      
      {/* Hero Section */}
      <section className="relative z-10 mb-8">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-sustainability">Solutions</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Comprehensive platforms for sustainable aviation fuel procurement, financing, and emissions reduction
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="sticky top-16 z-20 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-center overflow-x-auto py-4 space-x-4">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={{ 
                  width: expandedItem === category.id ? 'auto' : 'auto',
                  paddingLeft: expandedItem === category.id ? '2rem' : '1.25rem',
                  paddingRight: expandedItem === category.id ? '2rem' : '1.25rem'
                }}
                transition={{ 
                  width: { duration: 0.3 },
                  paddingLeft: { duration: 0.3 },
                  paddingRight: { duration: 0.3 }
                }}
                className={`py-2.5 rounded-full flex items-center whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-sustainability text-white shadow-md' 
                    : 'bg-gray-100 text-navy hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dynamic Content Section */}
      <AnimatePresence mode="wait">
        {showGrid ? (
          <ProductGrid key="product-grid" products={filteredProducts} />
        ) : (
          <CategoryIntro key="category-intro" category={selectedCategory} products={products} />
        )}
      </AnimatePresence>
      
      {/* Comparison Table Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-navy-dark/80 dark:to-navy/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our team can help you identify the right solution for your specific requirements and challenges.
            </p>
          </div>
          
          <div className="text-center">
            <a href="https://calendly.com/manthan-sharma-aeronomy/30min" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-sustainability hover:bg-sustainability/90 text-white font-semibold rounded-xl shadow-lg transition-all"
              >
                Schedule a Personalized Consultation
              <FiArrowRight className="ml-2" />
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products; 