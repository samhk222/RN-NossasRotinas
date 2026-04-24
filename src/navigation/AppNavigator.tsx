import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RotinasScreen from '../screens/RotinasScreen';
import ConfiguracaoScreen from '../screens/ConfiguracaoScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          height: 85,
          paddingBottom: 28,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#1a1a2e',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 20,
          color: '#1a1a2e',
        },
      }}
    >
      <Tab.Screen
        name="Rotinas"
        component={RotinasScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22 }}>
              {color === '#1a1a2e' ? '\u26A1' : '\u26A1'}
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => {
                (RotinasScreen as any).refresh?.();
              }}
            >
              <Text style={styles.refreshIcon}>{'\u21BB'}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Configuracao"
        component={ConfigWrapper}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22 }}>
              {color === '#1a1a2e' ? '\u2699' : '\u2699'}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ConfigWrapper() {
  return <ConfiguracaoScreen />;
}

const styles = StyleSheet.create({
  refreshButton: {
    marginRight: 16,
    padding: 8,
  },
  refreshIcon: {
    fontSize: 22,
    color: '#1a1a2e',
  },
});
