import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Footer, Left, Body, Right, Button, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { AuthContext} from '../Components/context';

const SignUpScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password:'',
    comfirm_password:'',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const { signUp } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    })
  }

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val
    })
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    })
  }
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle='light-content' />
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <Icon name="user" size={24} color="#05375a" />
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
              />
              {data.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
                >
                  <Icon name="check-circle" size={24} color="green" />
                </Animatable.View>

              : null}
            </View>

            <Text style={[styles.text_footer, {
              marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
              <Icon name="lock" size={24} color="#05375a" />
              <TextInput
                placeholder="Your Password"
                secureTextEntry={data.secureTextEntry ? true: false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress = {updateSecureTextEntry}>
                {data.secureTextEntry ?
                <Icon name="eye-slash" size={24} color="grey" /> 
                :
                <Icon name="eye" size={24} color="grey" /> }
              </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
              marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
              <Icon name="lock" size={24} color="#05375a" />
              <TextInput
                placeholder="Confirm Your Password"
                secureTextEntry={data.confirm_secureTextEntry ? true: false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleConfirmPasswordChange(val)}
              />
              <TouchableOpacity onPress = {updateConfirmSecureTextEntry}>
                {data.confirm_secureTextEntry ?
                <Icon name="eye-slash" size={24} color="grey" /> 
                :
                <Icon name="eye" size={24} color="grey" /> }
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <Button onPress={()=> {signUp()}}  style={styles.signIn}>
                  <Text style={[styles.textSign, {
                    color: '#fff'
                  }]}>Sign Up</Text>
                </Button>
                <Button bordered
                  onPress={() => navigation.navigate('SignInScreen')}
                  style={[styles.signUp, {
                    borderColor: '#009387',
                    borderWidth: 1,
                    marginTop: 15
                  }]}>
                    <Text style={[styles.textSign, {
                      color: '#009387'
                    }]}>Sign In</Text>
                  </Button>

            </View>
        </Animatable.View>
      </Container>
    );
}

export default SignUpScreen;

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
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#009387'
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
},
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});