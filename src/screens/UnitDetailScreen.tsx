import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { createAppointment, getAppointments } from '../services/appointments';
import { getUser } from '../services/storage';
import { fetchUnitById } from '../services/units';
import { useTheme } from '../ThemeContext';
import { Appointment, RootStackParamList, Unit, User } from '../types';
import { validateDate, validateService } from '../validation';

type Props = NativeStackScreenProps<RootStackParamList, 'UnitDetail'>;

export function UnitDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const { unitId } = route.params;

  const [unit, setUnit] = useState<Unit | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [foundUnit, foundUser, foundAppointments] = await Promise.all([
      fetchUnitById(unitId),
      getUser(),
      getAppointments(unitId),
    ]);
    setUnit(foundUnit);
    setUser(foundUser);
    setAppointments(foundAppointments);
    setLoading(false);
  }, [unitId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async () => {
    const sError = validateService(service);
    const dError = validateDate(date);
    setServiceError(sError);
    setDateError(dError);
    setSuccess(null);
    if (sError || dError || !unit || !user) return;

    await createAppointment({
      unitId: unit.id,
      userName: user.name,
      service,
      date: date.trim(),
    });
    setService('');
    setDate('');
    setSuccess('Atendimento agendado!');
    setAppointments(await getAppointments(unit.id));
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!unit) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.danger, fontSize: 16 }}>Unidade não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: colors.text }]}>{unit.name}</Text>
      <Text style={[styles.text, { color: colors.muted }]}>{unit.address}</Text>
      <Text style={[styles.text, { color: colors.muted }]}>{unit.hours}</Text>
      <Text style={[styles.text, { color: colors.muted }]}>Espera atual: ~{unit.waitMinutes} min</Text>

      <Text style={[styles.section, { color: colors.text }]}>Acessibilidade</Text>
      <Text style={[styles.text, { color: colors.muted }]}>
        {unit.accessibility.length > 0
          ? unit.accessibility.join(' · ')
          : 'Sem recursos de acessibilidade informados.'}
      </Text>

      <Text style={[styles.section, { color: colors.text }]}>Agendar atendimento</Text>
      <View style={styles.chips}>
        {unit.services.map((item) => {
          const selected = service === item;
          return (
            <Pressable
              key={item}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setService(item)}
              style={[
                styles.chip,
                {
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: selected ? colors.primary : colors.card,
                },
              ]}
            >
              <Text style={{ color: selected ? colors.primaryText : colors.text, fontSize: 15 }}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {serviceError && <Text style={[styles.error, { color: colors.danger }]}>{serviceError}</Text>}

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Data (DD/MM/AAAA)"
        placeholderTextColor={colors.muted}
        keyboardType="numbers-and-punctuation"
        accessibilityLabel="Data do atendimento"
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
      />
      {dateError && <Text style={[styles.error, { color: colors.danger }]}>{dateError}</Text>}
      {success && <Text style={[styles.text, { color: colors.primary }]}>{success}</Text>}

      <View style={styles.spacer} />
      <Button title="Agendar" onPress={handleSubmit} />

      <Text style={[styles.section, { color: colors.text }]}>Meus agendamentos</Text>
      {appointments.length === 0 ? (
        <Text style={[styles.text, { color: colors.muted }]}>Nenhum agendamento nesta unidade.</Text>
      ) : (
        appointments.map((item) => (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {item.service} · {item.date}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 6 },
  text: { fontSize: 16, marginBottom: 4 },
  section: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { borderWidth: 1, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14, minHeight: 44 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, minHeight: 48 },
  error: { fontSize: 14, marginTop: 4 },
  spacer: { height: 12 },
  card: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8 },
});
