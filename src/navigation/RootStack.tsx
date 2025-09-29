import { NavigationContainer } from '@react-navigation/native';
import { useMMKVBoolean } from 'react-native-mmkv';
import { mmkv } from '../storage/mmkvAdapter';
import AppStack from './AppStack';
import OnboardingStack from './OnboardingStack';
import { STORAGE_KEYS } from '../constants/storageKeys';

export default function RootNavigator() {
  const [isOnboarded] = useMMKVBoolean(STORAGE_KEYS.IS_ONBOARDED, mmkv);

  return (
    <NavigationContainer>
      {isOnboarded ? <AppStack /> : <OnboardingStack />}
    </NavigationContainer>
  );
}
