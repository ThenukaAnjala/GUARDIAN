import React, { useState, useEffect , useRef  } from 'react';
import { Text, View , TouchableOpacity, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { schedulePushNotification } from './SafeNotification';
import Notification from './SafeNotification';
import UserAlertNotification from '../screens/UserAlertNotification';




export default function GyroscopeComponent() {
  const navigation = useNavigation();


  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      navigation.navigate('UserAlertNotification'); 
    });

    return () => {
      subscription.remove();
    };
  }, []);




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
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();

    useEffect(() => {
      console.log(`x: ${x}, y: ${y}, z: ${z}`);
    }, [x, y, z]);

    
// find magnitude 
    const magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    let prevCount = 0;

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  };



  



  useEffect(() => {
    if (magnitude < 0.01) {
      setCount(prevCount => {
        console.log(prevCount);
        return prevCount + 1;
      });
    }
  }, [magnitude]);//when change magnitude this will run (looking at magnitude variable change)


  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);




 




  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`Magnitude was less than 0.01 ${prevCountRef.current - 1} times in the last 30 seconds`);
      
      if(prevCountRef.current >= 20){
      
      schedulePushNotification();

    }
      setCount(0); // Reset the count 30 seconds
    }, 30000); // 30000ms = 30 seconds
    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);


  

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    _slow();
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
        <Text>magnitude: {magnitude}</Text>
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