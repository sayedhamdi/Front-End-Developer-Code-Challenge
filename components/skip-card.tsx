"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Truck, Weight, Star, Info } from "lucide-react";

type SkipCardProps = {
  skip: any;
  index: number;
  isSelected: boolean;
  darkMode: boolean;
  onSelect: (id: number) => void;
  calculateTotalPrice: (
    priceBeforeVat: number,
    vatPercentage: number
  ) => number;
};

export function SkipCard({
  skip,
  index,
  isSelected,
  darkMode,
  onSelect,
  calculateTotalPrice,
}: SkipCardProps) {
  const [showSkipDetails, setShowSkipDetails] = useState<boolean>(false);

  // Add null checks for all values that might be null
  const price = skip.price_before_vat || 0;
  const vat = skip.vat || 0;
  const transportCost = skip.transport_cost || 0;
  const totalPrice = calculateTotalPrice(price, vat);

  // Safely format numbers with toFixed
  const formatPrice = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "0.00";
    return value.toFixed(2);
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden relative ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-md ${
        isSelected
          ? `ring-2 ${
              darkMode ? "ring-green-500" : "ring-green-500"
            } ring-offset-2 ${
              darkMode ? "ring-offset-gray-900" : "ring-offset-gray-50"
            }`
          : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      {/* Skip Size Badge */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div
          className={`${
            darkMode ? "bg-green-600" : "bg-green-500"
          } text-white px-3 py-1 rounded-full text-sm font-medium`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {skip.size || "N/A"} Yards
        </motion.div>
      </div>

      {/* Popular/Recommended Badge */}
      {(skip.popular || skip.recommended) && (
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            className={`${
              skip.recommended
                ? "bg-amber-500 text-amber-950"
                : "bg-purple-500 text-white"
            } px-3 py-1 rounded-full text-xs font-bold flex items-center`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Star className="w-3 h-3 mr-1 fill-current" />
            {skip.recommended ? "Recommended" : "Popular"}
          </motion.div>
        </div>
      )}

      {/* Skip Image */}
      <div className="relative">
        <div className="w-full h-48">
          <img
            src="https://sjc.microlink.io/nlvsp4Ca-qeX5M6X2QHGLavHdZATboJeZNxenIsa5gguNKMuBhVNHr79C1qT9XwSkGMXycL90Fd6jxLJHBMd4g.jpeg"
            alt={`${skip.size || ""} Yard Skip`}
            className="w-full h-full object-cover"
          />

          {/* Overlay with Skip Features */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
            <div className="flex flex-wrap gap-2">
              <motion.div
                className={`flex items-center text-xs px-2 py-1 rounded-full ${
                  skip.allowed_on_road
                    ? "bg-green-900/70 text-green-300"
                    : "bg-amber-900/70 text-amber-300"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Truck className="w-3 h-3 mr-1" />
                {skip.allowed_on_road
                  ? "Road Placement"
                  : "Private Property Only"}
              </motion.div>

              <motion.div
                className={`flex items-center text-xs px-2 py-1 rounded-full ${
                  skip.allows_heavy_waste
                    ? "bg-green-900/70 text-green-300"
                    : "bg-amber-900/70 text-amber-300"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Weight className="w-3 h-3 mr-1" />
                {skip.allows_heavy_waste ? "Heavy Waste OK" : "No Heavy Waste"}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium">
            {skip.size || "N/A"} Yard Skip
          </h3>
          <button
            onClick={() => setShowSkipDetails(!showSkipDetails)}
            className={`p-1 rounded-full ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        <p
          className={`${
            darkMode ? "text-gray-400" : "text-gray-500"
          } text-sm mb-4`}
        >
          {skip.hire_period_days || 0} day hire period
        </p>

        {/* Expanded Details */}
        <AnimatePresence>
          {showSkipDetails && (
            <motion.div
              className={`mb-4 text-sm p-3 rounded-lg ${
                darkMode ? "bg-gray-700/50" : "bg-gray-100"
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Area:</span>
                  <span className="font-medium">{skip.area || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Postcode:</span>
                  <span className="font-medium">{skip.postcode || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Price (ex. VAT):</span>
                  <span className="font-medium">
                    £{formatPrice(skip.price_before_vat)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>VAT ({vat}%):</span>
                  <span className="font-medium">
                    £{formatPrice((price * vat) / 100)}
                  </span>
                </li>
                {skip.transport_cost && (
                  <li className="flex justify-between">
                    <span>Transport Cost:</span>
                    <span className="font-medium">
                      £{formatPrice(skip.transport_cost)}
                    </span>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price Information */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span
              className={`text-2xl font-bold ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              £{formatPrice(totalPrice)}
            </span>
            <span
              className={`${
                darkMode ? "text-gray-400" : "text-gray-500"
              } text-sm ml-2`}
            >
              inc. VAT
            </span>
          </div>
          <div
            className={`text-xs ${
              darkMode ? "text-gray-500" : "text-gray-400"
            } mt-1`}
          >
            £{formatPrice(price)} + VAT at {vat}%
          </div>
        </div>

        {/* Selection Button */}
        <motion.button
          onClick={() => onSelect(skip.id)}
          className={`w-full py-2 rounded-lg flex items-center justify-center font-medium ${
            isSelected
              ? darkMode
                ? "bg-green-600 text-white"
                : "bg-green-500 text-white"
              : darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSelected ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Selected
            </motion.span>
          ) : (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Select This Skip
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
