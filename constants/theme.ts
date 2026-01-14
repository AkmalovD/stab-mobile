/**
 * Theme constants for Study Abroad Planning App
 * Colors follow the design specification for a clean, corporate look
 */

import { Platform } from 'react-native';

// Primary brand color as specified
const primaryColor = '#0d98ba';

export const Colors = {
  light: {
    text: '#000000',
    background: '#F8F9FA',
    tint: primaryColor,
    icon: '#666666',
    tabIconDefault: '#666666',
    tabIconSelected: primaryColor,
    card: '#FFFFFF',
    border: '#E5E5E5',
    grayText: '#666666',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: primaryColor,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryColor,
    card: '#1E2022',
    border: '#2E3235',
    grayText: '#9BA1A6',
  },
};

// App-wide color constants
export const AppColors = {
  primary: '#0d98ba',
  secondary: '#FFFFFF',
  accent: '#000000',
  grayText: '#666666',
  borderGray: '#E5E5E5',
  background: '#F8F9FA',
  iconBackground: 'rgba(13, 152, 186, 0.1)',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
