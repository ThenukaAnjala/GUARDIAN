import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserInputs from "./create-trip-temp";
import UserInput from "./user-input-temp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function UpdateTrip({ route }) {
  const [Destination, setDestination] = useState("");
  const [StartDateandTime, setStartDateandTime] = useState("");
  const [ExpectedDurationOfTravel, setExpectedTravelDurationTime] = useState("");
  const [ModeOfTransportation, setModeOfTransportation] = useState("");
  const [NumberOfTravelers, setNumberOfTravelersn] = useState("");

  const [trips, setTrips] = useState([]);

  const navigation = useNavigation();



  const { tripId } = route.params;

  const getDetails = () => {
    axios
      .get(`http://192.168.139.125:4000/api/StartTrips/get-trip/${tripId}`)
      .then((response) => {
        setTrips(response.data);
        setDestination(response.data.Destination);
        setStartDateandTime(response.data.StartDateandTime);
        setExpectedTravelDurationTime(response.data.ExpectedDurationOfTravel);
        setModeOfTransportation(response.data.ModeOfTransportation);
        setNumberOfTravelersn(response.data.NumberOfTravelers);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateDetails = async () => {
    try {
      await axios.patch(
        `http://192.168.139.125:4000/api/StartTrips/update-trip/${tripId}`,
        {
          Destination,
          StartDateandTime,
          ExpectedDurationOfTravel,
          ModeOfTransportation,
          NumberOfTravelers,
        }
      );
      console.log("updated");
      navigation.navigate("ViewTrip");
    } catch (error) {
      console.log("Error in updating trip", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [tripId]);

  const destinationHandler = (text) => {
    setDestination(text);
  };

  const StartDateandTimeHandler = (text) => {
    setStartDateandTime(text);
  };

  const ExpectedTravelDurationTimeHandler = (text) => {
    setExpectedTravelDurationTime(text);
  };

  const ModeOfTransportationHandler = (text) => {
    setModeOfTransportation(text);
  };

  const NumberOfTravelersnHandler = (text) => {
    setNumberOfTravelersn(text);
  };

  return (
    <View>
      <View>
        <Text
          style={{
            marginTop: 60,
            fontSize: 20,
            backgroundColor: "#64CCC5",
            textAlign: "center",
            padding: 7,
            marginHorizontal: 30,
          }}
        >
          Update Jurnery
        </Text>
      </View>

      <KeyboardAwareScrollView
        innerRef={(ref) => {
          this.scroll = ref;
        }}
      >
        <SafeAreaView>
          <View>
            <UserInputs
              name="Destination"
              value={Destination}
              setValue={destinationHandler}
            ></UserInputs>
            <UserInputs
              name="StartDateandTime:"
              value={StartDateandTime}
              setValue={StartDateandTimeHandler}
            ></UserInputs>
            <UserInputs
              name="Mode Of Transportation"
              value={ModeOfTransportation}
              setValue={ModeOfTransportationHandler}
            ></UserInputs>
            <UserInputs
              name="Expected Travel Duration"
              value={ExpectedDurationOfTravel}
              setValue={ExpectedTravelDurationTimeHandler}
            ></UserInputs>
            <UserInput
              name="Number Of Travelers"
              value={NumberOfTravelers}
              setValue={NumberOfTravelersnHandler}
            ></UserInput>

            <TouchableOpacity
              onPress={updateDetails}
              title="Create Trip"
              color="coral"
            >
              <Text style={styles.add}>Update Trip</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    flex: 1,
    backgroundColor: "#6492E7",
    marginTop: 20,
    padding: 15,
    marginHorizontal: 100,
    alignSelf: "center",
  },
});
