"use client"

import { Loader2 } from "lucide-react"

type LoadingStateProps = {
  darkMode: boolean
}

export function LoadingState({ darkMode }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className={`w-12 h-12 animate-spin ${darkMode ? "text-green-500" : "text-green-600"}`} />
      <p className="mt-4 text-lg">Loading skip options...</p>
    </div>
  )
}

