/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

import { Container, Header, Left, Body, Right, Button} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


import RootStackNavigator from './Screens/RootStackNavigator';

import HomeScreen from './Screens/HomeScreen';
import FeedbackScreen from './Screens/FeedbackScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PaymentScreen from './Screens/PaymentScreen';
import CategoryScreen from './Screens/CategoryScreen';
import CreatePollScreen from './Screens/CreatePollScreen';

import vote from './images/vote.png';
import grey from './images/green.jpeg';




import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './Components/context'

import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native'
import {DrawerNavigatorComponent} from './Components/DrawerNavigatorComponent';



Icon.loadFont();
const Drawer = createDrawerNavigator();
const App = () => {


  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(Token, userEmail) => {
      let userToken;
      userToken = Token;
      await AsyncStorage.setItem('userToken', userToken)
      dispatch({type: 'LOGIN', id: userEmail, token: userToken})
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false)
      try {
        userToken = await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e)
      }
      dispatch({type: 'LOGOUT'})
    },
    signUp: async (Token, userEmail) => {
      let userToken;
      userToken = Token;
      await AsyncStorage.setItem('userToken', userToken)
      dispatch({type: 'REGISTER', id: userEmail, token: userToken})
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken =  null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e){
        console.log(e)
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
    },  1000);
  }, []);

  if ( loginState.isLoading ) {
    return(
      <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerNavigatorComponent {...props} /> } >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Create" component={CreatePollScreen} />
            <Drawer.Screen name="Category" component={CategoryScreen} />
            <Drawer.Screen name="Payment" component={PaymentScreen} />
            <Drawer.Screen name="Feedback" component={FeedbackScreen} />
          </Drawer.Navigator>
        )
      :
      <RootStackNavigator />
      }
      </NavigationContainer>
    </AuthContext.Provider>


  )
}


export default App;