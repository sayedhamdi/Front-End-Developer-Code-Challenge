"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Truck } from "lucide-react"

type CheckoutBarProps = {
  darkMode: boolean
  selectedSkipDetails: any | null
  calculateTotalPrice: (priceBeforeVat: number, vatPercentage: number) => number
}

export function CheckoutBar({ darkMode, selectedSkipDetails, calculateTotalPrice }: CheckoutBarProps) {
  if (!selectedSkipDetails) return null

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed bottom-0 left-0 right-0 z-40 shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? "bg-green-600" : "bg-green-500"
                } text-white`}
              >
                <Truck className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium">{selectedSkipDetails.size} Yard Skip</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {selectedSkipDetails.hire_period_days} day hire period
                </p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-baseline justify-center md:justify-end">
                <span className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                  £{calculateTotalPrice(selectedSkipDetails.price_before_vat, selectedSkipDetails.vat).toFixed(2)}
                </span>
                <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm ml-2`}>inc. VAT</span>
              </div>
            </div>

            <motion.button
              className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
              } text-white`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Checkout
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

