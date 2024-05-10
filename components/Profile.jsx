import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const Profile = () => {
  const route = useRoute();

  const id = route.params.userId;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://172.28.15.21:4000/api/UserAuth/${id}`);
   

        if (response.status === 200) {
          const data = await response.data;
          
          setUserData(data);
        } else {
          Alert.alert('Error', 'User not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
      {userData && (
        <View>
          <Text>First Name: {userData.Firstname}</Text>
          <Text>Last Name: {userData.Lastname}</Text>
          <Text>Email: {userData.Email}</Text>
          {/* Display other user data as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
