import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View , TouchableOpacity , Alert } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function ViewTripInfo() {
  const [trips, setTrip] = useState([]);
  const Id = "66041043db2760cbc43"; // Replace with your user id
  const tripId = "663c9d07eb18a63edea58b6c"; // Replace with your trip id

  const navigation = useNavigation();

  useEffect(() => {
    const fetchTripDetails = () => {
      
        const response = axios.get(
          `http://192.168.8.144:4000/api/StartTrips/gettrip/${Id}`
        ).then((response) => {setTrip(response.data);}
        
      ) .catch ((error) => {
        console.error(error);
      });
    };

    fetchTripDetails();
  }, [Id]);

  const handleFunctionDelete = async (tripId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this trip?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await axios.delete(`http://192.168.8.144:4000/api/StartTrips/delete-trip/${tripId}`);
              if (response.status === 200) {
                alert('Trip deleted successfully');
                setTrip(trips.filter(trip => trip._id !== tripId));
              } else {
                alert('Failed to delete trip');
              }
            } catch (error) {
              console.error('Error deleting trip:', error);
              alert('Failed to delete trip');
            }
          }
        }
      ]
    );
  };

  const handleFunctionUpdate = (tripId) => {
    navigation.navigate("UpdateTrip", { tripId: tripId });
}


  return (
    <KeyboardAwareScrollView>
        <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.header}>Trip Details</Text>
      <View style={styles.container}>
                    <Text style={styles.header}>Trips</Text>
                    {trips.map((trip) => (
                        <View key={trip._id} style={styles.tripContainer}>
                            <Text style={styles.tripInfo}>ID: {trip._id}</Text>
                            <Text style={styles.tripInfo}>Destination: {trip.Destination}</Text>
                            <Text style={styles.tripInfo}>Transportation: {trip.ModeOfTransportation}</Text>
                            <Text style={styles.tripInfo}>Travelers: {trip.NumberOfTravelers}</Text>
                            <TouchableOpacity onPress={() => handleFunctionUpdate(trip._id)} style={styles.updateButton}>
                                <Text style={styles.updateButtonText}>Update</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleFunctionDelete(trip._id)} style={styles.updateButton}>
                                <Text style={styles.updateButtonText}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
    </View>
    </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  tripContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
},
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tripItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  tripDetail: {
    fontSize: 16,
    marginBottom: 10,
  },
  tripInfo: {
    fontSize: 16,
    marginBottom: 10,
},
updateButton: {
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
},
});
