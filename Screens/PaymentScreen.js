import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Footer, FooterTab} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderBar from './HeaderBar';

class PaymentScreen extends Component {


  render() {
    return (
      <Container>
        <HeaderBar nav={this.props.navigation}/>
        <View style={{ alignSelf: "center", marginTop: 50 }}>
          <View style={styles.profileImage}>
            <Image source={require("../images/esewa.png")} style={styles.image} resizeMode="center"></Image>
          </View>
          <TextInput
            placeholder="Your E-SEWA number"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Text style={styles.earningsText}>Total Earnings: Rs. 8000</Text>
        </View>
        <Button style={styles.requestPayment}>
              <Text style={[styles.textRequestPayment, {
                color: '#fff'
              }]}>Request Payment</Text>
        </Button>
      </Container>
    );
  }
}



export default PaymentScreen

const styles = StyleSheet.create({
  text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined,
  },

  profileImage: {
      width: 150,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  textInput: {
    borderBottomWidth: 1
},
earningsText: {
  marginTop: 20,
  textAlign: 'center'
},
requestPayment: {
  width: '70%',
  height: 50,
  justifyContent: 'center',
  alignSelf: 'center',
  borderRadius: 10,
  backgroundColor: '#009387',
  marginTop: 20
},
textRequestPayment: {
  fontSize: 18,
  fontWeight: 'bold'
}
 
});
