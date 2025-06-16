// File: app/(tabs)/_layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Or any icon library you prefer

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Style for the header, e.g., "Welcome to my new app"
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Style for the tabs
        tabBarActiveTintColor: '#f4511e',
      }}>
      <Tabs.Screen
        name="index" // This points to app/(tabs)/index.tsx
        options={{
          title: 'Calgary', // This is the tab label
          headerTitle: 'Welcome to My New App', // Header text on this screen
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-marker" color={color} />,
        }}
      />
      <Tabs.Screen
        name="vancouver" // This will point to app/(tabs)/vancouver.tsx
        options={{
          title: 'Vancouver', // This is the tab label
          headerTitle: 'Welcome to My New App', // Header text on this screen
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-pin" color={color} />,
        }}
      />
    </Tabs>
  );
}