import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
// import PropTypes from 'prop-types';
import {ScrollView, Text, View,StyleSheet,TouchableOpacity,Image,Platform,ImageBackground} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo'
import string from '../../../design/strings';
import color from '../../../design/colors';
import AsyncStorage from '@react-native-community/async-storage';
import window, { heights, widths } from '../../../design/dimen';
import baseStyle from '../../../design/styles';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    console.warn(route);
    if(route=='Logout'){
this._bootstrap();
    }
    else{
      this.props.navigation.dispatch(navigateAction);
      this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }
    
  }
  _bootstrap = async () => {
     

    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
}
  render () {
    return (
        <View style={styles.container}>
        <ImageBackground style={styles.Background} source={require('../../../assets/main_background.jpg')}>
            <View style={styles.overlay} /> 
            <TouchableOpacity style={{alignSelf:'flex-end',marginRight:10,marginTop:-20}}
            onPress={()=>this.props.navigation.dispatch(DrawerActions.closeDrawer())}>
            <Icon3  name='cross' size={36} color={color.white} />

            </TouchableOpacity>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
<Image source={require("../../../assets/noPhoto.png")}
                  style={styles.avatar} /> 
                   <View style={styles.headerColumn}>
                <View style={styles.profileNumbers}>
                <Text style={styles.name}>Mani Kumar</Text>
                <Text style={styles.mobileNumber}>1234567890</Text>
                </View>
                
                
             
              </View>  
</View>


             
              
        </ImageBackground>            
    <ScrollView>
        <View style={styles.menuOptions}>
            <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('home')}>
                <View style={styles.menuItemIcon}>
                <Icon2 name="home" size={30} color={color.primary}/>
                </View>
                <View style={styles.menuItemTextView}>
                    <Text style={styles.menuItemText}>Home</Text>
                 
                </View>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('EditProfile')}>
            <View style={styles.menuItemIcon}>
            <Icon name="user" size={36} color={color.primary}/>
             </View>
                <View style={styles.menuItemTextView}>
                    <Text style={styles.menuItemText}>Profile</Text>
                   
                </View>
            </TouchableOpacity>
              
           
            <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('MyOrders')}>
            <View style={styles.menuItemIcon}>
                    <Icon name="cart" size={30} color={color.primary}/>
                </View>
                <View style={styles.menuItemTextView}>
                    <Text style={styles.menuItemText}>My Orders</Text>
                   
                </View>
            </TouchableOpacity>
    
    
    
            <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('CartListScreen')}>
            <View style={styles.menuItemIcon}>
                    <Icon name="cart" size={30} color={color.primary}/>
                </View>
                <View style={styles.menuItemTextView}>
                    <Text style={styles.menuItemText}>Cart</Text>
                   
                </View>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.menuItem} onPress={ this.navigateToScreen('contact_us')}>
            <View style={styles.menuItemIcon}>
                    <Icon name="play" size={36} color={color.primary}/>
                </View>
                <View style={styles.menuItemTextView}>
                    <Text style={styles.menuItemText}>Videos</Text>
                   
                </View>
            </TouchableOpacity>
    
    
            
            <TouchableOpacity style={styles.menuItem} onPress={this.navigateToScreen('Logout')}>
            <View style={styles.menuItemIcon}>
                    <Icon2 name="logout" size={24} color={color.primary}/>
                </View>
                <View style={styles.menuItemTextView}>
                    <Text style={styles.menuItemText}>Logout</Text>
                    
                </View>
            </TouchableOpacity>
    
        </View>

        </ScrollView>
    </View>
        );
    
      }
      
    };
    
    const styles = StyleSheet.create({
        container: { 
          flex: 1, 
          backgroundColor: "white" ,
         
        },
        menuOptions: {
          flex: 1, 
          flexDirection: 'column', 
          width: '100%', 
          backgroundColor: color.white,
          marginTop:20
        },
        menuItem:{
          flexDirection: 'row', 
          justifyContent: 'center',
          marginLeft:10
        },
        menuItemIcon: {
          alignItems: 'center', 
          justifyContent: 'center', 
          width: widths.by7, 
          height: widths.by7, 
        },
        menuItemTextView: {
          flex: 1, 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          marginLeft:10
      },
        menuItemText: {
          alignSelf: 'center',
          fontSize: widths.dp16, 
          color: color.primary,
          fontFamily: string.fontLatoSemi,
      },
        header: {
          alignSelf: Platform.OS === 'ios' ? 'flex-start' : 'center',
          justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'center',
         
        },
        Background: {
            height:heights.by4,
            alignItems:'center',
            justifyContent:'center',
          
           
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(34,34,34,0.7)',
          },
        avatar: {
          alignSelf: 'center',
          width: widths.by5,
          height: widths.by5,
          borderRadius: widths.by5,
          backgroundColor:color.white,
          marginLeft:-20,
          marginRight:10
        },
        headerColumn: {
        
alignSelf:'center',       
},
        profileNumbers: {
          alignSelf: 'center',
          flexDirection: "column",
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: 'center'
        },
        headerText: {
          paddingLeft: widths.dp16,
          paddingRight: widths.dp16,
        },
        name: {
          fontSize: widths.dp18,
          fontFamily: string.fontLatoMed,
          textTransform: 'capitalize',
          color:color.white,
          marginLeft:10
         
        },
        mobileNumber: {
          fontSize: widths.dp16,
          fontFamily: string.fontLatoMed,
          textAlign: 'center',
          color:color.white
        },
        bio: {
          marginBottom: heights.dp5,
        },
        
        modeBar: {
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderColor: color.primary,
          borderWidth: StyleSheet.hairlineWidth
        },
        modeIcon: {
          width: widths.by2,
          alignItems: "center"
        },
        button: {
          borderRadius: 3,
          paddingTop: 7,
          paddingBottom: 7,
          paddingLeft: 20,
          paddingRight: 20
        },
        text: {
          fontWeight: "600",
          textAlign: "center"
        },
        photoContainer: {
          flexDirection: "row",
          flexWrap: "wrap"
        }
      });
      
     
    
export default SideMenu;    