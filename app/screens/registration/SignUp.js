import React, {Component} from 'react';

import {View, Text,StyleSheet,TouchableOpacity,Image,ScrollView,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import { widths } from '../../design/dimen';
import string from '../../design/strings';
import baseStyle from '../../design/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingLabelInput from '../../components/FloatingLabelInput';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            mobile:'',
            name:'',
            restuarantName:'',
            password:'',
            email:'',
            
        }
    }
  
    _bootstrap = async () => {
     

        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    
    gotoScreen(screen){
        if(screen=='Login'){
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

      

<FloatingLabelInput
          label='NAME'
          value={this.state.name}
          onChangeText={(text)=>this.setState({name:text})}
         
       
          
        /> 
        <FloatingLabelInput
          label='MOBILE NUMBER'
          value={this.state.mobile}
          onChangeText={(text)=>this.setState({mobile:text})}
          keyboardType={'numeric'}
          maxLength={10}
          secureTextEntry={false}
        
        />
        <FloatingLabelInput
          label='EMAIL'
          value={this.state.email}
          onChangeText={(text)=>this.setState({email:text})}
        
        />
        <FloatingLabelInput
          label='RESTUARANT NAME'
          value={this.state.restuarantName}
          onChangeText={(text)=>this.setState({restuarantName:text})}
         
        />
        <FloatingLabelInput
          label='PASSWORD'
          value={this.state.password}
          onChangeText={(text)=>this.setState({password:text})}
        
        
          secureTextEntry={true}
          
        />
          
           <TouchableOpacity style={baseStyle.SignUpButton}>
               <Text style={baseStyle.buttonText}>SIGN UP</Text>
           </TouchableOpacity>
          
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
export default SignUp;


const styles=StyleSheet.create({
    
    SecondContainer: {
        flex:1,
        width:'100%',
        marginTop:50,
        marginHorizontal:10,
        position:'relative',
        alignSelf:'center',
        marginBottom:20
        
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

   
   
   })