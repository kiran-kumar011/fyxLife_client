import { useMMKVStorage } from 'react-native-mmkv';
import storage from '../storage';

// key: 'isOnboarded' or 'device_prefs' etc.
export function useOnboarded() {
  // default false (not onboarded)
  const [isOnboarded, setIsOnboarded] = useMMKVStorage(
    'isOnboarded',
    storage,
    false,
  );
  return [isOnboarded, setIsOnboarded];
}
