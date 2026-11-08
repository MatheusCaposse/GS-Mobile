import { Coords, Unit } from '../types';

// Dados simulados (fictícios). Troque para true para demonstrar os estados de erro e vazio.
export const SIMULATE_ERROR = false;
export const SIMULATE_EMPTY = false;

const UNITS: Unit[] = [
  {
    id: '1',
    name: 'UBS Bela Vista',
    address: 'Rua Exemplo, 100 - Bela Vista',
    hours: 'Seg a Sex, 7h às 19h',
    waitMinutes: 25,
    latitude: -23.5586,
    longitude: -46.6489,
    services: ['Clínico geral', 'Vacinação', 'Enfermagem'],
    accessibility: ['Rampa de acesso', 'Banheiro adaptado'],
  },
  {
    id: '2',
    name: 'UBS Consolação',
    address: 'Rua Exemplo, 200 - Consolação',
    hours: 'Seg a Sex, 7h às 18h',
    waitMinutes: 45,
    latitude: -23.5547,
    longitude: -46.6603,
    services: ['Clínico geral', 'Odontologia'],
    accessibility: ['Rampa de acesso'],
  },
  {
    id: '3',
    name: 'UBS Liberdade',
    address: 'Rua Exemplo, 300 - Liberdade',
    hours: 'Seg a Sáb, 7h às 17h',
    waitMinutes: 15,
    latitude: -23.5585,
    longitude: -46.635,
    services: ['Clínico geral', 'Vacinação', 'Pediatria'],
    accessibility: ['Rampa de acesso', 'Banheiro adaptado', 'Piso tátil'],
  },
  {
    id: '4',
    name: 'UBS Jardim Paulista',
    address: 'Rua Exemplo, 400 - Jardim Paulista',
    hours: 'Seg a Sex, 8h às 17h',
    waitMinutes: 60,
    latitude: -23.57,
    longitude: -46.67,
    services: ['Clínico geral', 'Enfermagem'],
    accessibility: [],
  },
  {
    id: '5',
    name: 'UBS Vila Mariana',
    address: 'Rua Exemplo, 500 - Vila Mariana',
    hours: 'Seg a Sex, 7h às 19h',
    waitMinutes: 30,
    latitude: -23.589,
    longitude: -46.634,
    services: ['Clínico geral', 'Odontologia', 'Vacinação'],
    accessibility: ['Rampa de acesso', 'Banheiro adaptado'],
  },
];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Distância em km (fórmula de Haversine).
function distanceKm(a: Coords, b: Coords): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(h));
}

export async function fetchUnits(coords: Coords | null): Promise<Unit[]> {
  await wait(800);
  if (SIMULATE_ERROR) throw new Error('Falha simulada');
  if (SIMULATE_EMPTY) return [];

  if (!coords) return UNITS;

  return UNITS.map((unit) => ({ ...unit, distanceKm: distanceKm(coords, unit) })).sort(
    (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0),
  );
}

export async function fetchUnitById(id: string): Promise<Unit | null> {
  await wait(300);
  return UNITS.find((unit) => unit.id === id) ?? null;
}
