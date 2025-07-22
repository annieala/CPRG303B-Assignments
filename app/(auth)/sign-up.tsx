
// File: app/(auth)/sign-up.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
// ✅ FIXED: Corrected the import path to go up two directories
import SignUpForm from '../../components/SignUpForm';
import { useAuth } from '../../context/AuthContext';

export default function SignUpScreen(): React.JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSignUp = async (): Promise<void> => {
    if (!firstName || !lastName || !email || !password) {
        setError("Please fill out all fields.");
        return;
    }
    setLoading(true);
    setError('');

    try {
      const result = await signUp(email, password, firstName, lastName);

      if (result?.error) {
        setError(result.error);
      } else {
        Alert.alert(
            "Sign Up Successful", 
            "Please check your email to verify your account before logging in."
        );
        router.replace('/(auth)/login');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignIn = (): void => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <SignUpForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        error={error}
        loading={loading}
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSignUp={handleSignUp}
        onNavigateToSignIn={handleNavigateToSignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
});
