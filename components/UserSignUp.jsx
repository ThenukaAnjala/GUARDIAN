import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';


const UserSignUp = () => {
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [BloodType, setBloodType] = useState('');
  const [SecondaryContact, setSecondaryContact] = useState('');
  const [Gender, setGender] = useState('');
  const [Language, setLanguage] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://172.28.27.8:4000/api/UserAuth/register', {
        Firstname: Firstname,
        Lastname: Lastname,
        Email: Email,
        Password: Password,
        ContactNo: ContactNo,
        BloodType: BloodType,
        SecondaryContact: SecondaryContact,
        Gender: Gender,
        Language: Language,
      });
      console.log('Registration Successful!', response.data);
      // Handle successful registration, such as navigating to another screen
    } catch (error) {
      console.error('Registration Error:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  const navigation = useNavigation();

  const handleFunction = () =>{
    navigation.navigate("UserLogin");
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
        placeholder="Firstname"
        onChangeText={(text) => setFirstname(text)}
        value={Firstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        onChangeText={(text) => setLastname(text)}
        value={Lastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={Email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={Password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        onChangeText={(text) => setContactNo(text)}
        value={ContactNo}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Blood Type"
        onChangeText={(text) => setBloodType(text)}
        value={BloodType}
      />
      <TextInput
        style={styles.input}
        placeholder="Secondary Contact"
        onChangeText={(text) => setSecondaryContact(text)}
        value={SecondaryContact}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        onChangeText={(text) => setGender(text)}
        value={Gender}
      />
      <TextInput
        style={styles.input}
        placeholder="Language"
        onChangeText={(text) => setLanguage(text)}
        value={Language}
      />
      <Button title="Register" onPress={handleRegistration} />
      <Button title="Login" onPress={handleFunction} />
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
  },
  image: {
    width: 250, 
    height:250, 
    marginTop:0, 
  },
});

export default UserSignUp;