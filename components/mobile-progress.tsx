"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronUp, ChevronDown } from "lucide-react"

type Step = {
  id: string
  label: string
  icon: React.ElementType
  completed: boolean
  active?: boolean
}

type MobileProgressProps = {
  steps: Step[]
  darkMode: boolean
}

export function MobileProgress({ steps, darkMode }: MobileProgressProps) {
  const [mobileNav, setMobileNav] = useState(false)

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav)
  }

  return (
    <motion.div
      className="md:hidden flex items-center justify-between mb-6 py-3 px-4 rounded-xl shadow-md sticky top-4 z-30"
      style={{
        backgroundColor: darkMode ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <motion.div
          className={`flex items-center justify-center rounded-full w-8 h-8 ${
            darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
        </motion.div>
        <span className="ml-2 text-sm font-medium">Select Skip</span>
      </div>

      <button onClick={toggleMobileNav} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
        {mobileNav ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {mobileNav && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-xl shadow-lg z-40"
            style={{
              backgroundColor: darkMode ? "rgb(31, 41, 55)" : "rgb(255, 255, 255)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {steps.map((step) => (
              <div key={step.id} className="flex items-center py-2">
                <motion.div
                  className={`flex items-center justify-center rounded-full w-8 h-8 ${
                    step.active
                      ? darkMode
                        ? "bg-green-600 text-white"
                        : "bg-green-500 text-white"
                      : step.completed
                        ? darkMode
                          ? "bg-green-700 text-white"
                          : "bg-green-600 text-white"
                        : darkMode
                          ? "bg-gray-700 border border-gray-600"
                          : "bg-gray-200 border border-gray-300"
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                </motion.div>
                <span className={`ml-2 text-sm ${step.active ? (darkMode ? "text-green-400" : "text-green-600") : ""}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

