import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { Container, Header, Footer, FooterTab, Left, Body, Right, Button, Title, Content, Textarea, Form} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { Rating, AirbnbRating } from 'react-native-ratings';

const FeedbackScreen = ({navigation}) => {
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor: '#009387', borderBottomWidth: 0}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="angle-left" size={24} color="#cc5500" />
              <Text>  Go Back</Text>
            </Button>
          </Left>
        </Header>
        <View style={styles.header}>
          <Animatable.View animation="fadeInDown">
            <AirbnbRating
              count={5}
              reviews={["Terrible..", "It's alright.",  "Good!",  "Love it!!", "Wow!!!"]}
              defaultRating={4}
              size={40}
            />
          </Animatable.View>

        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.title}>Any feedbacks??</Text>
            <Text style={styles.text}>Please feel free to write down below...</Text>
              <Form>
                <Textarea rowSpan={10} bordered />
              </Form>
            <View style={styles.button}>
                <Button iconRight rounded onPress={()=>navigation.goBack()} style={styles.submit}>
                <Text>Submit</Text>
                <Icon name='check' />
                </Button>
            </View>
        </Animatable.View>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>© Liveasily 2021</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}


export default FeedbackScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
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
        alignSelf: 'center',
        marginTop: 30
    },
    submit: {
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
