import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
        if (userId) {
          setUserId(userId);
        } else {
          console.log('No user ID found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleEditUser = () => {
    // Add edit user functionality here
  };

  const handleDeleteUser = () => {
    // Add delete user functionality here
  };

  return (
    <View style={styles.profileContainer}>
      <View>
        <Text>User ID: {userId}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Edit User" onPress={handleEditUser} />
        <Button title="Delete User" onPress={handleDeleteUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default Profile;
