import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '../../auth/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const features = [
    {
      title: 'Compare Cities',
      description: 'Compare living costs and quality of life across different study destinations',
      icon: '🌍',
      route: '/compare'
    },
    {
      title: 'Budget Planning',
      description: 'Plan your study abroad budget with detailed cost breakdowns',
      icon: '💰',
      route: '/budget'
    },
    {
      title: 'Plan Journey',
      description: 'Track your study abroad application journey step by step',
      icon: '✈️',
      route: '/plan-journey'
    },
    {
      title: 'Scholarships',
      description: 'Find and apply for scholarships that match your profile',
      icon: '🎓',
      route: '/scholarships'
    },
    {
      title: 'Community',
      description: 'Connect with other students and share experiences',
      icon: '👥',
      route: '/community'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Study Abroad Planning
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Your comprehensive guide to studying abroad
        </ThemedText>
        
        {!user && (
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => router.push('/sign-up')}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {user && (
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.profileButtonText}>View Profile</Text>
          </TouchableOpacity>
        )}
      </ThemedView>

      <View style={styles.featuresContainer}>
        <ThemedText type="subtitle" style={styles.featuresTitle}>
          Features
        </ThemedText>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => router.push(feature.route as any)}
          >
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>150+</Text>
          <Text style={styles.statLabel}>Universities</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1000+</Text>
          <Text style={styles.statLabel}>Scholarships</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 20,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  loginButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#0d98ba',
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0d98ba',
  },
  signupButtonText: {
    color: '#0d98ba',
    fontSize: 16,
    fontWeight: '600',
  },
  profileButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#0d98ba',
    borderRadius: 8,
    marginTop: 12,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresContainer: {
    padding: 20,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#0d171b',
  },
  featureDescription: {
    fontSize: 14,
    color: '#4c809a',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 40,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 12,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d98ba',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#4c809a',
  },
});
