import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpTrip(){

    const navigation = useNavigation();

    const handleViewTrip = () =>{
        navigation.navigate("ViewTripInfo");
        
    }

    const handleViewTripInfo = () => {
        navigation.navigate("ViewTripInfo");
    }

    return (
        <KeyboardAwareScrollView
            innerRef={ref => {
                this.scroll = ref
            }}>

            <SafeAreaView >
                <View style={styles.container}>
                    <Text style={styles.header}>Help</Text>

                    <TouchableOpacity onPress={handleViewTrip} style={styles.button}>
                        <Text style={styles.buttonText}>View Trip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleViewTripInfo} style={styles.button}>
                        <Text style={styles.buttonText}>View Trip Info</Text>
                    </TouchableOpacity>
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
    button: {
        backgroundColor: 'coral',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
