import React, {Component} from 'react';
import {View, Text,StatusBar,ScrollView,TouchableOpacity,Image,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import string from '../../design/strings';
import window, { heights, widths } from '../../design/dimen';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Profile extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
            <View style={styles.MainContainer}>
                <StatusBar backgroundColor={color.primary} barStyle="default"/>
                <View style={{backgroundColor:color.primary,width:'100%',height:250,justifyContent:'center'}}>
                  <TouchableOpacity style={styles.avatar}>
                      <Image source={require('../../assets/noPhoto.png')} style={{alignSelf:'center',width: widths.by6,
        height: widths.by6,}}/>
                  </TouchableOpacity>
                  <Text style={styles.name}>Mani Kumar</Text>
                  <Text style={styles.mobile}>1234567890</Text>

                  <Text style={styles.email}>mani@gmail.com</Text>
<Icon name='mode-edit' size={30} color={color.white} style={{alignSelf:'flex-end',justifyContent:'flex-end',marginRight:10,}}/>

                </View>
                <View style={styles.cardContainer}>
               <View style={{backgroundColor:color.white,flexGrow:2,padding:10,}}>
                <Text style={styles.headingText}>My Address</Text>
                <Text style={styles.smallText}>D.No:65-16-19,Dwaraka Nagar,Gowri shankar street Hyderabad</Text>
                </View>
                </View>
                <View style={styles.cardContainer}>
               <View style={{backgroundColor:color.white,flexGrow:2,padding:10,}}>
                <Text style={styles.headingText}>My Address</Text>
                <Text style={styles.smallText}>D.No:65-16-19,Dwaraka Nagar,Gowri shankar street Hyderabad</Text>
                </View>
                </View>
            
            </View>
        );
    }

}
export default Profile;

const styles=StyleSheet.create({
    MainContainer:{
        flex:1,
        backgroundColor:'#E7E7E7'
    },
    avatar: {
        alignSelf: 'center',
        width: widths.by4,
        height: widths.by4,
        borderRadius: widths.by5,
        backgroundColor:color.white,
        justifyContent:'center',
       
        
      
      },
      name:{
          fontFamily:string.fontLatoMed,
          color:color.white,
          alignSelf:'center',
          fontSize:18,
          marginTop:10
        },
        mobile:{
            fontFamily:string.fontLatoMed,
            color:color.white,
            alignSelf:'center',
            fontSize:14,
            marginVertical:5
        },
        email:{
            fontFamily:string.fontLatoMed,
            color:color.white,
            alignSelf:'center',
            fontSize:14,
           
           
        },
        cardContainer:{
            marginHorizontal:5,
            marginVertical:10,
            elevation:3,
            borderRadius:5,
            overflow:"hidden"
        },
        headingText:{
            fontFamily:string.fontLatoMed,
            color:color.black,
            alignSelf:'flex-start',
            fontSize:18,
            marginTop:10,
            marginHorizontal:10
        },
        smallText:{
            fontFamily:string.fontLatoMed,
            color:color.primary,
            alignSelf:'flex-start',
            fontSize:14,
            marginTop:10,
            marginHorizontal:10,
            marginBottom:10
        }

})