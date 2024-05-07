import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


export default function ViewTrip({ trip }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Trip Details</Text>
            <View style={styles.tripContainer}>
                <Text style={styles.tripInfo}>ID: {trip._id}</Text>
                <Text style={styles.tripInfo}>Destination: {trip.Destination}</Text>
                <Text style={styles.tripInfo}>Start Date and Time: {trip.StartDateandTime}</Text>
                <Text style={styles.tripInfo}>Mode of Transportation: {trip.ModeOfTransportation}</Text>
                <Text style={styles.tripInfo}>Number of Travelers: {trip.NumberOfTravelers}</Text>
                <Text style={styles.tripInfo}>Expected Travel Duration: {trip.ExpectedDurationOfTravel}</Text>
            </View>
            <TouchableOpacity onPress={() => handleFunction(trip._id)} style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
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
