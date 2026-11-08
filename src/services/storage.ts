import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mode, User } from '../types';

const USER_KEY = '@fila-clara/user';
const MODE_KEY = '@fila-clara/mode';

export async function getUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export async function saveUser(user: User): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function clearUser(): Promise<void> {
  await AsyncStorage.removeItem(USER_KEY);
}

export async function getSavedMode(): Promise<Mode | null> {
  const raw = await AsyncStorage.getItem(MODE_KEY);
  return raw === 'light' || raw === 'dark' ? raw : null;
}

export async function saveMode(mode: Mode): Promise<void> {
  await AsyncStorage.setItem(MODE_KEY, mode);
}
