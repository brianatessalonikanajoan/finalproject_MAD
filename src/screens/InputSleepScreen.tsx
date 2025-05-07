import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Switch, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Picker } from '@react-native-picker/picker';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'InputSleep'>;

const InputSleepScreen = () => {
  const navigation = useNavigation<NavProp>();

  const [sleepTime, setSleepTime] = useState('21:00');
  const [wakeTime, setWakeTime] = useState('06:00');
  const [alarmTime, setAlarmTime] = useState('07:00');
  const [alarmEnabled, setAlarmEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#2D2D2D" />
      </TouchableOpacity>
      <Text style={styles.title}>SLEEP TRACKER</Text>

      <View style={styles.card}>
        <Text style={styles.iconText}>😴</Text>
        <Text style={styles.label}>Jam Tidur</Text>
        <Picker
          selectedValue={sleepTime}
          style={styles.picker}
          onValueChange={(itemValue) => setSleepTime(itemValue)}
        >
          {['20:00', '21:00', '22:00', '23:00'].map(time => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
        </Picker>
      </View>

      <View style={styles.separator} />

      <View style={styles.card}>
        <Text style={styles.label}>Jam Bangun</Text>
        <Picker
          selectedValue={wakeTime}
          style={styles.picker}
          onValueChange={(itemValue) => setWakeTime(itemValue)}
        >
          {['05:00', '06:00', '07:00', '08:00'].map(time => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
        </Picker>
      </View>

      <View style={styles.alarmRow}>
        <Text style={styles.label}>Set Alarm</Text>
        <TextInput
          style={styles.input}
          value={alarmTime}
          onChangeText={setAlarmTime}
        />
        <Switch
          value={alarmEnabled}
          onValueChange={setAlarmEnabled}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="home" size={26} color="#2D2D2D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InputHabit')}>
          <Icon name="check-square" size={26} color="#2D2D2D" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="moon-o" size={26} color="#7165FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={26} color="#2D2D2D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputSleepScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2D2D2D',
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#DDD',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 48,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#2D2D2D',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
    marginVertical: 10,
  },
  alarmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: '#2D2D2D',
    width: 80,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7165FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#999',
    marginTop: 20,
  },
});
