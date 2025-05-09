import { initializeApp } from '@react-native-firebase/app';
import { getDatabase } from '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBrURQLCNibpqGnIS09WjI0s0T9cMlZ3X0",
  authDomain: "mad2025-699cc.firebaseapp.com",
  databaseURL: "https://mad2025-699cc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mad2025-699cc",
  storageBucket: "mad2025-699cc.appspot.com",
  messagingSenderId: "977316858153",
  appId: "1:977316858153:android:1b10df9797a3d214f34f38",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
