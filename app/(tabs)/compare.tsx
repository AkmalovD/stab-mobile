import type { City, CityLivingCosts } from '@/types/city';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

// ============================================================================
// CONSTANTS & THEME
// ============================================================================
const COLORS = {
  primary: '#0d98ba',
  primaryLight: 'rgba(13, 152, 186, 0.1)',
  primaryBorder: 'rgba(13, 152, 186, 0.2)',
  textPrimary: '#0d171b',
  textSecondary: '#4c809a',
  background: '#f8fafc',
  cardBackground: '#ffffff',
  border: '#e5e7eb',
  sectionBackground: '#f8fafc',
} as const;

const MAX_CITIES = 4;
const INITIAL_DISPLAY_COUNT = 6;

// ============================================================================
// MOCK DATA - Replace with actual data source
// ============================================================================
const citiesData: City[] = [
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    image: '',
    description: 'A global city with world-class universities',
    averageCost: 1800,
    currency: 'GBP',
    livingCosts: {
      accommodation: 1200,
      food: 400,
      transportation: 150,
      entertainment: 200,
      utilities: 150,
      education: 9000,
    },
    metadata: {
      population: '8.9 million',
      language: 'English',
      climate: 'Temperate',
      safetyRating: 8.5,
      studentFriendly: 9.5,
    },
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    image: '',
    description: 'Vibrant city with affordable education',
    averageCost: 1100,
    currency: 'EUR',
    livingCosts: {
      accommodation: 700,
      food: 300,
      transportation: 80,
      entertainment: 150,
      utilities: 100,
      education: 500,
    },
    metadata: {
      population: '3.6 million',
      language: 'German',
      climate: 'Continental',
      safetyRating: 8.0,
      studentFriendly: 9.0,
    },
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: '',
    description: 'City of lights and prestigious institutions',
    averageCost: 1400,
    currency: 'EUR',
    livingCosts: {
      accommodation: 950,
      food: 350,
      transportation: 75,
      entertainment: 180,
      utilities: 120,
      education: 300,
    },
    metadata: {
      population: '2.2 million',
      language: 'French',
      climate: 'Temperate',
      safetyRating: 7.5,
      studentFriendly: 8.5,
    },
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    image: '',
    description: 'Bike-friendly city with English programs',
    averageCost: 1400,
    currency: 'EUR',
    livingCosts: {
      accommodation: 900,
      food: 380,
      transportation: 90,
      entertainment: 160,
      utilities: 130,
      education: 2000,
    },
    metadata: {
      population: '872,000',
      language: 'Dutch',
      climate: 'Maritime',
      safetyRating: 9.0,
      studentFriendly: 9.0,
    },
  },
  {
    id: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    image: '',
    description: 'Cultural capital with excellent quality of life',
    averageCost: 1200,
    currency: 'EUR',
    livingCosts: {
      accommodation: 650,
      food: 320,
      transportation: 50,
      entertainment: 140,
      utilities: 110,
      education: 750,
    },
    metadata: {
      population: '1.9 million',
      language: 'German',
      climate: 'Continental',
      safetyRating: 9.2,
      studentFriendly: 8.8,
    },
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: '',
    description: 'Mediterranean lifestyle and architecture',
    averageCost: 1100,
    currency: 'EUR',
    livingCosts: {
      accommodation: 600,
      food: 280,
      transportation: 60,
      entertainment: 130,
      utilities: 90,
      education: 1500,
    },
    metadata: {
      population: '1.6 million',
      language: 'Spanish/Catalan',
      climate: 'Mediterranean',
      safetyRating: 7.8,
      studentFriendly: 8.5,
    },
  },
  {
    id: 'munich',
    name: 'Munich',
    country: 'Germany',
    image: '',
    description: 'Tech hub with Bavarian culture',
    averageCost: 1350,
    currency: 'EUR',
    livingCosts: {
      accommodation: 850,
      food: 320,
      transportation: 70,
      entertainment: 160,
      utilities: 110,
      education: 150,
    },
    metadata: {
      population: '1.5 million',
      language: 'German',
      climate: 'Continental',
      safetyRating: 9.0,
      studentFriendly: 8.7,
    },
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    image: '',
    description: 'Historic city with affordable living',
    averageCost: 850,
    currency: 'CZK',
    livingCosts: {
      accommodation: 450,
      food: 220,
      transportation: 30,
      entertainment: 100,
      utilities: 80,
      education: 4000,
    },
    metadata: {
      population: '1.3 million',
      language: 'Czech',
      climate: 'Continental',
      safetyRating: 8.5,
      studentFriendly: 8.5,
    },
  },
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    image: '',
    description: 'Spanish capital with rich culture and history',
    averageCost: 1150,
    currency: 'EUR',
    livingCosts: {
      accommodation: 650,
      food: 300,
      transportation: 55,
      entertainment: 140,
      utilities: 95,
      education: 1200,
    },
    metadata: {
      population: '3.3 million',
      language: 'Spanish',
      climate: 'Mediterranean',
      safetyRating: 8.0,
      studentFriendly: 8.6,
    },
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    image: '',
    description: 'Ancient city with renowned universities',
    averageCost: 1250,
    currency: 'EUR',
    livingCosts: {
      accommodation: 750,
      food: 350,
      transportation: 65,
      entertainment: 150,
      utilities: 110,
      education: 1000,
    },
    metadata: {
      population: '2.8 million',
      language: 'Italian',
      climate: 'Mediterranean',
      safetyRating: 7.5,
      studentFriendly: 8.3,
    },
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    image: '',
    description: 'Coastal city with growing tech scene',
    averageCost: 950,
    currency: 'EUR',
    livingCosts: {
      accommodation: 550,
      food: 250,
      transportation: 45,
      entertainment: 120,
      utilities: 85,
      education: 1100,
    },
    metadata: {
      population: '505,000',
      language: 'Portuguese',
      climate: 'Mediterranean',
      safetyRating: 8.5,
      studentFriendly: 8.7,
    },
  },
];

