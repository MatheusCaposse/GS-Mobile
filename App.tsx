import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeToggle } from './src/components/ThemeToggle';
import { IdentificationScreen } from './src/screens/IdentificationScreen';
import { UnitDetailScreen } from './src/screens/UnitDetailScreen';
import { UnitsScreen } from './src/screens/UnitsScreen';
import { getUser } from './src/services/storage';
import { ThemeProvider, useTheme } from './src/ThemeContext';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Root() {
  const { mode, colors } = useTheme();
  // undefined = ainda carregando; true/false = já sabemos se há usuário salvo
  const [hasUser, setHasUser] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    getUser().then((user) => setHasUser(user !== null));
  }, []);

  if (hasUser === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const base = mode === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName={hasUser ? 'Units' : 'Identification'}
        screenOptions={{ headerRight: () => <ThemeToggle /> }}
      >
        <Stack.Screen name="Identification" component={IdentificationScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Units" component={UnitsScreen} options={{ title: 'Unidades de saúde' }} />
        <Stack.Screen name="UnitDetail" component={UnitDetailScreen} options={{ title: 'Unidade' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
