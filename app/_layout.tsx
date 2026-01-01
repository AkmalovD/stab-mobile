import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '../auth/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
          <Stack.Screen name="reset-password" options={{ title: 'Reset Password' }} />
          <Stack.Screen name="profile" options={{ title: 'Profile' }} />
          <Stack.Screen name="budget" options={{ title: 'Budget Planning' }} />
          <Stack.Screen name="compare" options={{ title: 'Compare Cities' }} />
          <Stack.Screen name="plan-journey" options={{ title: 'Plan Journey' }} />
          <Stack.Screen name="scholarships" options={{ title: 'Scholarships' }} />
          <Stack.Screen name="community" options={{ title: 'Community' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
