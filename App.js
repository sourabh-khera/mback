

import React, {Component} from 'react';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Fonts } from './src/utils/Fonts';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Icons from './Icons';
import Allmessage from './Allmessage';
import Sendmessage from './Sendmessage';
import Replymessage from './Replymessage';
import Filescreen from './Filescreen';

import Charts from './Charts';
import Cardpage from './Cardpage';
import { createSwitchNavigator,createAppContainer,createDrawerNavigator,createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

global.api_url = 'http://13.232.30.205/merpapi/api.php';

const RootStack = createSwitchNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    Profile : { screen: Profile },
    Icons : { screen: Icons} ,
    Allmessage : { screen : Allmessage },
    Sendmessage : { screen : Sendmessage },
    Replymessage : { screen : Replymessage },
    Filescreen : { screen : Filescreen },
    Charts : { screen : Charts },
    Cardpage : { screen : Cardpage },
  },
  {
    initialRouteName: 'Login'
  }

);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentDidMount(){
    PushNotification.configure({
      onNotification: notification => {

        if(Platform.OS === 'ios' && notification.foreground){
          alert(notification.message);
        } else if(Platform.OS === 'android' && notification.foreground) {
           alert(notification.default);
        } else if(Platform.OS === 'android') {
            PushNotification.localNotification({
                vibrate: true, // (optional) default: true
                priority: "high", // (optional) set notification priority, default: high
                importance: "high", // (optional) set notification importance, default: high
                title: "Push Notification", // (optional)
                message: notification.default, // (required)
                playSound: true, // (optional) default: true
            })
        }
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "648415038260",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
     });
     
  }
  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: Fonts.Arimo
    
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
