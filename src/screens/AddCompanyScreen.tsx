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
import { useInternship } from '../context/InternshipContext';

const AddCompanyScreen: React.FC = () => {
  const { addCompany } = useInternship();
  
  const [companyName, setCompanyName] = useState('');
  const [area, setArea] = useState('');
  const [maxInternships, setMaxInternships] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCompany = () => {
    if (!companyName || !area || !maxInternships || !managerName || !managerEmail) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const internshipsCount = parseInt(maxInternships, 10);
    if (isNaN(internshipsCount) || internshipsCount <= 0) {
      Alert.alert('Error', 'Please enter a valid number of internships');
      return;
    }

    // Add company using context
    addCompany({
      name: companyName,
      area: area,
      maxInternships: internshipsCount,
      managerId: Date.now().toString(), // Generate a temporary manager ID
      managerName: managerName,
      managerEmail: managerEmail,
      isActive: true,
    });

    Alert.alert('Success', 'Company enrolled successfully!');
    
    // Reset form
    setCompanyName('');
    setArea('');
    setMaxInternships('');
    setManagerName('');
    setManagerEmail('');
    setDescription('');
    
    // Navigate back
    console.log('Go back');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Company Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            placeholderTextColor="#999"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        {/* Area/Technology */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Area/Technology *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Frontend Development, Data Science"
            placeholderTextColor="#999"
            value={area}
            onChangeText={setArea}
          />
        </View>

        {/* Max Internships */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Max Internships Allowed *</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of internships"
            placeholderTextColor="#999"
            value={maxInternships}
            onChangeText={setMaxInternships}
            keyboardType="numeric"
          />
        </View>

        {/* Manager Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Manager Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Manager Name"
            placeholderTextColor="#999"
            value={managerName}
            onChangeText={setManagerName}
          />
        </View>

        {/* Manager Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Manager Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="manager@company.com"
            placeholderTextColor="#999"
            value={managerEmail}
            onChangeText={setManagerEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Company Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Add Company Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddCompany}>
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Add Company</Text>
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
  addButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  addButtonIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCompanyScreen;

