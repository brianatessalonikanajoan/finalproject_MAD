import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { getDatabase, ref, onValue, off } from '@react-native-firebase/database';

const DashboardScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [userName, setUserName] = useState('');
  const userId = auth().currentUser?.uid;

  useEffect(() => {
  const db = getDatabase();
  const habitRef = ref(db, `habits/${userId}`);
  const sleepRef = ref(db, `sleep/${userId}`);
  const userRef = ref(db, `users/${userId}`);

  if (userId) {
    onValue(habitRef, (snapshot) => {
      const data = snapshot.val();
      setHabits(data ? Object.keys(data).map((key) => ({ ...data[key], id: key })) : []);
    });

    onValue(sleepRef, (snapshot) => {
      const data = snapshot.val();
      setSleepData(data ? Object.keys(data).map((key) => ({ ...data[key], id: key })) : []);
    });

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.name) {
        setUserName(data.name);
      }
    });
  }

  return () => {
    off(habitRef);
    off(sleepRef);
    off(userRef);
  };
}, [userId]);


  const renderHabitItem = ({ item }) => (
    <View style={styles.habitItem}>
      <View style={styles.circle} />
      <Text style={styles.habitText}>{item.habitName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DAYLINE</Text>
      <Text style={styles.subtitle}>Hello, {userName || 'User'}!</Text>

      <Text style={styles.sectionTitle}>Today's Habit</Text>
      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Sleep</Text>
      {sleepData.map((item) => (
        <View key={item.id} style={{ marginBottom: 10 }}>
          <Text>Sleep: {new Date(item.sleepTime).toLocaleTimeString()}</Text>
          <Text>Wake: {new Date(item.wakeTime).toLocaleTimeString()}</Text>
        </View>
      ))}

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image source={require('../../assets/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InputHabitScreen')}>
          <Image source={require('../../assets/check-square.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InputSleepScreen')}>
          <Image source={require('../../assets/moon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={require('../../assets/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f7f7fa',
    paddingBottom: 80, // biar tidak ketutupan nav
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e2d4d',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#2e2d4d',
  },
  sectionTitle: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e2d4d',
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#000',
    marginRight: 10,
  },
  habitText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f7f7fa',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
