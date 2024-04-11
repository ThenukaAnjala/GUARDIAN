import React, { useState, useEffect } from 'react';
import { Text, View , TouchableOpacity, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Notification from './SafeNotification';
import UserAlertNotification from '../screens/UserAlertNotification';




export default function Gyro() {
  const navigation = useNavigation();

  const handleFunction = () =>{
    navigation.navigate("Notification");
  }

  const UserAlertNotification = () =>{
    navigation.navigate("UserAlertNotification");
  }



    const [{ x, y, z }, setData] = useState({
      x: 0,
      y: 0,
      z: 0,

    })
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
      console.log(`x: ${x}, y: ${y}, z: ${z}`);
    }, [x, y, z]);

    
// find magnitude 
    const result = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  };

  

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const [showNotification, setShowNotification] = useState(false);



  return (
    <SafeAreaView>
      <View >
        <Text>Gyroscope:</Text>
        <Text>x: {x}</Text>
        <Text >y: {y}</Text>
        <Text>z: {z}</Text>
        <Text>magnitude: {result}</Text>
        <View>
          <TouchableOpacity style={styles.button} onPress={subscription ? _unsubscribe : _subscribe} >
            <Text>{subscription ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={_slow} >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={_fast} >
            <Text>Fast</Text>
          </TouchableOpacity>

         

              <TouchableOpacity style={styles.button}  onPress={handleFunction} >
                <Text>Notification</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}  onPress={UserAlertNotification} >
                <Text>UserNotification</Text>
              </TouchableOpacity>

             
          

         
        </View>
      </View>
      </SafeAreaView>
 
 );
}


const styles = StyleSheet.create({
   button: {
      
    backgroundColor: '#C2C8C2', 
    padding: 10, 
    borderRadius: 8, 
    width:125,
    height:50,
    marginLeft:30,
    marginTop:10,
    
    },
  },)