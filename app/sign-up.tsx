// app/sign-up.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SignUpForm from '../components/SignUpForm';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    setError('');
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
    const { error } = await signUp(email, password, firstName, lastName);

    if (error) {
      setError(error.message || 'Sign-up failed');
    } else {
      // After successful signup, redirect to login page or landing
      router.replace('/login');
    }
    setLoading(false);
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
        onNavigateToSignIn={() => router.push('/login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#f5f5f5' },
});
