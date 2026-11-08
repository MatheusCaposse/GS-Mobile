import * as Location from 'expo-location';
import { Coords } from '../types';

export interface LocationResult {
  coords: Coords | null;
  denied: boolean;
}

// Pede permissão e devolve a posição. Se negar, o app continua funcionando sem ordenar por distância.
export async function getCoords(): Promise<LocationResult> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return { coords: null, denied: true };
    }
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      denied: false,
    };
  } catch {
    return { coords: null, denied: false };
  }
}
