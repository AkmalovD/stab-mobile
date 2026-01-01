import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { journeyProfileApi } from '../services/profileApi';

export default function PlanJourneyScreen() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    destination_country: '',
    intended_start_date: '',
  });

  const phases = [
    {
      id: '1',
      title: 'Research & Planning',
      description: 'Research universities and programs',
      status: 'in-progress',
      tasks: [
        { id: '1-1', title: 'Research potential universities', completed: true },
        { id: '1-2', title: 'Compare programs and costs', completed: true },
        { id: '1-3', title: 'Check visa requirements', completed: false },
        { id: '1-4', title: 'Plan budget', completed: false },
      ],
    },
    {
      id: '2',
      title: 'Application Preparation',
      description: 'Prepare all necessary documents',
      status: 'not-started',
      tasks: [
        { id: '2-1', title: 'Prepare transcripts', completed: false },
        { id: '2-2', title: 'Take language test (IELTS/TOEFL)', completed: false },
        { id: '2-3', title: 'Write personal statement', completed: false },
        { id: '2-4', title: 'Get recommendation letters', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Submit Applications',
      description: 'Submit applications to universities',
      status: 'not-started',
      tasks: [
        { id: '3-1', title: 'Complete application forms', completed: false },
        { id: '3-2', title: 'Pay application fees', completed: false },
        { id: '3-3', title: 'Submit all documents', completed: false },
        { id: '3-4', title: 'Track application status', completed: false },
      ],
    },
    {
      id: '4',
      title: 'Visa & Travel',
      description: 'Apply for visa and arrange travel',
      status: 'not-started',
      tasks: [
        { id: '4-1', title: 'Receive acceptance letter', completed: false },
        { id: '4-2', title: 'Apply for student visa', completed: false },
        { id: '4-3', title: 'Book accommodation', completed: false },
        { id: '4-4', title: 'Book flights', completed: false },
      ],
    },
  ];

  const handleStartJourney = async () => {
    if (!formData.full_name || !formData.destination_country || !formData.intended_start_date) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await journeyProfileApi.create(formData);
      Alert.alert('Success', 'Your journey has been created!');
      setShowModal(false);
      setFormData({ full_name: '', destination_country: '', intended_start_date: '' });
    } catch (error) {
      Alert.alert('Error', 'Failed to create journey profile');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#f59e0b';
      case 'not-started':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '○';
      case 'not-started':
        return '○';
      default:
        return '○';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plan Your Journey</Text>
        <Text style={styles.subtitle}>
          Track your study abroad application process step by step
        </Text>
        
        <TouchableOpacity style={styles.startButton} onPress={() => setShowModal(true)}>
          <Text style={styles.startButtonText}>+ Start New Journey</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Overall Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { width: '25%' }]} />
        </View>
        <Text style={styles.progressText}>2 of 16 tasks completed</Text>
      </View>

      {/* Phases */}
      <View style={styles.phasesContainer}>
        {phases.map((phase, index) => {
          const completedTasks = phase.tasks.filter((t) => t.completed).length;
          const totalTasks = phase.tasks.length;
          const progress = (completedTasks / totalTasks) * 100;

          return (
            <View key={phase.id} style={styles.phaseCard}>
              <View style={styles.phaseHeader}>
                <View style={styles.phaseIconContainer}>
                  <Text style={[styles.phaseIcon, { color: getStatusColor(phase.status) }]}>
                    {getStatusIcon(phase.status)}
                  </Text>
                </View>
                <View style={styles.phaseInfo}>
                  <Text style={styles.phaseTitle}>
                    Phase {index + 1}: {phase.title}
                  </Text>
                  <Text style={styles.phaseDescription}>{phase.description}</Text>
                </View>
              </View>

              <View style={styles.phaseProgress}>
                <View style={styles.phaseProgressBar}>
                  <View style={[styles.phaseProgressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.phaseProgressText}>
                  {completedTasks}/{totalTasks} tasks
                </Text>
              </View>

              <View style={styles.tasksList}>
                {phase.tasks.map((task) => (
                  <View key={task.id} style={styles.taskItem}>
                    <View style={[
                      styles.taskCheckbox,
                      task.completed && styles.taskCheckboxCompleted
                    ]}>
                      {task.completed && <Text style={styles.taskCheckmark}>✓</Text>}
                    </View>
                    <Text style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted
                    ]}>
                      {task.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>

      {/* Modal for Starting Journey */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Start Your Journey</Text>
            
            <View style={styles.modalForm}>
              <TextInput
                style={styles.modalInput}
                placeholder="Full Name"
                value={formData.full_name}
                onChangeText={(text) => setFormData({ ...formData, full_name: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Destination Country"
                value={formData.destination_country}
                onChangeText={(text) => setFormData({ ...formData, destination_country: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Intended Start Date (YYYY-MM-DD)"
                value={formData.intended_start_date}
                onChangeText={(text) => setFormData({ ...formData, intended_start_date: text })}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonSubmit}
                onPress={handleStartJourney}
              >
                <Text style={styles.modalButtonSubmitText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#0d98ba',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0d98ba',
  },
  progressText: {
    fontSize: 14,
    color: '#4c809a',
  },
  phasesContainer: {
    paddingHorizontal: 20,
  },
  phaseCard: {
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
  phaseHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  phaseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  phaseIcon: {
    fontSize: 24,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0d171b',
    marginBottom: 4,
  },
  phaseDescription: {
    fontSize: 14,
    color: '#4c809a',
  },
  phaseProgress: {
    marginBottom: 16,
  },
  phaseProgressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  phaseProgressBarFill: {
    height: '100%',
    backgroundColor: '#0d98ba',
  },
  phaseProgressText: {
    fontSize: 12,
    color: '#4c809a',
  },
  tasksList: {
    gap: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxCompleted: {
    backgroundColor: '#0d98ba',
    borderColor: '#0d98ba',
  },
  taskCheckmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 14,
    color: '#0d171b',
    flex: 1,
  },
  taskTitleCompleted: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 20,
  },
  modalForm: {
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonCancel: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#0d98ba',
    alignItems: 'center',
  },
  modalButtonCancelText: {
    color: '#0d98ba',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonSubmit: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#0d98ba',
    alignItems: 'center',
  },
  modalButtonSubmitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
