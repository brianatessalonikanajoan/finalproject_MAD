import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type StatistikScreenNav = NativeStackNavigationProp<RootStackParamList, 'Statistik'>;

const StatistikScreen = () => {
  const navigation = useNavigation<StatistikScreenNav>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#2D2D2D" />
      </TouchableOpacity>
      <Text style={styles.title}>STATISTIK</Text>
    </View>
  );
};

export default StatistikScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 12,
  },
});
