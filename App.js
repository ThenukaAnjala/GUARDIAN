import React, { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Gyro from './components/GyroscopeComponent';
import Notification from'./components/SafeNotification';
import AddTrip from './components/start-trip-com/create-start.-trip';
import ViewTrip from './components/start-trip-com/view-user-trip';
import UpdateTrip from './components/start-trip-com/update-user-trip';
import HelpTrip from './components/start-trip-com/user-emg-page';import UserSignUp from './components/UserSignUp';
import UserLogin from './components/UserLogin';
import ViewTripInfo from './components/start-trip-com/user-profile'


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{flex:1}}>
      
      <NavigationContainer>
        <Stack.Navigator
        // initialRouteName='UserLogin'
        initialRouteName='AddTrip'

        screenOptions={{headerShown:false}}
        >
          {/* <Stack.Screen name = "GyroscopeComponent" component={Gyro} />
          <Stack.Screen name = "Notification" component={Notification} />
          <Stack.Screen name = "UserSignUp" component={UserSignUp} />
          <Stack.Screen name = "UserLogin" component={UserLogin} /> */}
          <Stack.Screen name="AddTrip" component={AddTrip} />
          <Stack.Screen name="ViewTrip" component={ViewTrip}/>
          <Stack.Screen name="UpdateTrip" component={UpdateTrip}/>
          <Stack.Screen name="HelpTrip" component={HelpTrip}/>
          <Stack.Screen name="ViewTripInfo" component={ViewTripInfo}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    </GestureHandlerRootView>

   
    




    
  );
}