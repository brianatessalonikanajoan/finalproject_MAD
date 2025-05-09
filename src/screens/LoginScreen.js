import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.navigate('Dashboard'))
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Go to Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
