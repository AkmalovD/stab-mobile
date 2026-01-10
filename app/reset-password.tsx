import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { resetPassword } from '../auth/resetPassword';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

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
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoText}>S</Text>
              </View>
              <Text style={styles.logoName}>STAB</Text>
            </View>
          </View>

          {/* Success Card */}
          <View style={styles.formCard}>
            <View style={styles.successCard}>
              <Text style={styles.successIcon}>✉️</Text>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successText}>
                We&apos;ve sent a password reset link to {email}
              </Text>
              <Button
                title="Back to Login"
                onPress={() => router.push('/login' as any)}
                style={styles.button}
              />
            </View>
          </View>
          <View style={styles.bottomFiller} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <Text style={styles.logoName}>STAB</Text>
          </View>
          
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we&apos;ll send you a link to reset your password
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
              error={error}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
              autoCorrect={false}
            />

            <Button
              title="Send Reset Link"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={styles.submitButton}
            />

            <Button
              title="Back to Login"
              onPress={() => router.back()}
              disabled={isLoading}
              style={styles.backButton}
              textStyle={styles.backButtonText}
            />
          </View>
        </View>
        {/* Bottom filler to cover any remaining space */}
        <View style={styles.bottomFiller} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d98ba',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#0d98ba',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d98ba',
  },
  logoName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  formCard: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  form: {
    marginTop: 8,
  },
  submitButton: {
    marginBottom: 12,
    backgroundColor: '#0d98ba',
  },
  button: {
    backgroundColor: '#0d98ba',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
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
    marginTop: 20,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  bottomFiller: {
    backgroundColor: '#f3f4f6',
    height: 100,
  },
});
