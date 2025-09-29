export interface StorageAdapter {
  get<T = any>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  multiGet(keys: string[]): Promise<[string, any | null][]>; // returns pairs [key, value]
  keys(): Promise<string[]>;
  clear(): Promise<void>;
}
