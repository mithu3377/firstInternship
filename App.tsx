
 
import React from 'react';
import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { InternshipProvider } from './src/context/InternshipContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AuthProvider>
      <InternshipProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </InternshipProvider>
    </AuthProvider>
  );
}

export default App;
