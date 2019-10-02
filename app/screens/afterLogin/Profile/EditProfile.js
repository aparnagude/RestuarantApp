import React, {Component} from 'react';
import {Text,View,ScrollView,StatusBar,Image,StyleSheet,TouchableOpacity} from 'react-native';
import string from '../../../design/strings';
import color from '../../../design/colors';
import baseStyle from '../../../design/styles';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import window, { heights, widths } from '../../../design/dimen';

class EditProfile extends Component {

  constructor(props){
    super(props);
    this.state={
      mobile:'',
      password:'',
      restuarantName:'',
      name:'',
      email:'',
    }
  }
  render() {
      return(
          <ScrollView>
             <View style={{backgroundColor:color.white,width:'100%',height:100,justifyContent:'center',marginTop:20}}>
                  <TouchableOpacity style={styles.avatar}>
                  <View style={styles.overlay} />
                      <Image source={require('../../../assets/noPhoto.png')} style={{alignSelf:'center',width: widths.by6,
        height: widths.by6,}}/>
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
          
           <TouchableOpacity style={baseStyle.SignUpButton} onPress={()=>this.gotoScreen('Home')}>
               <Text style={baseStyle.buttonText}>SAVE</Text>
           </TouchableOpacity>
          
         

       </View>
       </ScrollView>
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