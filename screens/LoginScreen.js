import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

const LoginScreen = ({ setUser, registeredUser, setRegisteredUser }) => {
  const [operatorId, setOperatorId] = useState('');
  const [keycode, setKeycode] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = () => {
    // Temporarily allow login with any data
    if (operatorId && keycode) {
      setUser({ name: 'User' });
    } else {
      Alert.alert('Login Failed', 'Please enter Operator ID and Keycode.');
    }
  };

  const handleRegister = () => {
    if (name && operatorId && keycode) {
      setRegisteredUser({ name, operatorId, keycode });
      setName('');
      setOperatorId('');
      setKeycode('');
      setIsRegister(false);
      Alert.alert('Success', 'Registered successfully. Please log in.');
    } else {
      Alert.alert('Incomplete', 'Please fill in all fields to register.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Operator ID"
        placeholderTextColor="#aaa"
        value={operatorId}
        onChangeText={setOperatorId}
      />
      <TextInput
        style={styles.input}
        placeholder="Keycode"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={keycode}
        onChangeText={setKeycode}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isRegister ? handleRegister : handleLogin}
      >
        <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Log In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.toggleText}>
          {isRegister ? 'Already registered? Log in' : 'New user? Register'}
        </Text>
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
  toggleText: {
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
