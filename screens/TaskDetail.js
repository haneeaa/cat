import React, { useState } from 'react';
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

  const [expandedShiftIndex, setExpandedShiftIndex] = useState(null);

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

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.title || 'Task Title'}</Text>
        <Text style={styles.description}>{task.description || 'No description available.'}</Text>

        <View style={styles.verticalTracker}>
          {task.shifts?.map((shift, index) => {
            const isCompleted = !!shift.end;
            const isCurrent = !shift.end && !!shift.start;
            const isUpcoming = !shift.start;
            const isExpanded = expandedShiftIndex === index;

            const mockData = {
              engineHour: isCompleted ? (Math.random() * 10).toFixed(1) : '0',
              fuel: isCompleted ? (Math.random() * 5).toFixed(2) + ' L' : '0 L',
              loadCycle: isCompleted ? Math.floor(Math.random() * 20) : '0',
              idleTime: isCompleted ? Math.floor(Math.random() * 30) + ' min' : '0 min',
            };

            return (
              <TouchableOpacity
                key={index}
                style={styles.shiftBox}
                onPress={() => setExpandedShiftIndex(isExpanded ? null : index)}
                activeOpacity={0.9}
              >
                <View style={styles.shiftHeader}>
                  <View
                    style={[styles.dot,
                      isCompleted ? styles.dotCompleted :
                      isCurrent ? styles.dotInProgress :
                      styles.dotUpcoming,
                    ]}
                  />
                  <Text style={styles.shiftTitle}>{shift.shiftLabel || `Shift ${index + 1}`}</Text>
                </View>

                {isExpanded && (
                  <View style={styles.metricsBox}>
                    <Text style={styles.metric}>Start: {shift.start ? new Date(shift.start).toLocaleString() : 'Not started'}</Text>
                    {shift.end && <Text style={styles.metric}>End: {new Date(shift.end).toLocaleString()}</Text>}
                    <Text style={styles.metric}>Engine Hour: {mockData.engineHour}</Text>
                    <Text style={styles.metric}>Fuel Consumption: {mockData.fuel}</Text>
                    <Text style={styles.metric}>Load Cycle: {mockData.loadCycle}</Text>
                    <Text style={styles.metric}>Idle Time: {mockData.idleTime}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

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
    marginBottom: 30,
  },
  shiftBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  shiftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },
  dotCompleted: {
    backgroundColor: '#FFD700',
  },
  dotInProgress: {
    backgroundColor: '#999',
  },
  dotUpcoming: {
    backgroundColor: '#000',
  },
  shiftTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  metricsBox: {
    padding: 12,
  },
  metric: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
});