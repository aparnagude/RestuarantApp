import React from 'react'
import { View, StatusBar, ActivityIndicator,  StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class Loading extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrap();
    }

    _bootstrap = async () => {
     

        const userToken = await AsyncStorage.getItem('userToken');
        const user = await AsyncStorage.getItem('user');
  const userdet=JSON.parse(user);
  if(user==null){
    this.props.navigation.navigate(userToken ? 'Home' : 'Login');
  }
  else{
    if(userdet.userType=='kitchen'){
        this.props.navigation.navigate(userToken ? 'KitchenOrders' : 'Login');
      }
      else{
        this.props.navigation.navigate(userToken ? 'Home' : 'Login');
      }
  }

       
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});