import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../ThemeContext';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}

export function Button({ title, onPress, variant = 'primary' }: Props) {
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={[
        styles.button,
        isPrimary
          ? { backgroundColor: colors.primary }
          : { borderWidth: 1, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.text, { color: isPrimary ? colors.primaryText : colors.text }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: { fontSize: 16, fontWeight: '600' },
});
