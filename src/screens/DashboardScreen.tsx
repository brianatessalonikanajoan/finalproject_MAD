import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { BarChart } from 'react-native-chart-kit';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<NavProp>();
  const [username, setUsername] = useState('');
  const [habits, setHabits] = useState<string[]>([]);
  const [sleepData, setSleepData] = useState<number[]>([]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        setUsername(user.email ?? 'User');

        // Fetch habits
        const habitsRef = database().ref(`users/${uid}/habits`);
        habitsRef.on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            const values = Object.values(data) as string[];
            setHabits(values);
          } else {
            setHabits([]);
          }
        });

        // Fetch sleep data
        const sleepRef = database().ref(`users/${uid}/sleep`);
        sleepRef.on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            const values = Object.values(data) as number[];
            setSleepData(values);
          } else {
            setSleepData([]);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>DAYLINE</Text>
      <Text style={styles.greeting}>Hi, {username}!</Text>

      <Text style={styles.sectionTitle}>Today’s Habit</Text>
      {habits.length > 0 ? habits.map((habit, i) => (
        <View key={i} style={styles.habitRow}>
          <Image source={require('../../assets/circle.png')} style={styles.icon} />
          <Text style={styles.habitText}>{habit}</Text>
        </View>
      )) : <Text style={{ color: '#999' }}>Belum ada data habit</Text>}

      <View style={styles.divider} />

      <View style={styles.sleepHeader}>
        <Text style={styles.sleepLabel}>Tes: <Text style={styles.sleepValue}>-</Text></Text>
        <TouchableOpacity><Text style={styles.thisWeek}>This Week</Text></TouchableOpacity>
      </View>

      <BarChart
        data={{
          labels: sleepData.map((_, i) => `${i + 1}`),
          datasets: [{ data: sleepData }],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        fromZero
        showBarTops={false}
        withInnerLines={false}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: '#F7F8FC',
          backgroundGradientTo: '#F7F8FC',
          decimalPlaces: 0,
          barPercentage: 0.6,
          color: (opacity = 1) => `rgba(33,33,33, ${opacity})`,
          labelColor: () => '#2D2D2D',
        }}
        style={styles.chart}
      />

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image source={require('../../assets/home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InputHabit')}>
          <Image source={require('../../assets/check-square.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InputSleep')}>
          <Image source={require('../../assets/moon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/user.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    padding: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2D2D2D',
  },
  greeting: {
    fontSize: 18,
    color: '#333',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#999',
    marginVertical: 20,
  },
  sleepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sleepLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  sleepValue: {
    color: '#7165FF',
  },
  thisWeek: {
    fontSize: 14,
    color: '#2D2D2D',
    textDecorationLine: 'underline',
  },
  chart: {
    marginVertical: 12,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#999',
    marginTop: 20,
  },
  navIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
