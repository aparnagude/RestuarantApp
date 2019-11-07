import React, { Component } from 'react';
import {ToastAndroid,Platform } from 'react-native';
export default class Message extends Component {
    
displayAlert(msg){
    if(Platform.OS==='android'){
      ToastAndroid.show(msg,  ToastAndroid.LONG);
  
    }
    else{
      alert(msg);
    }
  }
}