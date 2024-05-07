import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import UserInputs from "./create-trip-temp";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";

export default function ViewTrip(){

    const [trips, setTrips] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        axios.get("http://192.168.139.125:4000/api/StartTrips/get-trip")
            .then((res) => {
                setTrips(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleFunction = (tripId) => {
        navigation.navigate("UpdateTrip", { tripId: tripId });
    }

    return (
        <KeyboardAwareScrollView
            innerRef={ref => {
                this.scroll = ref
            }}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.header}>Trips</Text>
                    {trips.map((trip) => (
                        <View key={trip._id} style={styles.tripContainer}>
                            <Text style={styles.tripInfo}>ID: {trip._id}</Text>
                            <Text style={styles.tripInfo}>Destination: {trip.Destination}</Text>
                            <Text style={styles.tripInfo}>Transportation: {trip.ModeOfTransportation}</Text>
                            <Text style={styles.tripInfo}>Travelers: {trip.NumberOfTravelers}</Text>
                            <TouchableOpacity onPress={() => handleFunction(trip._id)} style={styles.updateButton}>
                                <Text style={styles.updateButtonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tripContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
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
