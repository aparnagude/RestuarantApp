import React, {Component} from 'react';

import {View, Text,StyleSheet,TouchableOpacity,Image,ScrollView,StatusBar,Keyboard,ActivityIndicator,FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import { widths,heights } from '../../design/dimen';
import string from '../../design/strings';
import baseStyle from '../../design/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import FloatingLabelInput from '../../components/FloatingLabelInput';
import serverConfig from '../../config/serverConfig';
import Message from '../../components/Message'
import Dialog, { DialogTitle,DialogButton, DialogContent ,DialogFooter,ScaleAnimation} from 'react-native-popup-dialog'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class SignUp extends Component {
    constructor(props){
        super(props);
        Obj = new Message();
        this.state={
            mobile:'',
            name:'',
            restuarantName:'',
            password:'',
            email:'',
            cnfrmpswd:'',
            loading:false,
            restArray:[],
            restDialog:false,
            loader:false,
            termsAgreed:''
          
        }
    }

componentDidMount(){
  this.restList();
  
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
     else if(this.state.cnfrmpswd === "" || this.state.cnfrmpswd === null) {
        Obj.displayAlert('Enter confirm password');

    }
    else if(this.state.password!=this.state.cnfrmpswd){
      Obj.displayAlert('Password not matched');
    }
    else if(this.state.termsAgreed==''){
      Obj.displayAlert('Please select user type');
    }
     
      else {
      valid = true;
      }
      
      
      return valid;
      }



 restList() {
     
        _this=this;
  var url = serverConfig.baseUrl+'api/users/restNames';
       
  _this.setState({loader:true})
        
      fetch(url, {
      method: 'GET',
      headers:{
      'Content-Type': 'application/json',
      // 'Authorization': this.state.token,
      // 'userid':this.state.user.userid,
      // 'uniqueId':this.state.user.uniqueId
      }
      }).then( function(response) {
    
        _this.setState({loader:false});
    
        if(response.status === 200){
         
          response.json().then(function(responseJson) {
    
            _this.setState({
            //  restDialog: true,
              restArray:responseJson,
              });
        
             
            
           
          });
          
        } else {
          response.json().then(function(data) {
            
           Obj.displayAlert(data.error+" "+data.message);
          });
          
         
           
         
        }
      })
      .catch(error => console.warn('Error:', error));
   
        
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
            "restName": this.state.restuarantName,
            "userType":this.state.termsAgreed,
            "mtoken":""
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
              _this.setState({loading:false});
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
    
  selectVilage = (item) => {
    // alert(item);
     this.setState({
       restDialog: false,
       restuarantName:item
       })
 }
 changeTermsCond = (item) => {

    this.setState({
      termsAgreed: item,
      });
    
 
  

}

    render(){
        return(
            <View style={baseStyle.MainContainer}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle="default" />


       <ScrollView>
       <View style={[baseStyle.Background,{   backgroundColor:color.primaryColor}]}>
       <Text numberOfLines={2} style={[baseStyle.smallText,{color:color.white,fontSize:hp('2.7%'),marginTop:heights.by8,marginHorizontal:widths.by10}]}>Create a account with new phone number</Text>

           {/* <Image source={require('./../../assets/main_background.jpg')} resizeMode='cover' style={baseStyle.ImageBackground}></Image> */}
           {/* <View style={baseStyle.overlay} /> */}

           {/* <View style={baseStyle.CircleImage}>
              <Image source={require('./../../assets/fork.png')} resizeMode='contain' style={baseStyle.logoImage}></Image>
          
          </View> */}
       </View>
       {
  this.state.loader?
  
  <ActivityIndicator color={color.primaryColor} size='large' style={{justifyContent:'center', alignItems:'center', alignSelf:'center',marginTop:heights.by2half}}/> 

  :
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
          onTouchStart = {() =>{
            this.setState({restDialog:true});
            setTimeout(()=>{
Keyboard.dismiss();
            },1000)
        } }
        
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
         
         <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-evenly',width:'100%',marginVertical:10}}>
           <TouchableOpacity onPress={()=>this.changeTermsCond('kitchen')} style={{flexDirection:'row'}}>
                <Icon2 name={(this.state.termsAgreed == 'kitchen') ? 'check-square-o' : 'square-o'} size={30} style={{ marginHorizontal:10,
      color:color.searchBorder}}/>
       <Text style={{fontFamily:string.fontLatoMed,fontSize:hp('2.5%'),marginLeft:10}}>Kitchen</Text>
                </TouchableOpacity>
              
              
               
                <TouchableOpacity onPress={()=>this.changeTermsCond('normal')} style={{flexDirection:'row'}}>
                <Icon2 name={(this.state.termsAgreed == 'normal') ? 'check-square-o' : 'square-o'} size={30} style={{ marginHorizontal:10,
      color:color.searchBorder}}/>
       <Text style={{fontFamily:string.fontLatoMed,fontSize:hp('2.5%'),marginLeft:10}}>Normal</Text>
                </TouchableOpacity>
               
                   
                </View>



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
    }
       </ScrollView>
      
       <Dialog
       visible={this.state.restDialog}
       width={widths.nintyper}
       dialogTitle={<DialogTitle textStyle={{color: color.primaryColor,fontSize: heights.dp12, fontFamily: string.fontLato}} title="Select Restuarants" />}
       footer={
        <DialogFooter style={{backgroundColor:color.white}}> 
          <DialogButton
          text="Cancel"
          textStyle={{color: color.black,fontSize: widths.by25, fontFamily: string.fontLatoMed}}
          onPress={() => {
          this.setState({ restDialog: false });
          }}
          key="cancelBtn"
          />
          </DialogFooter>
     
          }
       onTouchOutside={() => {
         this.setState({ restDialog: false });
       }}
       onHardwareBackPress={() => {
         this.setState({ restDialog: false });
        }}
     >
       <DialogContent style={{backgroundColor:color.white}}>
      <FlatList
       data={this.state.restArray}
       ItemSeparatorComponent={this.renderSeparator}
       renderItem={({ item }) => (
   <TouchableOpacity key={`${item.id}`} onPress={() => this.selectVilage(item)} style={{padding:10}}>
   
        <Text style={{fontSize:16, color: color.primary, fontFamily: string.fontLatoMed}}>{`${item}`}</Text>
       
   </TouchableOpacity>
   
          )}
       />
      
       </DialogContent>
     </Dialog>


   </View>
        );
    }

}
export default SignUp;


const styles=StyleSheet.create({
    
    SecondContainer: {
        flex:1,
        width:'100%',
        marginTop:20,
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