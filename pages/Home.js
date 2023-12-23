import { StyleSheet, Text, View, Image, TouchableOpacity,StatusBar } from 'react-native'
import React from 'react'
import * as NavigationBar from 'expo-navigation-bar';

const Home = ({ navigation }) => {
    
    NavigationBar.setBackgroundColorAsync('#ffffff00');


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />
            <Text style={styles.heading}>Loco</Text>
            <Text style={styles.subheading}>Track your location in real-time with Loco.</Text>


            <View style={styles.banner}>
                <Image
                    style={styles.bannerImage}
                    source={{
                        uri: 'https://assets.api.uizard.io/api/cdn/stream/327ec1c2-efd2-4ea8-9f10-b113765d193f.png',
                    }}
                />
            </View>

            <TouchableOpacity onPress={()=>{
                navigation.navigate("Signup")
            }}>
                <View style={styles.signupbtn}>
                    <Text style={styles.signupbtntext}>Sign Up</Text>
                </View>
            </TouchableOpacity>
            <View>
            <TouchableOpacity onPress={()=>{
                navigation.navigate("Login")
            }}><Text style={{ marginTop: 20, color: '#777' }}>Already have an account? <Text style={{ color: '#000' }}>Log In</Text></Text></TouchableOpacity>
            </View>



        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent:'center'
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#dd8716ff',
        marginTop: 100,
    },
    subheading: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
        textAlign: 'center'
    },
    banner: {
        width: 300,
        height: 300,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
    },
    signupbtn: {
        backgroundColor: '#dd8716ff',
        width: 300,
        height: 60,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    signupbtntext: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }


})