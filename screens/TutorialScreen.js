// TutorialScreen.js
import React, { useState, useRef } from 'react';
import * as Speech from 'expo-speech';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const TutorialScreen = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState('excavator');
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [speechRate, setSpeechRate] = useState(1.0);
  const instructionsRef = useRef([]);
  const navigation = useNavigation();

  const instructions = {
    excavator: `1. Perform a walk-around inspection: Check fuel, hydraulic fluid, engine oil, and for visible damage.
2. Enter the cab safely using the handrails. Fasten your seatbelt.
3. Start the engine using the ignition key and allow it to warm up for a few minutes.
4. Use the joystick controls to operate the boom, arm, and bucket. Left joystick controls swing and boom; right joystick controls stick and bucket.
5. Use the foot pedals or levers to move the machine forward or backward.
6. Avoid overreaching or swinging too fast — especially near people or structures.
7. After completing work, park on level ground, lower the bucket to the ground, and idle for 2 minutes before shutdown.
8. Turn off the engine and lock the cab when exiting.`.split('\n'),

    truck: `1. Check oil, coolant, and tire pressure.
2. Adjust seat and mirrors before starting.
3. Start the engine and check all gauges.
4. Use mirrors frequently when maneuvering.
5. Follow safe speed limits and rules.
6. Park safely, engage hand brake, and shut down properly.`.split('\n')
  };

  const speakInstruction = (index) => {
    if (index >= instructions[selectedMachine].length) {
      setIsSpeaking(false);
      return;
    }
    setCurrentInstructionIndex(index);
    Speech.speak(instructions[selectedMachine][index], {
      rate: speechRate,
      onDone: () => speakInstruction(index + 1),
      onStopped: () => setCurrentInstructionIndex(index),
    });
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      speakInstruction(currentInstructionIndex);
      setIsSpeaking(true);
    }
  };

  const videos = [
    {
      title: 'Cat® K Series Large Wheel Loader Operator Training',
      url: 'https://www.youtube.com/embed/a55VzpybLjQ',
    },
    {
      title: 'Cat® K Series Large Wheel Loader Operator Training — Operator Controls',
      url: 'https://www.youtube.com/embed/WIgmjFtJ__4',
    },
    {
      title: 'Cat® K Series Large Wheel Loader Operator Training — Production Dos and Donts',
      url: 'https://www.youtube.com/embed/EmuO5jX3F34',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Tutorials</Text>
        {videos.map((video, index) => (
          <View key={index} style={styles.videoBox}>
            <Text style={styles.title}>{video.title}</Text>
            <View style={styles.webviewWrapper}>
              <WebView
                source={{ uri: video.url }}
                style={styles.webview}
                javaScriptEnabled
                domStorageEnabled
              />
            </View>
          </View>
        ))}

        <View style={styles.voiceBox}>
          <Text style={styles.manualHeading}>Voice Instructions</Text>
          <Picker
            selectedValue={selectedMachine}
            onValueChange={(itemValue) => {
              setSelectedMachine(itemValue);
              setCurrentInstructionIndex(0);
              Speech.stop();
              setIsSpeaking(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Excavator" value="excavator" />
            <Picker.Item label="Truck" value="truck" />
          </Picker>
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.openButtonText}>Open Instructions</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedMachine.toUpperCase()} Instructions</Text>
              <ScrollView>
                <Text style={styles.manualText}>
                  {instructions[selectedMachine].join('\n')}
                </Text>
              </ScrollView>
              <TouchableOpacity onPress={toggleSpeech} style={styles.speechBtn}>
                <Text style={styles.speechText}>
                  {isSpeaking ? '⏸ Pause' : '▶️ Play'}
                </Text>
              </TouchableOpacity>
              <View style={{ marginTop: 10 }}>
                <Text>Speech Speed</Text>
                <Picker
                  selectedValue={speechRate}
                  onValueChange={(rate) => setSpeechRate(rate)}
                >
                  <Picker.Item label="Slow" value={0.6} />
                  <Picker.Item label="Normal" value={1.0} />
                  <Picker.Item label="Fast" value={1.4} />
                </Picker>
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  Speech.stop();
                  setIsSpeaking(false);
                  setModalVisible(false);
                  setCurrentInstructionIndex(0);
                }}
              >
                <Text style={styles.openButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={styles.footerNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={26} color="#fff" />
        </TouchableOpacity>
        <Entypo name="controller-play" size={26} color="#FFD700" />
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'android' ? 20 : 0,
  },
  topBar: {
    height: 70,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  container: {
    padding: 15,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  videoBox: {
    marginBottom: 30,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  webviewWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
    height: 200,
  },
  webview: {
    height: 200,
    width: '100%',
  },
  footerNav: {
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 10 : 0,
  },
  voiceBox: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  picker: {
    marginVertical: 10,
  },
  openButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  manualText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  speechBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  speechText: {
    fontSize: 18,
    color: '#007BFF',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});


