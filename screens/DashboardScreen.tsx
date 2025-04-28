// src/screens/DashboardScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart } from 'react-native-chart-kit';


type NavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<NavProp>();
  const username = 'Alex';

  const sleepData = {
    labels: ['12','13','14','15'],
    datasets: [
      { data: [6, 7, 5, 7], color: () => '#7165FF' },
      { data: [3, 6, 8, 7], color: () => '#2D2D2D' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {}
      <Text style={styles.logo}>DAYLINE</Text>
      <Text style={styles.greeting}>Hi, {username}!</Text>

      {}
      <Text style={styles.sectionTitle}>Today’s Habit</Text>
      {['Habit #1','Habit #2','Habit #3'].map((h,i)=>(
        <View key={i} style={styles.habitRow}>
          <Icon name="circle-o" size={20} color="#2D2D2D" />
          <Text style={styles.habitText}>{h}</Text>
        </View>
      ))}
      <View style={styles.divider} />

      {}
      <View style={styles.sleepHeader}>
        <Text style={styles.sleepLabel}>Tes: <Text style={styles.sleepValue}>-</Text></Text>
        <TouchableOpacity><Text style={styles.thisWeek}>This Week</Text></TouchableOpacity>
      </View>

      {}
      <BarChart
  data={sleepData}
  width={Dimensions.get('window').width - 40}
  height={220}
  fromZero
  showBarTops={false}
  withInnerLines={false}

  yAxisLabel=""
  yAxisSuffix=""

  chartConfig={{
    backgroundGradientFrom: '#F7F8FC',
    backgroundGradientTo:   '#F7F8FC',
    decimalPlaces: 0,
    barPercentage: 0.6,
    color: (opacity=1) => `rgba(33,33,33, ${opacity})`,
    labelColor: () => '#2D2D2D',
  }}
  style={styles.chart}
/>

      {}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="home" size={26} color="#7165FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HabitTracker')}>
          <Icon name="check-square" size={26} color="#2D2D2D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SleepTracker')}>
          <Icon name="moon-o" size={26} color="#2D2D2D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="user" size={26} color="#2D2D2D" />
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
});
