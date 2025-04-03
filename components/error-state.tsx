"use client"

import { AlertTriangle } from "lucide-react"

type ErrorStateProps = {
  darkMode: boolean
  error: string
  retry: () => void
}

export function ErrorState({ darkMode, error, retry }: ErrorStateProps) {
  return (
    <div
      className={`p-6 rounded-lg text-center mb-8 ${
        darkMode ? "bg-red-900/30 text-red-200" : "bg-red-100 text-red-800"
      }`}
    >
      <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
      <h3 className="text-xl font-medium mb-2">Error Loading Data</h3>
      <p className="mb-4">{error}</p>
      <button
        onClick={retry}
        className={`px-4 py-2 rounded-lg ${
          darkMode ? "bg-red-700 hover:bg-red-600" : "bg-red-600 hover:bg-red-700"
        } text-white`}
      >
        Try Again
      </button>
    </div>
  )
}

