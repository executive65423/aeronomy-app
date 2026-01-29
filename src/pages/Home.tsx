import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import FloatingDashboard from '../components/FloatingDashboard'
import CustomerCarousel from '../components/CustomerCarousel'
import NewsTicker from '../components/NewsTicker'
import { 
  FiShoppingCart, FiUsers, FiBarChart, FiShield, 
  FiGlobe, FiSmartphone, FiArrowRight, FiCheck,
  FiTrendingUp, FiSettings, FiLayers, FiTarget
} from 'react-icons/fi'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Slideshow content for the information section
const SLIDESHOW_CONTENT = [
  {
    title: "Aeronomics Analytica",
    subtitle: "Your one stop for all SAF procurement needs",
    description: "Optimize SAF procurement with Aeronomica Analytica today"
  },
  {
    title: "Stop Overpaying for SAF",
    subtitle: "Why waste millions?",
    description: "Aeronomy Analytica's AI predicts price dips and locks in savings, slashing your SAF costs by 15%—that's 1.5 Million saved annually"
  },
  {
    title: "Crush Compliance Chaos",
    subtitle: "Ditch manual spreadsheets and consultants",
    description: "Generate audit-ready CORSIA/EU ETS reports in minutes, not months—saving 200+ hours/year and avoiding $500K+ in penalties"
  },
  {
    title: "Outsmart Volatility, Boost Margins",
    subtitle: "SAF prices swinging wildly?",
    description: "Our dynamic feedstock optimizer and procurement calendar ensure you buy low, blend smart, and save 8–12% even in turbulent markets"
  }
];

// Background video for hero section
const HERO_VIDEO = "/videos/clouds.mp4";

