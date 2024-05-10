import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

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
          Alert.alert('Error', 'Userrr not found');
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
    <KeyboardAwareScrollView contentContainerStyle={styles.container2}>
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>
      {userData && (
        <View>
          <Text  style={styles.output}>First Name: {userData.Firstname}</Text>
          <Text  style={styles.output}>Last Name: {userData.Lastname}</Text>
          <Text  style={styles.output}>Email: {userData.Email}</Text>

          <Text  style={styles.output}>Contact No: {userData.ContactNo}</Text>
          <Text  style={styles.output}>Blood Type: {userData.BloodType}</Text>
          <Text  style={styles.output}>Secondary Contact: {userData.SecondaryContact}</Text>
          <Text  style={styles.output}>Gender: {userData.Gender}</Text>
          <Text  style={styles.output}>Language: {userData.Language}</Text>
          {/* Display other user data as needed */}
        </View>
      )}
    </View>
    </KeyboardAwareScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  output: {
    height: 40,
    width:"150",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  container2:{
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
});

export default Profile;
