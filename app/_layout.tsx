// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Sign In' }} />
      <Stack.Screen name="home" options={{ title: 'Welcome' }} />
    </Stack>
  );
}