// City images mapping
const cityImages: Record<string, any> = {
  'london': { uri: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200&h=200&fit=crop' },
  'berlin': { uri: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=200&h=200&fit=crop' },
  'paris': { uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=200&fit=crop' },
  'amsterdam': { uri: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=200&h=200&fit=crop' },
  'vienna': { uri: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=200&h=200&fit=crop' },
  'barcelona': { uri: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=200&h=200&fit=crop' },
  'munich': { uri: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=200&h=200&fit=crop' },
  'prague': { uri: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=200&h=200&fit=crop' },
  'madrid': { uri: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&h=200&fit=crop' },
  'rome': { uri: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&h=200&fit=crop' },
  'lisbon': { uri: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=200&h=200&fit=crop' },
};

// ============================================================================
// CITY CARD COMPONENT
// ============================================================================
interface CityCardProps {
  city: City;
  isSelected: boolean;
  onSelect: () => void;
  isGridView?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({ city, isSelected, onSelect, isGridView = false }) => {
  const handlePress = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onSelect();
  }, [onSelect]);

  return (
    <TouchableOpacity
      style={[
        isGridView ? styles.cityCardGrid : styles.cityCard,
        isSelected && styles.cityCardSelected
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cityCardContent}>
        {/* City Image */}
        <View style={styles.cityImageWrapper}>
          <Image
            source={cityImages[city.id] || { uri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=200&fit=crop' }}
            style={styles.cityImage}
          />
          {isSelected && (
            <View style={styles.checkBadge}>
              <Ionicons name="checkmark" size={14} color="#fff" />
            </View>
          )}
        </View>
        {/* City Info */}
        <View style={styles.cityInfo}>
          <Text style={[styles.cityName, isSelected && styles.cityNameSelected]} numberOfLines={1}>
            {city.name}
          </Text>
          <Text style={styles.cityCountry} numberOfLines={1}>{city.country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ============================================================================
// COST BREAKDOWN COMPONENT
// ============================================================================
interface CostBreakdownProps {
  cities: City[];
}

const costCategories: { key: keyof CityLivingCosts; label: string; icon: string }[] = [
  { key: 'accommodation', label: 'Accommodation', icon: 'home-outline' },
  { key: 'food', label: 'Food & Groceries', icon: 'fast-food-outline' },
  { key: 'transportation', label: 'Transportation', icon: 'bus-outline' },
  { key: 'utilities', label: 'Utilities', icon: 'flash-outline' },
  { key: 'entertainment', label: 'Entertainment', icon: 'film-outline' },
  { key: 'education', label: 'Education/Year', icon: 'school-outline' },
];

const CostBreakdown: React.FC<CostBreakdownProps> = ({ cities }) => {
  const getMaxCost = (key: keyof CityLivingCosts) => {
    return Math.max(...cities.map(c => c.livingCosts[key]));
  };

  return (
    <View style={styles.costBreakdown}>
      {/* Header Row */}
      <View style={styles.costHeader}>
        <View style={styles.costLabelColumn}>
          <Text style={styles.costHeaderLabel}>Category</Text>
        </View>
        {cities.map(city => (
          <View key={city.id} style={styles.costValueColumn}>
            <Text style={styles.costHeaderCity} numberOfLines={1}>
              {city.name}
            </Text>
          </View>
        ))}
      </View>

      {/* Cost Rows */}
      {costCategories.map((category, index) => {
        const maxCost = getMaxCost(category.key);
        return (
          <View
            key={category.key}
            style={[
              styles.costRow,
              index === costCategories.length - 1 && styles.costRowLast,
            ]}
          >
            <View style={styles.costLabelColumn}>
              <View style={styles.costLabelContent}>
                <Ionicons
                  name={category.icon as any}
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.costLabel}>{category.label}</Text>
              </View>
            </View>
            {cities.map(city => {
              const cost = city.livingCosts[category.key];
              const isMax = cost === maxCost && cities.length > 1;
              const isMin = cost === Math.min(...cities.map(c => c.livingCosts[category.key])) && cities.length > 1;
              return (
                <View key={city.id} style={styles.costValueColumn}>
                  <Text
                    style={[
                      styles.costValue,
                      isMax && styles.costValueHigh,
                      isMin && styles.costValueLow,
                    ]}
                  >
                    €{cost.toLocaleString()}
                    {category.key === 'education' ? '/yr' : '/mo'}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}

      {/* Total Row */}
      <View style={styles.costTotalRow}>
        <View style={styles.costLabelColumn}>
          <Text style={styles.costTotalLabel}>Monthly Total</Text>
        </View>
        {cities.map(city => {
          const total = Object.entries(city.livingCosts)
            .filter(([key]) => key !== 'education')
            .reduce((sum, [, val]) => sum + val, 0);
          return (
            <View key={city.id} style={styles.costValueColumn}>
              <Text style={styles.costTotalValue}>€{total.toLocaleString()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// ============================================================================
// VISUAL COMPARISON COMPONENT - PIE CHART CARDS
// ============================================================================

// Pie chart category config
const pieCategories: { key: keyof CityLivingCosts; label: string; color: string }[] = [
  { key: 'accommodation', label: 'Housing', color: '#3B82F6' },
  { key: 'food', label: 'Food', color: '#10B981' },
  { key: 'transportation', label: 'Transport', color: '#8B5CF6' },
  { key: 'entertainment', label: 'Entertainment', color: '#F59E0B' },
  { key: 'utilities', label: 'Utilities', color: '#6B7280' },
];

interface DonutChartProps {
  data: { value: number; color: string }[];
  size: number;
  strokeWidth: number;
  centerContent: React.ReactNode;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, size, strokeWidth, centerContent }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let accumulatedOffset = 0;
  
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {data.map((item, index) => {
            const percentage = item.value / total;
            const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`;
            const strokeDashoffset = -accumulatedOffset;
            accumulatedOffset += circumference * percentage;
            
            return (
              <Circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
              />
            );
          })}
        </G>
      </Svg>
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
        {centerContent}
      </View>
    </View>
  );
};

interface CityPieCardProps {
  city: City;
}

const CityPieCard: React.FC<CityPieCardProps> = ({ city }) => {
  const chartSize = 150;
  
  const getMonthlyTotal = () => {
    return pieCategories.reduce((sum, cat) => sum + city.livingCosts[cat.key], 0);
  };
  
  const total = getMonthlyTotal();
  
  const chartData = pieCategories.map(cat => ({
    value: city.livingCosts[cat.key],
    color: cat.color,
  }));
  
  return (
    <View style={styles.pieCard}>
      {/* Donut Chart */}
      <View style={styles.pieChartWrapper}>
        <DonutChart
          data={chartData}
          size={chartSize}
          strokeWidth={22}
          centerContent={
            <View style={styles.pieCenterContent}>
              <Text style={styles.pieTotalAmount}>€{total.toLocaleString()}</Text>
              <Text style={styles.pieTotalLabel}>per month</Text>
            </View>
          }
        />
      </View>
      
      {/* City Info */}
      <View style={styles.pieCityInfo}>
        <Text style={styles.pieCityName}>{city.name}</Text>
        <Text style={styles.pieCityCountry}>{city.country}</Text>
      </View>
      
      {/* Legend/Breakdown */}
      <View style={styles.pieLegend}>
        {pieCategories.map(cat => {
          const value = city.livingCosts[cat.key];
          const percentage = Math.round((value / total) * 100);
          return (
            <View key={cat.key} style={styles.pieLegendRow}>
              <View style={styles.pieLegendLeft}>
                <View style={[styles.pieLegendDot, { backgroundColor: cat.color }]} />
                <Text style={styles.pieLegendLabel}>{cat.label}</Text>
              </View>
              <View style={styles.pieLegendRight}>
                <Text style={styles.pieLegendValue}>€{value}</Text>
                <Text style={styles.pieLegendPercent}>{percentage}%</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

interface VisualComparisonProps {
  cities: City[];
}

const VisualComparison: React.FC<VisualComparisonProps> = ({ cities }) => {
  return (
    <View style={styles.visualComparison}>
      {/* Pie Chart Cards */}
      <View style={styles.pieCardsContainer}>
        {cities.slice(0, 4).map(city => (
          <CityPieCard key={city.id} city={city} />
        ))}
      </View>
    </View>
  );
};

// ============================================================================
// CURRENCY CONVERTER COMPONENT
// ============================================================================
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CZK: 23.5,
};

const CURRENCIES = ['USD', 'EUR', 'GBP', 'CZK'];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const inUSD = numAmount / EXCHANGE_RATES[fromCurrency];
    return (inUSD * EXCHANGE_RATES[toCurrency]).toFixed(2);
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <View style={styles.currencyConverter}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconContainer}>
          <Ionicons name="swap-horizontal" size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.sectionTitle}>Currency Converter</Text>
      </View>

      <View style={styles.converterContent}>
        {/* From Section */}
        <View style={styles.converterSection}>
          <Text style={styles.converterLabel}>From</Text>
          <View style={styles.converterInputRow}>
            <TextInput
              style={styles.converterInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor={COLORS.textSecondary}
            />
            <View style={styles.currencySelector}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CURRENCIES.map(curr => (
                  <TouchableOpacity
                    key={curr}
                    style={[
                      styles.currencyButton,
                      fromCurrency === curr && styles.currencyButtonActive,
                    ]}
                    onPress={() => setFromCurrency(curr)}
                  >
                    <Text
                      style={[
                        styles.currencyButtonText,
                        fromCurrency === curr && styles.currencyButtonTextActive,
                      ]}
                    >
                      {curr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Swap Button */}
        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <Ionicons name="swap-vertical" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        {/* To Section */}
        <View style={styles.converterSection}>
          <Text style={styles.converterLabel}>To</Text>
          <View style={styles.converterResultRow}>
            <Text style={styles.converterResult}>{convertedAmount}</Text>
            <View style={styles.currencySelector}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CURRENCIES.map(curr => (
                  <TouchableOpacity
                    key={curr}
                    style={[
                      styles.currencyButton,
                      toCurrency === curr && styles.currencyButtonActive,
                    ]}
                    onPress={() => setToCurrency(curr)}
                  >
                    <Text
                      style={[
                        styles.currencyButtonText,
                        toCurrency === curr && styles.currencyButtonTextActive,
                      ]}
                    >
                      {curr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        <Text style={styles.converterRate}>
          1 {fromCurrency} = {(EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]).toFixed(4)} {toCurrency}
        </Text>
      </View>
    </View>
  );
};

// ============================================================================
// SMART TIPS COMPONENT
// ============================================================================
const tips = [
  {
    icon: 'cash-outline',
    title: 'Budget Planning',
    description: 'Include all expenses: accommodation, food, transport, tuition, and personal costs.',
  },
  {
    icon: 'trending-up-outline',
    title: 'Currency Fluctuation',
    description: 'Exchange rates vary over time. Plan with a buffer for currency changes.',
  },
  {
    icon: 'alert-circle-outline',
    title: 'Hidden Costs',
    description: 'Remember visa fees, health insurance, textbooks, and emergency funds.',
  },
  {
    icon: 'people-outline',
    title: 'Quality of Life',
    description: 'Consider climate, culture, language barriers, and social opportunities.',
  },
];

const SmartTips: React.FC = () => {
  return (
    <View style={styles.tipsContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconContainer}>
          <Ionicons name="bulb-outline" size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.sectionTitle}>Smart Comparison Tips</Text>
      </View>

      <View style={styles.tipsGrid}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Ionicons name={tip.icon as any} size={18} color={COLORS.primary} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================
const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="location-outline" size={48} color={COLORS.primary} />
      </View>
      <Text style={styles.emptyTitle}>Ready to Compare Cities?</Text>
      <Text style={styles.emptyDescription}>
        Select cities from above to see detailed cost comparisons, living expenses, and educational opportunities side by side.
      </Text>
      <View style={styles.emptyBadge}>
        <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.primary} />
        <Text style={styles.emptyBadgeText}>Select up to 4 cities to begin</Text>
      </View>
    </View>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function CompareScreen() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);

  // Filter cities based on search term
  const filteredCities = useMemo(() => {
    if (!searchTerm) return citiesData;
    const term = searchTerm.toLowerCase();
    return citiesData.filter(
      city =>
        city.name.toLowerCase().includes(term) ||
        city.country.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Display limited or all cities
  const displayedCities = showAllCities
    ? filteredCities
    : filteredCities.slice(0, INITIAL_DISPLAY_COUNT);

  // Get selected city data
  const selectedCityData = useMemo(() => {
    return citiesData.filter(city => selectedCities.includes(city.id));
  }, [selectedCities]);

  // Handle city selection
  const handleCitySelect = useCallback((cityId: string) => {
    setSelectedCities(prev => {
      if (prev.includes(cityId)) {
        return prev.filter(id => id !== cityId);
      }
      if (prev.length >= MAX_CITIES) {
        // Remove oldest and add new
        return [...prev.slice(1), cityId];
      }
      return [...prev, cityId];
    });
  }, []);

  // Clear all selections
  const clearSelection = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    setSelectedCities([]);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <View style={styles.card}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="location" size={28} color={COLORS.primary} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>City Comparison Tool</Text>
            <Text style={styles.headerDescription}>
              Compare living costs, tuition fees, and opportunities across different study destinations. Select up to 4 cities for detailed analysis.
            </Text>
          </View>
        </View>

        {selectedCities.length > 0 && (
          <View style={styles.selectionBar}>
            <View style={styles.selectionBadge}>
              <Text style={styles.selectionBadgeText}>
                {selectedCities.length} / {MAX_CITIES} Cities Selected
              </Text>
            </View>
            <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
              <Ionicons name="close" size={18} color={COLORS.primary} />
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* City Selection Card */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="search" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.sectionTitle}>Select Cities to Compare</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={COLORS.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search by city or country name..."
            placeholderTextColor={COLORS.textSecondary}
          />
          {searchTerm !== '' && (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => setSearchTerm('')}
            >
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Cities - Horizontal scroll or Expanded Grid */}
        {!showAllCities ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.citiesScrollContent}
            style={styles.citiesScroll}
          >
            {displayedCities.map(city => (
              <CityCard
                key={city.id}
                city={city}
                isSelected={selectedCities.includes(city.id)}
                onSelect={() => handleCitySelect(city.id)}
                isGridView={false}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.citiesGrid}>
            {filteredCities.map(city => (
              <CityCard
                key={city.id}
                city={city}
                isSelected={selectedCities.includes(city.id)}
                onSelect={() => handleCitySelect(city.id)}
                isGridView={true}
              />
            ))}
          </View>
        )}

        {/* Show More/Less Button */}
        {filteredCities.length > INITIAL_DISPLAY_COUNT && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAllCities(!showAllCities)}
          >
            <Ionicons
              name={showAllCities ? 'grid-outline' : 'apps-outline'}
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.showMoreButtonText}>
              {showAllCities ? 'Collapse View' : `Show All ${filteredCities.length} Cities`}
            </Text>
            <Ionicons
              name={showAllCities ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}

        {/* Empty Search State */}
        {filteredCities.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsEmoji}>🔍</Text>
            <Text style={styles.noResultsText}>
              No cities found matching &ldquo;{searchTerm}&rdquo;
            </Text>
          </View>
        )}
      </View>

      {/* Comparison Results or Empty State */}
      {selectedCityData.length > 0 ? (
        <>
          {/* Cost Breakdown Card */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.sectionTitle}>Cost Breakdown Comparison</Text>
            </View>
            <CostBreakdown cities={selectedCityData} />
          </View>

          {/* Visual Analysis Card */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconContainer}>
                <Ionicons name="bar-chart-outline" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.sectionTitle}>Visual Cost Analysis</Text>
            </View>
            <VisualComparison cities={selectedCityData} />
          </View>

          {/* Smart Tips Card */}
          <View style={styles.card}>
            <SmartTips />
          </View>
        </>
      ) : (
        <View style={styles.card}>
          <EmptyState />
        </View>
      )}

      {/* Currency Converter Card */}
      <View style={styles.card}>
        <CurrencyConverter />
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // Header Styles
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  selectionBadge: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectionBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Section Header Styles
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  // Search Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  clearSearchButton: {
    padding: 4,
  },

  // City Horizontal Scroll Styles
  citiesScroll: {
    marginHorizontal: -24,
    marginBottom: 4,
  },
  citiesScrollContent: {
    paddingHorizontal: 24,
    gap: 14,
  },
  // City Grid Styles (expanded view)
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
  },
  // City card for horizontal scroll
  cityCard: {
    width: 110,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  // City card for grid view
  cityCardGrid: {
    width: '30.5%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  cityCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  cityCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  cityImageWrapper: {
    position: 'relative',
  },
  cityImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.sectionBackground,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBackground,
  },
  cityInfo: {
    alignItems: 'center',
  },
  cityName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  cityNameSelected: {
    color: COLORS.primary,
  },
  cityCountry: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },

  // Show More Button
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
  },
  showMoreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // No Results
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  noResultsText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },

  // Cost Breakdown Styles
  costBreakdown: {
    marginTop: 8,
  },
  costHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  costHeaderLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  costHeaderCity: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
  costLabelColumn: {
    flex: 1.5,
  },
  costValueColumn: {
    flex: 1,
    alignItems: 'center',
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  costRowLast: {
    borderBottomWidth: 0,
  },
  costLabelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  costLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  costValueHigh: {
    color: '#ef4444',
  },
  costValueLow: {
    color: '#22c55e',
  },
  costTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    marginBottom: -24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  costTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  costTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // Visual Comparison Styles - Pie Chart Cards
  visualComparison: {
    marginTop: 8,
  },
  pieCardsContainer: {
    gap: 16,
  },
  pieCard: {
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pieChartWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pieCenterContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieTotalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: -0.5,
  },
  pieTotalLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  pieCityInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pieCityName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  pieCityCountry: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  pieLegend: {
    gap: 14,
  },
  pieLegendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pieLegendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  pieLegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pieLegendLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  pieLegendRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pieLegendValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  pieLegendPercent: {
    fontSize: 14,
    color: COLORS.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },

  // Currency Converter Styles
  currencyConverter: {},
  converterContent: {
    gap: 16,
  },
  converterSection: {
    gap: 8,
  },
  converterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  converterInputRow: {
    gap: 12,
  },
  converterInput: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  converterResultRow: {
    gap: 12,
  },
  converterResult: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  currencySelector: {
    flexDirection: 'row',
  },
  currencyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.sectionBackground,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currencyButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  currencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  currencyButtonTextActive: {
    color: '#fff',
  },
  swapButton: {
    alignSelf: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  converterRate: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },

  // Tips Styles
  tipsContainer: {},
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tipCard: {
    width: '48%',
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tipContent: {},
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  // Empty State Styles
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    marginBottom: 20,
  },
  emptyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  emptyBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Bottom Spacer
  bottomSpacer: {
    height: 40,
  },
});
