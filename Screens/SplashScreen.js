import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { Container, Header, Footer, Left, Body, Right, Button, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
const SplashScreen = ({navigation}) => {
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
            <Animatable.Image 
                animation='bounceIn'
                source={require('../images/vote.png')} 
                style={styles.logo} 
                resizeMode='contain' 
            />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.title}>A voting poll application for Nepal.</Text>
            <Text style={styles.text}>Start now. Your opinion matters!</Text>
            <View style={styles.button}>
                <Button iconRight rounded onPress={()=>navigation.navigate('SignInScreen')} style={styles.signIn}>
                <Text>START NOW </Text>
                <Icon name='play' />
                </Button>
            </View>
        </Animatable.View>
      </Container>
    );
}
export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        backgroundColor: '#009385'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})
