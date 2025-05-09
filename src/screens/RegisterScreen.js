import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { getDatabase, ref, set } from '@react-native-firebase/database';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState(''); // 🆕 Tambah state nama
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = () => {
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const database = getDatabase();
        set(ref(database, 'users/' + user.uid), {
          name,    // 🆕 Simpan nama ke database
          email,
        }).then(() => {
          navigation.navigate('Login');
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name" // 🆕 Input Nama
        placeholderTextColor="#555"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        placeholderTextColor="#555"
        secureTextEntry
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Back to Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f7f7fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#2e2d4d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
});
