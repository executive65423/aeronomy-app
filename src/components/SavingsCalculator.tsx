import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'

// Define interfaces for better type safety
interface FormData {
  annualVolume: string;
  currentPrice: string;
  timeline: string;
  region: string;
}

interface SavingsData {
  currentCost: number;
  projectedCost: number;
  totalSavings: number;
}

const SavingsCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    annualVolume: '',
    currentPrice: '',
    timeline: '',
    region: 'North America'
  })

  const [savings, setSavings] = useState<SavingsData>({
    currentCost: 0,
    projectedCost: 0,
    totalSavings: 0
  })

  // Handle input changes with memoized function to prevent unnecessary re-renders
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  // Calculate savings with useCallback to prevent recreation on every render
  const calculateSavings = useCallback(() => {
    const volume = parseFloat(formData.annualVolume)
    const price = parseFloat(formData.currentPrice)
    const months = parseFloat(formData.timeline)

    if (volume && price && months) {
      const currentCost = volume * price
      // Assuming 15-20% savings based on the marketing message
      const savingsPercentage = 0.17
      const projectedCost = currentCost * (1 - savingsPercentage)
      const totalSavings = currentCost - projectedCost

      setSavings({
        currentCost,
        projectedCost,
        totalSavings
      })
    }
  }, [formData.annualVolume, formData.currentPrice, formData.timeline]);

  // Memoize the formatted savings values to prevent unnecessary calculations
  const formattedSavings = useMemo(() => {
    return {
      currentCost: savings.currentCost.toLocaleString(),
      projectedCost: savings.projectedCost.toLocaleString(),
      totalSavings: savings.totalSavings.toLocaleString()
    };
  }, [savings.currentCost, savings.projectedCost, savings.totalSavings]);

  // Determine if form is complete for enabling/disabling calculate button
  const isFormComplete = useMemo(() => {
    return !!formData.annualVolume && !!formData.currentPrice && !!formData.timeline;
  }, [formData.annualVolume, formData.currentPrice, formData.timeline]);

  return (
    <div className="bg-navy/70 rounded-lg shadow-xl border border-sustainability/20 p-6 md:p-8 backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-8 text-white">Interactive Cost Savings Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Annual Fuel Volume (tons)
            </label>
            <input
              type="number"
              name="annualVolume"
              value={formData.annualVolume}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-navy-dark/50 border border-sustainability/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sustainability focus:border-transparent placeholder-white/40"
              placeholder="Enter volume"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Current SAF Price ($/ton)
            </label>
            <input
              type="number"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-navy-dark/50 border border-sustainability/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sustainability focus:border-transparent placeholder-white/40"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Timeline (months)
            </label>
            <input
              type="number"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-navy-dark/50 border border-sustainability/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sustainability focus:border-transparent placeholder-white/40"
              placeholder="Enter timeline"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Region
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-navy-dark/50 border border-sustainability/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sustainability focus:border-transparent"
            >
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 160, 220, 0.9)" }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateSavings}
            disabled={!isFormComplete}
            className={`w-full font-semibold py-3 px-6 rounded-md shadow-lg transition-all duration-200 backdrop-blur-sm text-white
              ${isFormComplete ? 'bg-sustainability/90 hover:bg-sustainability' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Calculate Savings
          </motion.button>
        </div>
        <div className="bg-navy-dark/30 backdrop-blur-lg p-6 rounded-lg border border-white/20 shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-white">Estimated Savings</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Current Cost</span>
              <span className="font-bold text-white text-xl">
                ${formattedSavings.currentCost}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Projected Cost with Aeronomy</span>
              <span className="font-bold text-sustainability text-xl">
                ${formattedSavings.projectedCost}
              </span>
            </div>
            <div className="border-t border-white/20 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Total Savings</span>
                <span className="font-bold text-sustainability text-2xl glow-sustainability">
                  ${formattedSavings.totalSavings}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingsCalculator 