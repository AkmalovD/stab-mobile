import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const COLORS = {
  primary: '#0d98ba',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5',
  mediumGray: '#666666',
  borderGray: '#E0E0E0',
  background: '#F5F5F5',
  gold: '#FFB800',
  goldLight: '#FFF9E6',
  green: '#22C55E',
  greenLight: '#F0FDF4',
};

const scholarships = [
  {
    id: '1',
    name: 'Chevening Scholarship',
    country: 'United Kingdom',
    amount: 'Full Funding',
    deadline: 'Nov 2, 2026',
    status: 'Open',
  },
  {
    id: '2',
    name: 'DAAD Scholarship',
    country: 'Germany',
    amount: '€934/month',
    deadline: 'Oct 15, 2026',
    status: 'Open',
  },
  {
    id: '3',
    name: 'Fulbright Program',
    country: 'United States',
    amount: 'Full Funding',
    deadline: 'Sep 10, 2026',
    status: 'Closed',
  },
  {
    id: '4',
    name: 'Erasmus Mundus',
    country: 'Europe',
    amount: '€1,400/month',
    deadline: 'Jan 15, 2027',
    status: 'Open',
  },
];

interface ScholarshipCardProps {
  name: string;
  country: string;
  amount: string;
  deadline: string;
  status: string;
  onPress: () => void;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  name,
  country,
  amount,
  deadline,
  status,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.scholarshipCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.cardHeader}>
      <View style={styles.awardIconContainer}>
        <MaterialIcons name="emoji-events" size={22} color={COLORS.gold} />
      </View>
      <View
        style={[
          styles.statusBadge,
          status === 'Open' ? styles.statusOpen : styles.statusClosed,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            status === 'Open' ? styles.statusTextOpen : styles.statusTextClosed,
          ]}
        >
          {status}
        </Text>
      </View>
    </View>

    <Text style={styles.scholarshipName}>{name}</Text>
    <Text style={styles.scholarshipCountry}>{country}</Text>

    <View style={styles.cardFooter}>
      <View style={styles.footerItem}>
        <MaterialIcons name="attach-money" size={16} color={COLORS.primary} />
        <Text style={styles.footerText}>{amount}</Text>
      </View>
      <View style={styles.footerItem}>
        <MaterialIcons name="event" size={16} color={COLORS.mediumGray} />
        <Text style={styles.footerTextGray}>{deadline}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function AwardsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scholarships & Awards</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>Scholarships</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>$2M+</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <TouchableOpacity style={styles.filterChipActive}>
            <Text style={styles.filterChipTextActive}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Full Funding</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Europe</Text>
          </TouchableOpacity>
        </View>

        {/* Scholarship List */}
        <View style={styles.scholarshipList}>
          {scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              name={scholarship.name}
              country={scholarship.country}
              amount={scholarship.amount}
              deadline={scholarship.deadline}
              status={scholarship.status}
              onPress={() => router.push('/scholarships')}
            />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
  scrollContent: {
    paddingBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.mediumGray,
  },
  filterSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  filterChipActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 13,
    color: COLORS.mediumGray,
    fontWeight: '500',
  },
  filterChipTextActive: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '500',
  },
  scholarshipList: {
    paddingHorizontal: 16,
  },
  scholarshipCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  awardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: COLORS.greenLight,
  },
  statusClosed: {
    backgroundColor: COLORS.lightGray,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextOpen: {
    color: COLORS.green,
  },
  statusTextClosed: {
    color: COLORS.mediumGray,
  },
  scholarshipName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  scholarshipCountry: {
    fontSize: 14,
    color: COLORS.mediumGray,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  footerTextGray: {
    fontSize: 13,
    color: COLORS.mediumGray,
  },
});
