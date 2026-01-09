import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface SocialButtonProps {
  provider: 'google' | 'facebook';
  onPress: () => void;
  disabled?: boolean;
}

export default function SocialButton({ provider, onPress, disabled = false }: SocialButtonProps) {
  const getIcon = () => {
    if (provider === 'google') {
      return 'G'; // Simple text icon
    }
    return 'f'; // Simple text icon
  };

  const getTitle = () => {
    return `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.text}>{getTitle()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#1f2937',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
  },
});
