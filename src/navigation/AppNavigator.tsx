import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import StudentDashboard from '../screens/StudentDashboard';
import AdminDashboard from '../screens/AdminDashboard';
import ManagerDashboard from '../screens/ManagerDashboard';

const AppNavigator: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Simple navigation without React Navigation for now
  if (user?.role === 'student') {
    return <StudentDashboard />;
  }
  
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }
  
  if (user?.role === 'manager') {
    return <ManagerDashboard />;
  }

  return (
    <View style={styles.container}>
      <Text>Unknown user role</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;

