// File: app/(tabs)/index.tsx

import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Go up two directories to find context

export default function HomeScreen() {
  // Use the custom hook to get user info and the signOut function
  const { user, signOut } = useAuth();

  // Get the user's full name from the metadata stored during sign-up
  const firstName = user?.user_metadata?.first_name || '';
  const lastName = user?.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim();

  const handleLogout = async () => {
    try {
      await signOut();
      // The root layout will automatically redirect the user to the login screen
    } catch (error) {
      Alert.alert("Logout Error", "An unexpected error occurred while logging out.");
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {fullName || 'User'}!
      </Text>
      <Text style={styles.subtitle}>
        You are now logged in.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Logout" 
          onPress={handleLogout} 
          color="#d73a49"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden', // Ensures the button background respects the border radius on Android
  },
});
