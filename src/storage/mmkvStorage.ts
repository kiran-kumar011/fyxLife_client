import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV({ id: 'app_storage' });
export const PERSIST_KEY = 'selected-pack-v1';

export const mmkvStorage = {
  // createJSONStorage expects getItem/setItem/removeItem that return Promises
  getItem: (name: string) => {
    try {
      const raw = mmkv.getString(name);
      return Promise.resolve(raw ?? null);
    } catch (err) {
      console.warn('mmkv.getItem error', err);
      return Promise.resolve(null);
    }
  },
  setItem: (name: string, value: string) => {
    try {
      mmkv.set(name, value);
      return Promise.resolve();
    } catch (err) {
      console.warn('mmkv.setItem error', err);
      return Promise.resolve();
    }
  },
  removeItem: (name: string) => {
    try {
      mmkv.delete(name);
      return Promise.resolve();
    } catch (err) {
      console.warn('mmkv.removeItem error', err);
      return Promise.resolve();
    }
  },
};
