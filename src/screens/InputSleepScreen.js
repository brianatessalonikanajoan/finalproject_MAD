import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const InputSleepScreen = () => {
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [pickerType, setPickerType] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = (type) => {
    setPickerType(type);
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date) => {
    if (pickerType === 'sleep') setSleepTime(date);
    else if (pickerType === 'wake') setWakeTime(date);
    hidePicker();
  };

  const handleAddSleep = async () => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('User not logged in');
      return;
    }

    const sleepData = {
      sleepTime: sleepTime.toISOString(),
      wakeTime: wakeTime.toISOString(),
      createdAt: new Date().toISOString(),
    };

    try {
      await database().ref(`sleep/${currentUser.uid}`).push(sleepData);
      Alert.alert('Sleep data added successfully');
      setSleepTime(new Date());
      setWakeTime(new Date());
    } catch (error) {
      console.error('Error adding sleep data:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Sleep Data</Text>

      <View style={styles.card}>
        <Pressable onPress={() => showPicker('sleep')} style={styles.input}>
          <Text style={styles.inputText}>
            Sleep Time:{' '}
            {sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Pressable>

        <View style={styles.separator} />

        <Pressable onPress={() => showPicker('wake')} style={styles.input}>
          <Text style={styles.inputText}>
            Wake Time:{' '}
            {wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Pressable>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.button} onPress={handleAddSleep}>
          <Text style={styles.buttonText}>Add Sleep Data</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        is24Hour={true}
        date={pickerType === 'sleep' ? sleepTime : wakeTime}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

export default InputSleepScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  input: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
