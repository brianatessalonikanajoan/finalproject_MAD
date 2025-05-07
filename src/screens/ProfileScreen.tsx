import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenNav = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNav>();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#2D2D2D" />
      </TouchableOpacity>
      <Text style={styles.title}>PROFILE</Text>

      <View style={styles.card}>
        <Icon name="user" size={48} color="#2D2D2D" style={styles.avatar} />
        <Text style={styles.name}>Alex{"\n"}Schimidt</Text>

        <TextInput placeholder="Email" style={styles.input} editable={false} />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <TouchableOpacity style={styles.statButton} onPress={() => navigation.navigate('Statistik')}>
            <Text style={styles.logoutText}>View Statistik</Text>
        </TouchableOpacity>


        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notifikasi</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <TouchableOpacity style={styles.logoutBtn}
            onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

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
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 20,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 26,
  },
  input: {
    backgroundColor: '#F7F8FC',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 10,
    marginVertical: 6,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    padding: 10,
    backgroundColor: '#F7F8FC',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  switchLabel: {
    fontSize: 16,
    color: '#2D2D2D',
  },
  logoutBtn: {
    marginTop: 16,
    backgroundColor: '#7165FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: '700',
  },
  statButton: {
    marginTop: 12,
    backgroundColor: '#FFD56A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },  
});
