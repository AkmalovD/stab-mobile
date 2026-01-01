export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  averageCost: number;
  currency: string;
  livingCosts: CityLivingCosts;
  metadata: CityMetadata;
}

export interface CityLivingCosts {
  accommodation: number;
  food: number;
  transportation: number;
  entertainment: number;
  utilities: number;
  education: number;
}

export interface CityMetadata {
  population: string;
  language: string;
  climate: string;
  safetyRating: number;
  studentFriendly: number;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface CurrencyConversion {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  amount: number;
  convertedAmount: number;
}

export interface ComparisonMetric {
  name: string;
  city1Value: number;
  city2Value: number;
  unit: string;
}

export interface ComparisonData {
  metrics: ComparisonMetric[];
  costBreakdown: {
    city1: CostBreakdown[];
    city2: CostBreakdown[];
  };
}
