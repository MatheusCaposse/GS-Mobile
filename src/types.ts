export type Mode = 'light' | 'dark';

export type Priority = 'nenhuma' | 'idoso' | 'pcd' | 'gestante';

export interface User {
  name: string;
  priority: Priority;
}

export interface Unit {
  id: string;
  name: string;
  address: string;
  hours: string;
  waitMinutes: number;
  latitude: number;
  longitude: number;
  services: string[];
  accessibility: string[];
  distanceKm?: number;
}

export interface Appointment {
  id: string;
  unitId: string;
  userName: string;
  service: string;
  date: string;
}

export interface Coords {
  latitude: number;
  longitude: number;
}

export type RootStackParamList = {
  Identification: undefined;
  Units: undefined;
  UnitDetail: { unitId: string };
};
