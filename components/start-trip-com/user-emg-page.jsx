import React from "react";
import { StyleSheet, Text, View, TouchableOpacity , Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';


const { height } = Dimensions.get('window');
const desiredHeight = height * 0.6;

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

                    

                    <TouchableOpacity onPress={handleViewTripInfo} style={styles.button}>
                        <Text style={styles.buttonText}>View Trip Info</Text>
                    </TouchableOpacity>
                    <View style={styles.helpbutton}>
                        <View style={styles.buttonOut}>
                        <View style={styles.buttonIn}>
                            <Text style={styles.buttonText1}>
                                HELP
                            </Text>

                        </View>
                        </View>
                    </View>
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
    helpbutton:{
        height: desiredHeight,
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },

    buttonOut:{
        height:300,
        width:300,
        backgroundColor:'white',
        borderRadius:150,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2,
        borderColor:'red'
        
    },

    buttonIn:{
        height:280,
        width:280,
        backgroundColor:'red',
        borderRadius:140,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
    },

    buttonText1:{
        backgroundColor:'red',
        borderRadius:140,
        color:'white',
        fontSize:84,
        fontWeight:'bold'
        
    },



});
