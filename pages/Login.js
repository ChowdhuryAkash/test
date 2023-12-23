import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    console.log(email, password);


    const submitForm = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("email", email);
        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.apptask.thekaspertech.com/api/users/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                
                console.log(result)
                if(result.includes("error")) {
                alert(result);
                }
                
                else{
                    alert("Login successful");
                    navigation.navigate("Profile", {data:JSON.parse(result)})
                }
            }
            )
            .catch(error => console.log('error', error));

    }

    NavigationBar.setBackgroundColorAsync('#ffffff00');
    return (
        <ScrollView>
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />
            <View style={styles.topBanner}>
                <Image style={styles.topBannerImage} source={{ uri: 'https://images.unsplash.com/photo-1682687220509-61b8a906ca19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwxfHxUcmF2ZWx8ZW58MXx8fHwxNzAyNTQ4MjgzfDA&ixlib=rb-4.0.3&q=80&w=1080' }} />

            </View>
            <View style={styles.bottom}>
                <View style={styles.drawerLine} />


                <View style={styles.bottomContent}>

                    <View style={styles.headingBox}>
                        <Text style={{ color: '#333', fontSize: 30, fontWeight: 'bold', marginTop: 0 }}>Login</Text>
                        <FontAwesome name="user" size={24} color="black" style={styles.manIcon} />

                    </View>




                    <TextInput style={styles.input} placeholder='Email'
                        onChange={(e) => {
                            setEmail(e.nativeEvent.text)
                        }
                        } />
                    <TextInput style={styles.input} placeholder='Password'
                        onChange={(e) => {
                            setPassword(e.nativeEvent.text)
                        }
                        } />

                    <TouchableOpacity onPress={() => {
                        submitForm();
                    }}>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#dd8716ff', marginTop: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
                        </View>
                    </TouchableOpacity>



                </View>


            </View>

        </View>
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    topBanner: {
        width: '100%',
        height: 300,
        backgroundColor: '#000'
    },
    topBannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    bottom: {
        width: '100%',
        height: '110%',
        backgroundColor: '#fff',
        marginTop: -50,
        borderRadius: 30,
    },
    drawerLine: {
        width: 50,
        height: 5,
        backgroundColor: '#aaa',
        borderRadius: 50,
        marginTop: 10,
        marginLeft: 20,
        alignSelf: 'center'
    },
    bottomContent: {
        width: '90%',
        height: '100%',
        marginTop: 10,
        alignSelf: 'center',

    },
    headingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,

    },
    manIcon: {
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        width: 50,
        height: 50,
        textAlign: 'center',
    },

    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 20,
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
    }


})