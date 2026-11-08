import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { getCoords } from '../services/location';
import { clearUser, getUser } from '../services/storage';
import { fetchUnits } from '../services/units';
import { useTheme } from '../ThemeContext';
import { RootStackParamList, Unit, User } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Units'>;

export function UnitsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { coords, denied } = await getCoords();
      setLocationDenied(denied);
      setUnits(await fetchUnits(coords));
    } catch {
      setError('Não foi possível carregar as unidades.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser().then(setUser);
    load();
  }, [load]);

  const handleLogout = async () => {
    await clearUser();
    navigation.replace('Identification');
  };

  const filtered = units.filter((unit) => unit.name.toLowerCase().includes(query.trim().toLowerCase()));

  const renderBody = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={colors.primary} style={styles.center} />;
    }
    if (error) {
      return (
        <View style={styles.center}>
          <Text style={[styles.message, { color: colors.danger }]}>{error}</Text>
          <Button title="Tentar de novo" onPress={load} />
        </View>
      );
    }
    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.message, { color: colors.muted }]}>Nenhuma unidade encontrada.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, espera de ${item.waitMinutes} minutos`}
            onPress={() => navigation.navigate('UnitDetail', { unitId: item.id })}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
            <Text style={{ color: colors.muted, fontSize: 15 }}>
              Espera: ~{item.waitMinutes} min
              {item.distanceKm !== undefined ? ` · ${item.distanceKm.toFixed(1)} km` : ''}
            </Text>
          </Pressable>
        )}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.greeting, { color: colors.text }]}>Olá, {user?.name ?? ''}</Text>
      {user && user.priority !== 'nenhuma' && (
        <Text style={{ color: colors.muted, marginBottom: 8 }}>
          Você tem direito a atendimento prioritário.
        </Text>
      )}
      {locationDenied && (
        <Text style={{ color: colors.muted, marginBottom: 8 }}>
          Localização negada: as unidades não estão ordenadas por distância.
        </Text>
      )}

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar unidade"
        placeholderTextColor={colors.muted}
        accessibilityLabel="Buscar unidade"
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
      />

      <View style={styles.list}>{renderBody()}</View>

      <Button title="Trocar usuário" variant="outline" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  greeting: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, minHeight: 48, marginBottom: 12 },
  list: { flex: 1, marginBottom: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'stretch' },
  message: { fontSize: 16, textAlign: 'center', marginVertical: 16 },
  card: { borderWidth: 1, borderRadius: 8, padding: 16, marginBottom: 10 },
  cardTitle: { fontSize: 17, fontWeight: '600', marginBottom: 4 },
});
