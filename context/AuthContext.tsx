// File: context/AuthContext.tsx

import { router, useSegments } from "expo-router";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the context data
type AuthData = {
  signIn: () => void;
  signOut: () => void;
  user: any; // In a real app, you'd have a user object type
};

const AuthContext = createContext<AuthData | undefined>(undefined);

// This hook can be used to access the user info
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: any) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(tabs)";

    if (!user && inAuthGroup) {
      // Redirect to the login page if the user is not signed in
      // and is trying to access a protected route.
      router.replace("/login");
    } else if (user && !inAuthGroup) {
      // Redirect to the main app page if the user is signed in
      // and is currently on a page outside the protected group (e.g., login).
      router.replace("/(tabs)");
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null); // Initially no user
  
  useProtectedRoute(user);

  const signIn = () => {
    // Perform sign-in logic
    setUser({ name: "User" }); // Set a dummy user object
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}