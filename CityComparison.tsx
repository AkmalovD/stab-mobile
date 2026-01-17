'use client'

import { City } from '@/types';
import { citiesData, searchCities } from '@/utils/data';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CityCard from './CityCard';
import CostBreakdown from './CostBreakdown';
import CurrencyConverter from './CurrencyConverter';
import VisualComparison from './VisualComparison';

const CityComparison: React.FC = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [availableCities] = useState<City[]>(citiesData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const searchParams = useSearchParams();

  // Handle URL parameters for pre-selection
  useEffect(() => {
    const searchQuery = searchParams?.get('search');
    const cityQuery = searchParams?.get('city');
    
    if (searchQuery) {
      const foundCities = searchCities(searchQuery);
      if (foundCities.length > 0) {
        setSelectedCities([foundCities[0].id]);
      }
    } else if (cityQuery) {
      const foundCity = availableCities.find(city => 
        city.name.toLowerCase() === cityQuery.toLowerCase()
      );
      if (foundCity) {
        setSelectedCities([foundCity.id]);
      }
    }
  }, [searchParams, availableCities]);

  const handleCitySelect = (cityId: string) => {
    setSelectedCities(prev => {
      if (prev.includes(cityId)) {
        return prev.filter(id => id !== cityId);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), cityId];
        }
        return [...prev, cityId];
      }
    });
  };

  const selectedCityData = availableCities.filter(city => 
    selectedCities.includes(city.id)
  );

  const filteredCities = availableCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCities = showAllCities ? filteredCities : filteredCities.slice(0, 6);

  const clearSelection = () => {
    setSelectedCities([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white px-4 md:px-10 lg:px-40 py-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#0d171b] mb-2">
                City Comparison Tool
              </h1>
              <p className="text-[#4c809a] text-base leading-relaxed">
                Compare living costs, tuition fees, and opportunities across different study destinations. Select up to 4 cities for detailed analysis.
              </p>
            </div>
          </div>

          {selectedCities.length > 0 && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg bg-[#0d98ba]/10 border border-[#0d98ba]/20">
                  <span className="text-sm font-bold text-[#0d98ba]">
                    {selectedCities.length} / 4 Cities Selected
                  </span>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-white text-[#0d98ba] border border-[#0d98ba]/20 hover:bg-[#0d98ba] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* City Selection Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#0d171b]">
              Select Cities to Compare
            </h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4c809a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city or country name..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] text-[#0d171b]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4c809a] hover:text-[#0d98ba]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Cities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {displayedCities.map(city => (
              <CityCard
                key={city.id}
                city={city}
                isSelected={selectedCities.includes(city.id)}
                onSelect={() => handleCitySelect(city.id)}
              />
            ))}
          </div>

          {filteredCities.length > 6 && (
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-white text-[#0d98ba] border border-[#0d98ba]/20 hover:bg-[#0d98ba] hover:text-white transition-colors"
            >
              <span>{showAllCities ? 'Show Less' : `Show All ${filteredCities.length} Cities`}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showAllCities ? 'rotate-180' : ''}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          )}

          {filteredCities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-[#4c809a]">No cities found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Comparison Results */}
        {selectedCityData.length > 0 ? (
          <>
            {/* Cost Breakdown Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#0d171b]">
                  Cost Breakdown Comparison
                </h2>
              </div>
              <CostBreakdown cities={selectedCityData} />
            </div>

            {/* Visual Analysis Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#0d171b]">
                  Visual Cost Analysis
                </h2>
              </div>
              <VisualComparison cities={selectedCityData} />
            </div>

            {/* Tips Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#0d171b]">
                  Smart Comparison Tips
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d98ba]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0d171b] mb-1">Budget Planning</h4>
                      <p className="text-sm text-[#4c809a]">Include all expenses: accommodation, food, transport, tuition, and personal costs.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d98ba]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3v18h18"/>
                        <path d="m19 9-5 5-4-4-3 3"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0d171b] mb-1">Currency Fluctuation</h4>
                      <p className="text-sm text-[#4c809a]">Exchange rates vary over time. Plan with a buffer for currency changes.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d98ba]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0d171b] mb-1">Hidden Costs</h4>
                      <p className="text-sm text-[#4c809a]">Remember visa fees, health insurance, textbooks, and emergency funds.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d98ba]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0d171b] mb-1">Quality of Life</h4>
                      <p className="text-sm text-[#4c809a]">Consider climate, culture, language barriers, and social opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-2xl p-16 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#0d98ba]/10 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0d171b] mb-3">
                Ready to Compare Cities?
              </h3>
              <p className="text-[#4c809a] max-w-md mb-6 text-base">
                Select cities from above to see detailed cost comparisons, living expenses, and educational opportunities side by side.
              </p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d98ba]/10 border border-[#0d98ba]/20">
                <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span className="text-sm font-semibold text-[#0d98ba]">
                  Select up to 4 cities to begin
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Currency Converter Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <CurrencyConverter />
        </div>

      </div>
    </div>
  );
};

export default CityComparison;