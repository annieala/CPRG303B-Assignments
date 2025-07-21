
// File: lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace these with your ACTUAL Supabase credentials
const supabaseUrl = 'https://pyjwwfwoovhlbhqfusdv.supabase.co';  // ← Your real URL
const supabaseAnonKey = 'sb_publishable_f1WYgMqQ1JvBBDQ7y-wktQ_R1NFGiJN';               // ← Your real key

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});