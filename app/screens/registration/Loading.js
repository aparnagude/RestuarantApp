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
        this.props.navigation.navigate(userToken ? 'Home' : 'IntialScreen');
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