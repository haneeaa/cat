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
      started: false,
      expectedTime: '1h',
      description: 'Complete the form verification module',
    },
    {
      id: '2',
      title: 'Task 2',
      completed: false,
      started: false,
      expectedTime: '2h',
      description: 'Check device connectivity and debug hardware',
    },
    {
      id: '3',
      title: 'Task 3',
      completed: false,
      started: false,
      expectedTime: '3h',
      description: 'Update firmware to latest version',
    },
    {
      id: '4',
      title: 'Task 4',
      completed: false,
      started: false,
      expectedTime: '1.5h',
      description: 'Write documentation for the project',
    },
    {
      id: '5',
      title: 'Task 5',
      completed: false,
      started: false,
      expectedTime: '2h',
      description: 'Prepare presentation for client meeting',
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

