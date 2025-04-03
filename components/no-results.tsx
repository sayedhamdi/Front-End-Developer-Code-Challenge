"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

type NoResultsProps = {
  darkMode: boolean
  resetFilters: () => void
}

export function NoResults({ darkMode, resetFilters }: NoResultsProps) {
  return (
    <motion.div
      className={`col-span-full p-8 rounded-xl text-center ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AlertTriangle className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-amber-500" : "text-amber-500"}`} />
      <h3 className="text-xl font-medium mb-2">No skips match your filters</h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-4`}>
        Try adjusting your price range to see more options
      </p>
      <button
        onClick={resetFilters}
        className={`px-4 py-2 rounded-lg ${
          darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
        } text-white`}
      >
        Reset Filters
      </button>
    </motion.div>
  )
}

