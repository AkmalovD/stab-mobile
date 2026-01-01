import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const scholarships = [
  {
    id: '1',
    name: 'Chevening Scholarships',
    country: 'United Kingdom',
    amount: 'Full tuition + stipend',
    deadline: '2025-11-03',
    level: 'graduate',
    field: 'Any',
    coverageType: 'Full',
  },
  {
    id: '2',
    name: 'DAAD Scholarships',
    country: 'Germany',
    amount: '€850/month',
    deadline: '2025-10-31',
    level: 'graduate',
    field: 'Any',
    coverageType: 'Partial',
  },
  {
    id: '3',
    name: 'Erasmus+ Programme',
    country: 'Europe',
    amount: '€300-€600/month',
    deadline: '2025-04-15',
    level: 'undergraduate',
    field: 'Any',
    coverageType: 'Partial',
  },
  {
    id: '4',
    name: 'Fulbright Program',
    country: 'United States',
    amount: 'Full tuition + stipend',
    deadline: '2025-10-15',
    level: 'graduate',
    field: 'Any',
    coverageType: 'Full',
  },
  {
    id: '5',
    name: 'Swedish Institute Scholarships',
    country: 'Sweden',
    amount: 'Full tuition + stipend',
    deadline: '2025-02-15',
    level: 'graduate',
    field: 'Any',
    coverageType: 'Full',
  },
];

export default function ScholarshipsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const countries = ['All', 'United Kingdom', 'Germany', 'Europe', 'United States', 'Sweden'];
  const levels = ['All', 'undergraduate', 'graduate', 'phd'];

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || scholarship.country === selectedCountry;
    const matchesLevel = selectedLevel === 'All' || scholarship.level === selectedLevel;
    
    return matchesSearch && matchesCountry && matchesLevel;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scholarships</Text>
        <Text style={styles.subtitle}>
          Find and apply for scholarships that match your profile
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search scholarships..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Country</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country}
                style={[
                  styles.filterButton,
                  selectedCountry === country && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedCountry(country)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedCountry === country && styles.filterButtonTextActive,
                  ]}
                >
                  {country}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Level</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.filterButton,
                  selectedLevel === level && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedLevel === level && styles.filterButtonTextActive,
                  ]}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsCount}>
          {filteredScholarships.length} scholarships found
        </Text>

        {filteredScholarships.map((scholarship) => (
          <View key={scholarship.id} style={styles.scholarshipCard}>
            <View style={styles.scholarshipHeader}>
              <Text style={styles.scholarshipName}>{scholarship.name}</Text>
              <View style={[
                styles.coverageBadge,
                scholarship.coverageType === 'Full' ? styles.coverageBadgeFull : styles.coverageBadgePartial
              ]}>
                <Text style={styles.coverageBadgeText}>{scholarship.coverageType}</Text>
              </View>
            </View>

            <Text style={styles.scholarshipCountry}>📍 {scholarship.country}</Text>
            
            <View style={styles.scholarshipDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount:</Text>
                <Text style={styles.detailValue}>{scholarship.amount}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Level:</Text>
                <Text style={styles.detailValue}>
                  {scholarship.level.charAt(0).toUpperCase() + scholarship.level.slice(1)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Deadline:</Text>
                <Text style={styles.detailValue}>
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#0d98ba',
    borderColor: '#0d98ba',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#4c809a',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  resultsCount: {
    fontSize: 16,
    color: '#4c809a',
    marginBottom: 16,
  },
  scholarshipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scholarshipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  scholarshipName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d171b',
    flex: 1,
    marginRight: 12,
  },
  coverageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  coverageBadgeFull: {
    backgroundColor: '#dcfce7',
  },
  coverageBadgePartial: {
    backgroundColor: '#fef3c7',
  },
  coverageBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803d',
  },
  scholarshipCountry: {
    fontSize: 14,
    color: '#4c809a',
    marginBottom: 12,
  },
  scholarshipDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#4c809a',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#0d171b',
    fontWeight: '500',
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#0d98ba',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
