/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// src/config/firebaseConfig.ts
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

// Tidak perlu lagi mendefinisikan `const firebaseConfig = {...}`

if (!firebase.apps.length) {
  // Ini akan membaca config dari google-services.json
  firebase.initializeApp();
}

export default firebase;

AppRegistry.registerComponent(appName, () => App);
