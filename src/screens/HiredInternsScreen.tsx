import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

interface HiredIntern {
  id: string;
  company: string;
  position: string;
}

const HiredInternsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const hiredInterns: HiredIntern[] = [
    { id: '1', company: 'MTBC', position: 'Asp.net Developer' },
    { id: '2', company: 'Max Remind', position: 'Jr. Android Developer' },
    { id: '3', company: 'SAFA Tech', position: 'Jr. Flutter Developer' },
    { id: '4', company: 'NexPak', position: 'Senior Flutter Developer' },
    { id: '5', company: 'MTBC', position: 'AI Developer' },
    { id: '6', company: 'Enabling System', position: 'Android Developer' },
    { id: '7', company: 'Moro Soft', position: 'React Native Developer' },
    { id: '8', company: 'Codifier', position: 'Asp.net Developer' },
    { id: '9', company: 'Swift MB', position: 'IOS Developer' },
    { id: '10', company: 'D Tech', position: 'Full Stack Developer' },
  ];

  const filteredInterns = hiredInterns.filter(intern =>
    intern.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search By Company Name"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Hired Interns List */}
      <ScrollView style={styles.listContainer}>
        {filteredInterns.map((intern) => (
          <View key={intern.id} style={styles.internCard}>
            <View style={styles.cardContent}>
              <Text style={styles.companyName}>{intern.company}</Text>
              <Text style={styles.positionName}>{intern.position}</Text>
            </View>
            <TouchableOpacity style={styles.hiredButton}>
              <Text style={styles.hiredButtonText}>Hired</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  internCard: {
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
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  positionName: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  hiredButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  hiredButtonText: {
    color: '#667EEA',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HiredInternsScreen;

