import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Tagline */}
      <Text style={styles.tagline}>“ Your day, made smarter”</Text>

      {/* Tombol Get Started */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  tagline: {
    fontSize: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GetStartedScreen;
