import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For the month dropdown
import { SafeAreaView } from 'react-native-safe-area-context'; // To handle notches/status bars

// Main App component for the Date Fact Finder application.
// This component handles user input for month and day,
// makes an API call to fetch a fact, and displays it.
const App = () => {
  // State variables to store the selected month, day, and the fetched fact.
  const [month, setMonth] = useState(''); // Stores the selected month (1-12)
  const [day, setDay] = useState('');     // Stores the entered day
  const [fact, setFact] = useState('Enter a month and day to see an interesting fact!'); // Stores the fetched fact
  const [loading, setLoading] = useState(false); // Indicates if an API call is in progress
  const [error, setError] = useState<string | null>(null);      // Stores any error messages

  // Your RapidAPI Key and Host.
  // This has been updated with the key you provided.
  const RAPIDAPI_KEY = 'd81dc35894msh7c2ab716844f22fp1ace73jsnec6087376a9b';
  const RAPIDAPI_HOST = 'numbersapi.p.rapidapi.com'; // Common host for Numbers API

  // useEffect hook to trigger the API call whenever 'month' or 'day' changes.
  // This ensures the fact is updated automatically without a button click.
  useEffect(() => {
    // Only make the API call if both month and day are valid.
    // Month must be between 1 and 12.
    // Day must be a positive number.
    if (month && day && parseInt(month) >= 1 && parseInt(month) <= 12 && parseInt(day) >= 1) {
      fetchFact();
    } else if (!month || !day) {
      // Reset fact if inputs are cleared or invalid
      setFact('Enter a month and day to see an interesting fact!');
      setError(null);
    }
  }, [month, day]); // Dependencies: This effect runs when 'month' or 'day' state changes.

  // Function to fetch the interesting fact from the Numbers API.
  const fetchFact = async () => {
    setLoading(true); // Set loading state to true
    setError(null);   // Clear any previous errors

    // Construct the API URL using the selected month and day.
    const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date?json=true`;

    // Define the options for the fetch request, including headers for authentication.
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY
      }
    };

    try {
      // Make the API call.
      const response = await fetch(url, options);

      // Check if the response was successful (status code 2xx).
      if (!response.ok) {
        // If not successful, throw an error with the status.
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response.
      const result = await response.json();

      // Update the 'fact' state with the fetched fact.
      if (result.text) {
        setFact(result.text);
      } else {
        setFact('No fact found for this date. Please try another date.');
      }
    } catch (err: any) { // Use 'any' for error type if unsure, or define a more specific type
      // Catch and handle any errors during the fetch operation.
      console.error('Error fetching fact:', err);
      // Display a user-friendly error message using Alert (React Native equivalent of browser alert)
      Alert.alert(
        "Error",
        `Failed to fetch fact: ${err.message}. Please check your API key and host, and ensure the date is valid.`,
        [{ text: "OK" }]
      );
      setError(`Failed to fetch fact: ${err.message}.`);
      setFact('Could not retrieve fact.'); // Display a generic error message to the user
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  // Function to handle changes in the month dropdown.
  const handleMonthChange = (itemValue: string) => {
    setMonth(itemValue); // Update the month state
  };

  // Function to handle changes in the day input field.
  const handleDayChange = (text: string) => {
    // Ensure only numbers are entered for the day.
    const value = text.replace(/[^0-9]/g, '');
    setDay(value); // Update the day state
  };

  // Array of months for the dropdown menu.
  const months = [
    { value: '', label: 'Select Month' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Date Fact Finder
        </Text>

        <View style={styles.inputSection}>
          {/* Month Dropdown */}
          <View>
            <Text style={styles.label}>
              Month
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={month}
                onValueChange={handleMonthChange}
                style={styles.picker}
                itemStyle={Platform.OS === 'android' ? { height: 120 } : {}} // Adjust item height for Android
              >
                {months.map((m) => (
                  <Picker.Item key={m.value} label={m.label} value={m.value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Day Input Field */}
          <View>
            <Text style={styles.label}>
              Day
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric" // Ensures numeric keyboard on mobile
              value={day}
              onChangeText={handleDayChange}
              placeholder="e.g., 25"
              maxLength={2} // Max 2 digits for day
            />
          </View>
        </View>

        {/* Display Area for Fact, Loading, or Error */}
        <View style={styles.factDisplayArea}>
          {loading ? (
            <ActivityIndicator size="large" color="#4F46E5" /> // Using hex color for indigo-600
          ) : error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : (
            <Text style={styles.factText}>
              {fact}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

// StyleSheet for all component styling
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2FF', // Equivalent to bg-blue-50
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16, // Equivalent to p-4
  },
  container: {
    backgroundColor: '#FFFFFF', // Equivalent to bg-white
    padding: 32, // Equivalent to p-8
    borderRadius: 16, // Equivalent to rounded-2xl
    shadowColor: '#000', // Equivalent to shadow-xl
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8, // For Android shadow
    width: '100%',
    maxWidth: 400, // Equivalent to max-w-md
    borderColor: '#E5E7EB', // Equivalent to border-gray-200
    borderWidth: 1,
  },
  title: {
    fontSize: 28, // Equivalent to text-3xl
    fontWeight: '800', // Equivalent to font-extrabold
    color: '#1F2937', // Equivalent to text-gray-800
    marginBottom: 24, // Equivalent to mb-6
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 32, // Equivalent to mb-8
    gap: 16, // Equivalent to space-y-4
  },
  label: {
    fontSize: 14, // Equivalent to text-sm
    fontWeight: '500', // Equivalent to font-medium
    color: '#374151', // Equivalent to text-gray-700
    marginBottom: 4, // Equivalent to mb-1
  },
  pickerContainer: {
    borderColor: '#D1D5DB', // Equivalent to border-gray-300
    borderWidth: 1,
    borderRadius: 6, // Equivalent to rounded-md
    shadowColor: '#000', // Equivalent to shadow-sm
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
    overflow: 'hidden', // Ensures picker content stays within bounds
  },
  picker: {
    width: '100%',
    height: 48, // Equivalent to h-12
    color: '#1F2937', // Text color
  },
  textInput: {
    borderColor: '#D1D5DB', // Equivalent to border-gray-300
    borderWidth: 1,
    borderRadius: 6, // Equivalent to rounded-md
    shadowColor: '#000', // Equivalent to shadow-sm
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
    paddingHorizontal: 12, // Equivalent to px-3
    paddingVertical: 8, // Equivalent to py-2
    fontSize: 16, // Equivalent to text-base
    color: '#1F2937', // Text color
  },
  factDisplayArea: {
    backgroundColor: '#EEF2FF', // Equivalent to bg-indigo-50
    padding: 24, // Equivalent to p-6
    borderRadius: 12, // Equivalent to rounded-xl
    borderColor: '#C7D2FE', // Equivalent to border-indigo-200
    borderWidth: 1,
    shadowColor: '#000', // Equivalent to shadow-inner (simulated)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    minHeight: 120, // Equivalent to min-h-[120px]
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  errorText: {
    color: '#DC2626', // Equivalent to text-red-600
    fontWeight: '500', // Equivalent to font-medium
    fontSize: 14, // Equivalent to text-sm
    textAlign: 'center',
  },
  factText: {
    color: '#312E81', // Equivalent to text-indigo-800
    fontWeight: '500', // Equivalent to font-medium
    fontSize: 18, // Equivalent to text-lg
    textAlign: 'center',
  },
});

export default App;
