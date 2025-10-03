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


const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { getStudentAssignments } = useInternship();

  const studentAssignments = user?.id ? getStudentAssignments(user.id) : [];
  const currentAssignment = studentAssignments.find(assignment => 
    assignment.status === 'assigned' || assignment.status === 'in_progress'
  );

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_assigned': return 'Not Assigned';
      case 'assigned': return 'Assigned';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Not Assigned';
    }
  };

  const getCertificateText = (certificateStatus: string) => {
    switch (certificateStatus) {
      case 'not_available': return 'Not Available';
      case 'in_progress': return 'In Progress';
      case 'issued': return 'Issued';
      default: return 'Not Available';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.graduationIcon}>🎓</Text>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
      </View>

      {/* Internship Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Internship Status</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>🏢</Text>
            <Text style={styles.statusLabel}>Company :</Text>
            <Text style={styles.statusValue}>
              {currentAssignment ? currentAssignment.companyName : 'Not Assigned'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>📊</Text>
            <Text style={styles.statusLabel}>Status :</Text>
            <Text style={styles.statusValue}>
              {currentAssignment ? getStatusText(currentAssignment.status) : 'Not Assigned'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>📜</Text>
            <Text style={styles.statusLabel}>Certificate :</Text>
            <Text style={styles.statusValue}>
              {currentAssignment ? getCertificateText(currentAssignment.certificateIssued ? 'issued' : 'not_available') : 'Not Available'}
            </Text>
          </View>
          {currentAssignment?.progress !== undefined && (
            <View style={styles.statusItem}>
              <Text style={styles.statusIcon}>📈</Text>
              <Text style={styles.statusLabel}>Progress :</Text>
              <Text style={styles.statusValue}>{currentAssignment.progress}%</Text>
            </View>
          )}
        </View>
      </View>

      {/* History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History</Text>
        <View style={styles.historyCard}>
          <Text style={styles.historyLabel}>Past Internships:</Text>
          <Text style={styles.historyValue}>
            {studentAssignments.filter(a => a.status === 'completed').length}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={() => {
            // TODO: Add navigation to internship request screen
            console.log('Navigate to internship request');
          }}
        >
          <Text style={styles.buttonText}>Request For Internship</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
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
  graduationIcon: {
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
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginRight: 8,
  },
  statusValue: {
    fontSize: 16,
    color: '#666',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  historyValue: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
  },
  requestButton: {
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
});

export default StudentDashboard;
