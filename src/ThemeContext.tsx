import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getSavedMode, saveMode } from './services/storage';
import { Colors, darkColors, lightColors } from './theme';
import { Mode } from './types';

interface ThemeValue {
  mode: Mode;
  colors: Colors;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeValue>({
  mode: 'light',
  colors: lightColors,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [mode, setMode] = useState<Mode>(system === 'dark' ? 'dark' : 'light');

  // Se o usuário já escolheu um modo antes, usa o escolhido.
  useEffect(() => {
    getSavedMode().then((saved) => {
      if (saved) setMode(saved);
    });
  }, []);

  const toggle = () => {
    const next: Mode = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    saveMode(next);
  };

  const colors = mode === 'dark' ? darkColors : lightColors;

  return <ThemeContext.Provider value={{ mode, colors, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  return useContext(ThemeContext);
}
