"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, ChevronUp, ChevronDown } from "lucide-react"

type PriceFilterProps = {
  darkMode: boolean
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  sortOrder: "asc" | "desc" | "recommended"
  setSortOrder: (order: "asc" | "desc" | "recommended") => void
}

export function PriceFilter({ darkMode, priceRange, setPriceRange, sortOrder, setSortOrder }: PriceFilterProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100 shadow-sm"
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Sort:</span>
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-3 py-1 text-sm rounded ${
              sortOrder === "asc"
                ? darkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
                : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
            }`}
          >
            Price ↑
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`px-3 py-1 text-sm rounded ${
              sortOrder === "desc"
                ? darkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
                : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
            }`}
          >
            Price ↓
          </button>
          <button
            onClick={() => setSortOrder("recommended")}
            className={`px-3 py-1 text-sm rounded ${
              sortOrder === "recommended"
                ? darkMode
                  ? "bg-green-600 text-white"
                  : "bg-green-500 text-white"
                : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
            }`}
          >
            Recommended
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            className={`p-4 rounded-lg mb-6 ${darkMode ? "bg-gray-800" : "bg-white shadow-sm"}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Price Range (£)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="min-w-16 text-center">{priceRange[0]}</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="min-w-16 text-center">{priceRange[1]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPriceRange([0, 400])}
                className={`px-3 py-1 text-sm rounded-full ${
                  priceRange[0] === 0 && priceRange[1] === 400
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Under £400
              </button>
              <button
                onClick={() => setPriceRange([400, 600])}
                className={`px-3 py-1 text-sm rounded-full ${
                  priceRange[0] === 400 && priceRange[1] === 600
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                £400 - £600
              </button>
              <button
                onClick={() => setPriceRange([600, 1500])}
                className={`px-3 py-1 text-sm rounded-full ${
                  priceRange[0] === 600 && priceRange[1] === 1500
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Over £600
              </button>
              <button
                onClick={() => setPriceRange([0, 1500])}
                className={`px-3 py-1 text-sm rounded-full ${
                  priceRange[0] === 0 && priceRange[1] === 1500
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                All Prices
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

