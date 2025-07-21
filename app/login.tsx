// File: app/login.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SignInForm from '../components/SignInForm';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';  // <-- Add router for navigation

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signInWithEmailAndPassword } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(email, password);

      if (result?.error) {
        setError(result.error.message || 'Login failed.');
      } else {
        setError('');
        router.replace('/landing');  // <-- Redirect on successful login
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('An unexpected error occurred.');
    }
  };

  const goToSignUp = () => {
    router.push('/sign-up'); // <-- Navigate to Sign-Up page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <SignInForm
        username={email}
        password={password}
        onUsernameChange={setEmail}
        onPasswordChange={setPassword}
        onSignIn={handleSignIn}
        error={error}
      />

      <TouchableOpacity onPress={goToSignUp}>
        <Text style={styles.signupText}>Don't have an account? Sign up here.</Text>
      </TouchableOpacity>
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
  signupText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
