import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import UserInputs from "./create-trip-temp";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker'; // Import DropDownPicker instead of Dropdown
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

export default function AddTrip() {
  const [Destination, setDestination] = useState('');
  const [StartDateandTime, setStartDateandTime] = useState('');
  const [ModeOfTransportation, setModeOfTransportation] = useState('bike'); // Set default value to 'bike'
  const [NumberOfTravelers, setNumberOfTravelersn] = useState('');
  const [ExpectedDurationOfTravel, setExpectedTravelDurationTime] = useState('');

  const navigation = useNavigation();

  const handleModeOfTransportationChange = (value) => {
    setModeOfTransportation(value);
  }

  const handleSubmit = async () => {
    try {
      const dummyUserId = "66041043db2760cbc43";

      const response = await axios.post(
        "http://192.168.8.144:4000/api/StartTrips/create-trip",
        {
          Destination,
          StartDateandTime,
          ExpectedDurationOfTravel,
          ModeOfTransportation,
          NumberOfTravelers,
          UserId: dummyUserId
        }
      );

      navigation.navigate("HelpTrip");
      console.log("Trip created successfully :", response.data);
    } catch (error) {
      console.log("Error creating trip", error);
    }
  }

  const data = [
    { label: 'Bike', value: 'bike' },
    { label: 'Walk', value: 'walk' }
  ];

  return (
    <View>
      <View>
        <Text style={styles.heading}>Start Your Journey</Text>
      </View>
      <KeyboardAwareScrollView style={{ marginTop: 0 }}>
        <SafeAreaView>
          <View>
            <UserInputs name="Destination" value={Destination} setValue={setDestination}></UserInputs>
            <UserInputs name="Start Date and Time:" value={StartDateandTime} setValue={setStartDateandTime}></UserInputs>
            <UserInputs name="Expected Travel Duration" value={ExpectedDurationOfTravel} setValue={setExpectedTravelDurationTime}></UserInputs>
            <Text style={styles.inputs}>ModeOfTransportation</Text>
            <Picker
                selectedValue={ModeOfTransportation}
                onValueChange={(itemValue, itemIndex) =>
                    setModeOfTransportation(itemValue)
                } style={styles.picker}>
                <Picker.Item label="Walk" value="Walk" />
                <Picker.Item label="Bike" value="Bike" />
                <Picker.Item label="Train" value="Train" />
                <Picker.Item label="Bus" value="Bus" />
                </Picker>
            <UserInputs name="Number Of Travelers" value={NumberOfTravelers} keyboardType='numeric' setValue={setNumberOfTravelersn}></UserInputs>
            <TouchableOpacity onPress={handleSubmit} title='Create Trip' color='coral'>
              <Text style={styles.add}> Create Trip</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 60,
    fontSize: 20,
    backgroundColor: '#64CCC5',
    textAlign: "center",
    padding: 7,
    marginHorizontal: 30
  },
  add: {
    flex: 1,
    backgroundColor: '#6492E7',
    marginTop: 20,
    padding: 15,
    marginHorizontal: 100,
    alignSelf: 'center'
  },
  inputs: {
    paddingLeft:10,
    marginLeft: 25,
    fontSize:18,
    color: "#898484" ,
    fontWeight:'500'
  },

  picker: {
    marginHorizontal:25,
    borderWidth: 0.5,
    height: 48,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#F7F7F7",
    borderColor: 'black',
    
  }
});
