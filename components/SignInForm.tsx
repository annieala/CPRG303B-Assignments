import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SignInFormProps, ValidationErrors } from '../types/navgation';

export default function SignInForm({ onSignInSuccess }: SignInFormProps): React.JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Validation regex patterns
  const usernameRegex: RegExp = /^.{5,}$/; // At least 5 characters
  const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // Password regex breakdown:
  // (?=.*[a-z]) - at least one lowercase letter
  // (?=.*[A-Z]) - at least one uppercase letter
  // (?=.*\d) - at least one digit
  // (?=.*[@$!%*?&]) - at least one special character
  // [A-Za-z\d@$!%*?&]{8,} - at least 8 characters from allowed set

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!usernameRegex.test(username)) {
      newErrors.username = 'Username must be at least 5 characters long';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (): void => {
    if (validateForm()) {
      // Clear any previous errors
      setErrors({});
      
      // Simulate successful sign-in
      Alert.alert(
        'Success',
        'Sign-in successful!',
        [
          {
            text: 'OK',
            onPress: onSignInSuccess,
          },
        ]
      );
    }
  };

  const handleUsernameChange = (text: string): void => {
    setUsername(text);
    // Clear username error when user starts typing
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (text: string): void => {
    setPassword(text);
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const getInputStyle = (fieldName: keyof ValidationErrors): (ViewStyle | TextStyle)[] => [
    styles.input,
    // errors[fieldName] ? styles.inputError : null,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      
      {/* Username Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={getInputStyle('username')}
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Enter your username"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={getInputStyle('password')}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="current-password"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Validation Requirements Help Text */}
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Requirements:</Text>
        <Text style={styles.requirementsText}>
          • Username: At least 5 characters{'\n'}
          • Password: At least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff6b6b',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  requirementsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  requirementsText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});