import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import Input from '../components/ui/Input';
import { loginSchema } from '../validators/loginSchema';
import { registerSchema } from '../validators/registerSchema';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  // Sign up state
  const [name, setName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpErrors, setSignUpErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const validateLoginForm = (): boolean => {
    const result = loginSchema.safeParse({
      email,
      password,
      rememberMe
    });

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    });

    return false;
  };

  const validateSignUpForm = (): boolean => {
    const result = registerSchema.safeParse({
      name,
      email: signUpEmail,
      password: signUpPassword,
      confirmPassword
    });

    if (result.success) {
      setSignUpErrors({});
      return true;
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    setSignUpErrors({
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
      confirmPassword: fieldErrors.confirmPassword?.[0],
    });

    return false;
  };

  const handleLoginSubmit = async () => {
    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);

    const result = await login(email, password, rememberMe);

    setIsLoading(false);

    if (result.error) {
      if (result.error.includes('email') || result.error.includes('найден')) {
        setErrors({ email: result.error });
      } else if (result.error.includes('пароль')) {
        setErrors({ password: result.error });
      } else {
        setErrors({ password: result.error });
      }
    } else {
      Alert.alert('Success', 'Login successful!');
      router.replace('/');
    }
  };

  const handleSignUpSubmit = async () => {
    if (!validateSignUpForm()) {
      return;
    }

    setIsLoading(true);

    const result = await register(name, signUpEmail, signUpPassword);

    setIsLoading(false);

    if (result.error) {
      if (result.error.includes('email')) {
        setSignUpErrors({ email: result.error });
      } else {
        Alert.alert('Error', result.error);
      }
    } else {
      Alert.alert('Success', 'Registration successful!');
      router.replace('/');
    }
  };

  const handleGoogleAuth = () => {
    Alert.alert('Coming Soon', `Google ${activeTab === 'login' ? 'sign-in' : 'sign-up'} will be available soon!`);
  };

  const handleFacebookAuth = () => {
    Alert.alert('Coming Soon', `Facebook ${activeTab === 'login' ? 'sign-in' : 'sign-up'} will be available soon!`);
  };

  const handleTabSwitch = (tab: 'login' | 'signup') => {
    if (tab === activeTab) return;
    
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: tab === 'signup' ? -50 : 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveTab(tab);
      
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

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
        
        <Text style={styles.title}>Get Started now</Text>
        <Text style={styles.subtitle}>Create an account or log in to explore about our app</Text>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'login' && styles.tabActive]}
              onPress={() => handleTabSwitch('login')}
              disabled={isLoading}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>
                Log In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'signup' && styles.tabActive]}
              onPress={() => handleTabSwitch('signup')}
              disabled={isLoading}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.tabTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields with Animation */}
        <Animated.View 
          style={[
            styles.form,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {activeTab === 'login' ? (
            <>
              <Input
                label="Email"
                placeholder="examplet@mail.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />

              <Input
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                error={errors.password}
                isPassword
                editable={!isLoading}
              />

              {/* Options Row */}
              <View style={styles.optionsRow}>
                <Checkbox
                  checked={rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                  label="Remember me"
                  disabled={isLoading}
                />

                <TouchableOpacity
                  onPress={() => router.push('/reset-password' as any)}
                  disabled={isLoading}
                >
                  <Text style={styles.forgotLink}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <Button
                title="Log In"
                onPress={handleLoginSubmit}
                loading={isLoading}
                disabled={isLoading}
                style={styles.submitButton}
              />
            </>
          ) : (
            <>
              <Input
                label="Name"
                placeholder="John Doe"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (signUpErrors.name) setSignUpErrors({ ...signUpErrors, name: undefined });
                }}
                error={signUpErrors.name}
                editable={!isLoading}
                autoCapitalize="words"
              />

              <Input
                label="Email"
                placeholder="Loisbecket@gmail.com"
                value={signUpEmail}
                onChangeText={(text) => {
                  setSignUpEmail(text);
                  if (signUpErrors.email) setSignUpErrors({ ...signUpErrors, email: undefined });
                }}
                error={signUpErrors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />

              <Input
                label="Password"
                placeholder="••••••••"
                value={signUpPassword}
                onChangeText={(text) => {
                  setSignUpPassword(text);
                  if (signUpErrors.password) setSignUpErrors({ ...signUpErrors, password: undefined });
                }}
                error={signUpErrors.password}
                isPassword
                editable={!isLoading}
              />

              <Input
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (signUpErrors.confirmPassword) setSignUpErrors({ ...signUpErrors, confirmPassword: undefined });
                }}
                error={signUpErrors.confirmPassword}
                isPassword
                editable={!isLoading}
              />

              {/* Sign Up Button */}
              <Button
                title="Sign Up"
                onPress={handleSignUpSubmit}
                loading={isLoading}
                disabled={isLoading}
                style={styles.submitButton}
              />
            </>
          )}

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Auth Buttons */}
          <View style={styles.socialButtonsRow}>
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton, isLoading && styles.socialButtonDisabled]}
              onPress={handleGoogleAuth}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <AntDesign name="google" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton, isLoading && styles.socialButtonDisabled]}
              onPress={handleFacebookAuth}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Entypo name="facebook" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
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
    paddingBottom: 30,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  tabsContainer: {
    marginBottom: 24,
    marginTop: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 15,
    padding: 3,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9ca3af',
  },
  tabTextActive: {
    color: '#1f2937',
    fontWeight: '700',
  },
  form: {
    marginTop: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotLink: {
    fontSize: 14,
    color: '#0d98ba',
    fontWeight: '500',
  },
  submitButton: {
    marginBottom: 20,
    backgroundColor: '#0d98ba'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6b7280',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  socialButtonDisabled: {
    opacity: 0.6,
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  facebookButton: {
    backgroundColor: '#fff',
  },
  googleIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2.5,
    borderColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  googleGContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleG: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4285f4',
    lineHeight: 22,
  },
  facebookIcon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Arial',
  },
});
