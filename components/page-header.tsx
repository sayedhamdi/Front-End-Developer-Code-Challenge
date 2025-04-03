"use client"

import { motion } from "framer-motion"

type PageHeaderProps = {
  darkMode: boolean
}

export function PageHeader({ darkMode }: PageHeaderProps) {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h1 className={`text-3xl font-bold mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>
        Choose Your Skip Size
      </h1>
      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
        Select the skip size that best suits your needs for <span className="font-semibold">NR32, Lowestoft</span>
      </p>
    </motion.div>
  )
}

