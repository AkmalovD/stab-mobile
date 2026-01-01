import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { resetPassword } from '../auth/resetPassword';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      setError('Email обязателен');
      return;
    }

    setIsLoading(true);

    const result = await resetPassword(email);

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setEmailSent(true);
      Alert.alert('Успешно', 'Письмо для сброса пароля отправлено на ваш email');
    }
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✉️</Text>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successText}>
              We&apos;ve sent a password reset link to {email}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/login' as any)}
            >
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we&apos;ll send you a link to reset your password
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="you@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={isLoading}
          >
            <Text style={styles.backButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4c809a',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4c809a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#0d171b',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#0d98ba',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#0d98ba',
    fontSize: 14,
    fontWeight: '600',
  },
  successCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d171b',
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: '#4c809a',
    textAlign: 'center',
    marginBottom: 24,
  },
});
