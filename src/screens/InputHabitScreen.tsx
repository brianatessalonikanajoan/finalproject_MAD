import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../navigation/types';
import { Picker } from '@react-native-picker/picker';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'InputHabit'>;

const renderHabit = ({ item }: { item: Habit }) => (
  <View style={styles.habitRow}>
    <Image source={require('../../assets/circle.png')} style={styles.icon} />
    <View style={styles.habitTextContainer}>
      <Text style={styles.habitTitle}>{item.name}</Text>
      {item.detail.length > 0 && (
        <Text style={styles.habitDetail}>{item.detail}</Text>
      )}
    </View>
    <Image
      source={item.alarmOn ? require('../../assets/play.png') : require('../../assets/angle-down.png')}
      style={styles.icon}
    />
  </View>
);

type Habit = {
  id: string;
  name: string;
  detail: string;
  frequency: '1 Day' | '7 Day' | '30 Day';
  alarmOn: boolean;
  alarmTime: Date;
};

const frequencies: Habit['frequency'][] = ['1 Day', '7 Day', '30 Day'];

const InputHabitScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // form fields
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [frequency, setFrequency] = useState<Habit['frequency']>('1 Day');
  const [alarmOn, setAlarmOn] = useState(false);
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const addHabit = () => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      detail,
      frequency,
      alarmOn,
      alarmTime,
    };
    setHabits(prev => [...prev, newHabit]);
    // reset & close
    setName('');
    setDetail('');
    setFrequency('1 Day');
    setAlarmOn(false);
    setAlarmTime(new Date());
    setShowTimePicker(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/left.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.header}>
        <Image source={require('../../assets/circle.png')} style={styles.icon} /> HABIT TRACKER
      </Text>

      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={renderHabit}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Belum ada habit, tekan + untuk menambah.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Image source={require('../../assets/plus.png')} style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image source={require('../../assets/close.png')} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Add New</Text>

            <Text style={styles.label}>Nama Habit</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Meditate"
            />

            <Text style={styles.label}>Detail</Text>
            <TextInput
              style={styles.input}
              value={detail}
              onChangeText={setDetail}
              placeholder="Penjelasan singkat"
            />

            <Text style={styles.label}>Frekuensi</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={frequency}
                onValueChange={(val: Habit['frequency']) => setFrequency(val)}
              >
                {frequencies.map(f => (
                  <Picker.Item key={f} label={f} value={f} />
                ))}
              </Picker>
            </View>

            <View style={styles.alarmRow}>
              <Text style={styles.label}>Set Alarm</Text>
              <Text style={styles.timeText}>
                {alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Switch
                value={alarmOn}
                onValueChange={v => {
                  setAlarmOn(v);
                  if (v) setShowTimePicker(true);
                }}
              />
            </View>

            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={alarmTime}
                onChange={(event: DateTimePickerEvent, date?: Date) => {
                  if (event.type === 'set' && date) {
                    setAlarmTime(date);
                  }
                  setShowTimePicker(false);
                }}
              />
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={addHabit}
            >
              <Text style={styles.submitText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom NavBar with images */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image source={require('../../assets/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InputHabit')}>
          <Image source={require('../../assets/check-square.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InputSleep')}>
          <Image source={require('../../assets/moon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputHabitScreen;

const { width } = Dimensions.get('window');
const modalWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  habitTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  habitDetail: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 80,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 12,
    elevation: 3,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: modalWidth,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    marginTop: 4,
  },
  alarmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#7165FF',
    borderRadius: 6,
    paddingVertical: 12,
  },
  submitText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#999',
    marginTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#2D2D2D',
  },
});

