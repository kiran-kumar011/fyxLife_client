import { StackNavigationOptions } from '@react-navigation/stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const SCREENS = {
  OnboardingWelcome: 'OnboardingWelcome',
  OnboardingUserInfo: 'OnboardingUserInfo',
  OnboardingConfirmation: 'OnboardingConfirmation',
  Dashboard: 'Dashboard',
  Progress: 'Progress',
  Riskometer: 'Riskometer',
} as const;

export type ScreenKey = keyof typeof SCREENS;
export default SCREENS;

export const screenOptions: StackNavigationOptions &
  BottomTabNavigationOptions = {
  headerShown: false,
};
