import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TutorialScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tutorial</Text>
      <Text style={styles.desc}>This is where your tutorial content will go!</Text>
    </View>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  desc: {
    fontSize: 16,
    color: '#444',
  },
});
