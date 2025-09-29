import { Dimensions } from 'react-native';
export const color = {
  bg: '#FFFFFF',
  subtleText: '#555',
  primary: '#007AFF',
  overlay: 'rgba(0,0,0,0.25)',
  error: 'red',
  success: '#10B981',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0F172A',
  subtext: '#6B7280',
  border: '#E6E9EE',
  danger: '#EF4444',
};
export const radius = { sm: 8, md: 12, lg: 16 };
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
export const typography = {
  body: 16,
  caption: 13,
  title: 20,
  subTitle: 18,
  line: 22,
};
export const { width, height } = Dimensions.get('window');
