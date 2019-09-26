import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class SignUp extends Component {
    constructor(props){
        super(props);
    }

    _bootstrap = async () => {
     

        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    render(){
        return(
            <Text onPress={()=>this._bootstrap()}>Home</Text>
        );
    }

}
export default SignUp;