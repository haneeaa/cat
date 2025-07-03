import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';

const HomeScreen = ({ user, tasks, setTasks }) => {
  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'ToDo') return !task.completed;
    if (filter === 'Completed') return task.completed;
  });

  const renderTask = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
      style={styles.taskItem}
    >
      <Checkbox status={item.completed ? 'checked' : 'unchecked'} />
      <Text
        style={[
          styles.taskText,
          { textDecorationLine: item.completed ? 'line-through' : 'none' },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Image source={require('../assets/profile.png')} style={styles.profilePic} />
        </View>

        {/* Welcome & Heading */}
        <Text style={styles.welcome}>Welcome, {user?.name}</Text>
        <Text style={styles.heading}>Tasks</Text>

        {/* Filter Buttons */}
        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => setFilter('All')}>
            <Text style={filter === 'All' ? styles.activeFilter : styles.inactiveFilter}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('ToDo')}>
            <Text style={filter === 'ToDo' ? styles.activeFilter : styles.inactiveFilter}>To Be Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('Completed')}>
            <Text style={filter === 'Completed' ? styles.activeFilter : styles.inactiveFilter}>Completed</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        <FlatList
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.taskList}
        />

        {/* Footer Navigation */}
        <View style={styles.footerNav}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.footerButton}>
            <Ionicons name="home" size={24} color="#fff" />
            <View style={styles.circle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Tutorial')} style={styles.footerButton}>
            <Entypo name="controller-play" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.footerButton}>
            <Feather name="settings" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'android' ? 15 : 0,
  },
  container: { flex: 1 },
  topBar: {
    height: 70,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  logo: { width: 50, height: 50, resizeMode: 'contain' },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#000',
    fontStyle: 'italic',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 10,
    color: '#000',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  activeFilter: { fontWeight: 'bold', color: '#000' },
  inactiveFilter: { color: '#888' },
  taskList: { paddingHorizontal: 20, paddingBottom: 10 },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  taskText: { marginLeft: 10, fontSize: 16, color: '#000' },
  footerNav: {
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 10,
  },
  circle: {
    position: 'absolute',
    bottom: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
});

