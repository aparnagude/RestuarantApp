import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/registration/Login';
import Home from '../screens/afterLogin/Home';
import Loading from '../screens/registration/Loading';
import IntialScreen from '../screens/registration/IntialScreen';
import SignUp from '../screens/registration/SignUp';
import color from '../design/colors';
import string from '../design/strings';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign'






const AppStack = createStackNavigator({    
     Home:{
         screen: Home
        },
});
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
                 <Icon 
                 name='arrowleft'
                 size={30}
                 color={color.white}
                  onPress={()=>navigation.goBack(null)}
                  style={{marginLeft:20,alignSelf:'center',marginTop:2}}
                 />
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
        SignUp: {
            screen:SignUp,
            navigationOptions: ({ navigation }) => ({
               headerTransparent: true,
                headerTintColor:color.white,

                title: 'SIGN UP',
                headerLeft: (
                    <Icon 
                    name='arrowleft'
                    size={30}
                    color={color.white}
                     onPress={()=>navigation.goBack(null)}
                     style={{marginLeft:20,alignSelf:'center',marginTop:2}}
                    />
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
        App: AppStack, 
        Auth: AuthStack
    }, 
    {
        initialRouteName: 'Loading'
    }
));

// const Router = createAppContainer(MainNavigator);

export default Router;