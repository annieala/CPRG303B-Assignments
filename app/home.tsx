// app/home.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen(): React.JSX.Element {
  const handleSignOut = (): void => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome! You've successfully signed in.</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});