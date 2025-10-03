import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useInternship } from '../context/InternshipContext';

const ManagerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { getCompanyAssignments, companies } = useInternship();

  // Find the company for this manager
  const managerCompany = companies.find(company => company.managerId === user?.id);
  const companyAssignments = managerCompany ? getCompanyAssignments(managerCompany.id) : [];
  const activeInterns = companyAssignments.filter(assignment => 
    assignment.status === 'assigned' || assignment.status === 'in_progress'
  );

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.buildingIcon}>🏢</Text>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.companyName}>{managerCompany?.name || 'Company Not Found'}</Text>
          <Text style={styles.internshipCount}>
            Active Interns: {activeInterns.length}/{managerCompany?.maxInternships || 0}
          </Text>
          <Text style={styles.areaOfDev}>Area: {managerCompany?.area || 'Not Specified'}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // TODO: Add navigation to generate internship screen
            console.log('Navigate to generate internship');
          }}
        >
          <Text style={styles.actionButtonText}>+ Add Internship</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // TODO: Add navigation to check progress screen
            console.log('Navigate to check progress');
          }}
        >
          <Text style={styles.actionButtonText}>Check Intern Progress</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            // TODO: Add navigation to student details screen
            console.log('Navigate to student details');
          }}
        >
          <Text style={styles.actionButtonText}>Add Progress / Certificate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.actionButtonText}>Logout</Text>
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
  welcomeBanner: {
    backgroundColor: '#667EEA',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buildingIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  internshipCount: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  areaOfDev: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
  },
  actionButton: {
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
  logoutButton: {
    backgroundColor: '#667EEA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManagerDashboard;
