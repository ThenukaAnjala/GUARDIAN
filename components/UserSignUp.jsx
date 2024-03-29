import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UserSignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [secondaryContact, setSecondaryContact] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/UserAuth/register', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        contactNo: contactNo,
        bloodType: bloodType,
        secondaryContact: secondaryContact,
        gender: gender,
        language: language,
      });
      console.log('Registration Successful!', response.data);
      // Handle successful registration, such as navigating to another screen
    } catch (error) {
      console.error('Registration Error:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        onChangeText={(text) => setFirstname(text)}
        value={firstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        onChangeText={(text) => setLastname(text)}
        value={lastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        onChangeText={(text) => setContactNo(text)}
        value={contactNo}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Blood Type"
        onChangeText={(text) => setBloodType(text)}
        value={bloodType}
      />
      <TextInput
        style={styles.input}
        placeholder="Secondary Contact"
        onChangeText={(text) => setSecondaryContact(text)}
        value={secondaryContact}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        onChangeText={(text) => setGender(text)}
        value={gender}
      />
      <TextInput
        style={styles.input}
        placeholder="Language"
        onChangeText={(text) => setLanguage(text)}
        value={language}
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
});

export default UserSignUp;