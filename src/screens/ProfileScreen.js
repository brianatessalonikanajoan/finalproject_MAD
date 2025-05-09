import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import { getDatabase, ref, get, update } from '@react-native-firebase/database';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const database = getDatabase();
      const userRef = ref(database, 'users/' + user.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data);
            if (data.photoUrl) setImageUri(data.photoUrl);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
          setLoading(false);
        });
    }
  }, []);

  const handleLogout = () => {
    getAuth().signOut().then(() => {
      navigation.navigate('Login');
    });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage);
        return;
      }

      const uri = response.assets[0].uri;
      setImageUri(uri);

      const auth = getAuth();
      const database = getDatabase();
      const userRef = ref(database, 'users/' + auth.currentUser.uid);

      await update(userRef, { photoUrl: uri });
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6c63ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../../assets/user.png')}
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile</Text>
        <Text style={styles.cardText}>Name: {userData.name}</Text>
        <Text style={styles.cardText}>Email: {userData.email}</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7fa',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2e2d4d',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changePhotoText: {
    textAlign: 'center',
    color: '#6c63ff',
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
