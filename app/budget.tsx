import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

export default function BudgetScreen() {
  const [country, setCountry] = useState('United Kingdom');
  const [currency, setCurrency] = useState('GBP');
  const [monthlyBudget, setMonthlyBudget] = useState({
    accommodation: 800,
    food: 300,
    transportation: 100,
    utilities: 150,
    entertainment: 200,
    education: 1500,
  });

  const categories = [
    { key: 'accommodation', label: 'Accommodation', icon: '🏠' },
    { key: 'food', label: 'Food & Groceries', icon: '🍕' },
    { key: 'transportation', label: 'Transportation', icon: '🚇' },
    { key: 'utilities', label: 'Utilities', icon: '💡' },
    { key: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { key: 'education', label: 'Education & Materials', icon: '📚' },
  ];

  const totalMonthly = Object.values(monthlyBudget).reduce((a, b) => a + b, 0);
  const totalYearly = totalMonthly * 12;

  const updateBudget = (key: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setMonthlyBudget({ ...monthlyBudget, [key]: numValue });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget Planning</Text>
        <Text style={styles.subtitle}>
          Plan your monthly expenses for studying in {country}
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Monthly Total</Text>
          <Text style={styles.summaryAmount}>
            {currency} {totalMonthly.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Yearly Total</Text>
          <Text style={styles.summaryAmount}>
            {currency} {totalYearly.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Budget Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Breakdown</Text>
        {categories.map((category) => (
          <View key={category.key} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryLabel}>{category.label}</Text>
                <View style={styles.categoryBar}>
                  <View
                    style={[
                      styles.categoryBarFill,
                      {
                        width: `${(monthlyBudget[category.key as keyof typeof monthlyBudget] / totalMonthly) * 100}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>{currency}</Text>
              <TextInput
                style={styles.input}
                value={monthlyBudget[category.key as keyof typeof monthlyBudget].toString()}
                onChangeText={(value) => updateBudget(category.key, value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        ))}
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationIcon}>💡</Text>
          <View style={styles.recommendationContent}>
            <Text style={styles.recommendationTitle}>Budget Tip</Text>
            <Text style={styles.recommendationText}>
              Your accommodation costs are {((monthlyBudget.accommodation / totalMonthly) * 100).toFixed(0)}% of your total budget. Consider university housing or shared apartments to reduce costs.
            </Text>
          </View>
        </View>
        
        <View style={styles.recommendationCard}>
          <Text style={styles.recommendationIcon}>📊</Text>
          <View style={styles.recommendationContent}>
            <Text style={styles.recommendationTitle}>Average Budget</Text>
            <Text style={styles.recommendationText}>
              The average monthly budget for international students in {country} is around {currency} 3,000-3,500.
            </Text>
          </View>
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
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#0d98ba',
    borderRadius: 12,
    padding: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
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
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 8,
  },
  categoryBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    backgroundColor: '#0d98ba',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d98ba',
    marginRight: 4,
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    minWidth: 60,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    color: '#4c809a',
    lineHeight: 20,
  },
});
