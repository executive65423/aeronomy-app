import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Features = () => {
  // Refs for scroll animations
  const featuresRef = useRef(null);
  const insightsRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isInsightsInView = useInView(insightsRef, { once: true, amount: 0.2 });

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
        safpro: 8, // ±8% forecasting error
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
        safpro: 8, // 8 hours/month
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
    },
    {
      title: "Feedstock Optimization Savings",
      description: "Aeronomy's feedstock agility cuts supply-chain costs by 73%, protecting margins without long-term contracts.",
      data: {
        inefficient: 1.2, // $1.20/gallon premium
        safpro: 0.2, // $0.20/gallon premium
      },
      chartType: "heatmap",
      chartComponent: (
        <div className="bg-gray-100 dark:bg-dark-card h-64 w-full rounded-lg flex flex-col items-center justify-center overflow-hidden p-4 relative">
          <div className="grid grid-cols-5 gap-2 h-full w-full p-4">
            {/* Heatmap cells for different regions */}
            <div className="rounded bg-red-600/80 flex items-center justify-center text-white text-xs">
              <span>EU<br/>+$1.20</span>
            </div>
            <div className="rounded bg-orange-500/80 flex items-center justify-center text-white text-xs">
              <span>US<br/>+$0.80</span>
            </div>
            <div className="rounded bg-yellow-500/70 flex items-center justify-center text-black text-xs">
              <span>LATAM<br/>+$0.60</span>
            </div>
            <div className="rounded bg-green-600/70 flex items-center justify-center text-white text-xs">
              <span>CAN<br/>+$0.30</span>
            </div>
            <div className="rounded bg-blue-500/70 flex items-center justify-center text-white text-xs">
              <span>ASIA<br/>+$0.90</span>
            </div>
            
            {/* Aeronomy optimized blend */}
            <div className="col-span-5 mt-4 rounded bg-sustainability/80 h-10 flex items-center justify-center text-white">
              Aeronomy Optimized Blend: +$0.20/gallon
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm p-2 rounded-md text-xs">
            <div className="text-gray-700 dark:text-gray-300 font-semibold mb-1">Price Premium</div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-600/70"></div>
              <div className="w-3 h-3 bg-yellow-500/70"></div>
              <div className="w-3 h-3 bg-orange-500/80"></div>
              <div className="w-3 h-3 bg-red-600/80"></div>
              <span className="ml-1 text-gray-700 dark:text-gray-300">Low → High</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Regulatory Subsidy Capture",
      description: "Aeronomy uncovers $800k–$1.5M/year in hidden subsidies for mid-sized airlines.",
      data: {
        manual: 65, // 65% of eligible subsidies
        safpro: 92, // 92% of eligible subsidies
      },
      chartType: "pie",
      chartComponent: (
        <div className="bg-gray-100 dark:bg-dark-card h-64 w-full rounded-lg flex items-center justify-center overflow-hidden p-4 relative">
          <div className="flex items-center justify-around w-full">
            {/* Manual capture pie */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E0E0E0"
                    strokeWidth="3"
                    className="dark:stroke-gray-700"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="3"
                    strokeDasharray="65, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  65%
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Traditional</div>
            </div>
            
            {/* Aeronomy capture pie */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E0E0E0"
                    strokeWidth="3"
                    className="dark:stroke-gray-700"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00A0DC"
                    strokeWidth="3"
                    strokeDasharray="92, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  92%
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Aeronomy</div>
            </div>
          </div>
          
          {/* Extra info */}
          <div className="absolute bottom-4 text-center text-xs text-gray-600 dark:text-gray-400 w-full">
            Missed subsidies: $0.40-$0.90/gallon
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28"
        style={{
          backgroundImage: "url('/images/aviation.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Hero overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-sustainability/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Advanced Features for SAF Procurement
            </h1>
            <p className="text-xl text-white/90">
              Leverage cutting-edge AI technology to optimize your Sustainable Aviation Fuel strategy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div 
            ref={featuresRef}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="card p-8 flex flex-col items-start hover:translate-y-[-5px]"
                >
                  <div className="mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-navy dark:text-white">{feature.title}</h3>
                  <p className="text-gray-700 dark:text-dark-text-secondary">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Insights Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Data-Driven Insights</h2>
            <p className="text-gray-700 dark:text-dark-text-secondary">
              Explore how Aeronomy delivers measurable value through predictive analytics, automation, and regulatory intelligence.
            </p>
          </div>
          
          <div 
            ref={insightsRef}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 gap-16">
              {insights.map((insight, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInsightsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.7, delay: index * 0.3 }}
                  className="bg-white dark:bg-dark-bg rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-navy dark:text-white">{insight.title}</h3>
                    <p className="text-gray-700 dark:text-dark-text-secondary mb-8">{insight.description}</p>
                    
                    {/* Chart component */}
                    {insight.chartComponent}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8 border-2 border-sustainability"
            >
              <h2 className="text-2xl font-bold mb-4 text-navy dark:text-white">Pilot Case Study</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-navy dark:text-white mb-2">Client</h4>
                  <p className="text-gray-700 dark:text-dark-text-secondary">Mid-sized airline (5M passengers/year, $1.2B revenue)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy dark:text-white mb-2">Duration</h4>
                  <p className="text-gray-700 dark:text-dark-text-secondary">6-month SaaS pilot</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy dark:text-white mb-2">ROI</h4>
                  <p className="text-gray-700 dark:text-dark-text-secondary">6.2x return ($1.1M savings vs. $180k SaaS cost)</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-dark-surface p-4 rounded-lg">
                  <h4 className="font-semibold text-navy dark:text-white mb-2">Cost Avoidance</h4>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold text-sustainability">$1.1M</div>
                    <div className="ml-3 text-gray-700 dark:text-dark-text-secondary">via accurate price forecasts and feedstock swaps</div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-surface p-4 rounded-lg">
                  <h4 className="font-semibold text-navy dark:text-white mb-2">Labor Savings</h4>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold text-sustainability">75%</div>
                    <div className="ml-3 text-gray-700 dark:text-dark-text-secondary">reduction in procurement team hours</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card dark:bg-dark-card"
            >
              <h3 className="text-xl font-bold mb-4 text-sustainability">TensorFlow</h3>
              <p className="text-gray-700 dark:text-dark-text-secondary">
                Advanced machine learning models for accurate price forecasting and market analysis
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card dark:bg-dark-card"
            >
              <h3 className="text-xl font-bold mb-4 text-sustainability">AWS SageMaker</h3>
              <p className="text-gray-700 dark:text-dark-text-secondary">
                Scalable cloud infrastructure for real-time data processing and model deployment
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card dark:bg-dark-card"
            >
              <h3 className="text-xl font-bold mb-4 text-sustainability">CORSIA Integration</h3>
              <p className="text-gray-700 dark:text-dark-text-secondary">
                Seamless integration with carbon offset tracking and compliance reporting
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features 