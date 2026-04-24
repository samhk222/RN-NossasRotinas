import React, {useState, useEffect, useCallback} from 'react';
import {StatusBar, useColorScheme, ActivityIndicator, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from './src/components/Toast';
import AppNavigator from './src/navigation/AppNavigator';
import ConfiguracaoScreen from './src/screens/ConfiguracaoScreen';
import {getToken, getBaseUrl} from './src/services/storage';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  const checkConfig = useCallback(async () => {
    const [token, baseUrl] = await Promise.all([getToken(), getBaseUrl()]);
    setIsConfigured(!!token && !!baseUrl);
  }, []);

  useEffect(() => {
    checkConfig();
  }, [checkConfig]);

  if (isConfigured === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f8'}}>
        <ActivityIndicator size="large" color="#1a1a2e" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          {isConfigured ? (
            <AppNavigator />
          ) : (
            <ConfiguracaoScreen
              isSetup
              onConfigSaved={() => setIsConfigured(true)}
            />
          )}
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

export default App;
