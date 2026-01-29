import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Newsletter = () => {
  return (
    <div className="pt-20 bg-white relative overflow-hidden">
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto pt-12 pb-8"
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-sustainability/10 text-sustainability rounded-full text-sm font-semibold mb-4">
              Joint Press Release
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
            Yoki Green Energy and Aeronomy Announce Partnership to Enable 50,000 Metric Tons of SAF Offtake from 2027
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm sm:text-base">
            <time dateTime="2026-01-15">January 15, 2026</time>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <img
            src="/images/pr.png"
            alt="Aeronomy Platform"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto pb-16">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-medium mb-6">
              <strong>15 January 2026</strong> — Yoki Green Energy (part of the CIST Technologies ecosystem – <a href="https://www.cistech.in" target="_blank" rel="noopener noreferrer" className="text-sustainability hover:underline">www.cistech.in</a>), 
              is a green fuels producer converting agricultural waste and biomass into green methanol, green ammonia, 
              and sustainable aviation fuel (SAF), and Aeronomy, a compliance-first SAF procurement and marketplace 
              platform, today announced a strategic partnership to support scalable, auditable SAF procurement for 
              airline and aviation stakeholders.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Under this partnership, Yoki Green is committing <strong>50,000 metric tons of FT-SPK SAF</strong> 
              (Fischer-Tropsch Synthetic Paraffinic Kerosene) produced from biomass, with supply ready for offtake 
              from 2027. Aeronomy will onboard Yoki onto its platform to help buyers discover available volumes, 
              complete compliance diligence efficiently, and manage documentation required for procurement and 
              sustainability claims.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              SAF adoption is accelerating globally as mandates expand and airlines face growing pressure to secure 
              supply and demonstrate proof of sustainability. Yet procurement workflows remain fragmented—often relying 
              on bilateral negotiations, manual due diligence, and certificate data spread across systems. This 
              partnership combines Yoki's committed SAF volumes with Aeronomy's compliance-grade procurement 
              infrastructure to reduce friction across the full commercial and documentation lifecycle.
            </p>
          </motion.section>

          {/* What the Partnership Enables */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6 mt-12">
              What the Partnership Enables
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Through this collaboration, Yoki will onboard onto Aeronomy's platform to support:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-lg text-gray-700">
                  <strong>Structured supply visibility</strong> for qualified buyers (lots and/or RFQs), enabling faster discovery and evaluation
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-lg text-gray-700">
                  <strong>Standardized due diligence workflows</strong>, reducing repetitive compliance checks across new counterparties
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-lg text-gray-700">
                  <strong>Centralized certificate and evidence management</strong>, improving traceability and audit readiness
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-sustainability rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-lg text-gray-700">
                  <strong>Streamlined contracting workflows</strong>, supporting both near-term discussions and long-term offtake planning
                </span>
              </li>
            </ul>
          </motion.section>

          {/* Leadership Commentary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6 mt-12">
              Leadership Commentary
            </h2>
            <blockquote className="border-l-4 border-sustainability pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
              <p className="text-lg text-gray-800 italic mb-4">
                "SAF procurement is becoming a compliance problem, not just a purchasing problem. 
                Yoki Green Energy's 50,000-metric-ton commitment from 2027 is exactly the type of 
                supply that needs structured, verifiable procurement rails so buyers can contract 
                with confidence."
              </p>
              <cite className="text-navy font-semibold">— Manthan Sharma, Founder, Aeronomy</cite>
            </blockquote>
            <blockquote className="border-l-4 border-sustainability pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
              <p className="text-lg text-gray-800 italic mb-4">
                "As SAF scales, producers and buyers need a faster path from supply and diligence 
                to contracting—without compromising on traceability. Partnering with Aeronomy helps 
                package our volumes and documentation in a buyer-ready, audit-friendly format."
              </p>
              <cite className="text-navy font-semibold">— Chirag Rawat and Suyash Agrawal, Promoters at CIST and Yoki</cite>
            </blockquote>
          </motion.section>

          {/* Partnership Highlights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 bg-gradient-to-br from-navy to-navy-dark text-white p-8 sm:p-12 rounded-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Partnership Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-sustainability mb-2">50,000</div>
                <p className="text-white/90 text-lg">Metric tons of FT-SPK SAF committed</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-sustainability mb-2">2027</div>
                <p className="text-white/90 text-lg">Supply ready for offtake</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-white/90 text-lg">
                This partnership enables structured, verifiable SAF procurement with compliance-grade 
                documentation and streamlined workflows for airlines and aviation stakeholders.
              </p>
            </div>
          </motion.section>


          {/* About Sections */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
                  About Yoki Green Energy
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Yoki is a green fuels producer converting agricultural waste and biomass into green 
                  methanol, green ammonia, and sustainable aviation fuel (SAF), accelerating India's 
                  Net Zero targets.
                </p>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
                  About Aeronomy
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Aeronomy is a compliance-first SAF procurement operating system that helps buyers 
                  discover, contract, and track SAF transactions with audit-grade documentation and 
                  structured workflows.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
              Ready to Transform Your SAF Procurement?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join leading airlines already using Aeronomy's platform to streamline their sustainable 
              aviation fuel sourcing and compliance workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/manthan-sharma-aeronomy/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-sustainability hover:bg-sustainability/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Request a Demo
              </a>
              <Link
                to="/solutions"
                className="inline-block bg-white hover:bg-gray-50 text-navy border-2 border-navy px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                View Solutions
              </Link>
            </div>
          </motion.section>

          {/* Media Contacts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12 bg-gray-50 p-8 rounded-2xl border border-gray-200"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6">
              Media Contacts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-navy mb-3">Yoki Green Energy</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Chirag Rawat, Promoter</strong>
                </p>
                <p className="text-gray-700">
                  📧 <a href="mailto:chirag@cistech.in" className="text-sustainability hover:underline">chirag@cistech.in</a>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy mb-3">Aeronomy</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Manthan Sharma, Founder</strong>
                </p>
                <p className="text-gray-700">
                  📧 <a href="mailto:manthan.sharma@aeronomy.co" className="text-sustainability hover:underline">manthan.sharma@aeronomy.co</a>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600"
          >
            <p className="text-lg font-semibold text-navy mb-4">— END —</p>
            <p className="mt-4 text-sm">
              © 2026 Aeronomy. All rights reserved.
            </p>
          </motion.footer>
        </article>
      </div>
    </div>
  );
};

export default Newsletter;
