import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class Login extends Component {
    constructor(props){
        super(props);
    }

    _signInHandler = async () => {
        await AsyncStorage.setItem('userToken', 'myToken');
        this.props.navigation.navigate('Home');
    }

    render(){
        return(
            <Text onPress={()=> this._signInHandler()}> Login</Text>
        );
    }

}
export default Login;