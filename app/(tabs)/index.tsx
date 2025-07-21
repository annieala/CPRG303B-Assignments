// File: app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
}

export default function LandingPage(): React.JSX.Element {
  const { user, signOut } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .select('first_name, last_name, email')
        .eq('uuid', user?.id)
        .single();

      if (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'Failed to load user details');
        return;
      }

      setUserDetails(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              // Navigation will be handled automatically by AuthContext
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const fullName = userDetails 
    ? `${userDetails.first_name} ${userDetails.last_name}`
    : 'User';

  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.nameText}>{fullName}</Text>
        {userDetails && (
          <Text style={styles.emailText}>{userDetails.email}</Text>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.contentSection}>
        <Text style={styles.contentText}>
          You have successfully signed in to your account.
        </Text>
        <Text style={styles.contentSubtext}>
          This is your landing page where you can access all your features.
        </Text>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#d73a49"
        />
      </View>

      {/* Debug Info (remove in production) */}
      <View style={styles.debugSection}>
        <Text style={styles.debugText}>
          User ID: {user?.id}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  welcomeSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  contentSubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  logoutSection: {
    marginBottom: 40,
  },
  debugSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  debugText: {
    fontSize: 12,
    color: '#999',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginTop: 100,
  },
});