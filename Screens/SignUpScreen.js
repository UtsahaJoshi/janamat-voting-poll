import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Footer, Left, Body, Right, Button, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { AuthContext} from '../Components/context';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = (props) => {
  const navigation = useNavigation();
  const [data, setData] = React.useState({
    name: '',
    email: '',
    password:'',
    comfirm_password:'',
    check_textEmailInputChange: false,
    check_textNameInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidName: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true
  });

  const { signUp } = React.useContext(AuthContext);

  const textEmailInputChange = (val) => {
    if (val.includes('@')) {
      setData({
        ...data,
        email: val,
        check_textEmailInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textEmailInputChange: false,
        isValidEmail: false,
      });
    }
  }

  const textNameInputChange = (val) => {
    if (val.length >= 4) {
      setData({
        ...data,
        name: val,
        check_textNameInputChange: true,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textNameInputChange: false,
        isValidName: false,
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      })
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      })
    }
  }

  const handleConfirmPasswordChange = (val) => {
    if (val == data.password) {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: true
      })
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false
      })
    }
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

  const signUpHandle = async () => {
    let userToken;
    userToken = null;
    await fetch('http://127.0.0.1:3000/api/v1/users/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          passwordConfirm: data.confirm_password,
        })
      })
          .then ((response) => response.json())
          .then( (responseJson) => {
            try {
              // if login detail failed code doesnt go inside the try block and no errors shown either
              userToken = responseJson.token;
              console.log(responseJson)
              signUp(userToken, data.email)

            } catch (e) {
              console.log('error', e)
            }
          })
        .catch((error) => {
          console.log(error)
        });
  }
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle='light-content' />
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
              <Icon name="user" size={24} color="#05375a" />
              <TextInput
                placeholder="Your Name"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textNameInputChange(val)}
              />
              {data.check_textNameInputChange ?
              <Animatable.View
                animation="bounceIn"
                >
                  <Icon name="check-circle" size={24} color="green" />
                </Animatable.View>

              : null}
            </View>
            {data.isValidName ? null :
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>Must be longer than 4 characters.</Text>
              </Animatable.View>
            }
            <Text style={styles.text_footer, {
              marginTop: 35
            }}>Email</Text>
            <View style={styles.action}>
              <Icon name="envelope" size={24} color="#05375a" />
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textEmailInputChange(val)}
              />
              {data.check_textEmailInputChange ?
              <Animatable.View
                animation="bounceIn"
                >
                  <Icon name="check-circle" size={24} color="green" />
                </Animatable.View>

              : null}
            </View>
            {data.isValidEmail ? null :
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>Must be a valid email.</Text>
              </Animatable.View>
            }
            
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
            {data.isValidPassword ? null : 
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
              </Animatable.View>
            }
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
            {data.isValidConfirmPassword ? null : 
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>Passwords do not match.</Text>
              </Animatable.View>
            }
            <View style={styles.button}>
                <Button onPress={()=> {signUpHandle()}}  style={styles.signIn}>
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