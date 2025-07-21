// File: app/login.tsx (Fully Updated)

import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { router } from 'expo-router'; // ✅ ADD THIS BACK
import SignInForm from '../components/SignInForm';
import credentials from '../credentials.json';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = () => {
    if (username.length < 5) {
      setError('Username must be at least 5 characters long.');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be 8+ characters with uppercase, lowercase, number, and special character.');
      return;
    }
    const user = credentials.users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    if (!user) {
      setError('Username not found.');
      return;
    }
    if (user.password !== password) {
      setError('Incorrect password.');
      return;
    }

    setError('');
    signIn();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <SignInForm
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSignIn={handleSignIn}
        error={error}
      />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => router.push('/sign-up')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
});
