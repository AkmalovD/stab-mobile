import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || 'Student Name',
    email: user?.email || '',
    dateOfBirth: '1998-05-15',
    location: 'Tashkent, Uzbekistan',
    university: 'National University of Uzbekistan',
    major: 'Computer Science',
    studyDestination: 'United Kingdom',
    targetUniversity: 'University of Cambridge',
    budget: '$25,000 - $35,000',
    startDate: 'September 2024',
    bio: 'Aspiring computer scientist passionate about AI and machine learning.',
  });

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save to backend/database
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.coverImage} />
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profileData.displayName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.nameSection}>
            <Text style={styles.userName}>{profileData.displayName}</Text>
            <Text style={styles.userEmail}>{profileData.email}</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoCard}>
          <InfoRow
            label="Date of Birth"
            value={profileData.dateOfBirth}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, dateOfBirth: text })}
          />
          <InfoRow
            label="Location"
            value={profileData.location}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, location: text })}
          />
          <InfoRow
            label="University"
            value={profileData.university}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, university: text })}
          />
          <InfoRow
            label="Major"
            value={profileData.major}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, major: text })}
          />
        </View>
      </View>

      {/* Study Abroad Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Study Abroad Plans</Text>
        
        <View style={styles.infoCard}>
          <InfoRow
            label="Destination"
            value={profileData.studyDestination}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, studyDestination: text })}
          />
          <InfoRow
            label="Target University"
            value={profileData.targetUniversity}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, targetUniversity: text })}
          />
          <InfoRow
            label="Budget"
            value={profileData.budget}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, budget: text })}
          />
          <InfoRow
            label="Start Date"
            value={profileData.startDate}
            isEditing={isEditing}
            onChangeText={(text) => setProfileData({ ...profileData, startDate: text })}
          />
        </View>
      </View>

      {/* Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <View style={styles.infoCard}>
          {isEditing ? (
            <TextInput
              style={styles.bioInput}
              value={profileData.bio}
              onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
              multiline
              numberOfLines={4}
            />
          ) : (
            <Text style={styles.bioText}>{profileData.bio}</Text>
          )}
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function InfoRow({ label, value, isEditing, onChangeText }: {
  label: string;
  value: string;
  isEditing: boolean;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.infoInput}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <Text style={styles.infoValue}>{value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverImage: {
    height: 150,
    backgroundColor: '#0d98ba',
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: -60,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0369a1',
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#4c809a',
  },
  editButton: {
    backgroundColor: '#0d98ba',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#4c809a',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#0d171b',
    fontWeight: '500',
  },
  infoInput: {
    fontSize: 16,
    color: '#0d171b',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 8,
  },
  bioText: {
    fontSize: 16,
    color: '#0d171b',
    lineHeight: 24,
  },
  bioInput: {
    fontSize: 16,
    color: '#0d171b',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
