import React, {Component} from 'react';

import {View, Text,StyleSheet,TouchableOpacity,Image,ScrollView,StatusBar,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import { widths } from '../../design/dimen';
import string from '../../design/strings';
import baseStyle from '../../design/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import serverConfig from '../../config/serverConfig';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            mobile:'',
          
            password:'',
          
            
        }
    }

    // _signInHandler = async () => {
    //     await AsyncStorage.setItem('userToken', 'myToken');
    //     this.props.navigation.navigate('Home');
    // }


    
    loginHandler = ()  => {
		let formData = { "mobileNumber": this.state.mobile,"pin": this.state.password}
        
          
            var url = serverConfig.baseUrl+'api/auth/login';
           
            console.warn("url: "+url);
            console.warn("formData: "+JSON.stringify(formData));
        
            _this = this;
           
            fetch(url, {
              method: 'POST',
               body: JSON.stringify(formData),
               headers:{
               'Content-Type': 'application/json'
               }
             }).then( function(response) {
             
              if (response.status == 200) {
                console.warn('headers',response.headers['map'].authorization);
                 AsyncStorage.setItem('userToken', 'myToken');
                 AsyncStorage.setItem('auth', response.headers['map'].authorization);

                 _this.props.navigation.navigate('Home');
                //   _this.props.navigation.navigate('Home');
                if(Platform.OS==='android'){
                  ToastAndroid.show("Login successfull",  ToastAndroid.LONG);
                  response.json().then(function(data) {
                    console.warn(data);
                    var profile = data['tokenPk']['user'];
                    console.warn(profile);
                    AsyncStorage.setItem('user',profile);
                  });
                  }
                  else{
                    alert('Login successfull')
                  }
              
               
              } else {
                response.json().then(function(data) {
                if(Platform.OS === 'android'){
                  ToastAndroid.show(data.message+"---"+JSON.stringify(data),  ToastAndroid.LONG);
                } else {
                  alert(data.message)
                }
              });
               }
               console.warn("response: "+JSON.stringify(response));
              // Examine the text in the response
             
            })
             .catch((error) => {
                 console.warn('Error:', error);
                  
                });
         
                 
                 }


    async   gotoScreen(screen){
        if(screen=='SignUp'){
            this.props.navigation.navigate('SignUp');
        }
        if(screen=='Home'){
            await AsyncStorage.setItem('userToken', 'myToken');

            this.props.navigation.navigate('Home');
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
          label='MOBILE NUMBER'
          value={this.state.mobile}
          onChangeText={(text)=>this.setState({mobile:text})}
          keyboardType={'numeric'}
          maxLength={10}
          secureTextEntry={false}
        
        />
      
        <FloatingLabelInput
          label='PASSWORD'
          value={this.state.password}
          onChangeText={(text)=>this.setState({password:text})}
        
        
          secureTextEntry={true}
          
        />
          
           <TouchableOpacity style={baseStyle.SignUpButton} onPress={()=>this.loginHandler()}>
               <Text style={baseStyle.buttonText}>LOGIN</Text>
           </TouchableOpacity>
          
           <View style={{flexDirection:'row',alignSelf:'center'}}>
           <Text style={[baseStyle.smallText,{color:color.black}]}>Don't have an account?</Text>
           <Text style={[baseStyle.buttonText,{color:color.primaryColor}]} onPress={()=>this.gotoScreen('SignUp')}>SIGN UP</Text>

           </View>


       </View>
       </ScrollView>

   </View>
        );
    }

}
export default Login;


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