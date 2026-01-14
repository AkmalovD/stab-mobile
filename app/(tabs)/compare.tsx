import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const COLORS = {
  primary: '#0d98ba',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5',
  mediumGray: '#666666',
  borderGray: '#E0E0E0',
  background: '#F5F5F5',
};

const universities = [
  {
    name: 'U of Toronto',
    country: 'Canada',
    ranking: 21,
    tuition: '$45,000',
    acceptance: '43%',
  },
  {
    name: 'UBC',
    country: 'Canada',
    ranking: 34,
    tuition: '$38,000',
    acceptance: '52%',
  },
  {
    name: "King's College",
    country: 'UK',
    ranking: 37,
    tuition: '£32,000',
    acceptance: '14%',
  },
  {
    name: 'UCL',
    country: 'UK',
    ranking: 9,
    tuition: '£35,000',
    acceptance: '16%',
  },
];

export default function CompareScreen() {
  const [selectedUniversities, setSelectedUniversities] = useState([
    'U of Toronto',
    'UBC',
  ]);

  const uni1 = universities.find((u) => u.name === selectedUniversities[0]);
  const uni2 = universities.find((u) => u.name === selectedUniversities[1]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Compare Universities</Text>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* University Selectors */}
        <View style={styles.selectorSection}>
          <Text style={styles.selectorLabel}>Select universities to compare</Text>
          <View style={styles.selectorRow}>
            {universities.map((uni) => (
              <TouchableOpacity
                key={uni.name}
                style={[
                  styles.uniChip,
                  selectedUniversities.includes(uni.name) && styles.uniChipActive,
                ]}
                onPress={() => {
                  if (selectedUniversities.includes(uni.name)) {
                    setSelectedUniversities(
                      selectedUniversities.filter((u) => u !== uni.name)
                    );
                  } else if (selectedUniversities.length < 2) {
                    setSelectedUniversities([...selectedUniversities, uni.name]);
                  } else {
                    setSelectedUniversities([selectedUniversities[1], uni.name]);
                  }
                }}
              >
                <Text
                  style={[
                    styles.uniChipText,
                    selectedUniversities.includes(uni.name) &&
                      styles.uniChipTextActive,
                  ]}
                >
                  {uni.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Comparison Table */}
        {uni1 && uni2 && (
          <View style={styles.comparisonSection}>
            {/* Header Row */}
            <View style={styles.tableHeader}>
              <View style={styles.tableLabelCell}>
                <Text style={styles.tableLabelText}>Metric</Text>
              </View>
              <View style={styles.tableValueCell}>
                <Text style={styles.tableHeaderText}>{uni1.name}</Text>
              </View>
              <View style={styles.tableValueCell}>
                <Text style={styles.tableHeaderText}>{uni2.name}</Text>
              </View>
            </View>

            {/* Data Rows */}
            <ComparisonRow
              label="Country"
              value1={uni1.country}
              value2={uni2.country}
            />
            <ComparisonRow
              label="World Ranking"
              value1={`#${uni1.ranking}`}
              value2={`#${uni2.ranking}`}
              highlight={uni1.ranking < uni2.ranking ? 'left' : 'right'}
            />
            <ComparisonRow
              label="Annual Tuition"
              value1={uni1.tuition}
              value2={uni2.tuition}
            />
            <ComparisonRow
              label="Acceptance Rate"
              value1={uni1.acceptance}
              value2={uni2.acceptance}
            />
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface ComparisonRowProps {
  label: string;
  value1: string;
  value2: string;
  highlight?: 'left' | 'right' | null;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({
  label,
  value1,
  value2,
  highlight,
}) => (
  <View style={styles.tableRow}>
    <View style={styles.tableLabelCell}>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
    <View style={styles.tableValueCell}>
      <Text
        style={[styles.rowValue, highlight === 'left' && styles.highlightValue]}
      >
        {value1}
      </Text>
    </View>
    <View style={styles.tableValueCell}>
      <Text
        style={[styles.rowValue, highlight === 'right' && styles.highlightValue]}
      >
        {value2}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  selectorSection: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 12,
  },
  selectorLabel: {
    fontSize: 14,
    color: COLORS.mediumGray,
    marginBottom: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  uniChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  uniChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  uniChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.mediumGray,
  },
  uniChipTextActive: {
    color: COLORS.white,
  },
  comparisonSection: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
  },
  tableLabelCell: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  tableValueCell: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  rowLabel: {
    fontSize: 14,
    color: COLORS.mediumGray,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
  },
  highlightValue: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
