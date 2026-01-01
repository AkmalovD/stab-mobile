import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function CompareScreen() {
  const [selectedCities, setSelectedCities] = useState(['London', 'Berlin']);

  const cities = [
    {
      name: 'London',
      country: 'UK',
      costs: {
        accommodation: 1200,
        food: 400,
        transportation: 150,
        total: 1750,
      },
      quality: {
        safety: 8.5,
        education: 9.5,
        lifestyle: 9.0,
      },
    },
    {
      name: 'Berlin',
      country: 'Germany',
      costs: {
        accommodation: 700,
        food: 300,
        transportation: 80,
        total: 1080,
      },
      quality: {
        safety: 8.0,
        education: 9.0,
        lifestyle: 8.5,
      },
    },
    {
      name: 'Paris',
      country: 'France',
      costs: {
        accommodation: 950,
        food: 350,
        transportation: 75,
        total: 1375,
      },
      quality: {
        safety: 7.5,
        education: 9.0,
        lifestyle: 9.5,
      },
    },
    {
      name: 'Amsterdam',
      country: 'Netherlands',
      costs: {
        accommodation: 900,
        food: 380,
        transportation: 90,
        total: 1370,
      },
      quality: {
        safety: 9.0,
        education: 8.5,
        lifestyle: 9.0,
      },
    },
  ];

  const city1 = cities.find((c) => c.name === selectedCities[0]);
  const city2 = cities.find((c) => c.name === selectedCities[1]);

  if (!city1 || !city2) return null;

  const costCategories = [
    { key: 'accommodation', label: 'Accommodation' },
    { key: 'food', label: 'Food' },
    { key: 'transportation', label: 'Transportation' },
    { key: 'total', label: 'Total Monthly' },
  ];

  const qualityMetrics = [
    { key: 'safety', label: 'Safety' },
    { key: 'education', label: 'Education' },
    { key: 'lifestyle', label: 'Lifestyle' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Compare Cities</Text>
        <Text style={styles.subtitle}>
          Compare living costs and quality of life across different cities
        </Text>
      </View>

      {/* City Selector */}
      <View style={styles.selectorContainer}>
        <View style={styles.selectorColumn}>
          <Text style={styles.selectorLabel}>City 1</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cities.map((city) => (
              <TouchableOpacity
                key={city.name}
                style={[
                  styles.cityButton,
                  selectedCities[0] === city.name && styles.cityButtonActive,
                ]}
                onPress={() => setSelectedCities([city.name, selectedCities[1]])}
              >
                <Text
                  style={[
                    styles.cityButtonText,
                    selectedCities[0] === city.name && styles.cityButtonTextActive,
                  ]}
                >
                  {city.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.selectorColumn}>
          <Text style={styles.selectorLabel}>City 2</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cities.map((city) => (
              <TouchableOpacity
                key={city.name}
                style={[
                  styles.cityButton,
                  selectedCities[1] === city.name && styles.cityButtonActive,
                ]}
                onPress={() => setSelectedCities([selectedCities[0], city.name])}
              >
                <Text
                  style={[
                    styles.cityButtonText,
                    selectedCities[1] === city.name && styles.cityButtonTextActive,
                  ]}
                >
                  {city.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Cost Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Costs (€)</Text>
        <View style={styles.comparisonCard}>
          {costCategories.map((category) => (
            <View key={category.key} style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>{category.label}</Text>
              <View style={styles.comparisonValues}>
                <Text style={styles.comparisonValue}>
                  €{city1.costs[category.key as keyof typeof city1.costs]}
                </Text>
                <Text style={styles.comparisonValue}>
                  €{city2.costs[category.key as keyof typeof city2.costs]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quality Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quality Metrics</Text>
        <View style={styles.comparisonCard}>
          {qualityMetrics.map((metric) => (
            <View key={metric.key} style={styles.comparisonRow}>
              <Text style={styles.comparisonLabel}>{metric.label}</Text>
              <View style={styles.comparisonValues}>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingValue}>
                    {city1.quality[metric.key as keyof typeof city1.quality]}
                  </Text>
                  <Text style={styles.ratingMax}>/10</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingValue}>
                    {city2.quality[metric.key as keyof typeof city2.quality]}
                  </Text>
                  <Text style={styles.ratingMax}>/10</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            <Text style={styles.summaryBold}>{city1.name}</Text> is{' '}
            {((Math.abs(city1.costs.total - city2.costs.total) / city2.costs.total) * 100).toFixed(0)}%{' '}
            {city1.costs.total > city2.costs.total ? 'more expensive' : 'cheaper'} than{' '}
            <Text style={styles.summaryBold}>{city2.name}</Text> in terms of monthly living costs.
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4c809a',
  },
  selectorContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  selectorColumn: {
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 8,
  },
  cityButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  cityButtonActive: {
    backgroundColor: '#0d98ba',
    borderColor: '#0d98ba',
  },
  cityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4c809a',
  },
  cityButtonTextActive: {
    color: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 12,
  },
  comparisonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  comparisonLabel: {
    fontSize: 16,
    color: '#4c809a',
    marginBottom: 8,
  },
  comparisonValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comparisonValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d171b',
    flex: 1,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 1,
    justifyContent: 'center',
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d171b',
  },
  ratingMax: {
    fontSize: 14,
    color: '#4c809a',
    marginLeft: 2,
  },
  summaryCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0d98ba',
  },
  summaryText: {
    fontSize: 16,
    color: '#0d171b',
    lineHeight: 24,
  },
  summaryBold: {
    fontWeight: '600',
  },
});
