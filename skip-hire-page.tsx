"use client";

import { useState, useEffect } from "react";
import { MapPin, Calendar, CheckCircle, Shield } from "lucide-react";

// Import components
import { ThemeToggle } from "./components/theme-toggle";
import { ProgressSteps } from "./components/progress-steps";
import { MobileProgress } from "./components/mobile-progress";
import { PageHeader } from "./components/page-header";
import { PriceFilter } from "./components/price-filter";
import { SkipCard } from "./components/skip-card";
import { NoResults } from "./components/no-results";
import { LoadingState } from "./components/loading-state";
import { ErrorState } from "./components/error-state";
import { CheckoutBar } from "./components/checkout-bar";

export default function SkipHirePage() {
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "recommended">(
    "asc"
  );
  const [skipData, setSkipData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(2); // "Select Skip" is active

  useEffect(() => {
    // Check system preference for dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }

    // Fetch skip data
    fetchSkipData();
  }, []);

  const fetchSkipData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Real API call to fetch skip data
      const response = await fetch(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      setSkipData(data);

      // Set first skip as selected by default if available
      if (data.length > 0) {
        setSelectedSkip(data[0].id);
      }
    } catch (err) {
      console.error("Error fetching skip data:", err);
      setError("Failed to load skip data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: "postcode", label: "Postcode", icon: MapPin, completed: true },
    {
      id: "waste-type",
      label: "Waste Type",
      icon: CheckCircle,
      completed: true,
    },
    {
      id: "select-skip",
      label: "Select Skip",
      icon: CheckCircle,
      completed: true,
      active: true,
    },
    {
      id: "permit-check",
      label: "Permit Check",
      icon: Shield,
      completed: false,
    },
    {
      id: "choose-date",
      label: "Choose Date",
      icon: Calendar,
      completed: false,
    },
    { id: "payment", label: "Payment", icon: CheckCircle, completed: false },
  ];

  // Calculate total price with VAT
  const calculateTotalPrice = (
    priceBeforeVat: number,
    vatPercentage: number
  ) => {
    const vatAmount = (priceBeforeVat * vatPercentage) / 100;
    return priceBeforeVat + vatAmount;
  };

  // Filter and sort skips
  const filteredSkips = skipData
    .filter((skip) => {
      const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
      return totalPrice >= priceRange[0] && totalPrice <= priceRange[1];
    })
    .sort((a, b) => {
      // Sort by recommended/popular first if in recommended sort order
      if (sortOrder === "recommended") {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
      }

      // Then sort by price
      const priceA = calculateTotalPrice(a.price_before_vat, a.vat);
      const priceB = calculateTotalPrice(b.price_before_vat, b.vat);
      return sortOrder === "asc"
        ? priceA - priceB
        : sortOrder === "desc"
        ? priceB - priceA
        : 0;
    });

  // Get selected skip details
  const selectedSkipDetails = skipData.find((skip) => skip.id === selectedSkip);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 1500]);
  };

  return (
    <div
      className={`min-h-screen relative ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Theme Toggle */}
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 pb-24 relative z-10">
        {/* Progress Steps - Desktop with Sliding */}
        <ProgressSteps
          steps={steps}
          activeStepIndex={activeStepIndex}
          darkMode={darkMode}
        />

        {/* Progress Steps - Mobile */}
        <MobileProgress steps={steps} darkMode={darkMode} />

        {/* Main Content */}
        <PageHeader darkMode={darkMode} />

        {/* Loading State */}
        {loading && <LoadingState darkMode={darkMode} />}

        {/* Error State */}
        {error && (
          <ErrorState darkMode={darkMode} error={error} retry={fetchSkipData} />
        )}

        {/* Filters */}
        {!loading && !error && (
          <PriceFilter
            darkMode={darkMode}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        )}

        {/* Skip Options Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredSkips.length > 0 ? (
              filteredSkips.map((skip, index) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  index={index}
                  isSelected={selectedSkip === skip.id}
                  darkMode={darkMode}
                  onSelect={setSelectedSkip}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))
            ) : (
              <NoResults darkMode={darkMode} resetFilters={resetFilters} />
            )}
          </div>
        )}
      </div>

      {/* Fixed Checkout Bar */}
      <CheckoutBar
        darkMode={darkMode}
        selectedSkipDetails={selectedSkipDetails}
        calculateTotalPrice={calculateTotalPrice}
      />
    </div>
  );
}
