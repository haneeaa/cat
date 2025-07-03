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
  const lastShift = task.shifts?.[task.shifts.length - 1];
  const isTaskCompleted = task.completed;

  // Take Task = Add first shift or next shift
  const handleStartShift = () => {
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

  // End the current shift
  const handleEndShift = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
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

  // Complete the task (after all shifts done)
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

  // Current shift status
  const getActionButton = () => {
    if (isTaskCompleted) return null;
    if (!task.shifts?.length || (lastShift?.end && !isTaskCompleted)) {
      return (
        <TouchableOpacity style={[styles.takeButton, styles.startBtn]} onPress={handleStartShift}>
          <Text style={styles.btnText}>Start Next Shift</Text>
        </TouchableOpacity>
      );
    } else if (lastShift?.start && !lastShift?.end) {
      return (
        <TouchableOpacity style={[styles.takeButton, styles.endBtn]} onPress={handleEndShift}>
          <Text style={styles.btnText}>End Current Shift</Text>
        </TouchableOpacity>
      );
    }
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

        {/* Action Buttons */}
        {getActionButton()}

        {!isTaskCompleted && lastShift?.end && (
          <TouchableOpacity
            style={[styles.takeButton, styles.completeBtn]}
            onPress={handleCompleteTask}
          >
            <Text style={styles.btnText}>Mark Task Completed</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.details}>Expected Time: {task.expectedTime || 'N/A'}</Text>
        <Text style={styles.details}>Status: {task.completed ? 'Completed' : task.started ? 'In Progress' : 'Not Started'}</Text>
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
  startBtn: {
    backgroundColor: '#000',
  },
  endBtn: {
    backgroundColor: '#999',
  },
  completeBtn: {
    backgroundColor: '#FFD700',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
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
    backgroundColor: '#FFD700', // Yellow
  },
  dotInProgress: {
    backgroundColor: '#999', // Grey
  },
  dotUpcoming: {
    backgroundColor: '#000', // Black
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
    color: '#FFD700',
  },
  textInProgress: {
    color: '#999',
  },
  textUpcoming: {
    color: '#000',
  },
  shiftSubtitle: {
    fontSize: 13,
    color: '#666',
  },
});