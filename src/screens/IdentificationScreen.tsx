import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { saveUser } from '../services/storage';
import { useTheme } from '../ThemeContext';
import { Priority, RootStackParamList } from '../types';
import { validateName } from '../validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Identification'>;

const OPTIONS: { value: Priority; label: string }[] = [
  { value: 'nenhuma', label: 'Nenhuma' },
  { value: 'idoso', label: 'Idoso (60+)' },
  { value: 'pcd', label: 'Pessoa com deficiência' },
  { value: 'gestante', label: 'Gestante' },
];

export function IdentificationScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<Priority>('nenhuma');
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    const problem = validateName(name);
    if (problem) {
      setError(problem);
      return;
    }
    await saveUser({ name: name.trim(), priority });
    navigation.replace('Units');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Fila Clara</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Acompanhe o atendimento na unidade de saúde mais perto de você.
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>Seu nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ex.: Maria Silva"
        placeholderTextColor={colors.muted}
        accessibilityLabel="Seu nome"
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
      />
      {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}

      <Text style={[styles.label, { color: colors.text }]}>Atendimento prioritário</Text>
      {OPTIONS.map((option) => {
        const selected = priority === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => setPriority(option.value)}
            style={[
              styles.option,
              {
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {selected ? '● ' : '○ '}
              {option.label}
            </Text>
          </Pressable>
        );
      })}

      <View style={styles.spacer} />
      <Button title="Continuar" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, marginTop: 4, marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, minHeight: 48 },
  error: { fontSize: 14, marginTop: 6 },
  option: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8, minHeight: 48 },
  spacer: { height: 24 },
});
