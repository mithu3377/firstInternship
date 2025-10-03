import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useInternship } from '../context/InternshipContext';


const AssignStudentScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const { 
    getStudentsWithInterest, 
    getAvailableCompanies, 
    assignStudentToCompany
  } = useInternship();

  const studentsWithInterest = getStudentsWithInterest();
  const availableCompanies = getAvailableCompanies();

  const handleAssign = (studentId: string) => {
    if (!selectedCompanyId) {
      Alert.alert('Error', 'Please select a company first');
      return;
    }

    const success = assignStudentToCompany(studentId, selectedCompanyId);
    if (success) {
      Alert.alert('Success', 'Student assigned successfully!');
    } else {
      Alert.alert('Error', 'Failed to assign student. Company may be full.');
    }
  };

  const filteredStudents = studentsWithInterest.filter(student =>
    student.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => console.log('Go back')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search By Reg No or Name"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Company Selection */}
      <View style={styles.companySelectionContainer}>
        <Text style={styles.sectionTitle}>Select Company for Assignment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.companyScrollView}>
          {availableCompanies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={[
                styles.companyCard,
                selectedCompanyId === company.id && styles.selectedCompanyCard
              ]}
              onPress={() => setSelectedCompanyId(company.id)}
            >
              <Text style={[
                styles.companyName,
                selectedCompanyId === company.id && styles.selectedCompanyName
              ]}>
                {company.name}
              </Text>
              <Text style={[
                styles.companyArea,
                selectedCompanyId === company.id && styles.selectedCompanyArea
              ]}>
                {company.area}
              </Text>
              <Text style={[
                styles.companySlots,
                selectedCompanyId === company.id && styles.selectedCompanySlots
              ]}>
                {company.maxInternships - company.currentInternships}/{company.maxInternships} slots
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Student List */}
      <ScrollView style={styles.listContainer}>
        {filteredStudents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No students with interest</Text>
            <Text style={styles.emptySubtext}>Students need to show interest first</Text>
          </View>
        ) : (
          filteredStudents.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.cardContent}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.aridNumber}>{student.regNo}</Text>
                <Text style={styles.technology}>{student.technology}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.assignButton,
                  !selectedCompanyId && styles.disabledButton
                ]}
                onPress={() => handleAssign(student.id)}
                disabled={!selectedCompanyId}
              >
                <Text style={[
                  styles.assignButtonText,
                  !selectedCompanyId && styles.disabledButtonText
                ]}>
                  Assign
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667EEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 15,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  studentCard: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  aridNumber: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 2,
  },
  technology: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  assignButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  assignButtonText: {
    color: '#667EEA',
    fontSize: 14,
    fontWeight: 'bold',
  },
  companySelectionContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  companyScrollView: {
    marginTop: 5,
  },
  companyCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCompanyCard: {
    backgroundColor: '#667EEA',
    borderColor: '#667EEA',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  selectedCompanyName: {
    color: '#FFFFFF',
  },
  companyArea: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  selectedCompanyArea: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  companySlots: {
    fontSize: 11,
    color: '#999',
  },
  selectedCompanySlots: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledButtonText: {
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default AssignStudentScreen;

