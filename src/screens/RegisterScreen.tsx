import React, { useState } from 'react';
import {
  SafeAreaView, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !username || !password || !retypePassword) {
      Alert.alert('Error', 'Isi semua field');
      return;
    }
    if (password !== retypePassword) {
      Alert.alert('Error', 'Password tidak sama');
      return;
    }
  
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // Simpan data user ke database kalau perlu
      Alert.alert('Berhasil', 'Akun berhasil dibuat');
      navigation.goBack();
    } catch (error: unknown) {
      // Type assertion
      
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" />

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Choose a username" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />

      <Text style={styles.label}>Retype Password</Text>
      <TextInput style={styles.input} value={retypePassword} onChangeText={setRetypePassword} placeholder="Confirm password" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../assets/google.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  