import React, {Component} from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import { widths } from '../../design/dimen';


class IntialScreen extends Component {
    constructor(props){
        super(props);
    }

    _signInHandler = async () => {
        await AsyncStorage.setItem('userToken', 'myToken');
        this.props.navigation.navigate('Home');
    }

    render(){
        return(
            <View style={styles.MainContainer}>
                <View style={styles.Background}>
                    <Image source={require('./../../assets/main_background.jpg')} resizeMode='contain' style={styles.ImageBackground}></Image>
                    <View style={styles.CircleImage}>
                       <Image source={require('./../../assets/fork.png')} resizeMode='contain' style={styles.logoImage}></Image>
                   </View>
                </View>
                <View style={styles.SecondContainer}>
                    <Text>Welcome to Foodie</Text>
                    <TouchableOpacity style={styles.SignUpButton}>
                        <Text>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
               

            </View>
        );
    }

}
export default IntialScreen;

const styles=StyleSheet.create({
    MainContainer:{
        flex:1,
        backgroundColor:color.white
    },
    Background: {
        width:'100%',
        height:250,
    },
    ImageBackground: {
        width:'100%',
        height:250,
        opacity: 2,
      
 },
 CircleImage: {
     backgroundColor:color.primaryColor,
     width:widths.by3p5,
     height:widths.by3p5,
     borderRadius:widths.by3p5,
     position:'absolute',
     bottom:-40,
     alignSelf:'center'
 },

 logoImage:{
 width:widths.by5,
     height:widths.by5,
     alignSelf:'center',
     tintColor:color.white,
     justifyContent:'center',
     marginVertical:15,
    
 },
 SignUpButton:{
     backgroundColor:color.primaryColor,
     borderRadius:5,
     alignSelf:'center',
     width:'100%',
     marginVertical:10,
     marginHorizontal:10
 },
 SecondContainer: {
     flex:1,
     marginTop:20,
     marginHorizontal:10,
     marginVertical:20,
     position:'relative',
     
 }

})