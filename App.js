import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Outfit_800ExtraBold, Outfit_500Medium } from '@expo-google-fonts/outfit';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FontsLoadedProvider } from './src/context/FontsContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_800ExtraBold,
    Outfit_500Medium,
  });

  return (
    <SafeAreaProvider>
      <FontsLoadedProvider value={fontsLoaded}>
        <StatusBar style="dark" />
        <AppNavigator />
      </FontsLoadedProvider>
    </SafeAreaProvider>
  );
}