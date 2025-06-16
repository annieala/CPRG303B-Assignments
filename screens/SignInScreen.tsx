import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SignInForm from '../components/SignInForm';
import { RootStackParamList } from '../types/navgation';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function SignInScreen({ navigation }: SignInScreenProps): React.JSX.Element  {
  const handleSignInSuccess = (): void => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <SignInForm onSignInSuccess={handleSignInSuccess} />
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