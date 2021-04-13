/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import RootStackNavigator from './Screens/RootStackNavigator';

import HomeScreen from './Screens/HomeScreen';
import FeedbackScreen from './Screens/FeedbackScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PaymentScreen from './Screens/PaymentScreen';
import CategoryScreen from './Screens/CategoryScreen';
import CreatePollScreen from './Screens/CreatePollScreen';



import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './Components/context'

import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native'
import {DrawerNavigatorComponent} from './Components/DrawerNavigatorComponent';


Icon.loadFont();
const Drawer = createDrawerNavigator();

const App = () => {


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
    signIn: async(email, password) => {
      let userToken;
      userToken = null;
      await fetch('http://127.0.0.1:3000/api/v1/users/login', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email,
              password: password,
          })
        })
            .then ((response) => response.json())
            .then( (responseJson) => {
              try {
                // if login detail failed code doesnt go inside the try block and no errors shown either
                userToken = responseJson.token;
                AsyncStorage.setItem('userToken', userToken)
                dispatch({type: 'LOGIN', id: email, token: userToken})
  
              } catch (e) {
                console.log('error', e)
              }
            })
          .catch((error) => {
            console.log(error)
          });

    },
    signOut: async () => {
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
    }
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