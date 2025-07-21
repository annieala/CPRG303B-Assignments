// File: components/SignInForm.tsx

import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

// Define the types for the props this component will receive
type SignInFormProps = {
  username?: string;
  password?: string;
  error?: string;
  onUsernameChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSignIn: () => void;
};

const SignInForm = ({ 
  username, 
  password, 
  error, 
  onUsernameChange, 
  onPasswordChange, 
  onSignIn 
}: SignInFormProps) => {
  return (
    <View style={styles.formContainer}>
      {/* Conditionally render the error message only if it exists */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={onUsernameChange}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry // Hides the password
      />
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default SignInForm;