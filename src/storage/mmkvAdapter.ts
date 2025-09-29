// storage/mmkvAdapter.ts
import { MMKV } from 'react-native-mmkv';
import { StorageAdapter } from './StorageAdapter';

/**
 * Create an MMKV instance.
 * - For encryption: new MMKV({ id: 'app', encryptionKey: '...' })
 * - You can create multiple instances if needed.
 */
export const mmkv = new MMKV({
  id: 'fyxlife',
  // encryptionKey: "CHANGE_ME_TO_A_SECURE_KEY", // optional
});

/**
 * QM: MMKV stores primitives; we'll store JSON stringified values for objects to keep things simple.
 * We keep the public API Promise-based to match other adapters.
 */

const tryParse = (raw: string | undefined | null) => {
  if (raw === undefined || raw === null) {
    return null;
  }
  // try parse JSON, if fail return raw string
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

const MMKVAdapter: StorageAdapter = {
  async get<T = any>(key: string) {
    try {
      const raw = mmkv.getString(key);
      const parsed = tryParse(raw);
      return parsed as T | null;
    } catch (e) {
      console.warn('MMKV get error:', e);
      return null;
    }
  },

  async set<T = any>(key: string, value: T) {
    try {
      // primitives (string/number/boolean) can be saved directly, but to keep shape consistent we stringify everything.
      const raw = typeof value === 'string' ? value : JSON.stringify(value);
      mmkv.set(key, raw);
    } catch (e) {
      console.warn('MMKV set error:', e);
      throw e;
    }
  },

  async remove(key: string) {
    try {
      mmkv.delete(key);
    } catch (e) {
      console.warn('MMKV remove error:', e);
      throw e;
    }
  },

  async multiGet(keys: string[]) {
    try {
      return keys.map(
        k => [k, tryParse(mmkv.getString(k))] as [string, any | null],
      );
    } catch (e) {
      console.warn('MMKV multiGet error:', e);
      return keys.map(k => [k, null] as [string, any | null]);
    }
  },

  async keys() {
    try {
      // MMKV has .getAllKeys()
      return mmkv.getAllKeys();
    } catch (e) {
      console.warn('MMKV keys error:', e);
      return [];
    }
  },

  async clear() {
    try {
      mmkv.clearAll();
    } catch (e) {
      console.warn('MMKV clear error:', e);
      throw e;
    }
  },
};

export default MMKVAdapter;
