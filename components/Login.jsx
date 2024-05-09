import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!Email || !Password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.8.101:4000/api/UserAuth/login', {
        Email,
        Password
      });
  
      console.log('Login response:', response.data);
  
      if (response.data.accessToken && response.data.id) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('token', response.data.accessToken);
        await AsyncStorage.setItem('id', response.data.id);
        await AsyncStorage.setItem('name', response.data.Firstname);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
  
        // Navigate to the profile page
        navigation.navigate('Profile');
      } else {
        await AsyncStorage.removeItem('token');
        Alert.alert('Error', 'Invalid email or password. Please try again.');
      }
  
      Alert.alert('Success', 'You have successfully logged in!');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
      console.error('Error logging in:', error);
    }
  };

  const handleForgotPassword = () => {
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
         <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button title="Forgot Password" onPress={handleForgotPassword} style={styles.forgotPasswordButton} />
      <Button title="Signup" onPress={handleSignUp} style={styles.signUpButton} />
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
    marginBottom: 20, 
  },
  image1: {
    width: 200, 
    height: 200, 
    marginTop: 200, 
    marginBottom: 20, 
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
    backgroundColor: '#28a745', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 5, 
    marginTop: 10, 
  },
  forgotPasswordButton: {
    color: '#007bff', 
    marginTop: 10, 
  },
  signUpButton: {
    backgroundColor: '#28a745', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 5, 
    marginTop: 10, 
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', // Center the text within the button
  }
});

export default Login;
