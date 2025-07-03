import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskDetail = ({ route, navigation, tasks, setTasks }) => {
  const { taskId } = route.params;
  const task = tasks.find((t) => t.id === taskId);

  const handleTakeTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, started: true, } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <Ionicons
        name="arrow-back"
        size={28}
        color="#000"
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description || 'No description available.'}</Text>

        <TouchableOpacity
          style={[
            styles.takeButton,
            task.completed
              ? { backgroundColor: '#FFD700' }
              : task.started
              ? { backgroundColor: '#999' }
              : { backgroundColor: '#000' },
          ]}
          onPress={handleTakeTask}
          disabled={task.completed}
        >
          <Text
            style={{
              color: task.completed || task.started ? '#000' : '#fff',
              textAlign: 'center',
            }}
          >
            {task.completed
              ? 'Task Completed'
              : task.started
              ? 'Task In Progress'
              : 'Take Task'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.details}>Expected Time: {task.expectedTime || 'N/A'}</Text>
        <Text style={styles.details}>
          Status: {task.completed}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 My App</Text>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    height: 70,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  backIcon: {
    marginLeft: 15,
    marginTop: 15,
  },
  content: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444',
  },
  takeButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
  },
});