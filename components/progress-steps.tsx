"use client";

import type React from "react";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Step = {
  id: string;
  label: string;
  icon: React.ElementType;
  completed: boolean;
  active?: boolean;
};

type ProgressStepsProps = {
  steps: Step[];
  activeStepIndex: number;
  darkMode: boolean;
};

export function ProgressSteps({
  steps,
  activeStepIndex,
  darkMode,
}: ProgressStepsProps) {
  const navRef = useRef<HTMLDivElement>(null);

  // Slide navigation left
  const slideLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Slide navigation right
  const slideRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`hidden md:block mb-12 sticky top-4 z-30 rounded-xl shadow-md ${
        darkMode ? "bg-gray-800/90" : "bg-white/90"
      } backdrop-blur-md`}
    >
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={slideLeft}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Slide left"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Steps Container */}
        <div
          ref={navRef}
          className="flex overflow-x-auto py-4 px-12 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflow: "hidden",
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`flex items-center whitespace-nowrap mx-4 ${
                index === activeStepIndex ? "scale-110" : ""
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`flex items-center justify-center rounded-full w-10 h-10 ${
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
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <step.icon className="w-5 h-5" />
              </motion.div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step.active
                    ? darkMode
                      ? "text-green-400"
                      : "text-green-600"
                    : ""
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="relative h-0.5 w-12 mx-4">
                  <div
                    className={`absolute inset-0 ${
                      darkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>
                  {step.completed && (
                    <motion.div
                      className={`absolute inset-0 ${
                        darkMode ? "bg-green-700" : "bg-green-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={slideRight}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Slide right"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
