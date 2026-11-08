import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../ThemeContext';

export function ThemeToggle() {
  const { mode, colors, toggle } = useTheme();
  const label = mode === 'dark' ? 'Modo claro' : 'Modo escuro';

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={toggle} hitSlop={8}>
      <Text style={{ color: colors.primary, fontSize: 15, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}
