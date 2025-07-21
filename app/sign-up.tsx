// File: app/sign-up.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import SignUpForm from '../components/SignUpForm';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen(): React.JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSignUp = async (): Promise<void> => {
    // Basic validation
    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }
    if (!lastName.trim()) {
      setError('Please enter your last name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signUp(email, password, firstName, lastName);

      if (result?.error) {
        setError(result.error);
      } else {
        // ✅ Success — user is signed up, redirect handled in AuthContext if needed
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignIn = (): void => {
    router.push('/login');
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
