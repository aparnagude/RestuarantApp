import React, {Component} from 'react';
import {Text,View,ScrollView,StatusBar,Image,StyleSheet,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';
import string from '../../../design/strings';
import color from '../../../design/colors';
import baseStyle from '../../../design/styles';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import window, { heights, widths } from '../../../design/dimen';
import AsyncStorage from '@react-native-community/async-storage';
import serverConfig from '../../../config/serverConfig';
import Message from '../../../components/Message';
class EditProfile extends Component {

  constructor(props){
    super(props);
    Obj = new Message();
    this.state={
      mobile:'',
      password:'',
      restuarantName:'',
      name:'',
      email:'',
      userId:'',
      token:'',
      profileData:'',
      restId:'',
      cnfrmpswd:'',
      loading:false,
      loader:false,
    }
  }

  async componentWillMount(){
    const user = await AsyncStorage.getItem('user');
    const userToken = await AsyncStorage.getItem('auth');
    const userdet=JSON.parse(user);
    console.warn(userdet.userId);
    this.setState({mobile:userdet.mobileNumber,userId:userdet.userId,token:userToken})
    this.getProfile();
  }
   
  getProfile = ()  => {
        this.setState({loader:true});    
    var url = serverConfig.baseUrl+'api/users/profile/'+this.state.mobile;
   
    console.warn("url: "+url);
  

    _this = this;
   
    fetch(url, {
      method: 'GET',
      
       headers:{
       'Content-Type': 'application/json',
        'Authorization':_this.state.token,
        'userId':this.state.userId

       }
     }).then( function(response) {
      _this.setState({loader:false});  
      if (response.status == 200) {
       
      
          response.json().then(function(data) {
            console.warn(data);
            _this.setState({name:data.firstName,mobile:data.mobileNumber,restuarantName:data.restName,
            password:data.pin,email:data.gmailId,userId:data.userId,restId:data.restId,cnfrmpswd:data.confirmPin});
            
          });
         
      
       
      } else {
        response.json().then(function(data) {
          Obj.displayAlert(data.message);
          _this.setState({loader:false});  
        
      });
       }
       console.warn("response: "+JSON.stringify(response));
      // Examine the text in the response
     
    })
     .catch((error) => {
         console.warn('Error:', error);
         _this.setState({loader:false});  
        });
 
         
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
              Obj.displayAlert('Enter password');
      
          } 
          else {
          valid = true;
          }
          
          
          return valid;
          }
    


         editProfile = ()  => {
          if(this.isValid()){
            this.setState({loading:true});
          let formData = {
            "firstName": this.state.name,
            "gmailId": this.state.email,
            "mobileNumber": this.state.mobile,
            "pin": this.state.password,
            "confirmPin": this.state.cnfrmpswd,
            "restName": this.state.restuarantName,
            "userId":this.state.userId,
            "restId": this.state.restId,
            "tableNo": "134",
          }
        
           
          var url = serverConfig.baseUrl+'api/users/profile/'+this.state.mobile;
          
            console.warn("url: "+url);
            console.warn("formData: "+JSON.stringify(formData));
        
            _this = this;
           
            fetch(url, {
              method: 'PUT',
               body: JSON.stringify(formData),
               headers:{
               'Content-Type': 'application/json',
               'Authorization':_this.state.token,
               'userId':_this.state.userId
               }
             }).then( function(response) {
           
            if (response.status == 200) {
             
              _this.setState({loading:false});
                response.json().then(function(data) {
                  console.warn(data);
                 Obj.displayAlert('Profile updated');
                 _this.props.navigation.navigate('Home');
                  
                });
               
            
             
            } else {
              response.json().then(function(data) {
                _this.setState({loading:false});
Obj.displayAlert(data.message);
              
            });
             }
             console.warn("response: "+JSON.stringify(response));
            // Examine the text in the response
           
          })
           .catch((error) => {
               console.warn('Error:', error);
               _this.setState({loading:false});
              });
       
               
            }
         }

  render() {
      return(
        <View style={{flex:1,justifyContent:'center'}}>
{
this.state.loader?

<ActivityIndicator color={color.primaryColor} size='large' style={{justifyContent:'center',alignSelf:'center'}}/> 

:
      
          <ScrollView>

             <View style={{backgroundColor:color.white,width:'100%',height:100,justifyContent:'center',marginTop:20}}>
                  <TouchableOpacity style={styles.avatar}>
                  <View style={styles.overlay} />
                      <Image source={require('../../../assets/noPhoto.png')} 
                      style={{alignSelf:'center',width: widths.by6, height: widths.by6,}}/>
                  </TouchableOpacity>
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
            {
          this.state.loading?
          <View style={baseStyle.loadingStyle}>
          <ActivityIndicator color='#fff' size='large' style={{justifyContent:'center', alignItems:'center', alignSelf:'center'}}/> 
          </View>
          :
           <TouchableOpacity style={baseStyle.SignUpButton} onPress={()=>this.editProfile()}>
               <Text style={baseStyle.buttonText}>SAVE</Text>
           </TouchableOpacity>
  }
         

       </View>
       </ScrollView>
       }
       </View>
      );
  }
}

export default EditProfile;

const styles=StyleSheet.create({
       
    SecondContainer: {
        flex:1,
        width:'100%',
       
        marginHorizontal:10,
        position:'relative',
        alignSelf:'center',
        marginBottom:20
        
    },
    avatar: {
      alignSelf: 'center',
      width: widths.by4,
      height: widths.by4,
      borderRadius: widths.by5,
      backgroundColor:color.primary,
      justifyContent:'center',
     
      
    
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(34,34,34,0.7)',
      width: 100,
      height: 100,
      borderRadius: 50,
      alignSelf: 'center',
      justifyContent:'center',
    },
})