import React, {Component} from 'react';

import {View, Text,StyleSheet,TouchableOpacity,Image,ScrollView,StatusBar,ToastAndroid,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import { widths } from '../../design/dimen';
import string from '../../design/strings';
import baseStyle from '../../design/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import serverConfig from '../../config/serverConfig';
import Message from '../../components/Message'
class Login extends Component {
    constructor(props){
        super(props);
        Obj = new Message();
        this.state={
            mobile:'',
          
            password:'',
            loading:false,
          
            
        }
    }
        
    isValid() {
      const { email, pswd } = this.state;
      let valid = false;
      let reg = /^(\+\d{1,3}[- ]?)?\d{10}$/ ;
      let pinreg= /^(\+\d{1,3}[- ]?)?\d{4}$/;
      let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  
      
      
      
     
      if(this.state.mobile === "" || this.state.mobile === null) {
          Obj.displayAlert('Enter mobile number');
  
      }
     else if(this.state.password === "" || this.state.password === null) {
        Obj.displayAlert('Enter password');

    }
     
      else {
      valid = true;
      }
      
      
      return valid;
      }
  
  

    
    loginHandler = ()  => {
      if(this.isValid()){
        this.setState({loading:true});

     
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
              _this.setState({loading:false});
              if (response.status == 200) {
                console.warn('headers',response.headers['map'].authorization);
                 AsyncStorage.setItem('userToken', 'myToken');
                 AsyncStorage.setItem('auth', response.headers['map'].authorization);

                 _this.props.navigation.navigate('Home');
                 Obj.displayAlert('Login successfull');
                 response.json().then(function(data) {
                  console.warn(data);
                  var profile = data['tokenPk']['user'];
                  console.warn(profile);
                  AsyncStorage.setItem('user',profile);
                });
              
               
              
               
              } else {
                response.json().then(function(data) {
                  Obj.displayAlert(data.message);
               
              });
               }
               console.warn("response: "+JSON.stringify(response));
              // Examine the text in the response
             
            })
             .catch((error) => {
                 console.warn('Error:', error);
                 _this.setState({loading:true});
                  
                });
              }
                 
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
         {
          this.state.loading?
          <View style={baseStyle.loadingStyle}>
          <ActivityIndicator color='#fff' size='large' style={{justifyContent:'center', alignItems:'center', alignSelf:'center'}}/> 
          </View>
          :
          
           <TouchableOpacity style={baseStyle.SignUpButton} onPress={()=>this.loginHandler()}>
               <Text style={baseStyle.buttonText}>LOGIN</Text>
           </TouchableOpacity>
         }
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