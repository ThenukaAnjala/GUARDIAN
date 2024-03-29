import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

const UserLogin = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://172.28.27.8:4000/api/UserAuth/login', {
        Email: Email,
        Password: Password,
      });
      console.log('Login Successful!', response.data);
      // Handle successful login, such as storing user session or navigating to another screen
    } catch (error) {
      console.error('Login Error:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  const navigation = useNavigation();

  const handleFunction = () =>{
    navigation.navigate("UserSignUp");
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require('../assets/Guardian.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={Email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={Password}
          secureTextEntry={true}
        />
        <Button title="Log in" onPress={handleLogin} />

        <Button title="Register" onPress={handleFunction} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 0,
    marginTop: 20,
  },
});

export default UserLogin;
