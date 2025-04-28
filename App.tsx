// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';

import GetStartedScreen   from './screens/GetStartedScreen';
import LoginScreen        from './screens/LoginScreen';
import DashboardScreen    from './screens/DashboardScreen';
// import HabitTrackerScreen from './screens/HabitTrackerScreen';
// import SleepTrackerScreen from './screens/SleepTrackerScreen';
// import SettingsScreen     from './screens/SettingsScreen';    

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        {/* <Stack.Screen name="HabitTracker"component={HabitTrackerScreen} />
        <Stack.Screen name="SleepTracker"component={SleepTrackerScreen} />
        <Stack.Screen name="Settings"    component={SettingsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
