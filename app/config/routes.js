import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/registration/Login';
import Home from '../screens/afterLogin/Home';
import Loading from '../screens/registration/Loading';
import IntialScreen from '../screens/registration/IntialScreen';
import SignUp from '../screens/registration/SignUp';






const AppStack = createStackNavigator({    
     Home:{
         screen: Home
        },
});
const AuthStack = createStackNavigator({ 
    
    IntialScreen: {
        screen:IntialScreen
    },
     Login: {
         screen: Login
        },
        SignUp: {
            screen:SignUp
        }
});

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