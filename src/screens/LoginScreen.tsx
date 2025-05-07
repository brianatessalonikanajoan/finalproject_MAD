import React, { useState } from 'react';
import {
  SafeAreaView, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { auth } from '../firebaseConfig';

type LoginScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Isi semua field');
      return;
    }
    try {
      const email = `${username}@example.com`;
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Dashboard');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Login Gagal', error.message);
      } else {
        Alert.alert('Login Gagal', 'Terjadi kesalahan tidak terduga');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../assets/google.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2D2D2D',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#33',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7165FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    marginTop: 14,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
