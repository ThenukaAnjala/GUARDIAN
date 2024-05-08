import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!Email || !Password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post('http://172.28.15.21:4000/api/UserAuth/login', {
        Email,
        Password
      });

      const token = response.data.token;

      // Store the token securely
      if (token) {
        await AsyncStorage.setItem('token', token);
      } else {
        // If token is null or undefined, remove it from AsyncStorage
        await AsyncStorage.removeItem('token');
      }

      Alert.alert('Success', 'You have successfully logged in!');
      // Handle navigation or any other action after successful login
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
      console.error('Error logging in:', error);
    }
};

    const handleForgotPassword = () => {
        // Handle forgot password functionality here
        // For example, navigate to the forgot password screen
        console.log('Forgot Password');
    };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('..//assets/Guardian.png')}
          style={styles.image1}
          resizeMode="contain"
        />
      </View>
      <TextInput
        placeholder="Email"
        value={Email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={Password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Button title="Forgot Password" onPress={handleForgotPassword} style={styles.forgotPasswordButton} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  imageContainer: {
    marginBottom: 20, // Adjust margin as needed
  },
  image1: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    marginTop: 200, // Adjust margin as needed
    marginBottom: 20, // Adjust margin as needed
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
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
  button: {
    backgroundColor: '#007bff', // Button background color
    color: '#fff', // Text color 
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, 
    borderRadius: 5, 
  }
});

export default Login;
