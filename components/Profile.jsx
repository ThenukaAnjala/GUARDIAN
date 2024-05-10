import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert,Button} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { TextInput } from 'react-native-gesture-handler';

const Profile = () => {
  const route = useRoute();

  const id = route.params.userId;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [secondaryContact, setSecondaryContact] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('English');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://172.28.128.153:4000/api/UserAuth/${id}`);
   

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

  const handleUpdateUser = async () => {
    try {
      console.log(gender)
      // Send signup request to server
      const response = await axios.patch(`http://172.28.128.153:4000/api/UserAuth/${userData._id}`, {
        Firstname: firstName,
        Lastname: lastName,
        Email: email,
        
        ContactNo: contactNo,
        BloodType: bloodType,
        SecondaryContact: secondaryContact,
        Gender: gender,
        Language: language
      });
      
      // Handle successful registration
      Alert.alert('Success', 'You have successfully updated!');

      if(response.status === 200){
        const data = await response.data;
        setUserData(data);
      }
        
      // You may navigate the user to another screen or perform any other action here after successful signup
    } catch (error) {
      // Handle registration error
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('User Already Exist', error.response.status);
        console.error('Response data:', error.response.data);
        Alert.alert('Error', `Server responded with status code ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        Alert.alert('Error', 'No response received from server');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up request:', error.message);
        Alert.alert('Error', 'An error occurred while sending the request');
      }
    }
  }

  const toggleUpdate = () => {
    if(openUpdate){
      setOpenUpdate(false);
    }else{
      setOpenUpdate(true);
    }
  }

  
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
        (openUpdate) ? (
          

        <View>
          
        <TextInput onChangeText={text => setFirstName(text)}  style={styles.output} name = "First Name"> {userData.Firstname}</TextInput>
        <TextInput onChangeText={text => setLastName(text)} style={styles.output}>{userData.Lastname}</TextInput>
        <TextInput onChangeText={text => setEmail(text)} style={styles.output}>{userData.Email}</TextInput>
  
        <TextInput onChangeText={text => setContactNo(text)} keyboardType="numeric" style={styles.output}>{userData.ContactNo}</TextInput>
        <TextInput onChangeText={text => setBloodType(text)} style={styles.output}> {userData.BloodType}</TextInput>
        <TextInput onChangeText={text => setSecondaryContact(text)} keyboardType="numeric" style={styles.output}>{userData.SecondaryContact}</TextInput>
        <TextInput onChangeText={text => setGender(text)} style={styles.output}>{userData.Gender}</TextInput>
        <TextInput onChangeText={text => setLanguage(text)} style={styles.output}>{userData.Language}</TextInput>
  
        
        <Button title="Save Changes"style={styles.UpdateButton} onPress={async() => (toggleUpdate(), await handleUpdateUser())} />
  
      </View>
      ) :(

        <View>
          
          <Text  style={styles.output}>First Name: {userData.Firstname}</Text>
          <Text  style={styles.output}>Last Name: {userData.Lastname}</Text>
          <Text  style={styles.output}>Email: {userData.Email}</Text>

          <Text  style={styles.output}>Contact No: {userData.ContactNo}</Text>
          <Text  style={styles.output}>Blood Type: {userData.BloodType}</Text>
          <Text  style={styles.output}>Secondary Contact: {userData.SecondaryContact}</Text>
          <Text  style={styles.output}>Gender: {userData.Gender}</Text>
          <Text  style={styles.output}>Language: {userData.Language}</Text>

          <Button title="Update"style={styles.UpdateButton} onPress={ () => setOpenUpdate(true)} />
        </View>

      )
    ) 
    
 

    }
      
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
  },
  UpdateButton:{
  color: '#fff',
  fontWeight: 'bold',
}
});

export default Profile;
