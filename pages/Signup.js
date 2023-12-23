import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar';
import * as ImagePicker from 'expo-image-picker';
const Signup = ({ navigation }) => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [age, setAge] = useState(null);
    const [image, setImage] = useState({
        uri:"https://assets.api.uizard.io/api/cdn/stream/50b522a2-abaf-4c5a-a095-504d36d63465.png"
    });

    console.log(name, email, password, age);


    useEffect(() => {
        console.log(image)
    }
        , [image])



    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            quality: 1,
            // allowsMultipleSelection:true,
        }).catch(error => console.log(error));
        setImage(result.assets[0]);
    };



    const submitForm = async () => {
        const fileName = image.uri.split('/').pop();
        const fileDetail = await fetch(image.uri)
        // console.log(response)

        // const blob = response.blob()
        // console.log(blob)


        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("age", age);
        formdata.append('profile_picture', {
            uri: image.uri,
            type: 'image/jpg',
            name: 'image.jpg',
        });

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://api.apptask.thekaspertech.com/api/users/register", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("result", result)
                if (result.includes("error")) {
                    alert(result);
                }

                else {
                    alert("Registered successfully!")
                    navigation.navigate("Login")
                }
            })
            .catch(error => console.log('error', error));


    }






    NavigationBar.setBackgroundColorAsync('#ffffff00');
    return (
        <ScrollView>
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />
            <View style={styles.topBanner}>
                <Image style={styles.topBannerImage} source={{ uri: `https://images.unsplash.com/photo-1682687220509-61b8a906ca19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MXwxfHNlYXJjaHwxfHxUcmF2ZWx8ZW58MXx8fHwxNzAyNTQ4MjgzfDA&ixlib=rb-4.0.3&q=80&w=1080` }} />

            </View>
            <View style={styles.bottom}>
                <View style={styles.drawerLine} />
               


                <View style={styles.bottomContent}>
                    <Text style={{ color: '#333', fontSize: 30, fontWeight: 'bold', marginTop: 0 }}>Signup</Text>
                    <View style={styles.photoSection}>
                        <Image style={{ width: 80, height: 80, borderRadius: 50, backgroundColor: '#ddd' }} source={{ uri: image.uri }} />
                        <View style={styles.photoRight}>
                            <Text style={{ color: '#333', fontSize: 18, marginTop: 10 }}>Profile Picture</Text>
                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={{ color: '#444', fontSize: 15, fontWeight: 'bold', marginTop: 0 }}
                                    onPress={() => {
                                        pickImageAsync()

                                    }}
                                    >Take Picture</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button}
                                    onPress={() => {
                                        pickImageAsync()

                                    }}
                                >
                                    <Text style={{ color: '#444', fontSize: 15, fontWeight: 'bold', marginTop: 0 }}>Upload</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>


                    <TextInput style={styles.input} placeholder='Name'
                        onChange={(e) => {
                            setName(e.nativeEvent.text)
                        }
                        }
                    />
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
                    <TextInput style={styles.input} placeholder='Age'
                        onChange={(e) => {
                            setAge(e.nativeEvent.text)
                        }
                        } />

                    <TouchableOpacity onPress={() => {
                        submitForm();

                    }}>
                        <View style={{ width: '100%', height: 50, backgroundColor: '#dd8716ff', marginTop: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Create Account</Text>
                        </View>
                    </TouchableOpacity>



                </View>
                


            </View>

        </View>
        </ScrollView>
    )
}

export default Signup

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
    photoSection: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    photoRight: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        marginTop: 0,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    buttons: {
        width: '100%',
        height: 50,
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: 110,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.08)',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

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