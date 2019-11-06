import {createAppContainer,createSwitchNavigator,DrawerActions } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
 import { createDrawerNavigator } from 'react-navigation-drawer';
import {View,Text,StyleSheet,Platform,TouchableOpacity,Image,StatusBar} from 'react-native';
import Login from '../screens/registration/Login';
import Home from '../screens/afterLogin/Home';
import Loading from '../screens/registration/Loading';
import IntialScreen from '../screens/registration/IntialScreen';
import SignUp from '../screens/registration/SignUp';
import color from '../design/colors';
import string from '../design/strings';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Profile from '../screens/afterLogin/Profile/Profile';
import SideMenu from '../screens/afterLogin/SideMenu/SideMenu';
import NonVeg from '../screens/afterLogin/nonVeg/NonVeg';
import Filter from '../screens/afterLogin/Filter';
import EditProfile from '../screens/afterLogin/Profile/EditProfile';
import CartListScreen from '../screens/afterLogin/Cart/CartListScreen';

import React, {Component} from 'react';
import { widths,heights } from '../design/dimen';





class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Icon2 name='navicon' size={30}  color={color.white} style={{paddingLeft:10,alignSelf:'center'}}/>
        </TouchableOpacity>
      </View>
    );
  }
}



const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerTitleStyle: {
        fontFamily: string.fontLato,
        letterSpacing: 0.2,
        fontWeight: '100',
      },
      headerTintColor: '#fff',
    }),
  },
  Profile:{
    screen:Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'My Account',
     
      headerStyle: {
        backgroundColor: color.primary,
        elevation:0,
      },
      headerTitleStyle: {
              fontFamily: string.fontLato,
              letterSpacing: 0.2,
              fontWeight: '100',
            },
      headerTintColor: '#fff',
    }),
  },
 NonVeg:{
    screen:NonVeg,
    navigationOptions: ({ navigation }) => ({
      title: 'Non Veg',
     
      headerStyle: {
        backgroundColor: color.primary,
        elevation:0,
      },
      headerTitleStyle: {
              fontFamily: string.fontLato,
              letterSpacing: 0.2,
              fontWeight: '100',
            },
      headerTintColor: '#fff',
    }),
  },
  Filter:{
    screen:Filter,
    navigationOptions: ({ navigation }) => ({
      title: 'Filter',
      headerLeft: (
        <TouchableOpacity onPress={()=>navigation.goBack(null)}  
        style={{marginLeft:20,alignSelf:'center',marginTop:10,width:30,height:30}}>
        <Icon 
        name='close'
        size={25}
        color={color.white}
         
        
        />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: color.primary,
        elevation:0,
      },
      headerTitleStyle: {
              fontFamily: string.fontLato,
              letterSpacing: 0.2,
              fontWeight: '100',
            },
      headerTintColor: '#fff',
    }),
  },
  EditProfile:{
    screen:EditProfile,
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Profile',
     
      headerStyle: {
        backgroundColor: color.primary,
        elevation:0,
      },
      headerTitleStyle: {
              fontFamily: string.fontLato,
              letterSpacing: 0.2,
              fontWeight: '100',
            },
      headerTintColor: '#fff',
    }),
  },
  CartListScreen:{
    screen:CartListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Cart',
     
      headerStyle: {
        backgroundColor: color.primary,
        elevation:0,
      },
      headerTitleStyle: {
              fontFamily: string.fontLato,
              letterSpacing: 0.2,
              fontWeight: '100',
            },
      headerTintColor: '#fff',
    }),
  },
});



const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  Home: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Demo Screen 1',
    },
  },
  
  Profile:{
    screen:Profile,
    
  }
},
{
    initialRouteName: 'Home',
    contentComponent: SideMenu,
    drawerWidth: widths.by2
  }
  );













const AuthStack = createStackNavigator({ 
    
    IntialScreen: {
        screen:IntialScreen,
        navigationOptions: {
            header: () => null,
            },
    },
     Login: {
         screen: Login,
         navigationOptions: ({ navigation }) => ({
            headerTransparent: true,
             headerTintColor:color.white,

             title: 'LOGIN',
             headerLeft: (
              <TouchableOpacity onPress={()=>navigation.goBack(null)}  
              style={{marginLeft:20,alignSelf:'center',marginTop:10,width:30,height:30}}>
              <Icon 
                 
                 name='arrowleft'
                 size={25}
                 color={color.white}
                  onPress={()=>navigation.goBack(null)}
                
                 />
                 </TouchableOpacity>
               ),
             headerStyle: {
           
               backgroundColor: 'transparent',
  elevation: 0,
               shadowOpacity: 0,
           
               paddingTop:40
             },
             headerTitleStyle: {
                 fontFamily: string.fontLatoMed,
                 letterSpacing: 0.2,
                 fontWeight: '100',
               },
         }),

    },
        SignUp: {
            screen:SignUp,
            navigationOptions: ({ navigation }) => ({
               headerTransparent: true,
                headerTintColor:color.white,

                title: 'SIGN UP',
                headerLeft: (
                  <TouchableOpacity onPress={()=>navigation.goBack(null)}  
                  style={{marginLeft:20,alignSelf:'center',marginTop:10,width:30,height:30}}>
                  <Icon 
                     
                     name='arrowleft'
                     size={25}
                     color={color.white}
                      onPress={()=>navigation.goBack(null)}
                    
                     />
                     </TouchableOpacity>
                   ),
                headerStyle: {
                //  position: 'absolute',
                  backgroundColor: 'transparent',
                 
                 
                 
                 
                 // paddingBottom: 30,
                  elevation: 0,
                  shadowOpacity: 0,
                 // borderBottomWidth: 0,
                  paddingTop:40
                },
                headerTitleStyle: {
                    fontFamily: string.fontLatoMed,
                    letterSpacing: 0.2,
                    fontWeight: '100',
                  },
            }),
           
    },
    
        
},
{
    initialRouteName: 'IntialScreen'
},
{
    mode: 'modal',
    headerMode: 'screen',
  },
);

const Router = createAppContainer(createSwitchNavigator(
    {
        Loading:{screen: Loading},
        App: DrawerNavigatorExample, 
        Auth: AuthStack,
        
    }, 
    {
        initialRouteName: 'Loading'
    }
));

// const Router = createAppContainer(MainNavigator);

export default Router;