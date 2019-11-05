import React, {Component} from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image,ScrollView,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import { widths } from '../../design/dimen';
import string from '../../design/strings';
import baseStyle from '../../design/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class IntialScreen extends Component {
    constructor(props){
        super(props);
    }

    _signInHandler = async () => {
        await AsyncStorage.setItem('userToken', 'myToken');
        this.props.navigation.navigate('Home');
    }


    gotoScreen(screen){
        if(screen=='SignUp'){
            this.props.navigation.navigate('SignUp');
        }
      else if(screen=='Login'){
            this.props.navigation.navigate('Login');
        }

    }

    render(){
        return(
            <View style={baseStyle.MainContainer}>
                     <StatusBar translucent backgroundColor={'transparent'} barStyle="default" />

                <ScrollView>
                <View style={baseStyle.Background}>
                    <Image source={require('./../../assets/main_background.jpg')} resizeMode='cover' style={baseStyle.ImageBackground}></Image>
                    <View style={baseStyle.overlay} />

                    <View style={baseStyle.CircleImage}>
                       <Image source={require('./../../assets/fork.png')} resizeMode='contain' style={baseStyle.logoImage}></Image>
                   </View>
                </View>
                <View style={styles.SecondContainer}>
                    <Text style={baseStyle.text}>Welcome to Foodie</Text>
                    <Text style={styles.desc}>{string.desc}</Text>

                    <TouchableOpacity style={baseStyle.SignUpButton} onPress={()=>this.gotoScreen('SignUp')}>
                        <Text style={baseStyle.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                    <Text style={baseStyle.smallText}>or signup using</Text>
                    <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.FaceBookButton}>
                    <Icon name='facebook' size={25} color={color.white} style={{marginHorizontal:5}}/>

                        <Text style={baseStyle.buttonText}>FACEBOOK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.GoogleButton}>
                        <Icon name='google-plus' size={25} color={color.white} style={{marginHorizontal:5}}/>
                        <Text style={baseStyle.buttonText}>GOOGLE</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Text style={[baseStyle.smallText,{color:color.black}]}>Already have an account?</Text>
                    <Text style={[baseStyle.buttonText,{color:color.primaryColor}]} onPress={()=>this.gotoScreen('Login')}>LOGIN</Text>

                    </View>


                </View>
                </ScrollView>

            </View>
        );
    }

}
export default IntialScreen;

const styles=StyleSheet.create({
    
 SecondContainer: {
     flex:1,
     width:'100%',
     marginTop:60,
     marginHorizontal:10,
     position:'relative',
     alignSelf:'center'
     
 },
 
 desc:{
    alignSelf:'center',
    fontFamily:string.fontLatoMed,
    fontSize:14,
    color:color.textlight,
    marginHorizontal:15,
    marginVertical:10
 },

 rowContainer:{
     flexDirection:'row',
     justifyContent:'space-between',
     width:'100%'
 },
 FaceBookButton:{
     flexDirection:'row',
    backgroundColor:color.fbcolor,
    borderRadius:5,
    alignSelf:'center',
    marginVertical:15,
 marginLeft:20,
    padding:10,
    width:'40%'

},
GoogleButton:{
    flexDirection:'row',

    backgroundColor:color.gcolor,
    borderRadius:5,
    alignSelf:'center',
    marginVertical:15,
  marginRight:20,
    padding:10,
    width:'40%'

},


})