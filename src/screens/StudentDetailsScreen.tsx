import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useInternship } from '../context/InternshipContext';

// Define the route params type
type StudentDetailsRouteParams = {
  assignmentId?: string;
};

type StudentDetailsRouteProp = RouteProp<{ StudentDetails: StudentDetailsRouteParams }, 'StudentDetails'>;

const StudentDetailsScreen: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('Update Status');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [progressValue, setProgressValue] = useState('');
  
  const route = useRoute<StudentDetailsRouteProp>();
  const { user } = useAuth();
  const { 
    getCompanyAssignments, 
    companies, 
    updateInternshipProgress, 
    completeInternship, 
    issueCertificate 
  } = useInternship();

  // Get assignment ID from route params or use first available
  const managerCompany = companies.find(company => company.managerId === user?.id);
  const companyAssignments = managerCompany ? getCompanyAssignments(managerCompany.id) : [];
  const activeAssignments = companyAssignments.filter(assignment => 
    assignment.status === 'assigned' || assignment.status === 'in_progress'
  );

  // Use assignment ID from route params or first available
  const assignmentId = route.params?.assignmentId || activeAssignments[0]?.id;
  const currentAssignment = activeAssignments.find(a => a.id === assignmentId);

  const statusOptions = ['In-Progress', 'Completed'];

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  const handleUpdateProgress = () => {
    if (!currentAssignment) {
      Alert.alert('Error', 'No assignment selected');
      return;
    }

    if (selectedStatus === 'Update Status') {
      Alert.alert('Error', 'Please select a status');
      return;
    }

    if (selectedStatus === 'In-Progress') {
      const progress = parseInt(progressValue, 10);
      if (isNaN(progress) || progress < 0 || progress > 100) {
        Alert.alert('Error', 'Please enter a valid progress value (0-100)');
        return;
      }
      updateInternshipProgress(currentAssignment.id, progress);
      Alert.alert('Success', `Progress updated to ${progress}%`);
    } else if (selectedStatus === 'Completed') {
      completeInternship(currentAssignment.id);
      Alert.alert('Success', 'Internship marked as completed!');
    }
  };

  const handleIssueCertificate = () => {
    if (!currentAssignment) {
      Alert.alert('Error', 'No assignment selected');
      return;
    }

    if (currentAssignment.status !== 'completed') {
      Alert.alert('Error', 'Internship must be completed before issuing certificate');
      return;
    }

    issueCertificate(currentAssignment.id);
    Alert.alert('Success', 'Certificate issued successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => console.log('Go back')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Details</Text>
      </View>

      {/* Student Information Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Student Name</Text>
          <Text style={styles.tableValue}>
            {currentAssignment?.studentName || 'No assignment'}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Company</Text>
          <Text style={styles.tableValue}>
            {currentAssignment?.companyName || 'Not assigned'}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Status</Text>
          <Text style={styles.tableValue}>
            {currentAssignment?.status || 'Not assigned'}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Progress</Text>
          <Text style={styles.tableValue}>
            {currentAssignment?.progress || 0}%
          </Text>
        </View>
      </View>

      {/* Update Status Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Status</Text>
        
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text style={styles.dropdownText}>{selectedStatus}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropdownOptions}>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownOption}
                onPress={() => handleStatusSelect(option)}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedStatus === 'In-Progress' && (
          <View style={styles.progressInputContainer}>
            <Text style={styles.progressLabel}>Progress (0-100):</Text>
            <TextInput
              style={styles.progressInput}
              placeholder="Enter progress percentage"
              placeholderTextColor="#999"
              value={progressValue}
              onChangeText={setProgressValue}
              keyboardType="numeric"
            />
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProgress}>
          <Text style={styles.buttonText}>Update Progress</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.uploadButton,
            currentAssignment?.status !== 'completed' && styles.disabledButton
          ]} 
          onPress={handleIssueCertificate}
          disabled={currentAssignment?.status !== 'completed'}
        >
          <Text style={[
            styles.buttonText,
            currentAssignment?.status !== 'completed' && styles.disabledButtonText
          ]}>
            Issue Certificate
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Text */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Certification of completion</Text>
      </View>
    </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  tableValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  dropdownOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  updateButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
  progressInputContainer: {
    marginTop: 15,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  progressInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledButtonText: {
    color: '#999',
  },
});

export default StudentDetailsScreen;

