import { StyleSheet, Text, View, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import * as NavigationBar from 'expo-navigation-bar';
import * as Location from 'expo-location';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const Profile = ({ navigation, route }) => {
    const data = route.params.data;
    var token = data.token;

    const [Token, setToken] = useState(null);

    const [name, setName] = useState("Sally Robins");
    const [email, setEmail] = useState("sally@gmail.com");
    const [age, setAge] = useState(32);
    const [profile_picture, setProfile_picture] = useState('https://reactnative.dev/img/tiny_logo.png');
    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0
    });
    const [locationPermission, setLocationPermission] = useState(false);
    const [wantPermission, setWantPermission] = useState(0);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", token);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.apptask.thekaspertech.com/api/users/tokenIsValid", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                alert(result)
                setToken(token);
            })
            .catch(error => console.log('error', error));
    }, [])
    useEffect(() => {
        console.log(data)
    }, [data])


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-auth-token", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.apptask.thekaspertech.com/api/users/", requestOptions)
            .then(response => response.text())
            .then(result => {
                setName(JSON.parse(result).name);
                setEmail(JSON.parse(result).email);
                setAge(JSON.parse(result).age);
                setProfile_picture(JSON.parse(result).image_url);

            })
            .catch(error => console.log('error', error));
    }, [Token])

    useEffect(() => {
        getLocation();
    }
        , [wantPermission])

    useEffect(() => {

        if (origin.latitude != 0 && origin.longitude != 0) {
            var myHeaders = new Headers();
            myHeaders.append("x-auth-token", token);

            var raw = {
                "coordinates": {
                    "latitude": origin.latitude,
                    "longitude": origin.longitude
                }
            }

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.apptask.thekaspertech.com/api/users/addCoordinates", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    alert(result)
                })
                .catch(error => console.log('error', error));
        }

    }, [origin != null])


    const getLocation = async () => {
        if (locationPermission == false) {
            let { status } = await Location.requestForegroundPermissionsAsync();



            if (status !== 'granted') {
                setLocationPermission(false)
                alert("Location access denied");
                return;
            }
            else {
                setLocationPermission(true)
            }


            let location = await Location.getCurrentPositionAsync({});
            setOrigin({ latitude: location.coords.latitude, longitude: location.coords.longitude })
        }

    }


    NavigationBar.setBackgroundColorAsync('#ffffff00');

    return (
        <View style={styles.container}>

            <View style={styles.main}>
                <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />
                <ScrollView>
                    <View style={styles.topNav}>
                        <Text style={{ color: '#222', fontSize: 20, fontWeight: 'bold' }}>Profile</Text>

                    </View>
                    <Image
                        style={styles.porofileImg}
                        source={{
                            uri: profile_picture,
                        }}
                    />
                    <Text style={styles.name}> {name} </Text>
                    <Text style={styles.location}><Ionicons name="paper-plane-sharp" size={12} color="black" /> London, UK</Text>
                    <View style={styles.box}>
                        <View style={styles.innerBox}>
                            <View style={styles.boxLext}>
                                <Text style={{ color: '#444', fontSize: 17, fontWeight: 'bold', marginTop: 0, }}>{email}</Text>
                                <Text style={{ color: '#555', fontSize: 14, marginTop: 0, fontWeight: 500, }}>EMAIL</Text>
                            </View>
                            <View style={styles.boxRight}>
                                <Text style={{ color: '#222', fontSize: 19, fontWeight: 'bold', marginTop: 0 }}>{age}</Text>
                                <Text style={{ color: '#555', fontSize: 14, marginTop: 0, fontWeight: 500, }}>AGE</Text>
                            </View>

                        </View>

                    </View>
                    <Text style={{
                        color: '#222', fontSize: 14, fontWeight: 400, marginTop: 40, marginLeft: 30
                    }}>General Statistics</Text>


                    <View style={styles.statBoxes}>
                        <View style={styles.statBox}>
                            <View style={styles.statBoxLeft}>
                                <AntDesign name="checkcircle" size={24} color="black" />
                                <Text style={styles.statBoxText}>Place Visited</Text>
                            </View>

                            <View style={styles.statBoxRight}>
                                <Text style={styles.statBoxRightText}>5</Text>
                            </View>
                        </View>

                        <View style={styles.statBox}>
                            <View style={styles.statBoxLeft}>
                                <AntDesign name="clockcircle" size={24} color="black" />
                                <Text style={styles.statBoxText}>Hours Travelled</Text>
                            </View>

                            <View style={styles.statBoxRight}>
                                <Text style={styles.statBoxRightText}>18</Text>
                            </View>
                        </View>

                        <View style={styles.statBox}>
                            <View style={styles.statBoxLeft}>
                                <SimpleLineIcons name="badge" size={24} color="black" />
                                <Text style={styles.statBoxText}>Surveys Completed</Text>
                            </View>

                            <View style={styles.statBoxRight}>
                                <Text style={styles.statBoxRightText}>9</Text>
                            </View>
                        </View>





                    </View>
                </ScrollView>
            </View>




            <View style={styles.bottomNav} >
                <View style={styles.dot} />

                <View style={styles.plus}>
                    <AntDesign name="plus" size={30} color="#fff" />

                </View>

                <View style={styles.dot} />
            </View>
            {
                !locationPermission ?
                    <View style={styles.modal} >
                        <View style={styles.modalMain} >
                            <Text style={styles.redline}>Location Premission Required</Text>
                            <Text style={styles.modalText}>You need to allow the app to fetch your location to use Loco, otherwise you will be logged out!</Text>
                            <View style={styles.modalButtons} >
                                <TouchableOpacity style={styles.modalButtonLeft}
                                    onPress={async () => {
                                        setWantPermission(wantPermission + 1);

                                    }}
                                >
                                    <AntDesign name="setting" size={24} color="#fff" />
                                    <Text style={styles.modalButtonText}>Allow</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButtonRight}
                                    onPress={() => {
                                        navigation.replace('Login');
                                    }}
                                >
                                    <MaterialIcons name="logout" size={24} color="#fff" />
                                    <Text style={styles.modalButtonText}>Logout</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>

                    : ""

            }


        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomNav: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 25,
    },
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
        paddingBottom: 75,

    },
    topNav: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 25,
    },
    porofileImg: {
        width: 100,
        height: 100,
        backgroundColor: '#ddd',
        borderRadius: 50,
        marginTop: 20,
        alignSelf: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginTop: 10,
        alignSelf: 'center'
    },
    location: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#777',
        marginTop: 5,
        alignSelf: 'center'
    },
    box: {
        width: '80%',
        height: 100,
        backgroundColor: '#fff',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,

    },
    innerBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        elevation: 5,
        flexDirection: 'row',
        padding: 10,
    },
    boxLext: {
        width: '70%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
    },
    boxRight: {
        width: '30%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statBoxes: {
        width: '100%',
        height: 300,
        backgroundColor: '#eee',
        marginTop: 10,

    },
    statBox: {
        width: '80%',
        height: 60,
        backgroundColor: '#fff',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,

    },
    statBoxLeft: {
        width: '70%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    statBoxRight: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: '#888',
        borderWidth: 2,
        textAlign: 'center',
    },
    statBoxText: {
        color: '#555', fontSize: 16, fontWeight: 'bold', marginTop: 0, marginLeft: 10
    },
    statBoxRightText: {
        color: '#222',
        fontSize: 16,

    },
    dot: {
        width: 25,
        height: 25,
        backgroundColor: '#222',
        borderRadius: 50,
    },
    plus: {
        width: 60,
        height: 60,
        backgroundColor: 'rgb(221, 135, 22)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.85)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 100,
    },
    modalMain: {
        width: '90%',
        height: '200',
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        elevation: 25,
    },
    redline: {
        color: 'rgb(255, 45, .85)',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalText: {
        color: '#999',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtons: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    modalButtonLeft: {
        width: 100,
        height: 40,
        backgroundColor: '#DD8715',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalButtonRight: {
        width: 100,
        height: 40,
        backgroundColor: '#D00123',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalButtonText: {
        color: '#eee',
        fontSize: 13,
        fontWeight: 'bold',
    }



})