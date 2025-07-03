import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskDetail = ({ route, navigation, tasks, setTasks }) => {
  const { taskId } = route.params;
  const task = tasks.find((t) => t.id === taskId);

  const handleTakeTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            started: true,
            shifts: [
              ...(t.shifts || []),
              {
                shiftLabel: `Shift ${t.shifts?.length + 1 || 1}`,
                start: new Date().toISOString(),
              },
            ],
          }
        : t
    );
    setTasks(updatedTasks);
  };

  const handleCompleteTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            completed: true,
            shifts: t.shifts.map((s, i) =>
              i === t.shifts.length - 1 && !s.end
                ? { ...s, end: new Date().toISOString() }
                : s
            ),
          }
        : t
    );
    setTasks(updatedTasks);
  };

  const getStatus = () => {
    if (task.completed) return 'Completed';
    if (task.started) return 'In Progress';
    return 'Not Started';
  };

  const getButtonStyle = () => {
    if (task.completed) return { backgroundColor: '#FFD700' };
    if (task.started) return { backgroundColor: '#999' };
    return { backgroundColor: '#000' };
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      {/* Back */}
      <Ionicons
        name="arrow-back"
        size={28}
        color="#000"
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.title || 'Task Title'}</Text>
        <Text style={styles.description}>
          {task.description || 'No description available.'}
        </Text>

        {/* Vertical Shift Tracker */}
        <View style={styles.verticalTracker}>
          {task.shifts?.map((shift, index) => {
            const isCompleted = !!shift.end;
            const isCurrent = !shift.end && !!shift.start;
            const isUpcoming = !shift.start;

            return (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.leftColumn}>
                  <View
                    style={[
                      styles.dot,
                      isCompleted
                        ? styles.dotCompleted
                        : isCurrent
                        ? styles.dotInProgress
                        : styles.dotUpcoming,
                    ]}
                  />
                  {index !== task.shifts.length - 1 && <View style={styles.line} />}
                </View>

                <View style={styles.rightColumn}>
                  <Text
                    style={[
                      styles.shiftTitle,
                      isCompleted
                        ? styles.textCompleted
                        : isCurrent
                        ? styles.textInProgress
                        : styles.textUpcoming,
                    ]}
                  >
                    {shift.shiftLabel || `Shift ${index + 1}`}
                  </Text>
                  <Text style={styles.shiftSubtitle}>
                    {shift.start
                      ? `Start: ${new Date(shift.start).toLocaleString()}`
                      : 'Not started'}
                  </Text>
                  {shift.end && (
                    <Text style={styles.shiftSubtitle}>
                      End: {new Date(shift.end).toLocaleString()}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Take / Complete Button */}
        <TouchableOpacity
          style={[styles.takeButton, getButtonStyle()]}
          onPress={
            task.completed
              ? null
              : task.started
              ? handleCompleteTask
              : handleTakeTask
          }
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
              ? 'Mark as Completed'
              : 'Take Task'}
          </Text>
        </TouchableOpacity>

        {/* Info */}
        <Text style={styles.details}>
          Expected Time: {task.expectedTime || 'N/A'}
        </Text>
        <Text style={styles.details}>
          Status of the Task: {getStatus()}
        </Text>
      </ScrollView>

      {/* Footer */}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
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
    padding: 30,
    paddingBottom: 100,
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

  // Vertical shift tracker
  verticalTracker: {
    paddingLeft: 20,
    paddingTop: 20,
    borderLeftWidth: 2,
    borderColor: '#ddd',
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    position: 'relative',
  },
  leftColumn: {
    width: 30,
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    zIndex: 2,
  },
  dotCompleted: {
    backgroundColor: '#f5a623',
  },
  dotInProgress: {
    backgroundColor: '#ffa500',
  },
  dotUpcoming: {
    backgroundColor: '#ccc',
  },
  line: {
    position: 'absolute',
    top: 16,
    width: 2,
    height: 40,
    backgroundColor: '#ccc',
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
  },
  shiftTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textCompleted: {
    color: '#f5a623',
  },
  textInProgress: {
    color: '#ffa500',
  },
  textUpcoming: {
    color: '#999',
  },
  shiftSubtitle: {
    fontSize: 13,
    color: '#666',
  },
});