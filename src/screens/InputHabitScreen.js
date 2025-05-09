import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  Switch,
  Text,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const InputHabitScreen = () => {
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [enableAlarm, setEnableAlarm] = useState(false);
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleAddHabit = async () => {
    if (!habitName || !habitDescription || !duration) {
      Alert.alert('All fields are required');
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('User not logged in');
      return;
    }

    const habitData = {
      habitName,
      habitDescription,
      duration: parseInt(duration),
      createdAt: new Date().toISOString(),
      alarm: enableAlarm,
      alarmTime: enableAlarm
        ? alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : null,
    };

    try {
      await database().ref(`habits/${currentUser.uid}`).push(habitData);

      Alert.alert('Habit added successfully');
      setHabitName('');
      setHabitDescription('');
      setDuration('');
      setEnableAlarm(false);
    } catch (error) {
      console.error('Error adding habit:', error);
      Alert.alert('Error', error.message);
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || alarmTime;
    setShowPicker(Platform.OS === 'ios');
    setAlarmTime(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Habit</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Habit Name"
          onChangeText={setHabitName}
          value={habitName}
          style={styles.input}
        />
        <View style={styles.separator} />

        <TextInput
          placeholder="Description"
          onChangeText={setHabitDescription}
          value={habitDescription}
          style={styles.input}
        />
        <View style={styles.separator} />

        <TextInput
          placeholder="Duration (in days)"
          onChangeText={setDuration}
          value={duration}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Enable Alarm</Text>
          <Switch value={enableAlarm} onValueChange={setEnableAlarm} />
        </View>

        {enableAlarm && (
          <>
            <Pressable onPress={() => setShowPicker(true)} style={styles.timePickerButton}>
              <Text style={styles.timePickerText}>
                Alarm Time:{' '}
                {alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </Pressable>
            <View style={styles.separator} />
          </>
        )}

        {showPicker && (
          <DateTimePicker
            value={alarmTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleAddHabit}>
          <Text style={styles.buttonText}>Add Habit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputHabitScreen;

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
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  timePickerButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  timePickerText: {
    fontSize: 16,
    color: '#333',
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
