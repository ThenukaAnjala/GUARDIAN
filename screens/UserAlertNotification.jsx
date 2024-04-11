import React from 'react';
import { Text, View , TouchableOpacity, StyleSheet, Image,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




const UserAlertNotification = () => {
    return (
        <View style={styles.boxContainer}>
            <SafeAreaView>
                <View style={styles.box}>
                     <Image style={styles.image} source={require('../assets/exclamation.png')} />
                     <Text style={styles.emergencyHedding}>Are You In An Emergency ?</Text>
                    
                        <TouchableOpacity style={styles.safeButton}>
                          
                            <Text style={styles.safeButtonText}>I Am Safe  </Text>
                           
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.assistanceButton}>  
                       
                            <Text style={styles.assistanceButtonText}> I Need Help </Text>
                            
                        </TouchableOpacity>

                  

                </View >
            </SafeAreaView>
            
        </View>

       
    );
};


const styles = StyleSheet.create({
    box: {
        
        width: 350,
        height: 400,
        backgroundColor: '#808080', 
        borderRadius: 10,
      },

      boxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
      },

      image: {
        width: 150, 
        height: 150, 
        marginLeft:100,
        marginTop:-80,
        
      },

      safeButton:{
        backgroundColor: '#20D80D', 
        padding: 10, 
        borderRadius: 8, 
        width:300,
        height:75,
        marginLeft:30,
        marginTop:40,
        

      },

      safeButtonText:{
        color: '#FFFFFF', 
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30, 
      
       
      },


     


      assistanceButton:{
        backgroundColor: '#FF0000', 
        padding: 10, 
        borderRadius: 5, 
        width:300,
        height:75,
        marginLeft:30,
        marginRight:100,
        marginTop:40,
        marginBottom:40,
        
      
      },

      assistanceButtonText:{
        fontWeight: 'bold',
        color: '#FFFFFF', 
        textAlign: 'center',
        alignSelf:'center',
        fontWeight: 'bold',
        fontSize: 30, 
        
      
      },



      emergencyHedding:{
        color: '#FFFFFF', 
        fontSize: 25, 
        textAlign: 'center',
        fontWeight: 'bold',
        alignSelf:'center'
    },

   

    },
  );

export default UserAlertNotification;