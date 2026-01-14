import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Theme colors based on design specification
const COLORS = {
  primary: '#0d98ba',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5',
  mediumGray: '#666666',
  borderGray: '#E0E0E0',
  background: '#F5F5F5',
  orange: '#FF6B35',
  orangeLight: '#FFF3E0',
  darkTeal: '#0a7a94',
};

// Mock data for recent comparisons
const recentComparisons = [
  {
    id: '1',
    title: 'U of Toronto vs. UBC',
    subtitle: 'Programs & Costs',
    color1: COLORS.primary,
    color2: '#1a5f4a',
  },
  {
    id: '2',
    title: "King's College vs. UCL",
    subtitle: 'Rankings & Life',
    color1: COLORS.darkTeal,
    color2: '#2d4a5e',
  },
];

// Mock data for upcoming deadlines
const upcomingDeadlines = [
  {
    id: '1',
    title: 'Fall Semester Application',
    dueText: 'Due in 3 days',
    month: 'OCT',
    day: '15',
  },
  {
    id: '2',
    title: 'Scholarship Deadline',
    dueText: 'Due in 1 week',
    month: 'OCT',
    day: '20',
  },
];

// Header Component
const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="public" size={24} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>StudyAbroad</Text>
      </View>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => {}}
        activeOpacity={0.7}
      >
        <MaterialIcons name="notifications-none" size={26} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

// Hero Banner Component
const HeroBanner = () => {
  const router = useRouter();

  return (
    <View style={styles.heroBanner}>
      <View style={styles.heroIconContainer}>
        <MaterialIcons name="flight" size={24} color={COLORS.white} />
      </View>
      <Text style={styles.heroTitle}>Start Your Journey</Text>
      <Text style={styles.heroSubtitle}>Find your dream university today</Text>
      <TouchableOpacity
        style={styles.heroButton}
        onPress={() => router.push('/compare')}
        activeOpacity={0.9}
      >
        <Text style={styles.heroButtonText}>Explore Now</Text>
        <MaterialIcons name="arrow-forward" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

// Section Header Component
interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showSeeAll = false,
  onSeeAll,
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {showSeeAll && (
      <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
        <Text style={styles.seeAllText}>See All</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Comparison Card Component
interface ComparisonCardProps {
  title: string;
  subtitle: string;
  color1: string;
  color2: string;
  onPress: () => void;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  subtitle,
  color1,
  color2,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.comparisonCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.comparisonIconsContainer}>
      <View style={[styles.comparisonIcon, { backgroundColor: color1, zIndex: 2 }]}>
        <MaterialIcons name="account-balance" size={18} color={COLORS.white} />
      </View>
      <View
        style={[
          styles.comparisonIcon,
          styles.comparisonIconOverlap,
          { backgroundColor: color2, zIndex: 1 },
        ]}
      >
        <MaterialIcons name="school" size={18} color={COLORS.white} />
      </View>
    </View>
    <View style={styles.comparisonContent}>
      <Text style={styles.comparisonTitle}>{title}</Text>
      <Text style={styles.comparisonSubtitle}>{subtitle}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={24} color={COLORS.mediumGray} />
  </TouchableOpacity>
);

// Deadline Card Component
interface DeadlineCardProps {
  title: string;
  dueText: string;
  month: string;
  day: string;
  onPress: () => void;
}

const DeadlineCard: React.FC<DeadlineCardProps> = ({
  title,
  dueText,
  month,
  day,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.deadlineCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.dateBadge}>
      <Text style={styles.dateMonth}>{month}</Text>
      <Text style={styles.dateDay}>{day}</Text>
    </View>
    <View style={styles.deadlineContent}>
      <Text style={styles.deadlineTitle}>{title}</Text>
      <View style={styles.dueContainer}>
        <MaterialIcons name="schedule" size={14} color={COLORS.orange} />
        <Text style={styles.dueText}>{dueText}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <HeroBanner />

        {/* Recent Comparisons Section */}
        <SectionHeader
          title="Recent Comparisons"
          showSeeAll
          onSeeAll={() => router.push('/compare')}
        />
        <View style={styles.comparisonsList}>
          {recentComparisons.map((comparison) => (
            <ComparisonCard
              key={comparison.id}
              title={comparison.title}
              subtitle={comparison.subtitle}
              color1={comparison.color1}
              color2={comparison.color2}
              onPress={() => router.push('/compare')}
            />
          ))}
        </View>

        {/* Upcoming Deadlines Section */}
        <SectionHeader title="Upcoming Deadlines" />
        <View style={styles.deadlinesList}>
          {upcomingDeadlines.map((deadline) => (
            <DeadlineCard
              key={deadline.id}
              title={deadline.title}
              dueText={deadline.dueText}
              month={deadline.month}
              day={deadline.day}
              onPress={() => router.push('/plan-journey')}
            />
          ))}
        </View>

        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
    height: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(13, 152, 186, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  notificationButton: {
    padding: 4,
  },

  // Hero Banner Styles
  heroBanner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 24,
  },
  heroIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'flex-start',
    gap: 8,
  },
  heroButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Section Header Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },

  // Comparison Card Styles
  comparisonsList: {
    paddingHorizontal: 16,
  },
  comparisonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
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
  comparisonIconsContainer: {
    flexDirection: 'row',
    marginRight: 14,
  },
  comparisonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparisonIconOverlap: {
    marginLeft: -12,
  },
  comparisonContent: {
    flex: 1,
  },
  comparisonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  comparisonSubtitle: {
    fontSize: 13,
    color: COLORS.mediumGray,
  },

  // Deadline Card Styles
  deadlinesList: {
    paddingHorizontal: 16,
  },
  deadlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
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
  dateBadge: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.orangeLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  dateMonth: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.orange,
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.orange,
  },
  deadlineContent: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 6,
  },
  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueText: {
    fontSize: 12,
    color: COLORS.orange,
  },

  // Bottom Padding
  bottomPadding: {
    height: 24,
  },
});
