import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SCREENS, { screenOptions } from '../constants/screens';
import Dashboard from '../modules/dashboard/screens/Dashboard';

const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={SCREENS.Dashboard} component={Dashboard} />
  </Stack.Navigator>
);

export default AppStack;
