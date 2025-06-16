// File: app/_layout.tsx

import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext'; // Import your AuthProvider

export default function RootLayout() {
  return (
    // Wrap the entire app in the AuthProvider
    <AuthProvider>
      <Stack>
        {/* The login screen will be available at the root */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        
        {/* The main app with tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}