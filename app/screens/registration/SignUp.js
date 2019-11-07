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

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            mobile:'',
            name:'',
            restuarantName:'',
            password:'',
            email:'',
            cnfrmpswd:'',
            loading:false,
            
        }
    }
  
    _bootstrap = async () => {
     

        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }



    isValid() {
      const { email, pswd } = this.state;
      let valid = false;
      let reg = /^(\+\d{1,3}[- ]?)?\d{10}$/ ;
      let pinreg= /^(\+\d{1,3}[- ]?)?\d{4}$/;
      let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  
      
      
      if(this.state.name === "" || this.state.name === null) {
        Obj.displayAlert('Enter name');

    }
   else if(this.state.mobile === "" || this.state.mobile === null) {
      Obj.displayAlert('Enter mobile number');

  }
  else if(this.state.email === "" || this.state.email === null) {
    Obj.displayAlert('Enter email address');

}
else if(this.state.restuarantName === "" || this.state.restuarantName === null) {
  Obj.displayAlert('Enter restuarant name');

}
     
     else if(this.state.password === "" || this.state.password === null) {
          Obj.displayAlert('Enter mobile number');
  
      }
     else if(this.state.cnfrmpswd === "" || this.state.cnfrmpswd === null) {
        Obj.displayAlert('Enter confirm password');

    }
    else if(this.state.password!=this.state.cnfrmpswd){
      Obj.displayAlert('Password not matched');
    }
     
      else {
      valid = true;
      }
      
      
      return valid;
      }


    signUpHandler = ()  => {
      if(this.isValid()){
     this.setState({loading:true});
		let formData = {
            "firstName": this.state.name,
            "gmailId": this.state.email,
            "mobileNumber": this.state.mobile,
            "pin": this.state.password,
            "confirmPin": this.state.cnfrmpswd,
            "restName": this.state.restuarantName
          }
        
           
            var url = serverConfig.baseUrl+'api/users/adduser';
          
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
              this.setState({loading:false});
              if (response.status == 200) {
                _this.props.navigation.navigate('Login');
                response.json().then(function(data) {
                  console.warn(data);
                  Obj.displayAlert('Registration successfull, login with your credentials');

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
                 this.setState({loading:false});
                });
              }
                 
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
         <FloatingLabelInput
          label='CONFIRM PASSWORD'
          value={this.state.cnfrmpswd}
          onChangeText={(text)=>this.setState({cnfrmpswd:text})}
        
        
          secureTextEntry={true}
          
        />
           {
          this.state.loading?
          <View style={baseStyle.loadingStyle}>
          <ActivityIndicator color='#fff' size='large' style={{justifyContent:'center', alignItems:'center', alignSelf:'center'}}/> 
          </View>
          :
          
           <TouchableOpacity style={baseStyle.SignUpButton} onPress={()=>this.signUpHandler()}>
               <Text style={baseStyle.buttonText}>SIGN UP</Text>
           </TouchableOpacity>
           }
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