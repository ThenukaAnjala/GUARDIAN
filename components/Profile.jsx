import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // Correct import statement

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          const currentUser = jwtDecode(storedToken);
          console.log(currentUser);
          if (currentUser) {
            console.log(currentUser.Email);
            setUser(currentUser);
          }
        } else {
          console.log("No token found in AsyncStorage");
          // Handle the case when the stored token is null or undefined
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

      

      <View style={styles.infoContainer}>
        {user && (
          <View>
            <Text>Firstname: {user.Firstname}</Text>
            <Text>Lastname: {user.Lastname}</Text>
            <Text>Email: {user.Email}</Text>
            <Text>Contact No: {user.ContactNo}</Text>
            <Text>Language: {user.Language}</Text>
            <Text>Blood Type: {user.BloodType}</Text>
            
          </View>
        )}
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
  imageContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default Profile;
