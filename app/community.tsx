import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const events = [
  {
    id: '1',
    title: 'Study Abroad Fair 2025',
    date: '2025-03-15',
    location: 'Virtual',
    type: 'Fair',
    description: 'Meet representatives from 100+ universities worldwide',
  },
  {
    id: '2',
    title: 'IELTS Preparation Workshop',
    date: '2025-02-20',
    location: 'Tashkent',
    type: 'Workshop',
    description: 'Free workshop on IELTS preparation strategies',
  },
];

const stories = [
  {
    id: '1',
    studentName: 'Alisher K.',
    country: 'United Kingdom',
    university: 'University of Cambridge',
    story: 'Studying at Cambridge has been an incredible experience. The academic environment is challenging but rewarding...',
    date: '2024-12-15',
  },
  {
    id: '2',
    studentName: 'Madina S.',
    country: 'Germany',
    university: 'Technical University of Munich',
    story: 'Free education and a vibrant international community make Germany an excellent choice for students...',
    date: '2024-12-10',
  },
];

const forumPosts = [
  {
    id: '1',
    author: 'John D.',
    title: 'Tips for UK Student Visa Application',
    content: 'I just got my UK student visa approved! Here are some tips that helped me...',
    category: 'Visa',
    replies: 24,
    likes: 45,
    date: '2 days ago',
  },
  {
    id: '2',
    author: 'Sarah M.',
    title: 'Affordable Housing in London',
    content: 'Looking for recommendations on affordable student housing in London...',
    category: 'Housing',
    replies: 18,
    likes: 32,
    date: '1 week ago',
  },
];

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>
          Connect with other students and share experiences
        </Text>
      </View>

      {/* Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventDateBadge}>
                <Text style={styles.eventDateDay}>
                  {new Date(event.date).getDate()}
                </Text>
                <Text style={styles.eventDateMonth}>
                  {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                </Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventMeta}>
                  📍 {event.location} • {event.type}
                </Text>
              </View>
            </View>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <TouchableOpacity style={styles.eventButton}>
              <Text style={styles.eventButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Student Stories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Stories</Text>
        {stories.map((story) => (
          <View key={story.id} style={styles.storyCard}>
            <View style={styles.storyHeader}>
              <View style={styles.storyAvatar}>
                <Text style={styles.storyAvatarText}>
                  {story.studentName.charAt(0)}
                </Text>
              </View>
              <View style={styles.storyInfo}>
                <Text style={styles.storyName}>{story.studentName}</Text>
                <Text style={styles.storyLocation}>
                  {story.university}, {story.country}
                </Text>
              </View>
            </View>
            <Text style={styles.storyText} numberOfLines={3}>
              {story.story}
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read Full Story →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Forum Posts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forum Discussions</Text>
        {forumPosts.map((post) => (
          <View key={post.id} style={styles.forumCard}>
            <View style={styles.forumHeader}>
              <View style={styles.forumAvatar}>
                <Text style={styles.forumAvatarText}>
                  {post.author.charAt(0)}
                </Text>
              </View>
              <View style={styles.forumInfo}>
                <Text style={styles.forumAuthor}>{post.author}</Text>
                <Text style={styles.forumDate}>{post.date}</Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{post.category}</Text>
              </View>
            </View>
            <Text style={styles.forumTitle}>{post.title}</Text>
            <Text style={styles.forumContent} numberOfLines={2}>
              {post.content}
            </Text>
            <View style={styles.forumStats}>
              <Text style={styles.forumStat}>💬 {post.replies} replies</Text>
              <Text style={styles.forumStat}>❤️ {post.likes} likes</Text>
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.newPostButton}>
          <Text style={styles.newPostButtonText}>+ Create New Post</Text>
        </TouchableOpacity>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 12,
  },
  eventCard: {
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
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  eventDateBadge: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventDateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d98ba',
  },
  eventDateMonth: {
    fontSize: 12,
    color: '#4c809a',
    textTransform: 'uppercase',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 14,
    color: '#4c809a',
  },
  eventDescription: {
    fontSize: 14,
    color: '#4c809a',
    marginBottom: 12,
    lineHeight: 20,
  },
  eventButton: {
    backgroundColor: '#0d98ba',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  eventButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  storyCard: {
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
  storyHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  storyAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0d98ba',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  storyAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  storyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  storyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 2,
  },
  storyLocation: {
    fontSize: 14,
    color: '#4c809a',
  },
  storyText: {
    fontSize: 14,
    color: '#0d171b',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    color: '#0d98ba',
    fontWeight: '600',
  },
  forumCard: {
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
  forumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  forumAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0d98ba',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  forumAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  forumInfo: {
    flex: 1,
  },
  forumAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d171b',
  },
  forumDate: {
    fontSize: 12,
    color: '#4c809a',
  },
  categoryBadge: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#0d98ba',
    fontWeight: '600',
  },
  forumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 8,
  },
  forumContent: {
    fontSize: 14,
    color: '#4c809a',
    lineHeight: 20,
    marginBottom: 12,
  },
  forumStats: {
    flexDirection: 'row',
    gap: 16,
  },
  forumStat: {
    fontSize: 14,
    color: '#4c809a',
  },
  newPostButton: {
    backgroundColor: '#0d98ba',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  newPostButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