const Home = () => {
  
  // Refs for scroll animations
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const insightsRef = useRef(null);
  const workflowsRef = useRef(null);
  const platformFeaturesRef = useRef(null);
  
  // Check if elements are in view
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isInsightsInView = useInView(insightsRef, { once: true, amount: 0.2 });
  const isWorkflowsInView = useInView(workflowsRef, { once: true, amount: 0.2 });
  const isPlatformFeaturesInView = useInView(platformFeaturesRef, { once: true, amount: 0.2 });
  
  // State for platform components tabs
  const [selectedPlatformTab, setSelectedPlatformTab] = useState('marketplace');
  
  // State for slideshow content and progress
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Slideshow rotation
  useEffect(() => {
    const interval = 5000; // Show each slide for 5 seconds
    const step = 10; // Update progress every 10ms
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (step / interval) * 100;
      });
    }, step);
    
    // Slide transition
    const slideshowInterval = setInterval(() => {
      setSlideshowIndex(prevIndex => (prevIndex + 1) % SLIDESHOW_CONTENT.length);
      setProgress(0);
    }, interval);
    
    return () => {
      clearInterval(slideshowInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // Features data
  const features = [
    {
      title: "AI-Driven Price Forecasting",
      description: "Predict SAF prices up to 12 months in advance with 95% accuracy, enabling you to secure the best rates and plan your procurement strategy with confidence.",
      icon: (
        <svg className="w-12 h-12 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Dynamic Hedging Solutions",
      description: "Stabilize your fuel costs with our AI-powered hedging tools that dynamically lock in prices, reducing volatility and sharing risk with trusted SAF producers.",
      icon: (
        <svg className="w-12 h-12 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "ABS Financing for Sustainable Growth",
      description: "Transform future SAF purchases into immediate working capital through innovative ABS financing, driving down costs while unlocking ESG investment opportunities.",
      icon: (
        <svg className="w-12 h-12 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Advanced Analytics & Real-Time Insights",
      description: "Leverage real-time dashboards that integrate market trends, operational data, and regulatory updates—providing you with actionable insights to optimize procurement, manage risk, and accelerate your journey toward net-zero emissions.",
      icon: (
        <svg className="w-12 h-12 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  // Insight data for graphs
  const insights = [
    {
      title: "AI-Driven Price Forecasting Accuracy",
      description: "Aeronomy's AI cuts forecasting errors by 68%, helping airlines budget confidently and avoid $1.2M/year in overspending (per 2M gallons procured).",
      data: {
        traditional: 25, // ±25% forecasting error
        aeronomy: 8, // ±8% forecasting error
      },
      chartType: "line",
      chartComponent: (
        <div className="bg-gray-100 dark:bg-dark-card h-64 w-full rounded-lg flex items-center justify-center overflow-hidden p-4 relative">
          <div className="absolute bottom-8 left-0 w-full">
            <div className="h-1 bg-gray-300 dark:bg-gray-700 w-full"></div>
            <div className="flex justify-between mt-2 px-4">
              <span className="text-xs text-gray-600 dark:text-gray-400">Jan</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Mar</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Jun</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Sep</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Dec</span>
            </div>
          </div>
          
          {/* Traditional prediction line - more jagged */}
          <div className="absolute top-6 left-0 w-full h-32 px-4">
            <div className="relative h-full">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M0,50 Q10,65 20,40 T40,60 T60,30 T80,45 T100,35" fill="none" stroke="#E0E0E0" strokeWidth="2" className="dark:stroke-gray-600" />
              </svg>
            </div>
          </div>
          
          {/* Aeronomy prediction line - closer to actual */}
          <div className="absolute top-6 left-0 w-full h-32 px-4">
            <div className="relative h-full">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M0,50 Q25,55 50,40 T100,50" fill="none" stroke="#00A0DC" strokeWidth="3" />
              </svg>
            </div>
          </div>
          
          {/* Actual price line */}
          <div className="absolute top-6 left-0 w-full h-32 px-4">
            <div className="relative h-full">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M0,50 Q30,45 60,45 T100,50" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,3" />
              </svg>
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm p-2 rounded-md text-xs">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Traditional (±25%)</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-sustainability mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Aeronomy (±8%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-0 border border-dashed border-green-500 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Actual Prices</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Time Savings in Procurement Workflow",
      description: "Aeronomy reclaims 384 hours/year per airline—equivalent to $57,600 in labor costs (avg. $150/hr analyst salary).",
      data: {
        manual: 40, // 40 hours/month
        aeronomy: 8, // 8 hours/month
      },
      chartType: "bar",
      chartComponent: (
        <div className="bg-gray-100 dark:bg-dark-card h-64 w-full rounded-lg flex items-center justify-center overflow-hidden p-4 relative">
          <div className="flex items-end justify-center h-full w-full space-x-16 px-8">
            {/* Traditional Process Bar */}
            <div className="flex flex-col items-center">
              <div className="w-20 bg-gray-300 dark:bg-gray-700 rounded-t-md" style={{height: "160px"}}>
                <div className="w-full bg-gray-400 dark:bg-gray-600 h-10 rounded-t-md"></div>
                <div className="w-full bg-gray-500 dark:bg-gray-500 h-16 mt-0.5"></div>
                <div className="w-full bg-gray-600 dark:bg-gray-400 h-14 mt-0.5"></div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Traditional</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">40 hours/month</div>
            </div>
            
            {/* Aeronomy Bar */}
            <div className="flex flex-col items-center">
              <div className="w-20 bg-sustainability/30 dark:bg-sustainability/20 rounded-t-md" style={{height: "32px"}}>
                <div className="w-full bg-sustainability/50 dark:bg-sustainability/40 h-2 rounded-t-md"></div>
                <div className="w-full bg-sustainability/70 dark:bg-sustainability/60 h-4 mt-0.5"></div>
                <div className="w-full bg-sustainability dark:bg-sustainability/80 h-3 mt-0.5"></div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Aeronomy</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">8 hours/month</div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm p-2 rounded-md text-xs">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Collecting data (10h → 2h)</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-gray-500 dark:bg-gray-500 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Analyzing subsidies (15h → 3h)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-600 dark:bg-gray-400 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Reporting (15h → 3h)</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // State for player tabs
  const [selectedPlayerTab, setSelectedPlayerTab] = useState('airlines');

  // Additional state for Features section
  const [activeSection, setActiveSection] = useState(0)
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null)

  // Feature sections data
  const featureSections = [
    {
      id: 'procurement',
      title: 'Procurement Lifecycle',
      subtitle: 'SAF Procurement Made Simple',
      icon: FiShoppingCart,
      color: 'from-sky-600 to-blue-700',
      description: 'End-to-end procurement workflows inspired by enterprise P2P solutions'
    },
    {
      id: 'suppliers',
      title: 'Supplier Management',
      subtitle: 'Vetted SAF Network',
      icon: FiUsers,
      color: 'from-sustainability to-sky-500',
      description: 'Comprehensive supplier lifecycle management and verification'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      subtitle: 'Data-Driven Decisions',
      icon: FiBarChart,
      color: 'from-sky-600 to-blue-700',
      description: 'Real-time carbon tracking and intelligent decision support'
    },
    {
      id: 'compliance',
      title: 'Compliance & MRV',
      subtitle: 'Regulatory Excellence',
      icon: FiShield,
      color: 'from-sky-700 to-blue-800',
      description: 'Automated compliance and measurement, reporting, verification'
    },
    {
      id: 'marketplace',
      title: 'Network & Marketplace',
      subtitle: 'Global SAF Exchange',
      icon: FiGlobe,
      color: 'from-sustainability to-blue-600',
      description: 'Connect with SAF suppliers worldwide through our marketplace'
    },
    {
      id: 'interface',
      title: 'User Experience',
      subtitle: 'Intuitive Platform',
      icon: FiSmartphone,
      color: 'from-sky-500 to-sustainability',
      description: 'Modern, role-based interfaces designed for efficiency'
    }
  ]

  // Procurement workflow stages
  const procurementWorkflows = [
    {
      id: 'requisition',
      title: 'Requisition Creation',
      description: 'Internal request to procure SAF based on volume, blend level, and delivery window.',
      icon: '',
      step: 1
    },
    {
      id: 'validation',
      title: 'Blending & Feedstock Validation',
      description: 'Automatic check of buyer blending requirements + feedstock preferences (e.g., used cooking oil, ethanol).',
      icon: '',
      step: 2
    },
    {
      id: 'emissions',
      title: 'Emissions Eligibility Gate',
      description: 'Apply filters for feedstock origin, lifecycle GHG data, and regional compliance (e.g., EU ETS, CORSIA).',
      icon: '',
      step: 3
    },
    {
      id: 'rfq',
      title: 'RFQ / Tender Workflow',
      description: 'Generate and send Request for Quotation to approved SAF suppliers.',
      icon: '',
      step: 4
    },
    {
      id: 'evaluation',
      title: 'Quote Evaluation',
      description: 'Weighted scoring of quotes: price, carbon intensity, location, certifications.',
      icon: '',
      step: 5
    },
    {
      id: 'contract',
      title: 'Contract Authoring',
      description: 'Digitized offtake agreement with built-in ESG clauses and volume tranches.',
      icon: '',
      step: 6
    },
    {
      id: 'po',
      title: 'PO Generation',
      description: 'Auto-create and dispatch Purchase Order via platform.',
      icon: '',
      step: 7
    },
    {
      id: 'receipt',
      title: 'Goods Receipt Confirmation',
      description: 'Confirm SAF delivery (volume, quality, location) by buyer or third-party.',
      icon: '',
      step: 8
    },
    {
      id: 'match',
      title: '3-Way Match Engine',
      description: 'Validate invoice against PO and confirmed emissions performance (MRV data).',
      icon: '',
      step: 9
    },
    {
      id: 'payment',
      title: 'Payment Execution',
      description: 'Sync with ERP or payment processor; notify supplier and confirm on ledger.',
      icon: '',
      step: 10
    }
  ]

  // Feature categories
  const featureCategories = {
    suppliers: [
      { title: 'Supplier Onboarding Portal', desc: 'Streamlined registration with certification collection' },
      { title: 'Tiered Verification System', desc: 'Bronze to Platinum supplier status levels' },
      { title: 'Performance Scorecards', desc: 'Real-time supplier performance metrics' },
      { title: 'Re-certification Workflow', desc: 'Automated certification renewal alerts' },
      { title: 'Supplier Risk Engine', desc: 'AI-powered risk assessment and monitoring' }
    ],
    analytics: [
      { title: 'Carbon Impact Dashboard', desc: 'Real-time GHG reduction visualization' },
      { title: 'Spend & Emission Forecasting', desc: 'Predictive budget and carbon analysis' },
      { title: 'Greenwashing Detector', desc: '3-way emission validation system' },
      { title: 'Supplier Comparison Tool', desc: 'Multi-criteria supplier benchmarking' },
      { title: 'Procurement ROI Calculator', desc: 'Cost per ton CO₂ reduced analysis' }
    ],
    compliance: [
      { title: 'Digital MRV Pipeline', desc: 'Integrated lifecycle emissions validation' },
      { title: 'ESG Clause Templates', desc: 'Standard sustainability contract language' },
      { title: 'Audit Reporting Module', desc: 'ICAO, EU ETS, CDP compliant reports' },
      { title: 'Decarbonization Registry Sync', desc: 'Automated carbon credit retirement' },
      { title: 'Transaction Ledger', desc: 'Immutable procurement event logging' }
    ],
    marketplace: [
      { title: 'SAF Supplier Directory', desc: 'Searchable global supplier database' },
      { title: 'Live SAF Price Index', desc: 'Real-time regional pricing data' },
      { title: 'Bid/Reverse Auction System', desc: 'Competitive procurement platform' },
      { title: 'Pre-negotiated Frameworks', desc: 'Instant procurement with vetted suppliers' },
      { title: 'Bulk Buyer Aggregation', desc: 'Volume leverage for smaller buyers' }
    ],
    interface: [
      { title: 'Guided Procurement Flow', desc: 'Step-by-step compliance-driven interface' },
      { title: 'Role-Based Dashboards', desc: 'Custom views for different user types' },
      { title: 'Smart Alerts System', desc: 'Proactive notifications and reminders' },
      { title: 'Mobile Vendor Portal', desc: 'On-the-go supplier management' },
      { title: 'Timeline Visualizer', desc: 'Real-time procurement progress tracking' }
    ]
  }

  return (
    <div className="pt-0">
      {/* News Ticker - Below Navbar */}
      <div className="fixed top-[95px] sm:top-[100px] left-0 right-0 z-30">
        <NewsTicker />
      </div>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[75px]">
        {/* Single video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-20 pt-24 sm:pt-28 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white">
              The only SAF platform you will ever need.
            </h1>

            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 text-white font-bold leading-tight">
              That's <span className="text-white">Aero</span><span className="text-sustainability">nomy</span>.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-block text-center"
              >
                Request a Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Carousel Section */}
      <CustomerCarousel />

      {/* Player-specific Solutions Section */}
      <section className="py-20 bg-white relative overflow-hidden">
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
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-navy"
            >
              Built for Every Player in the SAF Ecosystem
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Our platform is tailored to address the specific needs of airlines, investors, and SAF producers.
            </motion.p>
          </div>
          
          {/* Player Tabs */}
          <div className="flex justify-center mb-8 sm:mb-12 px-4">
            <div className="inline-flex flex-wrap justify-center rounded-md shadow-sm p-1 bg-gray-100 gap-1" role="group">
              <button
                type="button"
                className={`py-2 sm:py-3 px-3 sm:px-6 rounded-md shadow-sm font-medium flex items-center transition-all text-sm sm:text-base ${
                  selectedPlayerTab === 'airlines' 
                    ? 'bg-navy text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedPlayerTab('airlines')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
                </svg>
                <span className="whitespace-nowrap">Airlines</span>
              </button>
              <button
                type="button"
                className={`py-2 sm:py-3 px-3 sm:px-6 rounded-md shadow-sm font-medium flex items-center transition-all text-sm sm:text-base ${
                  selectedPlayerTab === 'investors' 
                    ? 'bg-navy text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedPlayerTab('investors')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 18V14.5M4 14.5V9.5M4 14.5H10.5M4 9.5V6M4 9.5H16.5M16.5 9.5V14.5M16.5 9.5C19 9.5 20 11 20 12.5C20 14 19 15.5 16.5 15.5H10.5M16.5 15.5V18M10.5 14.5V6M10.5 14.5V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="whitespace-nowrap">Investors</span>
              </button>
              <button
                type="button"
                className={`py-2 sm:py-3 px-3 sm:px-6 rounded-md shadow-sm font-medium flex items-center transition-all text-sm sm:text-base ${
                  selectedPlayerTab === 'producers' 
                    ? 'bg-navy text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedPlayerTab('producers')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4.5V19.5M9 19.5H4.5M9 19.5H15M15 19.5H19.5M15 19.5C15 13.5 19.5 13.5 19.5 9C19.5 5.5 17.5 4.5 15 4.5C12.5 4.5 10.5 7 10.5 9.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="whitespace-nowrap">SAF Producers</span>
              </button>
            </div>
          </div>
          
          {/* Content based on selected tab */}
          {selectedPlayerTab === 'airlines' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-navy"
                >
                  Cut SAF costs 20%+ with dynamic procurement and hedging
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-6"
                >
                  Airlines face a challenging landscape of rising costs and complex compliance requirements. Aeronomy provides a comprehensive solution to streamline SAF procurement.
                </motion.p>
                
                <div className="space-y-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Automated Compliance Reporting</h4>
                      <p className="text-gray-600 text-sm">Save 100+ hours monthly with automated reporting across 50+ global SAF mandates.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Dynamic Hedging Strategies</h4>
                      <p className="text-gray-600 text-sm">Protect against SAF price volatility with AI-powered hedging recommendations.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Supply Chain Optimization</h4>
                      <p className="text-gray-600 text-sm">Access the largest network of SAF producers with guaranteed availability.</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link to="/solutions">
                    <button className="bg-sustainability hover:bg-sustainability/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md flex items-center">
                      Learn More
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="bg-navy-dark p-3 flex items-center justify-between">
                  <div className="text-white text-lg font-medium">Airline Dashboard</div>
                  <div className="bg-sustainability text-white text-xs px-2 py-1 rounded-md">LIVE DEMO</div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">SAF Cost Optimization</div>
                    <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-sustainability flex items-center text-xs text-white font-bold px-4 rounded-full" style={{ width: '80%' }}>-20%</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Annual SAF Volume</div>
                      <div className="text-2xl font-bold text-navy">5.2M gallons</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Price Protection</div>
                      <div className="text-2xl font-bold text-navy">78% Hedged</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Compliance Status</div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium text-navy">Compliant</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">CO₂ Reduction</div>
                      <div className="text-2xl font-bold text-navy">42,500 tons</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {selectedPlayerTab === 'investors' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6 text-navy"
                >
                  Access vetted SAF projects with 6-8% yields and ESG transparency
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-6"
                >
                  Investors seeking high-impact sustainability opportunities can access vetted SAF projects with attractive returns and transparent ESG metrics.
                </motion.p>
                
                <div className="space-y-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Vetted Investment Pipeline</h4>
                      <p className="text-gray-600 text-sm">Access pre-screened SAF projects with detailed risk profiles and projected returns.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Structured SAF Products</h4>
                      <p className="text-gray-600 text-sm">Innovative financial structures including green bonds and asset-backed securities.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">ESG Impact Tracking</h4>
                      <p className="text-gray-600 text-sm">Transparent reporting on carbon reduction metrics and sustainability impact.</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link to="/solutions">
                    <button className="bg-sustainability hover:bg-sustainability/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md flex items-center">
                      Learn More
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="bg-navy-dark p-3 flex items-center justify-between">
                  <div className="text-white text-lg font-medium">Investor Dashboard</div>
                  <div className="bg-sustainability text-white text-xs px-2 py-1 rounded-md">LIVE DEMO</div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">Available SAF Projects</div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-navy">12 Projects</div>
                      <div className="text-sustainability font-medium">$420M</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">Projected Yield Range</div>
                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-green-400 to-sustainability h-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>6%</span>
                      <span>8%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Avg. Investment Term</div>
                      <div className="text-2xl font-bold text-navy">7.2 Years</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Carbon Impact</div>
                      <div className="text-2xl font-bold text-navy">15 tons/$10k</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {selectedPlayerTab === 'producers' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6 text-navy"
                >
                  Secure capital faster with guaranteed offtakes and ABS tools
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-6"
                >
                  SAF producers need reliable funding and guaranteed offtake agreements. Aeronomy connects producers with investors and airlines to accelerate project development.
                </motion.p>
                
                <div className="space-y-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Guaranteed Offtake Agreements</h4>
                      <p className="text-gray-600 text-sm">Secure long-term buyers for your SAF production with our airline partners.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Streamlined Financing</h4>
                      <p className="text-gray-600 text-sm">Access $500M+ in available capital through our network of ESG investors.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-sustainability/10 p-2 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy">Regulatory Navigation</h4>
                      <p className="text-gray-600 text-sm">Navigate complex SAF incentives and regulations with our compliance experts.</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link to="/solutions">
                    <button className="bg-sustainability hover:bg-sustainability/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md flex items-center">
                      Learn More
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="bg-navy-dark p-3 flex items-center justify-between">
                  <div className="text-white text-lg font-medium">Producer Dashboard</div>
                  <div className="bg-sustainability text-white text-xs px-2 py-1 rounded-md">LIVE DEMO</div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">Project Funding Status</div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-navy">$48M / $60M</div>
                      <div className="text-sustainability text-xl font-bold">80%</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Committed Offtake</div>
                      <div className="text-2xl font-bold text-navy">3.8M gallons</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Average Price</div>
                      <div className="text-2xl font-bold text-navy">$5.80/gal</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Time to Funding</div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium text-navy">48 days</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Investor Interest</div>
                      <div className="text-2xl font-bold text-navy">6 Parties</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Platform Components Section - Modern & Minimalist */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sustainability/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-navy"
            >
              Platform Components
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Comprehensive tools and services designed to optimize every aspect of sustainable aviation fuel management and procurement.
            </motion.p>
          </div>
          
          {/* Component Navigation */}
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16 px-4">
            <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 p-2 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
              <button
                type="button"
                className={`py-2 sm:py-3 md:py-4 px-3 sm:px-5 md:px-6 rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  selectedPlatformTab === 'marketplace' 
                    ? 'bg-navy text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                }`}
                onClick={() => setSelectedPlatformTab('marketplace')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                </svg>
                <span className="hidden sm:inline">SAF Marketplace</span>
                <span className="sm:hidden">Marketplace</span>
              </button>
              
              <button
                type="button"
                className={`py-2 sm:py-3 md:py-4 px-3 sm:px-5 md:px-6 rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  selectedPlatformTab === 'compliance' 
                    ? 'bg-navy text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                }`}
                onClick={() => setSelectedPlatformTab('compliance')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="hidden sm:inline">Compliance Automation</span>
                <span className="sm:hidden">Compliance</span>
              </button>
              
              <button
                type="button"
                className={`py-2 sm:py-3 md:py-4 px-3 sm:px-5 md:px-6 rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  selectedPlatformTab === 'financial' 
                    ? 'bg-navy text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                }`}
                onClick={() => setSelectedPlatformTab('financial')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="hidden sm:inline">Financial Instruments</span>
                <span className="sm:hidden">Financial</span>
              </button>
              
              <button
                type="button"
                className={`py-2 sm:py-3 md:py-4 px-3 sm:px-5 md:px-6 rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  selectedPlatformTab === 'analytics' 
                    ? 'bg-navy text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                }`}
                onClick={() => setSelectedPlatformTab('analytics')}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Analytics
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="max-w-7xl mx-auto">
            {/* SAF Marketplace */}
            {selectedPlatformTab === 'marketplace' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-navy">SAF Marketplace</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Connect buyers and sellers in a transparent, efficient marketplace designed specifically for sustainable aviation fuel transactions.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-sustainability/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-navy mb-2">RFQ & EFQ Bidding</h4>
                      <p className="text-gray-600 text-sm">Streamlined request processes with competitive bidding lots</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-sustainability/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-navy mb-2">Long-term Offtake</h4>
                      <p className="text-gray-600 text-sm">Secure multi-year agreements with guaranteed supply</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-sky-600 to-blue-700 p-8 rounded-2xl text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold">Marketplace Dashboard</h4>
                    <div className="bg-sustainability px-3 py-1 rounded-full text-xs font-medium">LIVE</div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold">127</div>
                        <div className="text-white/80 text-sm">Active Listings</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold">$5.4M</div>
                        <div className="text-white/80 text-sm">Daily Volume</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Average Price</span>
                        <span className="text-xl font-bold text-sustainability">$5.82/gal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Compliance Automation */}
            {selectedPlatformTab === 'compliance' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-navy">Compliance Automation</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Automate complex regulatory reporting across 50+ global jurisdictions with AI-powered compliance management.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-sustainability rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1">CORSIA & EU ETS Reporting</h4>
                        <p className="text-gray-600 text-sm">Automated generation of audit-ready compliance reports</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-sustainability rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1">Real-time Monitoring</h4>
                        <p className="text-gray-600 text-sm">Track regulatory changes and compliance status in real-time</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-sustainability rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-navy mb-1">Risk Assessment</h4>
                        <p className="text-gray-600 text-sm">Proactive identification of compliance risks and mitigation strategies</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-sky-600 to-blue-700 p-8 rounded-2xl text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold">Compliance Status</h4>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">AUTOMATED</div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">EU ETS Compliance</span>
                        <span className="text-white font-semibold">100%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Time Saved</span>
                        <span className="text-xl font-bold">200+ hrs/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Financial Instruments */}
            {selectedPlatformTab === 'financial' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-navy">Financial Instruments</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Innovative financial solutions to optimize funding, reduce costs, and manage risks in SAF procurement and production.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-navy mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        ABS Structuring
                      </h4>
                      <p className="text-gray-600 text-sm pl-5">Financing large contracts through asset-backed securities</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-navy mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Carbon Offset Management
                      </h4>
                      <p className="text-gray-600 text-sm pl-5">Decrease ABS premiums through strategic carbon credit optimization</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-navy mb-2 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        ABS Insurance
                      </h4>
                      <p className="text-gray-600 text-sm pl-5">Comprehensive insurance coverage for asset-backed securities</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-sky-600 to-blue-700 p-8 rounded-2xl text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold">Financial Portfolio</h4>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">OPTIMIZED</div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold">$250M</div>
                        <div className="text-white/80 text-sm">ABS Volume</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold">4.2%</div>
                        <div className="text-white/80 text-sm">Interest Rate</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Cost Reduction</span>
                        <span className="text-xl font-bold text-sustainability">-12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Analytics */}
            {selectedPlatformTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-navy">Advanced Analytics</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Leverage AI-powered analytics for precise price predictions, feedstock optimization, and market intelligence.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-sustainability/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-navy mb-2">Price Predictions</h4>
                      <p className="text-gray-600 text-sm">95% accuracy in 12-month SAF price forecasting</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-sustainability/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-navy mb-2">Feedstock Optimization</h4>
                      <p className="text-gray-600 text-sm">Optimize feedstock selection and supply chain efficiency</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-sky-600 to-blue-700 p-8 rounded-2xl text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold">Analytics Dashboard</h4>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">AI-POWERED</div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">Prediction Accuracy</span>
                        <span className="text-white font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-sustainability h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold">$2.4M</div>
                        <div className="text-white/80 text-sm">Cost Savings</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold">18%</div>
                        <div className="text-white/80 text-sm">Efficiency Gain</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Next-Generation SAF Workflows - Light Design */}
      <section 
        id="features"
        ref={insightsRef}
        className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white"
      >
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
        {/* Subtle decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 -right-16 w-80 h-80 bg-sustainability/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-14 -left-24 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInsightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInsightsInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-sustainability/10 rounded-full px-6 py-3 mb-8 border border-sustainability/20"
            >
              <FiLayers className="mr-2 text-sustainability" />
              <span className="text-navy font-medium">Enterprise-Grade SAF Procurement Platform</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-navy">
              Next-Generation{' '}
              <span className="bg-gradient-to-r from-sustainability to-sky-500 bg-clip-text text-transparent">
                SAF Workflows
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              Comprehensive procurement lifecycle management inspired by enterprise solutions,
              <span className="hidden md:inline"><br /></span>
              <span className="md:hidden"> </span>
              designed specifically for sustainable aviation fuel sourcing.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInsightsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-block text-center"
              >
                Explore Workflows
              </motion.a>
              <motion.a
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary inline-block text-center"
              >
                Watch Demo
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Capabilities - Minimalist White Design */}
      <section className="py-16 bg-white dark:bg-dark-bg relative overflow-hidden">
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
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-3 sm:mb-4">
              Platform Capabilities
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Six core modules that power the future of sustainable aviation fuel procurement
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            {featureSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, borderColor: 'rgba(0, 160, 220, 0.5)' }}
                  className="relative p-8 rounded-xl bg-white border-2 border-gray-100 cursor-pointer group transition-all hover:shadow-lg"
                  onClick={() => setActiveSection(index)}
                >
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8 text-sustainability" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{section.subtitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.description}</p>
                  <div className="mt-4 flex items-center text-sustainability text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <FiArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Procurement Lifecycle Workflows - Modern Roadmap Design */}
      <section ref={workflowsRef} className="py-20 bg-white dark:bg-dark-surface relative overflow-hidden">
        {/* Grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(10, 35, 66, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10, 35, 66, 1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isWorkflowsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16 px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy dark:text-white mb-3 sm:mb-4">
              Procurement Lifecycle Workflows
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Comprehensive P2P (Procure-to-Pay) workflows designed specifically for SAF procurement,
              ensuring compliance, transparency, and efficiency at every step.
            </p>
          </motion.div>

          {/* Roadmap visualization */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting line for roadmap */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sustainability/50 via-sustainability/30 to-sustainability/50" />
              
              <div className="space-y-8">
                {procurementWorkflows.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isWorkflowsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-6">
                      {/* Step number circle */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border-4 border-sustainability flex items-center justify-center shadow-lg">
                          <span className="text-xl sm:text-2xl font-bold text-sustainability">{workflow.step}</span>
                        </div>
                      </div>
                      
                      {/* Content card */}
                      <motion.div
                        whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0, 160, 220, 0.15)' }}
                        className="flex-1 bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm transition-all cursor-pointer"
                        onClick={() => setExpandedWorkflow(expandedWorkflow === workflow.id ? null : workflow.id)}
                      >
                        <h3 className="text-base sm:text-lg font-bold text-navy mb-2">
                          {workflow.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {workflow.description}
                        </p>
                        
                        {expandedWorkflow === workflow.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <div className="flex items-center text-sustainability text-sm">
                              <FiCheck className="mr-2" />
                              <span>Automated workflow with real-time tracking</span>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Platform Features - Minimalist Design */}
      <section ref={platformFeaturesRef} className="py-20 bg-gray-50 dark:bg-dark-bg relative overflow-hidden">
        {/* Subtle grid pattern */}
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
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Advanced Platform Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive tools for every aspect of SAF procurement and management
            </p>
          </motion.div>

          <div className="space-y-16 max-w-6xl mx-auto">
            {Object.entries(featureCategories).map(([category, features], categoryIndex) => {
              const section = featureSections.find(s => s.id === category)
              if (!section) return null
              
              const IconComponent = section.icon

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 p-8"
                >
                  <div className="flex items-center mb-8 pb-6 border-b border-gray-100">
                    <div className="p-3 rounded-lg bg-sustainability/10 mr-4">
                      <IconComponent className="w-7 h-7 text-sustainability" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-navy dark:text-white">{section.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{section.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (featureIndex * 0.03) }}
                        whileHover={{ y: -3 }}
                        className="bg-white dark:bg-dark-card p-5 rounded-lg border border-gray-100 hover:border-sustainability/30 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-sustainability rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-navy dark:text-white mb-1.5 text-sm">{feature.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Market Predictions Section */}
      <section className="py-24 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/sky.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/80" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-white">Market Predictions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-white">
              <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">15-20%</div>
              <p className="text-sm sm:text-base md:text-lg">Average procurement cost reduction through AI-optimized timing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-white">
              <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">300%</div>
              <p className="text-sm sm:text-base md:text-lg">Projected SAF market growth over the next 5 years</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-white sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">95%</div>
              <p className="text-sm sm:text-base md:text-lg">AI model prediction accuracy for SAF market trends</p>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <a
              href="https://calendly.com/manthan-sharma-aeronomy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sustainability text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-sustainability/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Get Your Custom Market Analysis
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section - Clean White Design */}
      <section className="py-20 bg-white relative overflow-hidden">
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
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6 px-4">
              Ready to Transform Your SAF Procurement?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              Join leading airlines already using Aeronomy's platform to streamline their 
              sustainable aviation fuel sourcing and compliance workflows.
            </p>
            <div className="flex justify-center px-4">
              <motion.a
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sustainability text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-sustainability/90 transition-colors shadow-lg w-full sm:w-auto inline-block text-center"
              >
                Request Demo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Home 
