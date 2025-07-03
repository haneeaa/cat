import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation, setUser }) => {
  const [operatorId, setOperatorId] = useState('');
  const [keycode, setKeycode] = useState('');

  const handleLogin = () => {
    if (operatorId && keycode) {
      setUser({ name: operatorId }); // set user state for home screen
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Operator ID"
        value={operatorId}
        onChangeText={setOperatorId}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Keycode"
        value={keycode}
        onChangeText={setKeycode}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    width: '100%',
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
