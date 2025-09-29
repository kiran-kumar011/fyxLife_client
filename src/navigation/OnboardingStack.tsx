import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SCREENS, { screenOptions } from '../constants/screens';
import {
  OnboardingConfirmation,
  OnboardingUserInfo,
  OnboardingWelcome,
} from '../modules/onboarding/screens';

const Stack = createStackNavigator();

const OnboardingStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name={SCREENS.OnboardingWelcome}
      component={OnboardingWelcome}
    />
    <Stack.Screen
      name={SCREENS.OnboardingUserInfo}
      component={OnboardingUserInfo}
    />
    <Stack.Screen
      name={SCREENS.OnboardingConfirmation}
      component={OnboardingConfirmation}
    />
  </Stack.Navigator>
);

export default OnboardingStack;
