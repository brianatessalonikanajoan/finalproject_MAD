import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { RootStackParamList } from './src/navigation/types';
import GetStartedScreen from './src/screens/GetStartedScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import InputHabitScreen from './src/screens/InputHabitScreen';
import InputSleepScreen from './src/screens/InputSleepScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StatistikScreen from './src/screens/StatistikScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'AIzaSyBrURQLCNibpqGnIS09WjI0s0T9cMlZ3X0',
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="InputHabit" component={InputHabitScreen} />
        <Stack.Screen name="InputSleep" component={InputSleepScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Statistik" component={StatistikScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
