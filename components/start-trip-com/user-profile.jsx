import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image , ScrollView } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function ViewTripInfo() {
  const [trips, setTrip] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const Id = "66041043db2760cbc43"; // Replace with your user id

  const navigation = useNavigation();

  useEffect(() => {
    fetchTripDetails();
  }, [Id]);

 

  const fetchTripDetails = () => {
    setIsRefreshing(true); // Set refreshing state to true
    axios
      .get(`http://192.168.8.144:4000/api/StartTrips/gettrip/${Id}`)
      .then((response) => {
        setTrip(response.data);
        setIsRefreshing(false); // Set refreshing state to false
      })
      .catch((error) => {
        console.error(error);
        setIsRefreshing(false); // Set refreshing state to false
      });
  };

  const handleFunctionDelete = async (tripId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this trip?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `http://192.168.8.144:4000/api/StartTrips/delete-trip/${tripId}`
              );
              if (response.status === 200) {
                alert("Trip deleted successfully");
                setTrip(trips.filter((trip) => trip._id !== tripId));
              } else {
                alert("Failed to delete trip");
              }
            } catch (error) {
              console.error("Error deleting trip:", error);
              alert("Failed to delete trip");
            }
          },
        },
      ]
    );
  };

  const handleFunctionUpdate = (tripId) => {
    navigation.navigate("UpdateTrip", { tripId: tripId });
  };

  return (
    <SafeAreaView>
    <View>
        <View style={styles.imageContainer}>
          <Image style={styles.image}
            source={require('../../assets/guardian2.png')}
          />
          
    </View>
    
    
      <SafeAreaView
      >
        <View style={styles.container}>
          <Text style={styles.header}>Trip Details</Text>
          
          <ScrollView style={styles.tripContainer}
          >
    
            {trips.map((trip) => (
              <View key={trip._id} style={styles.tripItem}>
                
                <View style={styles.fieldContainerMain}
                >
                <View style={styles.fieldContainer}>
                  <Text style={styles.detailLabel}>Destination: </Text>
                  <Text style={styles.tripDetail}>{trip.Destination}</Text>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.detailLabel}>Start Date: </Text>
                  <Text style={styles.tripDetail}>{trip.StartDateandTime}</Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.detailLabel}>Return Date: </Text>
                  <Text style={styles.tripDetail}>{trip.StartDateandTime}</Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.detailLabel}>Transportation Mode: </Text>
                  <Text style={styles.tripDetail}>
                    {trip.ModeOfTransportation}
                  </Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.detailLabel}>Travelers: </Text>
                  <Text style={styles.tripDetail}>
                    {trip.NumberOfTravelers}
                  </Text>
                </View>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => handleFunctionUpdate(trip._id)}
                    style={[styles.button, styles.updateButton]}
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleFunctionDelete(trip._id)}
                    style={[styles.button, styles.deleteButton]}
                  >
                    
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'red'
    
  
  },
  tripContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width:'100%'

  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tripItem: {
    marginBottom: 30,
    margin: 10
  },
  tripHeader: {
    fontSize: 20,
    fontWeight: "bold",
    
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
   
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal:50,
    marginTop:15
    
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#4caf50",
    marginBottom:10
  },
  deleteButton: {
    backgroundColor: "#f44336",
    height:100,
    borderRadius:50,
    width:100,

  },

  detailLabel: {
    fontWeight: "bold",
    color: "gray", // Adjust the color as needed
    fontSize:20
  },

  tripDetail: {
    // flexDirection: 'column', // Display label and value in column
    // marginBottom: 10,
    // padding: 5,
    // backgroundColor: '#fff',
    // borderRadius: 5,
    // elevation: 5,
    // height: 60, // Adjust height as needed
    // fontWeight: 'bold', // Add fontWeight

    fontSize:18,
    marginVertical:5

  },

  fieldContainer: {
    width: '100%',
  },

  fieldContainerMain: {
    // height:'fitContent',
    margin:20,
    paddingLeft:20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10, // Optional: for rounded corners
    padding: 20, // Optional: for padding
    
  },

  image: {
    
  }, 

  imageContainer: {
    
    height:200,
    display:'flex',
    justifyContent: 'center',
    alignSelf:'center'
    
  }
});
