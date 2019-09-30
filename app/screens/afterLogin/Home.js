import React, {Component} from 'react';
import {View, Text,StatusBar,FlatList,ImageBackground,Image,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import string from '../../design/strings';
import window, { heights, widths } from '../../design/dimen';
import { TouchableOpacity } from 'react-native-gesture-handler';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            ItemList:[
                {"id":"1","name":"Chicken Biriyani","image":require('../../assets/tanduri_chicken.jpg'),"price":"250"},
                {"id":"2","name":"Chicken Biriyani","image":require('../../assets/tanduri_chicken.jpg'),"price":"250"},
                {"id":"3","name":"Chicken Biriyani","image":require('../../assets/tanduri_chicken.jpg'),"price":"250"},
                {"id":"4","name":"Chicken Biriyani","image":require('../../assets/tanduri_chicken.jpg'),"price":"250"},

            ]
        }
    }

    _bootstrap = async () => {
     

        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:color.white}}>
                <StatusBar backgroundColor={color.primary} barStyle="default"/>

                <View style={{flex:1,alignItems:'center',marginVertical:10}}>
                    <Text style={{fontFamily:string.fontLatoMed,color:color.black,fontSize:16,alignSelf:'flex-start',marginHorizontal:10,marginVertical:10}}>Popular Dishes</Text>
                <FlatList
        data={this.state.ItemList}
        horizontal={true}
        renderItem={({ item }) => 
        <View style={{backgroundColor:color.white,width:200,marginHorizontal:5,borderRadius:5,elevation:5,height:250}}>
             <ImageBackground style={styles.Background} source={item.image}>
            <View style={styles.overlay} /> 
            </ImageBackground>
            <View style={{flexDirection:'column',justifyContent:'space-between',marginHorizontal:10}}>
                <Text style={{fontFamily:string.fontLatoSemi,fontSize:16,color:color.primary}}>{item.name}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.primaryColor,}}>{'\u20B9'+item.price}</Text>
               <TouchableOpacity style={{backgroundColor:color.primaryColor,borderRadius:5,padding:5}}>
                   <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD</Text>
               </TouchableOpacity>
                </View>
                </View>
            </View>
       
    }
        keyExtractor={item => item.id}
      />

                </View>

            </View>
        );
    }

}
export default Home;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
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
      width: widths.by8, 
      height: widths.by8, 
    },
    menuItemTextView: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      marginLeft:10
  },
    menuItemText: {
      alignSelf: 'center',
      fontSize: widths.dp17, 
      color: color.primary,
      fontFamily: string.fontLatoSemi,
  },
    header: {
      alignSelf: Platform.OS === 'ios' ? 'flex-start' : 'center',
      justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'center',
    },
    Background: {
        height:150,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
       
       
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
  
 