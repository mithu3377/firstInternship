import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const GenerateInternshipScreen: React.FC = () => {
  const [hiringFor, setHiringFor] = useState('');
  const [internshipAllowed, setInternshipAllowed] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerateInternship = () => {
    if (!hiringFor || !internshipAllowed || !duration || !startDate || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Handle internship generation
    Alert.alert('Success', 'Internship generated successfully!');
    
    // Reset form
    setHiringFor('');
    setInternshipAllowed('');
    setDuration('');
    setStartDate('');
    setDescription('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Hiring For */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hiring For</Text>
          <TextInput
            style={styles.input}
            placeholder="Technology"
            placeholderTextColor="#999"
            value={hiringFor}
            onChangeText={setHiringFor}
          />
        </View>

        {/* Internship Allowed */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Internship Allowed</Text>
          <TextInput
            style={styles.input}
            placeholder="Count"
            placeholderTextColor="#999"
            value={internshipAllowed}
            onChangeText={setInternshipAllowed}
            keyboardType="numeric"
          />
        </View>

        {/* Duration */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={styles.input}
            placeholder="Months"
            placeholderTextColor="#999"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
        </View>

        {/* Start Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YY"
            placeholderTextColor="#999"
            value={startDate}
            onChangeText={setStartDate}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Role Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Generate Internship Button */}
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateInternship}>
          <Text style={styles.generateButtonText}>Generate Internship</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
  },
  generateButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GenerateInternshipScreen;

