import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../types';

const KEY = '@fila-clara/appointments';

async function readAll(): Promise<Appointment[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Appointment[]) : [];
}

export async function getAppointments(unitId: string): Promise<Appointment[]> {
  const all = await readAll();
  return all.filter((item) => item.unitId === unitId);
}

export async function createAppointment(data: Omit<Appointment, 'id'>): Promise<Appointment> {
  const all = await readAll();
  const item: Appointment = { ...data, id: String(Date.now()) };
  await AsyncStorage.setItem(KEY, JSON.stringify([...all, item]));
  return item;
}
