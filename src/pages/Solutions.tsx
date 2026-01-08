import { motion } from 'framer-motion'
import { 
  FiCheck, FiShield, FiShoppingCart, FiFileText, FiAward, 
  FiPackage, FiTrendingUp, FiArchive, FiActivity, FiAlertCircle,
  FiDollarSign, FiTruck, FiBarChart2, FiShare2, FiSettings,
  FiEye, FiCode, FiCloud
} from 'react-icons/fi'

const Solutions = () => {
  // Solution modules data
  const solutionModules = [
    {
      title: 'Producer Onboarding and Compliance',
      audience: 'SAF producers',
      purpose: 'Structured onboarding with region and pathway specific checks.',
      capabilities: [
        'Dynamic forms by pathway and geography',
        'Certificate intake and validation',
        'Facility and capacity registry'
      ],
      icon: FiCheck,
      color: 'from-sky-600 to-blue-700'
    },
    {
      title: 'Airline Compliance Profile',
      audience: 'Airlines and corporate flyers',
      purpose: 'Centralize mandates, targets, and eligible pathways per region.',
      capabilities: [
        'Mandate templates for EU, UK, US, Singapore',
        'Target planning',
        'Exception workflows and approver routing'
      ],
      icon: FiShield,
      color: 'from-sustainability to-sky-500'
    },
    {
      title: 'RFQ and Procurement Marketplace',
      audience: 'Buyers and producers',
      purpose: 'Standardized tendering for SAF supply.',
      capabilities: [
        'RFQ wizard with specs and CI targets',
        'Supplier notification',
        'Eligibility gating based on certification and capacity'
      ],
      icon: FiShoppingCart,
      color: 'from-sky-600 to-blue-700'
    },
    {
      title: 'Bid Comparison and Award Engine',
      audience: 'Buyers',
      purpose: 'Data-driven evaluation and award.',
      capabilities: [
        'Side-by-side price and CI scoring',
        'Delivery and counterparty risk factors',
        'Audit-ready award rationale'
      ],
      icon: FiAward,
      color: 'from-sky-700 to-blue-800'
    },
    {
      title: 'Contracting and PO Management',
      audience: 'Buyers and producers',
      purpose: 'Generate purchase orders and contract exhibits.',
      capabilities: [
        'Templated terms',
        'Tolerances and milestones',
        'Change orders with approvals'
      ],
      icon: FiFileText,
      color: 'from-sustainability to-blue-600'
    },
    {
      title: 'Book and Claim Allocation',
      audience: 'Airlines and corporate flyers',
      purpose: 'Allocate SAF environmental attributes to flights or portfolios.',
      capabilities: [
        'Batch level allocations',
        'Minimum unit enforcement',
        'Partial allocations with real-time remaining balance'
      ],
      icon: FiPackage,
      color: 'from-sky-500 to-sustainability'
    },
    {
      title: 'Mass Balance and Chain of Custody',
      audience: 'Producers, distributors, auditors',
      purpose: 'Prove that inputs and outputs net out within rules.',
      capabilities: [
        'Multi-leg transfer tracking',
        'Tolerance checks',
        'Exception flags and reconciliation reports'
      ],
      icon: FiTrendingUp,
      color: 'from-sky-600 to-blue-700'
    },
    {
      title: 'Digital Certificate Vault',
      audience: 'All parties',
      purpose: 'Issue and manage verifiable SAF certificates.',
      capabilities: [
        'Tamper-evident signatures',
        'Share links with scoped access',
        'Revocation and version history'
      ],
      icon: FiArchive,
      color: 'from-sustainability to-sky-500'
    },
    {
      title: 'Emissions Accounting and Reporting',
      audience: 'Airlines, corporates, regulators',
      purpose: 'Accurate CI and compliance reporting.',
      capabilities: [
        'CORSIA and EU ETS ready exports',
        'Well-to-wake factors',
        'Audit trails and attestations'
      ],
      icon: FiActivity,
      color: 'from-sky-600 to-blue-700'
    },
    {
      title: 'Risk and Counterparty Due Diligence',
      audience: 'Buyers and financiers',
      purpose: 'Reduce counterparty and fraud risk.',
      capabilities: [
        'KYC and sanction checks',
        'Certificate provenance graph',
        'Anomaly detection on capacity, pricing, and transfers'
      ],
      icon: FiAlertCircle,
      color: 'from-sky-700 to-blue-800'
    },
    {
      title: 'Financing and Escrow',
      audience: 'Buyers, producers, finance partners',
      purpose: 'Enable milestone based payments and optional prepayment structures.',
      capabilities: [
        'Escrow triggers on delivery proofs',
        'Indicative ABS calculator',
        'Disbursement workflow with audit'
      ],
      icon: FiDollarSign,
      color: 'from-sustainability to-blue-600'
    },
    {
      title: 'Inventory and Delivery Scheduling',
      audience: 'Producers and logistics teams',
      purpose: 'Plan batches, windows, and delivery commitments.',
      capabilities: [
        'Slot calendar',
        'Conflicts and delays alerts',
        'ASN and GRN hooks for confirmations'
      ],
      icon: FiTruck,
      color: 'from-sky-500 to-sustainability'
    },
    {
      title: 'Analytics and Market Intelligence',
      audience: 'All commercial users',
      purpose: 'Visibility on prices, CI distributions, capacity, and demand.',
      capabilities: [
        'Bid and award analytics',
        'Benchmark dashboards',
        'Route and mandate exposure views'
      ],
      icon: FiBarChart2,
      color: 'from-sky-600 to-blue-700'
    },
    {
      title: 'Integration Hub and APIs',
      audience: 'IT teams',
      purpose: 'Connect Aeronomy to ERP, CRM, storage, and identity.',
      capabilities: [
        'REST and webhooks',
        'SSO and SCIM',
        'Salesforce, SAP, Oracle, SFTP, email connectors'
      ],
      icon: FiShare2,
      color: 'from-sustainability to-sky-500'
    },
    {
      title: 'Admin, RBAC, and Tenant Controls',
      audience: 'Org admins',
      purpose: 'Secure multi-tenant control and least-privilege access.',
      capabilities: [
        'Role templates per party type',
        'Feature flags',
        'Billing and entitlements'
      ],
      icon: FiSettings,
      color: 'from-sky-600 to-blue-700'
    },
    {
      title: 'Audit, Logs, and Evidence',
      audience: 'Compliance and internal audit',
      purpose: 'End-to-end traceability of sensitive actions.',
      capabilities: [
        'Append-only logs',
        'Cryptographic evidence bundles',
        'Export for external assurance'
      ],
      icon: FiEye,
      color: 'from-sky-700 to-blue-800'
    },
    {
      title: 'Developer Sandbox',
      audience: 'Partner developers and enterprise IT',
      purpose: 'Safe environment for testing integrations and workflows.',
      capabilities: [
        'Sandbox tenants and data seeding',
        'API keys lifecycle',
        'Rate limits and usage analytics'
      ],
      icon: FiCode,
      color: 'from-sustainability to-blue-600'
    },
    {
      title: 'Carbon Credits and Offsets Bridge',
      audience: 'Airlines and corporates',
      purpose: 'Optional offsets for uncovered emissions.',
      capabilities: [
        'Registry integrations',
        'Custody and retirement proofs',
        'Guardrails to avoid double counting'
      ],
      icon: FiCloud,
      color: 'from-sky-500 to-sustainability'
    }
  ]

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-4 sm:mb-6 px-4">
              Aeronomy Solution Modules
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
              Comprehensive, enterprise-ready modules covering onboarding and compliance, 
              procurement to award, allocation and custody, verifiable certification, reporting, 
              risk management, and integrations. Designed to be compliance-first with clear 
              separation of duties and evidence at every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Modules Grid */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-4">
            {solutionModules.map((module, index) => {
              const IconComponent = module.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start mb-4">
                    <div className="p-3 rounded-lg bg-sustainability/10 mr-3 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-sustainability" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-navy mb-1">
                        {module.title}
                      </h3>
                      <p className="text-xs text-sustainability font-medium">
                        {module.audience}
                      </p>
                    </div>
                  </div>

                  {/* Purpose */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {module.purpose}
                  </p>

                  {/* Capabilities */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">
                      Key Capabilities
                    </div>
                    {module.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-sustainability rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-xs">{capability}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              Discover how Aeronomy's comprehensive solution modules can transform your 
              SAF procurement and compliance workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.a
                href="/#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sustainability text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-sustainability/90 transition-colors shadow-lg inline-block text-center w-full sm:w-auto"
              >
                Request Demo
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-navy border-2 border-navy px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-navy hover:text-white transition-colors inline-block text-center w-full sm:w-auto"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Solutions


