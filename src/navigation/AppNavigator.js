import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GetStartedScreen from '../screens/GetStartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import InputHabitScreen from '../screens/InputHabitScreen';
import InputSleepScreen from '../screens/InputSleepScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="InputHabitScreen" component={InputHabitScreen} />
      <Stack.Screen name="InputSleepScreen" component={InputSleepScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
