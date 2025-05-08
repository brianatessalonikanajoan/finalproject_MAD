import React, { useState } from 'react';
import {
  SafeAreaView, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { auth } from '../firebaseConfig';

type LoginScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Isi semua field');
      return;
    }
    try {
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

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
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
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#7165FF',
    fontSize: 16,
    fontWeight: '500',
  },
});
