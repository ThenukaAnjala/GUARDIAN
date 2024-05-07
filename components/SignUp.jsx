import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Image } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [secondaryContact, setSecondaryContact] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSignUp = async () => {
    // Validate the user input
    if (!firstName || !lastName || !email || !password || !contactNo || !bloodType) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
  
    if (contactNo.length < 10) {
      Alert.alert('Error', 'Contact number must be at least 10 digits');
      return;
    }
  
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }
  
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
      Alert.alert('Error', 'Password must contain at least one numeric digit, one uppercase and one lowercase letter, and be between 6 to 20 characters');
      return;
    }

    try {
      const response = await axios.post('http://172.28.15.21:4000/api/UserAuth/register', {
        Firstname: firstName,
        Lastname: lastName,
        Email: email,
        Password: password,
        ContactNo: contactNo,
        BloodType: bloodType,
        SecondaryContact: secondaryContact,
        Gender: gender,
        Language: language
      });

      // Handle successful registration
      Alert.alert('Success', 'You have successfully signed up!');
      // You may navigate the user to another screen or perform any other action here after successful signup
    } catch (error) {
      // Handle registration error
      Alert.alert('Error', 'An error occurred while signing up. Please try again later.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>

      <View style={styles.imageContainer}>
        <Image 
          source={require('..//assets/Guardian.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Contact No"
        value={contactNo}
        onChangeText={text => setContactNo(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Blood Type"
        value={bloodType}
        onChangeText={text => setBloodType(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Secondary Contact"
        value={secondaryContact}
        onChangeText={text => setSecondaryContact(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={text => setGender(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Language"
        value={language}
        onChangeText={text => setLanguage(text)}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    width: '100%',
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

  image: {
    width: 200,
    height: 200,
    marginBottom:80
  }

});

export default SignUp;
