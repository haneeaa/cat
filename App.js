import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TaskDetail from './screens/TaskDetail';
import TutorialScreen from './screens/TutorialScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([
  {
    id: '1',
    title: 'Task 1',
    completed: false,
    started: true,
    expectedTime: '1h',
    description: 'Complete the form verification module',
    shifts: [
      {
        shiftLabel: 'Shift 1',
        start: '2025-07-03T08:00:00.000Z',
        end: '2025-07-03T09:00:00.000Z',
      },
      {
        shiftLabel: 'Shift 2',
        start: '2025-07-03T09:30:00.000Z',
        end: '2025-07-03T10:00:00.000Z',
      },
      {
        shiftLabel: 'Shift 3',
        start: '2025-07-03T10:30:00.000Z',
        // You can omit `end` to show it's in progress
      },
    ],
  },
  {
    id: '2',
    title: 'Task 2',
    completed: false,
    started: true,
    expectedTime: '2h',
    description: 'Check device connectivity and debug hardware',
    shifts: [
      {
        shiftLabel: 'Shift 1',
        start: '2025-07-03T08:00:00.000Z',
        end: '2025-07-03T09:30:00.000Z',
      },
      {
        shiftLabel: 'Shift 2',
        start: '2025-07-03T10:00:00.000Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Task 3',
    completed: true,
    started: true,
    expectedTime: '3h',
    description: 'Update firmware to latest version',
    shifts: [
      {
        shiftLabel: 'Shift 1',
        start: '2025-07-02T07:00:00.000Z',
        end: '2025-07-02T08:30:00.000Z',
      },
      {
        shiftLabel: 'Shift 2',
        start: '2025-07-02T09:00:00.000Z',
        end: '2025-07-02T10:00:00.000Z',
      },
    ],
  },
  {
    id: '4',
    title: 'Task 4',
    completed: false,
    started: false,
    expectedTime: '1.5h',
    description: 'Write documentation for the project',
    shifts: [],
  },
  {
    id: '5',
    title: 'Task 5',
    completed: false,
    started: true,
    expectedTime: '2h',
    description: 'Prepare presentation for client meeting',
    shifts: [
      {
        shiftLabel: 'Shift 1',
        start: '2025-07-03T06:00:00.000Z',
        end: '2025-07-03T07:00:00.000Z',
      },
      {
        shiftLabel: 'Shift 2',
        start: '2025-07-03T07:30:00.000Z',
        end: '2025-07-03T08:15:00.000Z',
      },
      {
        shiftLabel: 'Shift 3',
        start: '2025-07-03T09:00:00.000Z',
        end: '2025-07-03T09:45:00.000Z',
      },
      {
        shiftLabel: 'Shift 4',
        start: '2025-07-03T10:00:00.000Z',
        // no `end` means ongoing
      },
    ],
  },
]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen {...props} user={user} tasks={tasks} setTasks={setTasks} />
              )}
            </Stack.Screen>
            <Stack.Screen name="TaskDetail">
              {(props) => (
                <TaskDetail {...props} tasks={tasks} setTasks={setTasks} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Tutorial" component={TutorialScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}