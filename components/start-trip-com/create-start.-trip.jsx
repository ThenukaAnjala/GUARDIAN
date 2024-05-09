import React, {useState} from "react"
import { StyleSheet, Text, View, TextInput, Button, } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import UserInputs from "./create-trip-temp";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";

export default function AddTrip(){

        const [Destination, setDestination] = useState('');
        const [StartDateandTime, setStartDateandTime] = useState('');
        const [ModeOfTransportation, setModeOfTransportation] = useState('');
        const [NumberOfTravelers, setNumberOfTravelersn] = useState('');
        const [ExpectedDurationOfTravel, setExpectedTravelDurationTime] = useState('');
        
        
        const navigation = useNavigation();
        
       
    
    const handlesubmit = async () => {
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
              

            console.log("Trip created successfully :" , response.data)
            
        } catch (error) {
            console.log("Error creating trip",error)
        }
    }

    return (
        <View>
        <View>
            <Text style={{marginTop: 60, fontSize:20, backgroundColor:'#64CCC5', textAlign:"center", padding: 7, marginHorizontal:30}}>Start Your Jurnery</Text>
        </View>
        <KeyboardAwareScrollView style= {{marginTop: 0}}
            innerRef={ref => {
            this.scroll = ref
        }}>

        <SafeAreaView >
        
        <View>
            
        
            <UserInputs name = "Destination" value={Destination} setValue={setDestination}></UserInputs>
            <UserInputs name = "Start Date and Time:" value={StartDateandTime} setValue={setStartDateandTime}></UserInputs>
            <UserInputs name = "Mode Of Transportation" value={ExpectedDurationOfTravel} setValue={setExpectedTravelDurationTime}></UserInputs>
            <UserInputs name = "Expected Travel Duration" value={ModeOfTransportation} setValue={setModeOfTransportation} keyboardType='numeric' ></UserInputs>
            <UserInputs name = "Number Of Travelers" value={NumberOfTravelers} keyboardType='numeric' setValue={setNumberOfTravelersn}></UserInputs>
            
            

            <TouchableOpacity onPress={handlesubmit} title ='Create Trip' color='coral'>
                <Text style = {styles.add}> Create Trip</Text>
            </TouchableOpacity>
            
           
        </View>
        </SafeAreaView>
        
        </KeyboardAwareScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    add: {
        flex:1,
        backgroundColor: '#6492E7',
        marginTop: 20,
        padding: 15,
        marginHorizontal: 100,
        alignSelf: 'center'
        

    }

})


